import { useCallback } from 'react';
import {
  useFrameCallback,
  useSharedValue,
  type FrameInfo,
  type SharedValue,
} from 'react-native-reanimated';

export function useClock(): SharedValue<number> {
  const clock = useSharedValue(0);
  const callback = useCallback(
    (info: FrameInfo) => {
      'worklet';
      clock.value = info.timeSinceFirstFrame;
    },
    [clock]
  );
  useFrameCallback(callback);
  return clock;
}
