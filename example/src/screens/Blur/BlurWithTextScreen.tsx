import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Blur } from 'react-native-backgrounds';
import { Header } from '../../components/Header';

export default function BlurWithTextScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header
        title="Blur with Text"
        subtitle="Text overlay on blurred background"
      />

      <View style={styles.content}>
        {/* Card with blurred background */}
        <View style={styles.card}>
          <View style={styles.blurBackground}>
            <Blur
              source={require('../../../assets/spongebob.png')}
              filterSize={40}
              style={styles.blur}
            />
          </View>

          {/* Text overlay on top of blur */}
          <View style={styles.textOverlay}>
            <Text style={styles.title}>Frosted Glass Effect</Text>
            <Text style={styles.subtitle}>iOS-style blur with overlay</Text>
            <View style={styles.divider} />
            <Text style={styles.description}>
              This demonstrates how to create a frosted glass effect by
              combining a blurred background image with text content overlaid on
              top.
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>40px</Text>
                <Text style={styles.statLabel}>Blur Radius</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>GPU</Text>
                <Text style={styles.statLabel}>Accelerated</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>60fps</Text>
                <Text style={styles.statLabel}>Performance</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Another example with different styling */}
        <View style={styles.card}>
          <View style={styles.blurBackground}>
            <Blur
              source={require('../../../assets/spongebob.png')}
              filterSize={20}
              style={styles.blur}
            />
          </View>

          <View style={styles.textOverlay}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✨ PREMIUM</Text>
            </View>
            <Text style={styles.title}>Light Blur</Text>
            <Text style={styles.subtitle}>Subtle background effect</Text>
            <Text style={styles.description}>
              With a lighter blur (20px), more of the background image is
              visible while still creating visual depth and hierarchy.
            </Text>
          </View>
        </View>

        {/* Heavy blur example */}
        <View style={styles.card}>
          <View style={styles.blurBackground}>
            <Blur
              source={require('../../../assets/spongebob.png')}
              filterSize={100}
              style={styles.blur}
            />
          </View>

          <View style={styles.textOverlay}>
            <Text style={styles.emojiLarge}>🌊</Text>
            <Text style={styles.title}>Heavy Blur</Text>
            <Text style={styles.subtitle}>Strong background softening</Text>
            <Text style={styles.description}>
              Heavy blur (100px) creates an almost abstract background, perfect
              for keeping focus on the text content.
            </Text>
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
  content: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  card: {
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#333',
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  blur: {
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#bbb',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
  },
  emojiLarge: {
    fontSize: 48,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
});
