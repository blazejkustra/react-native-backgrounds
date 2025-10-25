import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Campfire } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

type CampfireConfig = {
  id: string;
  name: string;
  color: string;
  speed: number;
  sparkSize: number;
  fireIntensity: number;
  smokeIntensity: number;
};

const CAMPFIRE_PRESETS: CampfireConfig[] = [
  {
    id: 'classic',
    name: 'Classic Campfire',
    color: '#ffffff',
    speed: 1.0,
    sparkSize: 1.0,
    fireIntensity: 1.0,
    smokeIntensity: 1.0,
  },
  {
    id: 'intense',
    name: 'Intense Blaze',
    color: '#ffffff',
    speed: 1.5,
    sparkSize: 1.2,
    fireIntensity: 1.5,
    smokeIntensity: 0.8,
  },
  {
    id: 'gentle',
    name: 'Gentle Embers',
    color: '#ffffff',
    speed: 0.6,
    sparkSize: 0.8,
    fireIntensity: 0.7,
    smokeIntensity: 1.2,
  },
  {
    id: 'blue',
    name: 'Blue Flames',
    color: '#6699ff',
    speed: 1.0,
    sparkSize: 1.0,
    fireIntensity: 1.2,
    smokeIntensity: 0.6,
  },
  {
    id: 'green',
    name: 'Mystical Green',
    color: '#66ff99',
    speed: 0.8,
    sparkSize: 1.3,
    fireIntensity: 1.1,
    smokeIntensity: 1.5,
  },
  {
    id: 'purple',
    name: 'Purple Magic',
    color: '#cc66ff',
    speed: 1.2,
    sparkSize: 1.5,
    fireIntensity: 1.3,
    smokeIntensity: 1.0,
  },
  {
    id: 'volcano',
    name: 'Volcanic Eruption',
    color: '#ff8800',
    speed: 2.0,
    sparkSize: 1.8,
    fireIntensity: 2.0,
    smokeIntensity: 1.5,
  },
];

export default function CampfireStaticScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header title="Campfire" subtitle="Fire with drifting sparks and smoke" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CAMPFIRE_PRESETS.map((preset) => (
          <View key={preset.id} style={styles.card}>
            <View style={styles.gradientContainer}>
              <Campfire
                color={preset.color}
                speed={preset.speed}
                sparkSize={preset.sparkSize}
                fireIntensity={preset.fireIntensity}
                smokeIntensity={preset.smokeIntensity}
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
                  <Text style={styles.detailLabel}>Spark Size:</Text>
                  <Text style={styles.detailValue}>{preset.sparkSize}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Fire:</Text>
                  <Text style={styles.detailValue}>{preset.fireIntensity}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Smoke:</Text>
                  <Text style={styles.detailValue}>
                    {preset.smokeIntensity}
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
