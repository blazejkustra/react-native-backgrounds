import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import CircularGradient from '../CircularGradient';
import type { CircularGradientExample } from '../types';

const { height } = Dimensions.get('window');

const CIRCULAR_GRADIENT_EXAMPLES: CircularGradientExample[] = [
  {
    id: 'purple-black',
    title: 'Animated Purple',
    description: 'Purple gradient with animations',
    centerColor: '#4f46e5',
    edgeColor: '#000000',
  },
  {
    id: 'pink-dark',
    title: 'Pink Dream',
    description: 'Vibrant pink gradient fading to dark',
    centerColor: '#ec4899',
    edgeColor: '#1a1a1a',
  },
  {
    id: 'cyan-navy',
    title: 'Ocean Depths',
    description: 'Cyan to navy blue gradient',
    centerColor: '#06b6d4',
    edgeColor: '#1e3a8a',
  },
  {
    id: 'green-emerald',
    title: 'Emerald Forest',
    description: 'Fresh green gradient',
    centerColor: '#10b981',
    edgeColor: '#064e3b',
  },
];

export default function CircularGradientExamplesScreen() {
  const navigation = useNavigation();
  const [selectedExample, setSelectedExample] =
    useState<CircularGradientExample>(CIRCULAR_GRADIENT_EXAMPLES[0]!);
  const centerY = useSharedValue(1.1);

  const handleAnimate = () => {
    const targetY = centerY.value > 0.5 ? -0.2 : 1.1;
    centerY.value = withTiming(targetY, { duration: 1000 });
  };

  const textAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      centerY.value,
      [1.1, -0.1],
      [0, -height * 0.1],
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

  const buttonBottomAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      centerY.value,
      [1.1, -0.1],
      [0, 20],
      Extrapolation.CLAMP
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

      <CircularGradient
        centerColor={selectedExample.centerColor}
        edgeColor={selectedExample.edgeColor}
        sizeX={1}
        sizeY={0.5}
        centerX={0.5}
        centerY={centerY}
      />

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.titleContainer, textAnimatedStyle]}>
          <Text style={styles.title}>{selectedExample.title}</Text>
          <Text style={styles.subtitle}>{selectedExample.description}</Text>
        </Animated.View>

        <View style={styles.examplesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.examplesScrollContent}
          >
            {CIRCULAR_GRADIENT_EXAMPLES.map((example) => (
              <TouchableOpacity
                key={example.id}
                style={[
                  styles.exampleCard,
                  selectedExample.id === example.id && styles.exampleCardActive,
                ]}
                onPress={() => {
                  setSelectedExample(example);
                }}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.colorPreview,
                    { backgroundColor: example.centerColor },
                  ]}
                />
                <Text style={styles.exampleTitle}>{example.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Animated.View
          style={[styles.bottomButtonContainer, buttonBottomAnimatedStyle]}
        >
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={handleAnimate}
            activeOpacity={0.8}
          >
            <Text style={styles.bottomButtonText}>Down/Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 32,
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
  examplesContainer: {
    paddingVertical: 20,
  },
  examplesScrollContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  exampleCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exampleCardActive: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  colorPreview: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  exampleTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomButtonContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 32,
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
