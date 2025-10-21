import { startTransition, useState } from 'react';
import { PixelRatio } from 'react-native';
import {
  type CanvasRef,
  type RNCanvasContext,
  useCanvasEffect,
} from 'react-native-wgpu';

type ReturnType = {
  canvasRef: React.RefObject<CanvasRef>;
  presentationFormat: GPUTextureFormat;
} & (
  | {
      context: RNCanvasContext;
      device: GPUDevice;
      isLoading: false;
    }
  | {
      context: null;
      device: null;
      isLoading: true;
    }
);

export function useWGPUSetup(): ReturnType {
  const [context, setContext] = useState<RNCanvasContext | null>(null);
  const [device, setDevice] = useState<GPUDevice | null>(null);
  const [presentationFormat, setPresentationFormat] =
    useState<GPUTextureFormat>(navigator.gpu.getPreferredCanvasFormat());

  const canvasRef = useCanvasEffect(async () => {
    const gpuAdapter = await navigator.gpu.requestAdapter();
    if (!gpuAdapter) {
      throw new Error('[react-native-backgrounds] No adapter found');
    }

    console.log('test');
    const dev = await gpuAdapter.requestDevice();

    const ctx = canvasRef.current?.getContext('webgpu')!;
    if (!ctx) {
      return;
    }

    const canvas = canvasRef.current?.getNativeSurface();
    canvas.width = canvas.clientWidth * PixelRatio.get();
    canvas.height = canvas.clientHeight * PixelRatio.get();

    const format = navigator.gpu.getPreferredCanvasFormat();
    ctx.configure({
      device: dev,
      format,
      alphaMode: 'premultiplied',
    });

    startTransition(() => {
      setContext(ctx);
      setDevice(dev);
      setPresentationFormat(format);
    });
  });

  return {
    canvasRef,
    context,
    device,
    presentationFormat,
    isLoading: !context || !device,
  } as ReturnType;
}
