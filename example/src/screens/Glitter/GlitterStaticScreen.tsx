import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  type ImageSourcePropType,
} from 'react-native';
import { Glitter } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

type GlitterConfig = {
  id: string;
  name: string;
  scale: number;
  speed: number;
  intensity: number;
  density: number;
  colorA: string;
  colorB: string;
  image?: ImageSourcePropType;
};

const GLITTER_PRESETS: GlitterConfig[] = [
  {
    id: 'default',
    name: 'Classic Sparkle',
    scale: 60,
    speed: 1,
    intensity: 2.0,
    density: 0.1,
    colorA: '#ffffff',
    colorB: '#ffffff',
    image: require('../../../assets/charizard.png'),
  },
  {
    id: 'golden',
    name: 'Golden Shimmer',
    scale: 100,
    speed: 2,
    intensity: 4.0,
    density: 0.1,
    colorA: '#ffd700',
    colorB: '#ffed4e',
  },
  {
    id: 'rainbow',
    name: 'Rainbow Sparkle',
    scale: 60,
    speed: 1,
    intensity: 6.0,
    density: 0.05,
    colorA: '#ff00ff',
    colorB: '#00ffff',
  },
  {
    id: 'subtle',
    name: 'Subtle Dust',
    scale: 80,
    speed: 1,
    intensity: 2.5,
    density: 0.3,
    colorA: '#ffffff',
    colorB: '#cccccc',
  },
  {
    id: 'ice',
    name: 'Ice Crystals',
    scale: 70,
    speed: 1,
    intensity: 5.5,
    density: 0.2,
    colorA: '#00ffff',
    colorB: '#b0e0e6',
  },
];

export default function GlitterStaticScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header title="Glitter" subtitle="Animated sparkle effect" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {GLITTER_PRESETS.map((preset) => (
          <View key={preset.id} style={styles.card}>
            <View style={styles.gradientContainer}>
              {preset.image && (
                <Image
                  source={preset.image}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />
              )}
              <Glitter
                scale={preset.scale}
                speed={preset.speed}
                intensity={preset.intensity}
                density={preset.density}
                colorA={preset.colorA}
                colorB={preset.colorB}
                style={styles.gradient}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{preset.name}</Text>
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Scale:</Text>
                  <Text style={styles.detailValue}>{preset.scale}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Speed:</Text>
                  <Text style={styles.detailValue}>{preset.speed}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Intensity:</Text>
                  <Text style={styles.detailValue}>{preset.intensity}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Density:</Text>
                  <Text style={styles.detailValue}>{preset.density}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    width: CARD_WIDTH,
    alignSelf: 'center',
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#252525',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  gradientContainer: {
    width: '100%',
    maxWidth: 300,
    height: 400,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    alignSelf: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    paddingHorizontal: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '500',
  },
});
