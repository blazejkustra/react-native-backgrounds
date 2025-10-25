import { Platform } from 'react-native';
import { runOnUI } from 'react-native-reanimated';

// TODO: Remove this trick when the library is stable
function doTheTrick(callback: () => void) {
  setTimeout(runOnUI(callback), Platform.OS === 'web' ? 50 : 0);
}

export default doTheTrick;
