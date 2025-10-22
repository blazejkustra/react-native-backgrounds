import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { GradientExample, HomeScreenNavigationProp } from '../types';

const CIRCULAR_GRADIENT_EXAMPLES: GradientExample[] = [
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
    id: 'static',
    title: 'Static Gradient',
    description: 'Beautiful static gradient showcase with different styles',
    screen: 'CircularGradientStatic',
    preview: {
      centerColor: '#f97316',
      edgeColor: '#7c2d12',
    },
  },
];

export default function CircularGradientListScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Circular Gradients</Text>
        <Text style={styles.subtitle}>Choose an example to explore</Text>
      </View>

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
  header: {
    paddingTop: 60,
    paddingHorizontal: 28,
    paddingBottom: 28,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    fontWeight: '400',
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
