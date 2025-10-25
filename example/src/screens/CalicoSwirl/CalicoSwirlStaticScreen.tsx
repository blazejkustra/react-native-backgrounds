import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { CalicoSwirl } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

type CalicoSwirlConfig = {
  id: string;
  name: string;
  color: string;
  speed: number;
  intensity: number;
};

const CALICO_SWIRL_PRESETS: CalicoSwirlConfig[] = [
  {
    id: 'classic',
    name: 'Classic Calico',
    color: '#ffffff',
    speed: 1.0,
    intensity: 1.0,
  },
  {
    id: 'blue',
    name: 'Ocean Swirl',
    color: '#4488ff',
    speed: 1.0,
    intensity: 1.0,
  },
  {
    id: 'orange',
    name: 'Sunset Warp',
    color: '#ff8844',
    speed: 0.2,
    intensity: 2.0,
  },
  {
    id: 'pink',
    name: 'Pink Marble',
    color: '#ff66aa',
    speed: 5,
    intensity: 1.2,
  },
];

export default function CalicoSwirlStaticScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header
        title="Calico Swirl"
        subtitle="Warped noise pattern with flowing colors"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CALICO_SWIRL_PRESETS.map((preset) => (
          <View key={preset.id} style={styles.card}>
            <View style={styles.gradientContainer}>
              <CalicoSwirl
                color={preset.color}
                speed={preset.speed}
                intensity={preset.intensity}
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
                  <Text style={styles.detailLabel}>Intensity:</Text>
                  <Text style={styles.detailValue}>{preset.intensity}</Text>
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
