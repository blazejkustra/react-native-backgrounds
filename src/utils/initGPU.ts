import { runOnUI } from 'react-native-reanimated';
import { runOnBackground } from './backgroundRuntime';

// This function is copied from react-native-webgpu-worklets
export function initGPU() {
  const { gpu } = globalThis.navigator;
  const {
    RNWebGPU,
    GPUBufferUsage,
    GPUColorWrite,
    GPUMapMode,
    GPUShaderStage,
    GPUTextureUsage,
  } = globalThis as typeof globalThis & { RNWebGPU: any };

  function init() {
    'worklet';
    if (!globalThis.navigator) {
      globalThis.navigator = { gpu } as typeof navigator;
    } else if (!globalThis.navigator.gpu) {
      globalThis.navigator = { ...globalThis.navigator, gpu };
    }
    (globalThis as any).RNWebGPU = RNWebGPU;
    globalThis.GPUBufferUsage = GPUBufferUsage;
    globalThis.GPUColorWrite = GPUColorWrite;
    globalThis.GPUMapMode = GPUMapMode;
    globalThis.GPUShaderStage = GPUShaderStage;
    globalThis.GPUTextureUsage = GPUTextureUsage;

    // @ts-expect-error __UIModules is not typed
    globalThis.__UIModules = {};
  }

  console.log('[react-native-backgrounds] Initializing GPU...');

  runOnUI(init)();
  runOnBackground(init);
}
