/* eslint-disable no-bitwise */
import { StyleSheet } from 'react-native';
import { Canvas } from 'react-native-wgpu';
import { colorToVec3Literal, type ColorInput } from '../utils/colors';
import { fullScreenTriangleVertexShader } from '../shaders/fullScreenTriangleVertexShader';
import { useWGPUSetup } from '../hooks/useWGPUSetup';
import { useCallback, useEffect } from 'react';
import { runOnUI, useDerivedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

type Props = {
  centerColor: ColorInput;
  edgeColor: ColorInput;
  size?: number | SharedValue<number>;
  sizeX?: number | SharedValue<number>;
  sizeY?: number | SharedValue<number>;
  centerX?: number | SharedValue<number>;
  centerY?: number | SharedValue<number>;
};

export default function CircularGradient({
  centerColor,
  edgeColor,
  sizeX = 0.5,
  sizeY = 0.5,
  centerX = 0.5,
  centerY = 0.5,
}: Props) {
  const { sharedContext, canvasRef } = useWGPUSetup();

  const animatedSizeX = useDerivedValue(() =>
    typeof sizeX === 'number' ? sizeX : sizeX.value
  );
  const animatedSizeY = useDerivedValue(() =>
    typeof sizeY === 'number' ? sizeY : sizeY.value
  );
  const animatedCenterX = useDerivedValue(() =>
    typeof centerX === 'number' ? centerX : centerX.value
  );
  const animatedCenterY = useDerivedValue(() =>
    typeof centerY === 'number' ? centerY : centerY.value
  );

  const x = colorToVec3Literal(centerColor);
  const y = colorToVec3Literal(edgeColor);

  const drawCircularGradient = useCallback(() => {
    'worklet';

    const { device, context, presentationFormat } = sharedContext.value;
    if (!device || !context || !presentationFormat) {
      return;
    }

    const uniformBuffer = device.createBuffer({
      size: 20, // 5 floats: centerX, centerY, sizeX, sizeY, padding
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const uniformData = new Float32Array([
      animatedCenterX.value,
      animatedCenterY.value,
      animatedSizeX.value,
      animatedSizeY.value,
      0.0, // padding for alignment
    ]);
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    const FRAGMENT = /* wgsl */ `
      const CENTER_COLOR : vec3<f32> = ${x};
      const EDGE_COLOR   : vec3<f32> = ${y};

      struct GradientParams {
        centerX: f32,
        centerY: f32,
        sizeX: f32,
        sizeY: f32,
        _padding: f32,
      }

      @group(0) @binding(0) var<uniform> gradientParams: GradientParams;

      @fragment
      fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
        let uv = (ndc * 0.6) + vec2<f32>(0.5, 0.5);
        let center = vec2<f32>(gradientParams.centerX, gradientParams.centerY);
        
        let diff = uv - center;
        let normalizedDiff = vec2<f32>(diff.x / gradientParams.sizeX, diff.y / gradientParams.sizeY);
        let dist = length(normalizedDiff);
        
        let t = smoothstep(0.0, 1.0, dist);
        let color = mix(CENTER_COLOR, EDGE_COLOR, t);
        return vec4<f32>(color, 1.0);
      }
    `;

    const pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: device.createShaderModule({
          code: fullScreenTriangleVertexShader,
        }),
        entryPoint: 'main',
      },
      fragment: {
        module: device.createShaderModule({
          code: FRAGMENT,
        }),
        entryPoint: 'main',
        targets: [
          {
            format: presentationFormat,
          },
        ],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });

    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformBuffer,
          },
        },
      ],
    });

    const commandEncoder = device.createCommandEncoder();

    const textureView = context.getCurrentTexture().createView();
    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: [0, 0, 0, 1],
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.draw(3);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
    context.present();
  }, [
    animatedCenterX,
    animatedCenterY,
    animatedSizeX,
    animatedSizeY,
    sharedContext,
    x,
    y,
  ]);

  useEffect(() => {
    // TODO: Remove this trick
    setTimeout(() => {
      runOnUI(drawCircularGradient)();
    }, 0);

    function listenToAnimatedValues() {
      animatedCenterX.addListener(0, () => {
        drawCircularGradient();
      });
      animatedCenterY.addListener(0, () => {
        drawCircularGradient();
      });
      animatedSizeX.addListener(0, () => {
        drawCircularGradient();
      });
      animatedSizeY.addListener(0, () => {
        drawCircularGradient();
      });
    }

    function stopListeningToAnimatedValues() {
      animatedCenterX.removeListener(0);
      animatedCenterY.removeListener(0);
      animatedSizeX.removeListener(0);
      animatedSizeY.removeListener(0);
    }

    runOnUI(listenToAnimatedValues)();
    return () => runOnUI(stopListeningToAnimatedValues)();
  }, [
    animatedCenterX,
    animatedCenterY,
    animatedSizeX,
    animatedSizeY,
    drawCircularGradient,
    sharedContext,
  ]);

  return <Canvas ref={canvasRef} style={styles.webgpu} />;
}

const styles = StyleSheet.create({
  webgpu: {
    flex: 1,
  },
});
