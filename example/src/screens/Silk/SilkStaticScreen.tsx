import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Silk } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

type SilkConfig = {
  id: string;
  name: string;
  color: string;
  speed: number;
  scale: number;
  rotation: number;
  noiseIntensity: number;
};

const SILK_PRESETS: SilkConfig[] = [
  {
    id: 'classic',
    name: 'Classic Silk',
    color: '#7B7481',
    speed: 1.0,
    scale: 1.0,
    rotation: 0.0,
    noiseIntensity: 0,
  },
  {
    id: 'purple',
    name: 'Purple Silk',
    color: '#8B5A8E',
    speed: 4.0,
    scale: 1.2,
    rotation: 0.3,
    noiseIntensity: 1.2,
  },
  {
    id: 'blue',
    name: 'Blue Silk',
    color: '#4A6FA5',
    speed: 6.0,
    scale: 0.8,
    rotation: 0.0,
    noiseIntensity: 1.8,
  },
  {
    id: 'gold',
    name: 'Golden Silk',
    color: '#D4AF37',
    speed: 3.5,
    scale: 1.5,
    rotation: 0.5,
    noiseIntensity: 1.0,
  },
  {
    id: 'rose',
    name: 'Rose Silk',
    color: '#C57283',
    speed: 5.5,
    scale: 1.0,
    rotation: -0.3,
    noiseIntensity: 1.6,
  },
  {
    id: 'teal',
    name: 'Teal Silk',
    color: '#4A8A8A',
    speed: 4.5,
    scale: 1.3,
    rotation: 0.8,
    noiseIntensity: 1.4,
  },
  {
    id: 'silver',
    name: 'Silver Silk',
    color: '#A0A0A0',
    speed: 7.0,
    scale: 0.9,
    rotation: 0.2,
    noiseIntensity: 2.0,
  },
];

export default function SilkStaticScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header title="Silk" subtitle="Smooth flowing silk fabric" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {SILK_PRESETS.map((preset) => (
          <View key={preset.id} style={styles.card}>
            <View style={styles.gradientContainer}>
              <Silk
                color={preset.color}
                speed={preset.speed}
                scale={preset.scale}
                rotation={preset.rotation}
                noiseIntensity={preset.noiseIntensity}
                style={styles.gradient}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{preset.name}</Text>
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Color:</Text>
                  <Text style={styles.detailValue}>{preset.color}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Speed:</Text>
                  <Text style={styles.detailValue}>{preset.speed}x</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Scale:</Text>
                  <Text style={styles.detailValue}>{preset.scale}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Rotation:</Text>
                  <Text style={styles.detailValue}>
                    {preset.rotation.toFixed(1)}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Noise:</Text>
                  <Text style={styles.detailValue}>
                    {preset.noiseIntensity}
                  </Text>
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
    height: 220,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradient: {
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
