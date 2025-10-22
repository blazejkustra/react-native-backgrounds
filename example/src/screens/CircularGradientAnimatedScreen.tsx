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

type ColorScheme = {
  id: string;
  title: string;
  description: string;
  centerColor: string;
  edgeColor: string;
};

const { height } = Dimensions.get('window');

const COLOR_SCHEMES: ColorScheme[] = [
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

export default function CircularGradientAnimatedScreen() {
  const navigation = useNavigation();
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(
    COLOR_SCHEMES[0]!
  );
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
        centerColor={selectedScheme.centerColor}
        edgeColor={selectedScheme.edgeColor}
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
          <Text style={styles.title}>{selectedScheme.title}</Text>
          <Text style={styles.subtitle}>{selectedScheme.description}</Text>
        </Animated.View>

        <View style={styles.examplesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.examplesScrollContent}
          >
            {COLOR_SCHEMES.map((scheme) => (
              <TouchableOpacity
                key={scheme.id}
                style={[
                  styles.exampleCard,
                  selectedScheme.id === scheme.id && styles.exampleCardActive,
                ]}
                onPress={() => {
                  setSelectedScheme(scheme);
                }}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.colorPreview,
                    { backgroundColor: scheme.centerColor },
                  ]}
                />
                <Text style={styles.exampleTitle}>{scheme.title}</Text>
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
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontWeight: '400',
    paddingHorizontal: 20,
  },
  examplesContainer: {
    paddingVertical: 24,
  },
  examplesScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  exampleCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  exampleCardActive: {
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  colorPreview: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  exampleTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomButtonContainer: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  bottomButton: {
    backgroundColor: 'rgba(79, 70, 229, 0.25)',
    paddingHorizontal: 52,
    paddingVertical: 18,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'rgba(79, 70, 229, 0.5)',
    shadowColor: '#4f46e5',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
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
