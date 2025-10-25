import { initGPU } from './utils/initGPU';

// Need to initialize the GPU before using the library
initGPU();

import CircularGradient from './components/CircularGradient';
import LinearGradient from './components/LinearGradient';

export { CircularGradient, LinearGradient };
