import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ExampleCategory, HomeScreenNavigationProp } from '../types';

const EXAMPLE_CATEGORIES: ExampleCategory[] = [
  {
    id: 'circular-gradient',
    title: 'Circular Gradient',
    description:
      'Beautiful circular gradients with customizable colors and animations',
    screen: 'CircularGradientExamples',
    color: '#4f46e5',
  },
  // Future examples can be added here
  // {
  //   id: 'linear-gradient',
  //   title: 'Linear Gradient',
  //   description: 'Smooth linear gradients with various directions',
  //   screen: 'LinearGradientExamples',
  //   color: '#ec4899',
  // },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <Text style={styles.title}>React Native Backgrounds</Text>
        <Text style={styles.subtitle}>WebGPU-powered gradient examples</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {EXAMPLE_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.card}
            onPress={() => navigation.navigate(category.screen)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.cardColorIndicator,
                { backgroundColor: category.color },
              ]}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{category.title}</Text>
              <Text style={styles.cardDescription}>{category.description}</Text>
            </View>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap any example to see it in action
        </Text>
      </View>
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
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardColorIndicator: {
    width: 4,
    height: 60,
    borderRadius: 2,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    paddingRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  cardDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});
