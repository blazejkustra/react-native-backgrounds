import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { Holo } from 'react-native-backgrounds';
import { Header } from '../../components/Header';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function HoloStaticScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = width - 40;

  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      'worklet';

      const normalizedX = (event.x / cardWidth) * 2 - 1;
      const normalizedY = (event.y / (cardWidth * 1.4)) * 2 - 1;

      touchX.value = normalizedX * 0.8;
      touchY.value = -normalizedY * 0.8;
    })
    .onChange((event) => {
      'worklet';
      const normalizedX = (event.x / cardWidth) * 2 - 1;
      const normalizedY = (event.y / (cardWidth * 1.4)) * 2 - 1;

      touchX.value = Math.max(-1, Math.min(1, normalizedX * 0.8));
      touchY.value = Math.max(-1, Math.min(1, -normalizedY * 0.8));
    })
    .onEnd(() => {
      'worklet';
      // Smoothly return to center when touch ends
      touchX.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
        mass: 0.5,
      });
      touchY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
        mass: 0.5,
      });
    });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Header
          title="Holographic Card"
          subtitle="Interactive rainbow shimmer with parallax depth"
        />
        <View style={[styles.content]}>
          <GestureDetector gesture={gesture}>
            <Holo
              source={require('../../../assets/charizard.png')}
              style={{ width: cardWidth }}
              touchX={touchX}
              touchY={touchY}
            />
          </GestureDetector>
          <Text style={styles.infoText}>
            ✨ Touch and drag to see the holographic effect!
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#888',
    marginTop: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
});
