import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Desert } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

export default function DesertStaticScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header
        title="Desert"
        subtitle="Raymarched desert scene with sand dunes and atmosphere"
      />

      <View style={styles.desertContainer}>
        <Desert
          color="#ffffff"
          speed={1.0}
          sandDetail={1.0}
          bumpIntensity={1.0}
          mistIntensity={1.0}
          style={styles.desert}
        />
      </View>

      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Classic Desert</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Technique:</Text>
            <Text style={styles.detailValue}>Raymarching</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Speed:</Text>
            <Text style={styles.detailValue}>1.0x</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Sand Detail:</Text>
            <Text style={styles.detailValue}>1.0</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Bump:</Text>
            <Text style={styles.detailValue}>1.0</Text>
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
  desertContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
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
  desert: {
    flex: 1,
  },
  infoPanel: {
    backgroundColor: '#111',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#252525',
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  infoDescription: {
    fontSize: 15,
    color: '#999',
    lineHeight: 22,
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    flex: 1,
    minWidth: '40%',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    color: '#ddd',
    fontWeight: '600',
  },
});
