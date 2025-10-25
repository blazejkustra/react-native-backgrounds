import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LiquidChrome } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

type LiquidChromeConfig = {
  id: string;
  name: string;
  baseColor: string;
  speed: number;
  amplitude: number;
  frequencyX: number;
  frequencyY: number;
};

const LIQUID_CHROME_PRESETS: LiquidChromeConfig[] = [
  {
    id: 'classic',
    name: 'Classic Chrome',
    baseColor: '#1a1a1a',
    speed: 0.2,
    amplitude: 0.3,
    frequencyX: 3,
    frequencyY: 3,
  },
  {
    id: 'fast',
    name: 'Fast Flow',
    baseColor: '#1a1a26',
    speed: 0.8,
    amplitude: 0.4,
    frequencyX: 4,
    frequencyY: 4,
  },
  {
    id: 'gentle',
    name: 'Gentle Waves',
    baseColor: '#261a1a',
    speed: 0.1,
    amplitude: 0.2,
    frequencyX: 2,
    frequencyY: 2,
  },
  {
    id: 'intense',
    name: 'Intense Motion',
    baseColor: '#0d0d1a',
    speed: 0.5,
    amplitude: 0.5,
    frequencyX: 5,
    frequencyY: 5,
  },
  {
    id: 'blue',
    name: 'Blue Chrome',
    baseColor: '#0d1a33',
    speed: 0.3,
    amplitude: 0.3,
    frequencyX: 3,
    frequencyY: 3,
  },
  {
    id: 'green',
    name: 'Green Chrome',
    baseColor: '#0d261a',
    speed: 0.25,
    amplitude: 0.35,
    frequencyX: 3,
    frequencyY: 3,
  },
  {
    id: 'purple',
    name: 'Purple Chrome',
    baseColor: '#260d26',
    speed: 0.2,
    amplitude: 0.3,
    frequencyX: 4,
    frequencyY: 3,
  },
];

export default function LiquidChromeStaticScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header title="Liquid Chrome" subtitle="Fluid metallic surfaces" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {LIQUID_CHROME_PRESETS.map((preset) => (
          <View key={preset.id} style={styles.card}>
            <View style={styles.gradientContainer}>
              <LiquidChrome
                baseColor={preset.baseColor}
                speed={preset.speed}
                amplitude={preset.amplitude}
                frequencyX={preset.frequencyX}
                frequencyY={preset.frequencyY}
                style={styles.gradient}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{preset.name}</Text>
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Color:</Text>
                  <Text style={styles.detailValue}>{preset.baseColor}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Speed:</Text>
                  <Text style={styles.detailValue}>{preset.speed}x</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Amplitude:</Text>
                  <Text style={styles.detailValue}>{preset.amplitude}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Freq X:</Text>
                  <Text style={styles.detailValue}>{preset.frequencyX}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Freq Y:</Text>
                  <Text style={styles.detailValue}>{preset.frequencyY}</Text>
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
