import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
  interpolateColor,
} from 'react-native-reanimated';
import { CircularGradient } from 'react-native-backgrounds';
import { BackButton } from '../../components/BackButton';

type ColorScheme = {
  id: string;
  title: string;
  description: string;
  centerColor: string;
  edgeColor: string;
};

const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: 'purple-black',
    title: 'Purple',
    description: 'Purple gradient with animations',
    centerColor: '#4f46e5',
    edgeColor: '#000000',
  },
  {
    id: 'pink-dark',
    title: 'Pink',
    description: 'Vibrant pink gradient fading to dark',
    centerColor: '#ec4899',
    edgeColor: '#1a1a1a',
  },
  {
    id: 'cyan-navy',
    title: 'Ocean',
    description: 'Cyan to navy blue gradient',
    centerColor: '#06b6d4',
    edgeColor: '#1e3a8a',
  },
  {
    id: 'green-emerald',
    title: 'Forest',
    description: 'Fresh green gradient',
    centerColor: '#10b981',
    edgeColor: '#064e3b',
  },
];

export default function CircularGradientAnimatedScreen() {
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(
    COLOR_SCHEMES[0]!
  );
  const centerY = useSharedValue(1.1);

  // Color shared values for smooth transitions
  const centerColorProgress = useSharedValue(0);
  const edgeColorProgress = useSharedValue(0);
  const [prevScheme, setPrevScheme] = useState<ColorScheme>(COLOR_SCHEMES[0]!);

  const animatedCenterColor = useDerivedValue(() => {
    return interpolateColor(
      centerColorProgress.value,
      [0, 1],
      [prevScheme.centerColor, selectedScheme.centerColor]
    );
  });

  const animatedEdgeColor = useDerivedValue(() => {
    return interpolateColor(
      edgeColorProgress.value,
      [0, 1],
      [prevScheme.edgeColor, selectedScheme.edgeColor]
    );
  });

  const handleAnimate = () => {
    const targetY = centerY.get() > 0.5 ? -0.2 : 1.1;
    centerY.set(withTiming(targetY, { duration: 1000 }));
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <CircularGradient
        centerColor={animatedCenterColor}
        edgeColor={animatedEdgeColor}
        sizeX={1}
        sizeY={0.5}
        centerX={0.5}
        centerY={centerY}
      />

      <View style={styles.content}>
        <BackButton style={styles.backButton} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedScheme.title}</Text>
          <Text style={styles.subtitle}>{selectedScheme.description}</Text>
        </View>

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
                  if (selectedScheme.id !== scheme.id) {
                    setPrevScheme(selectedScheme);
                    setSelectedScheme(scheme);
                    centerColorProgress.value = 0;
                    edgeColorProgress.value = 0;
                    centerColorProgress.value = withTiming(1, {
                      duration: 600,
                    });
                    edgeColorProgress.value = withTiming(1, {
                      duration: 600,
                    });
                  }
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

        <View style={[styles.bottomButtonContainer]}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={handleAnimate}
            activeOpacity={0.8}
          >
            <Text style={styles.bottomButtonText}>Down/Up</Text>
          </TouchableOpacity>
        </View>
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
