import { Platform } from 'react-native';

// Need to initialize the GPU before using the library
if (Platform.OS !== 'web') {
  const { initGPU } = require('./utils/initGPU');
  initGPU();
}

import CircularGradient from './components/CircularGradient';
import LinearGradient from './components/LinearGradient';
import Iridescence from './components/Iridescence';

export { CircularGradient, LinearGradient, Iridescence };
