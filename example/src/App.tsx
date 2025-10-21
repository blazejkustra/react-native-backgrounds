// App.tsx
import {
  Extrapolation,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useState } from 'react';
import CircularGradient from './CircularGradient';

const { height } = Dimensions.get('window');

export default function App() {
  // Create animated shared value for Y position
  const centerY = useSharedValue(1.1); // Start at bottom
  const [isAtTop, setIsAtTop] = useState(false);

  const handlePress = () => {
    // Toggle between bottom and top
    const targetY = centerY.value > 0.5 ? -0.1 : 1.1;
    setIsAtTop(!isAtTop);
    centerY.value = withTiming(targetY, { duration: 1000 });
  };

  const textAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      centerY.value,
      [1.1, -0.1],
      [0, -height * 0.25],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      centerY.value,
      [1.1, -0.1],
      [0.7, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      centerY.value,
      [1.1, -0.1],
      [1.0, 0.8],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  // Animated styles for the button
  const buttonBottomAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      centerY.value,
      [1.1, -0.1],
      [0, 20],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background Gradient */}
      <CircularGradient
        centerColor={`#4f46e5`}
        edgeColor="black"
        sizeX={0.5}
        sizeY={0.5}
        centerX={0.5}
        centerY={centerY}
      />

      {/* Content Overlay */}
      <View style={styles.content}>
        {/* Title - Starts at top, moves to center when gradient animates */}
        <Animated.View style={[styles.titleContainer, textAnimatedStyle]}>
          <Text style={styles.title}>Gradient Magic</Text>
          <Text style={styles.subtitle}>Tap to animate the gradient</Text>
        </Animated.View>

        {/* Bottom Button */}
        <Animated.View
          style={[styles.bottomButtonContainer, buttonBottomAnimatedStyle]}
        >
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={handlePress}
            activeOpacity={0.8}
          >
            <Text style={styles.bottomButtonText}>
              {isAtTop ? 'SEND UP' : 'BRING DOWN'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '400',
  },
  bottomButtonContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  bottomButton: {
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    paddingHorizontal: 48,
    paddingVertical: 20,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(79, 70, 229, 0.4)',
    shadowColor: '#4f46e5',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    minWidth: 200,
  },
  bottomButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
