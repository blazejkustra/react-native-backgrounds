import { StyleSheet } from 'react-native';
import { Canvas } from 'react-native-wgpu';
import { colorToVec3Literal, type ColorInput } from './utils/colors';
import { fullScreenTriangleVertexShader } from './shaders/fullScreenTriangleVertexShader';
import { useWGPUSetup } from './hooks/useWGPUSetup';
import { useEffect } from 'react';

type Props = {
  centerColor: ColorInput;
  edgeColor: ColorInput;
};

export default function CircularGradient({ centerColor, edgeColor }: Props) {
  const { context, canvasRef, device, presentationFormat, isLoading } =
    useWGPUSetup();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const FRAGMENT = /* wgsl */ `
      const CENTER_COLOR : vec3<f32> = ${colorToVec3Literal(centerColor)};
      const EDGE_COLOR   : vec3<f32> = ${colorToVec3Literal(edgeColor)};

      @fragment
      fn main(@location(0) ndc: vec2<f32>) -> @location(0) vec4<f32> {
        let uv = (ndc * 0.6) + vec2<f32>(0.5, 0.5);
        let center = vec2<f32>(0.5, 0.5);
        let dist = distance(uv, center);
        let t = smoothstep(0.0, 0.7, dist);
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
    passEncoder.draw(3);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
    context.present();
  }, [device, context, presentationFormat, centerColor, edgeColor, isLoading]);

  return <Canvas ref={canvasRef} style={styles.webgpu} />;
}

const styles = StyleSheet.create({
  webgpu: {
    flex: 1,
  },
});
