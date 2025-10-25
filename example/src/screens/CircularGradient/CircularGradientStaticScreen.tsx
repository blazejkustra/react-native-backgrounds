import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { CircularGradient } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

type GradientStyle = {
  id: string;
  title: string;
  centerColor: string;
  edgeColor: string;
  sizeX: number;
  sizeY: number;
  centerX: number;
  centerY: number;
};

const GRADIENT_STYLES: GradientStyle[] = [
  {
    id: 'sunset',
    title: 'Sunset Glow',
    centerColor: '#f97316',
    edgeColor: '#7c2d12',
    sizeX: 0.8,
    sizeY: 0.8,
    centerX: 0.5,
    centerY: 0.5,
  },
  {
    id: 'aurora',
    title: 'Aurora Borealis',
    centerColor: '#10b981',
    edgeColor: '#1e3a8a',
    sizeX: 1.2,
    sizeY: 0.6,
    centerX: 0.5,
    centerY: 0.3,
  },
  {
    id: 'cosmic',
    title: 'Cosmic Purple',
    centerColor: '#a855f7',
    edgeColor: '#1e1b4b',
    sizeX: 0.6,
    sizeY: 1.0,
    centerX: 0.5,
    centerY: 0.6,
  },
  {
    id: 'fire',
    title: 'Fire Ember',
    centerColor: '#fbbf24',
    edgeColor: '#dc2626',
    sizeX: 0.5,
    sizeY: 0.5,
    centerX: 0.5,
    centerY: 0.4,
  },
];

export default function CircularGradientStaticScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header
        title="Static Gradients"
        subtitle="Different sizes and positions"
        transparent
        style={styles.header}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {GRADIENT_STYLES.map((style, index) => (
          <View
            key={style.id}
            style={[
              styles.gradientContainer,
              index === GRADIENT_STYLES.length - 1 && styles.lastGradient,
            ]}
          >
            <View style={styles.gradientWrapper}>
              <CircularGradient
                centerColor={style.centerColor}
                edgeColor={style.edgeColor}
                sizeX={style.sizeX}
                sizeY={style.sizeY}
                centerX={style.centerX}
                centerY={style.centerY}
              />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.gradientTitle}>{style.title}</Text>
              <Text style={styles.gradientDetails}>
                Size: {style.sizeX.toFixed(1)} × {style.sizeY.toFixed(1)} |
                Position: ({style.centerX.toFixed(1)},{' '}
                {style.centerY.toFixed(1)})
              </Text>
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
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 200,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  gradientContainer: {
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
    backgroundColor: '#0a0a0a',
  },
  lastGradient: {
    marginBottom: 0,
  },
  gradientWrapper: {
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    margin: 12,
  },
  labelContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  gradientTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  gradientDetails: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    fontFamily: 'monospace',
    lineHeight: 18,
  },
});
