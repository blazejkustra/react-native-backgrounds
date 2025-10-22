/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-bitwise */
import { StyleSheet } from 'react-native';
import { Canvas } from 'react-native-wgpu';
import { colorToVec3Literal, type ColorInput } from '../utils/colors';
import { fullScreenTriangleVertexShader } from '../shaders/fullScreenTriangleVertexShader';
import { useWGPUSetup } from '../hooks/useWGPUSetup';
import { useEffect, useState } from 'react';
import {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
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
  size = 0.7,
  sizeX,
  sizeY,
  centerX = 0.5,
  centerY = 0.5,
}: Props) {
  const { context, canvasRef, device, presentationFormat, isLoading } =
    useWGPUSetup();

  const animatedSize = typeof size === 'number' ? useSharedValue(size) : size;
  const animatedSizeX =
    sizeX !== undefined
      ? typeof sizeX === 'number'
        ? useSharedValue(sizeX)
        : sizeX
      : animatedSize;
  const animatedSizeY =
    sizeY !== undefined
      ? typeof sizeY === 'number'
        ? useSharedValue(sizeY)
        : sizeY
      : animatedSize;
  const animatedCenterX =
    typeof centerX === 'number' ? useSharedValue(centerX) : centerX;
  const animatedCenterY =
    typeof centerY === 'number' ? useSharedValue(centerY) : centerY;

  const [currentSize, setCurrentSize] = useState(
    typeof size === 'number' ? size : size.value
  );
  const [currentSizeX, setCurrentSizeX] = useState(
    sizeX !== undefined
      ? typeof sizeX === 'number'
        ? sizeX
        : sizeX.value
      : typeof size === 'number'
        ? size
        : size.value
  );
  const [currentSizeY, setCurrentSizeY] = useState(
    sizeY !== undefined
      ? typeof sizeY === 'number'
        ? sizeY
        : sizeY.value
      : typeof size === 'number'
        ? size
        : size.value
  );
  const [currentCenterX, setCurrentCenterX] = useState(
    typeof centerX === 'number' ? centerX : centerX.value
  );
  const [currentCenterY, setCurrentCenterY] = useState(
    typeof centerY === 'number' ? centerY : centerY.value
  );

  useAnimatedReaction(
    () => animatedSize.value,
    (value: number) => {
      runOnJS(setCurrentSize)(value);
    }
  );

  useAnimatedReaction(
    () => animatedSizeX.value,
    (value: number) => {
      runOnJS(setCurrentSizeX)(value);
    }
  );

  useAnimatedReaction(
    () => animatedSizeY.value,
    (value: number) => {
      runOnJS(setCurrentSizeY)(value);
    }
  );

  useAnimatedReaction(
    () => animatedCenterX.value,
    (value: number) => {
      runOnJS(setCurrentCenterX)(value);
    }
  );

  useAnimatedReaction(
    () => animatedCenterY.value,
    (value: number) => {
      runOnJS(setCurrentCenterY)(value);
    }
  );

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const uniformBuffer = device.createBuffer({
      size: 20, // 5 floats: centerX, centerY, sizeX, sizeY, padding
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const uniformData = new Float32Array([
      currentCenterX,
      currentCenterY,
      currentSizeX,
      currentSizeY,
      0.0, // padding for alignment
    ]);
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    const FRAGMENT = /* wgsl */ `
      const CENTER_COLOR : vec3<f32> = ${colorToVec3Literal(centerColor)};
      const EDGE_COLOR   : vec3<f32> = ${colorToVec3Literal(edgeColor)};

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
    device,
    context,
    presentationFormat,
    centerColor,
    edgeColor,
    currentSize,
    currentSizeX,
    currentSizeY,
    currentCenterX,
    currentCenterY,
    isLoading,
  ]);

  return <Canvas ref={canvasRef} style={styles.webgpu} />;
}

const styles = StyleSheet.create({
  webgpu: {
    flex: 1,
  },
});
