import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Blur } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

type BlurConfig = {
  id: string;
  name: string;
  filterSize: number;
  description: string;
};

const BLUR_PRESETS: BlurConfig[] = [
  {
    id: 'subtle',
    name: 'Subtle Blur',
    filterSize: 5,
    description: 'Light blur effect',
  },
  {
    id: 'medium',
    name: 'Medium Blur',
    filterSize: 20,
    description: 'Balanced blur effect',
  },
  {
    id: 'strong',
    name: 'Strong Blur',
    filterSize: 40,
    description: 'Heavy blur effect',
  },
  {
    id: 'extreme',
    name: 'Extreme Blur',
    filterSize: 100,
    description: 'Maximum blur effect',
  },
];

export default function BlurStaticScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header title="Blur" subtitle="GPU-accelerated blur effect" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {BLUR_PRESETS.map((preset) => (
          <View key={preset.id} style={styles.card}>
            <View style={styles.blurContainer}>
              <Blur
                source={require('../../../assets/spongebob.png')}
                filterSize={preset.filterSize}
                style={styles.blur}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{preset.name}</Text>
              <Text style={styles.description}>{preset.description}</Text>
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Filter Size:</Text>
                  <Text style={styles.detailValue}>{preset.filterSize}px</Text>
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
  blurContainer: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
  },
  blur: {
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
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
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
