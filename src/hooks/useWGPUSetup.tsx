import '../utils/initGPUOnThreads';
import { PixelRatio } from 'react-native';
import {
  type CanvasRef,
  type RNCanvasContext,
  useCanvasEffect,
} from 'react-native-wgpu';
import { useSharedValue, type SharedValue } from 'react-native-reanimated';

type SharedContext = {
  context?: RNCanvasContext;
  presentationFormat?: GPUTextureFormat;
  device?: GPUDevice;
};

type ReturnType = {
  canvasRef: React.RefObject<CanvasRef>;
  sharedContext: SharedValue<SharedContext>;
};

export function useWGPUSetup(): ReturnType {
  const sharedContext = useSharedValue<SharedContext>({});

  const canvasRef = useCanvasEffect(async () => {
    const gpuAdapter = await navigator.gpu.requestAdapter();
    if (!gpuAdapter) {
      throw new Error('[react-native-backgrounds] No adapter found');
    }

    const device = await gpuAdapter.requestDevice();

    const context = canvasRef.current?.getContext('webgpu')!;
    if (!context) {
      throw new Error('[react-native-backgrounds] No context found');
    }

    const canvas = canvasRef.current?.getNativeSurface();
    canvas.width = canvas.clientWidth * PixelRatio.get();
    canvas.height = canvas.clientHeight * PixelRatio.get();

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
      device: device,
      format: presentationFormat,
      alphaMode: 'premultiplied',
    });

    sharedContext.set({
      context,
      device,
      presentationFormat,
    });
  });

  return {
    canvasRef,
    sharedContext,
  };
}
