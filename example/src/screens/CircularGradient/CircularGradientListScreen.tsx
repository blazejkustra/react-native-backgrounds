import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/Header';
import type { GradientExample } from './types';
import type { HomeScreenNavigationProp } from '../../types';

const CIRCULAR_GRADIENT_EXAMPLES: GradientExample[] = [
  {
    id: 'static',
    title: 'Static Gradient',
    description: 'Beautiful static gradient showcase with different styles',
    screen: 'CircularGradientStatic',
    preview: {
      centerColor: '#f97316',
      edgeColor: '#7c2d12',
    },
  },
  {
    id: 'animated',
    title: 'Animated Gradient',
    description:
      'Interactive gradient with smooth animations and multiple color schemes',
    screen: 'CircularGradientAnimated',
    preview: {
      centerColor: '#4f46e5',
      edgeColor: '#000000',
    },
  },
  {
    id: 'interactive',
    title: 'Interactive Playground',
    description:
      'Customize gradient colors, sizes, and positions with real-time sliders',
    screen: 'CircularGradientInteractive',
    preview: {
      centerColor: '#a855f7',
      edgeColor: '#4c1d95',
    },
  },
];

export default function CircularGradientListScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header
        title="Circular Gradients"
        subtitle="Choose an example to explore"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CIRCULAR_GRADIENT_EXAMPLES.map((example) => (
          <TouchableOpacity
            key={example.id}
            style={styles.card}
            onPress={() => navigation.navigate(example.screen)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.previewCircle,
                {
                  backgroundColor: example.preview.edgeColor,
                },
              ]}
            >
              <View
                style={[
                  styles.previewInner,
                  { backgroundColor: example.preview.centerColor },
                ]}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{example.title}</Text>
              <Text style={styles.cardDescription}>{example.description}</Text>
            </View>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
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
    paddingTop: 28,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  previewCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  previewInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  cardContent: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  cardDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 21,
  },
  cardArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
});
