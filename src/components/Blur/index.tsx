import {
  StyleSheet,
  type ViewProps,
  type ImageSourcePropType,
  Image,
} from 'react-native';
import { Canvas } from 'react-native-wgpu';
import { useWGPUSetup } from '../../hooks/useWGPUSetup';
import { useCallback, useEffect, useState } from 'react';
import { runOnUI, useDerivedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { BLUR_SHADER } from './shader';
import doTheTrick from '../../utils/doTheTrick';
import { TRIANGLE_VERTEX_SHADER } from '../../shaders/TRIANGLE_VERTEX_SHADER';

type CanvasProps = ViewProps & {
  transparent?: boolean;
};

type Props = CanvasProps & {
  /**
   * The image source to blur.
   */
  source: ImageSourcePropType;
  /**
   * Blur filter size
   * @default 15
   */
  filterSize?: number | SharedValue<number>;
};

export default function Blur({
  source,
  filterSize = 15,
  style,
  ...canvasProps
}: Props) {
  const { sharedContext, canvasRef } = useWGPUSetup();
  const [imageBitmap, setImageBitmap] = useState<any>(null);

  const animatedFilterSize = useDerivedValue(() => {
    const size = typeof filterSize === 'number' ? filterSize : filterSize.get();
    return size;
  });

  useEffect(() => {
    const loadImage = async () => {
      try {
        const resolved = Image.resolveAssetSource(source);
        if (!resolved) {
          throw new Error('Failed to resolve image source');
        }

        const url = resolved.uri;
        const response = await fetch(url);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);

        setImageBitmap(bitmap);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [source]);

  const drawBlur = useCallback(() => {
    'worklet';
    const { device, context, presentationFormat } = sharedContext.get();
    if (!device || !context || !presentationFormat || !imageBitmap) {
      return;
    }

    const filterSizeValue = animatedFilterSize.get();

    // Create source texture from image
    const srcTexture = device.createTexture({
      size: [imageBitmap.width, imageBitmap.height, 1],
      format: 'rgba8unorm',
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });

    device.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture: srcTexture },
      [imageBitmap.width, imageBitmap.height]
    );

    // Create intermediate texture for two-pass blur
    const intermediateTexture = device.createTexture({
      size: [imageBitmap.width, imageBitmap.height],
      format: 'rgba8unorm',
      usage:
        GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    // Create sampler
    const sampler = device.createSampler({
      magFilter: 'linear',
      minFilter: 'linear',
      addressModeU: 'clamp-to-edge',
      addressModeV: 'clamp-to-edge',
    });

    // Create uniform buffers for both passes
    const horizontalParams = device.createBuffer({
      size: 8,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(
      horizontalParams,
      0,
      new Float32Array([filterSizeValue, 0.0]) // direction = 0 (horizontal)
    );

    const verticalParams = device.createBuffer({
      size: 8,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(
      verticalParams,
      0,
      new Float32Array([filterSizeValue, 1.0]) // direction = 1 (vertical)
    );

    const fragmentModule = device.createShaderModule({ code: BLUR_SHADER });
    const vertexModule = device.createShaderModule({
      code: TRIANGLE_VERTEX_SHADER,
    });

    const horizontalPipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: vertexModule,
        entryPoint: 'main',
      },
      fragment: {
        module: fragmentModule,
        entryPoint: 'fragmentMain',
        targets: [{ format: 'rgba8unorm' }],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });

    const verticalPipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: vertexModule,
        entryPoint: 'main',
      },
      fragment: {
        module: fragmentModule,
        entryPoint: 'fragmentMain',
        targets: [{ format: presentationFormat }],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });

    const commandEncoder = device.createCommandEncoder();

    const horizontalPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: intermediateTexture.createView(),
          clearValue: [0, 0, 0, 1],
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });
    horizontalPass.setPipeline(horizontalPipeline);
    horizontalPass.setBindGroup(
      0,
      device.createBindGroup({
        layout: horizontalPipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: srcTexture.createView() },
          { binding: 1, resource: sampler },
          { binding: 2, resource: { buffer: horizontalParams } },
        ],
      })
    );
    horizontalPass.draw(3);
    horizontalPass.end();

    // Second pass: Vertical blur directly to screen
    const verticalPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          clearValue: [0, 0, 0, 1],
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });
    verticalPass.setPipeline(verticalPipeline);
    verticalPass.setBindGroup(
      0,
      device.createBindGroup({
        layout: verticalPipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: intermediateTexture.createView() },
          { binding: 1, resource: sampler },
          { binding: 2, resource: { buffer: verticalParams } },
        ],
      })
    );
    verticalPass.draw(3);
    verticalPass.end();

    device.queue.submit([commandEncoder.finish()]);
    context.present();
  }, [sharedContext, imageBitmap, animatedFilterSize]);

  useEffect(() => {
    if (!imageBitmap) {
      return;
    }

    doTheTrick(drawBlur);

    function listenToAnimatedValues() {
      animatedFilterSize.addListener(0, () => {
        drawBlur();
      });
    }

    function stopListeningToAnimatedValues() {
      animatedFilterSize.removeListener(0);
    }

    runOnUI(listenToAnimatedValues)();
    return runOnUI(stopListeningToAnimatedValues);
  }, [imageBitmap, drawBlur, sharedContext, animatedFilterSize]);

  return (
    <Canvas ref={canvasRef} style={[styles.webgpu, style]} {...canvasProps} />
  );
}

Blur.displayName = 'Blur';

const styles = StyleSheet.create({
  webgpu: {
    flex: 1,
  },
});
