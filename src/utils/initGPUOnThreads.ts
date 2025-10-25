import { runOnUI } from 'react-native-reanimated';
import { Platform } from 'react-native';

let isInitialized = false;

// This function is copied from react-native-webgpu-worklets
function initGPUOnThreads() {
  if (isInitialized) {
    return;
  }

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

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '[react-native-backgrounds] Initializing GPU on UI and background threads'
    );
  }

  runOnUI(init)();
  // TODO: Uncomment this when we start supporting background threads
  // runOnBackground(init);
  isInitialized = true;
}

// Only initialize the GPU on threads for non-web platforms
if (Platform.OS !== 'web') {
  initGPUOnThreads();
}
