import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from 'react-native-reanimated';
import { CircularGradient } from 'react-native-backgrounds';

type GradientLayer = {
  id: string;
  name: string;
  centerColor: string;
  edgeColor: string;
  sizeX: number;
  sizeY: number;
  centerX: number;
  centerY: number;
  animated?: boolean;
};

type Preset = {
  id: string;
  name: string;
  description: string;
  layers: GradientLayer[];
};

const PRESETS: Preset[] = [
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Northern lights inspired multi-layer effect',
    layers: [
      {
        id: 'layer1',
        name: 'Base',
        centerColor: '#1e3a8a',
        edgeColor: '#000000',
        sizeX: 1.5,
        sizeY: 1.5,
        centerX: 0.5,
        centerY: 0.5,
      },
      {
        id: 'layer2',
        name: 'Green Glow',
        centerColor: '#10b981',
        edgeColor: '#064e3b',
        sizeX: 0.8,
        sizeY: 0.6,
        centerX: 0.3,
        centerY: 0.4,
        animated: true,
      },
      {
        id: 'layer3',
        name: 'Purple Glow',
        centerColor: '#a855f7',
        edgeColor: '#581c87',
        sizeX: 0.7,
        sizeY: 0.5,
        centerX: 0.7,
        centerY: 0.6,
        animated: true,
      },
    ],
  },
  {
    id: 'sunset',
    name: 'Tropical Sunset',
    description: 'Warm overlapping gradients',
    layers: [
      {
        id: 'layer1',
        name: 'Base Sky',
        centerColor: '#7c2d12',
        edgeColor: '#000000',
        sizeX: 1.5,
        sizeY: 1.5,
        centerX: 0.5,
        centerY: 0.5,
      },
      {
        id: 'layer2',
        name: 'Orange Sun',
        centerColor: '#f97316',
        edgeColor: '#7c2d12',
        sizeX: 0.6,
        sizeY: 0.6,
        centerX: 0.5,
        centerY: 0.3,
      },
      {
        id: 'layer3',
        name: 'Pink Glow',
        centerColor: '#ec4899',
        edgeColor: '#831843',
        sizeX: 0.9,
        sizeY: 0.7,
        centerX: 0.5,
        centerY: 0.4,
      },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    description: 'Deep sea color palette',
    layers: [
      {
        id: 'layer1',
        name: 'Deep Blue',
        centerColor: '#1e3a8a',
        edgeColor: '#0a0a0a',
        sizeX: 1.5,
        sizeY: 1.5,
        centerX: 0.5,
        centerY: 0.5,
      },
      {
        id: 'layer2',
        name: 'Cyan Wave',
        centerColor: '#06b6d4',
        edgeColor: '#164e63',
        sizeX: 1.0,
        sizeY: 0.5,
        centerX: 0.5,
        centerY: 0.7,
        animated: true,
      },
      {
        id: 'layer3',
        name: 'Teal Shimmer',
        centerColor: '#14b8a6',
        edgeColor: '#115e59',
        sizeX: 0.5,
        sizeY: 0.8,
        centerX: 0.3,
        centerY: 0.3,
        animated: true,
      },
    ],
  },
  {
    id: 'cosmic',
    name: 'Cosmic Nebula',
    description: 'Space-inspired gradient layers',
    layers: [
      {
        id: 'layer1',
        name: 'Space',
        centerColor: '#1e1b4b',
        edgeColor: '#000000',
        sizeX: 1.5,
        sizeY: 1.5,
        centerX: 0.5,
        centerY: 0.5,
      },
      {
        id: 'layer2',
        name: 'Purple Nebula',
        centerColor: '#a855f7',
        edgeColor: '#581c87',
        sizeX: 0.8,
        sizeY: 0.8,
        centerX: 0.6,
        centerY: 0.4,
        animated: true,
      },
      {
        id: 'layer3',
        name: 'Pink Star',
        centerColor: '#ec4899',
        edgeColor: '#831843',
        sizeX: 0.4,
        sizeY: 0.4,
        centerX: 0.3,
        centerY: 0.6,
      },
      {
        id: 'layer4',
        name: 'Blue Glow',
        centerColor: '#3b82f6',
        edgeColor: '#1e3a8a',
        sizeX: 0.5,
        sizeY: 0.5,
        centerX: 0.7,
        centerY: 0.7,
        animated: true,
      },
    ],
  },
];

export default function CircularGradientMultiLayerScreen() {
  const navigation = useNavigation();
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]!);
  const [enabledLayers, setEnabledLayers] = useState<Set<string>>(
    new Set(PRESETS[0]!.layers.map((l) => l.id))
  );

  // Animated values for each layer
  const layer2X = useSharedValue(0.3);
  const layer2Y = useSharedValue(0.4);
  const layer3X = useSharedValue(0.7);
  const layer3Y = useSharedValue(0.6);

  useEffect(() => {
    // Animate layer positions for animated layers
    layer2X.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    layer2Y.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    layer3X.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.7, { duration: 6000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    layer3Y.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 5500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: 5500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [layer2X, layer2Y, layer3X, layer3Y]);

  const toggleLayer = (layerId: string) => {
    setEnabledLayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(layerId)) {
        newSet.delete(layerId);
      } else {
        newSet.add(layerId);
      }
      return newSet;
    });
  };

  const handlePresetChange = (preset: Preset) => {
    setSelectedPreset(preset);
    setEnabledLayers(new Set(preset.layers.map((l) => l.id)));
  };

  const getAnimatedValue = (layer: GradientLayer, axis: 'x' | 'y') => {
    if (!layer.animated) return layer[axis === 'x' ? 'centerX' : 'centerY'];

    // Use different animated values for different layer indices
    const layerIndex = selectedPreset.layers.findIndex(
      (l) => l.id === layer.id
    );
    if (layerIndex === 1) return axis === 'x' ? layer2X : layer2Y;
    if (layerIndex === 2) return axis === 'x' ? layer3X : layer3Y;

    return layer[axis === 'x' ? 'centerX' : 'centerY'];
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Render gradient layers */}
      <View style={styles.gradientContainer}>
        {selectedPreset.layers.map((layer) =>
          enabledLayers.has(layer.id) ? (
            <View key={layer.id} style={StyleSheet.absoluteFill}>
              <CircularGradient
                centerColor={layer.centerColor}
                edgeColor={layer.edgeColor}
                sizeX={layer.sizeX}
                sizeY={layer.sizeY}
                centerX={getAnimatedValue(layer, 'x')}
                centerY={getAnimatedValue(layer, 'y')}
              />
            </View>
          ) : null
        )}
      </View>

      {/* Controls */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedPreset.name}</Text>
          <Text style={styles.subtitle}>{selectedPreset.description}</Text>
        </View>

        <View style={styles.controlsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.presetsScroll}
          >
            {PRESETS.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                style={[
                  styles.presetCard,
                  selectedPreset.id === preset.id && styles.presetCardActive,
                ]}
                onPress={() => handlePresetChange(preset)}
                activeOpacity={0.7}
              >
                <Text style={styles.presetName}>{preset.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.layersContainer}>
            <Text style={styles.layersTitle}>Active Layers</Text>
            {selectedPreset.layers.map((layer) => (
              <View key={layer.id} style={styles.layerControl}>
                <View style={styles.layerInfo}>
                  <View
                    style={[
                      styles.layerColorDot,
                      { backgroundColor: layer.centerColor },
                    ]}
                  />
                  <Text style={styles.layerName}>{layer.name}</Text>
                  {layer.animated && (
                    <View style={styles.animatedBadge}>
                      <Text style={styles.animatedBadgeText}>animated</Text>
                    </View>
                  )}
                </View>
                <Switch
                  value={enabledLayers.has(layer.id)}
                  onValueChange={() => toggleLayer(layer.id)}
                  trackColor={{ false: '#333', true: '#4f46e5' }}
                  thumbColor={enabledLayers.has(layer.id) ? '#a78bfa' : '#666'}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '400',
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  controlsContainer: {
    paddingBottom: 40,
    gap: 20,
  },
  presetsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  presetCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  presetCardActive: {
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  presetName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  layersContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  layersTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  layerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  layerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  layerColorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  layerName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  animatedBadge: {
    backgroundColor: 'rgba(79, 70, 229, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.5)',
  },
  animatedBadgeText: {
    color: '#a78bfa',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
