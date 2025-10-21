// App.tsx
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import CircularGradient from './CircularGradient';

export default function App() {
  // Create animated shared value for Y position
  const centerY = useSharedValue(1.1); // Start at bottom (0.8 = 80% down)

  const handlePress = () => {
    // Toggle between bottom (0.8) and top (0.2)
    const targetY = centerY.value > 0.5 ? -0.1 : 1.1;
    centerY.value = withTiming(targetY, { duration: 1000 });
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={handlePress}>
      <CircularGradient
        centerColor={`#4f46e5`}
        edgeColor="black"
        sizeX={0.5}
        sizeY={0.5}
        centerX={0.5}
        centerY={centerY}
      />
    </Pressable>
  );
}
