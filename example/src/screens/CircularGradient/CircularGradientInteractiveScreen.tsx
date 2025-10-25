import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CircularGradient } from 'react-native-backgrounds';

type SliderControlProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
};

function SliderControl({
  label,
  value,
  onValueChange,
  min,
  max,
  step = 0.01,
  formatValue = (v) => v.toFixed(2),
}: SliderControlProps) {
  const [sliderWidth, setSliderWidth] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX } = evt.nativeEvent;
      updateValue(locationX);
    },
    onPanResponderMove: (evt) => {
      const { locationX } = evt.nativeEvent;
      updateValue(locationX);
    },
  });

  const updateValue = (locationX: number) => {
    const percentage = Math.max(0, Math.min(1, locationX / sliderWidth));
    let newValue = min + percentage * (max - min);

    if (step) {
      newValue = Math.round(newValue / step) * step;
    }

    newValue = Math.max(min, Math.min(max, newValue));
    onValueChange(newValue);
  };

  const percentage = (value - min) / (max - min);
  const thumbPosition = percentage * sliderWidth;

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderLabel}>{label}</Text>
        <Text style={styles.sliderValue}>{formatValue(value)}</Text>
      </View>
      <View
        style={styles.sliderTrackContainer}
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        {...panResponder.panHandlers}
      >
        <View style={styles.sliderTrack}>
          <View
            style={[
              styles.sliderTrackFilled,
              { width: `${percentage * 100}%` },
            ]}
          />
        </View>
        <View
          style={[
            styles.sliderThumb,
            {
              left: Math.max(0, Math.min(sliderWidth - 20, thumbPosition - 10)),
            },
          ]}
        />
      </View>
    </View>
  );
}

type ColorSliderProps = {
  label: string;
  r: number;
  g: number;
  b: number;
  onColorChange: (r: number, g: number, b: number) => void;
};

function ColorSlider({ label, r, g, b, onColorChange }: ColorSliderProps) {
  return (
    <View style={styles.colorSliderContainer}>
      <View style={styles.colorHeader}>
        <Text style={styles.colorLabel}>{label}</Text>
        <View
          style={[
            styles.colorPreview,
            { backgroundColor: `rgb(${r}, ${g}, ${b})` },
          ]}
        />
      </View>
      <View style={styles.rgbSliders}>
        <SliderControl
          label="R"
          value={r}
          onValueChange={(val) => onColorChange(val, g, b)}
          min={0}
          max={255}
          step={1}
          formatValue={(v) => Math.round(v).toString()}
        />
        <SliderControl
          label="G"
          value={g}
          onValueChange={(val) => onColorChange(r, val, b)}
          min={0}
          max={255}
          step={1}
          formatValue={(v) => Math.round(v).toString()}
        />
        <SliderControl
          label="B"
          value={b}
          onValueChange={(val) => onColorChange(r, g, val)}
          min={0}
          max={255}
          step={1}
          formatValue={(v) => Math.round(v).toString()}
        />
      </View>
    </View>
  );
}

export default function CircularGradientInteractiveScreen() {
  const navigation = useNavigation();

  // Center color state (RGB)
  const [centerR, setCenterR] = useState(79);
  const [centerG, setCenterG] = useState(70);
  const [centerB, setCenterB] = useState(229);

  // Edge color state (RGB)
  const [edgeR, setEdgeR] = useState(0);
  const [edgeG, setEdgeG] = useState(0);
  const [edgeB, setEdgeB] = useState(0);

  // Gradient properties
  const [sizeX, setSizeX] = useState(0.8);
  const [sizeY, setSizeY] = useState(0.5);
  const [centerX, setCenterX] = useState(0.5);
  const [centerY, setCenterY] = useState(0.3);

  const centerColor = `rgb(${Math.round(centerR)}, ${Math.round(centerG)}, ${Math.round(centerB)})`;
  const edgeColor = `rgb(${Math.round(edgeR)}, ${Math.round(edgeG)}, ${Math.round(edgeB)})`;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Gradient Display */}
      <View style={styles.gradientContainer}>
        <CircularGradient
          centerColor={centerColor}
          edgeColor={edgeColor}
          sizeX={sizeX}
          sizeY={sizeY}
          centerX={centerX}
          centerY={centerY}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Interactive Gradient</Text>
          <Text style={styles.subtitle}>Customize your gradient</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Color Controls */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Colors</Text>

            <ColorSlider
              label="Center Color"
              r={centerR}
              g={centerG}
              b={centerB}
              onColorChange={(r, g, b) => {
                setCenterR(r);
                setCenterG(g);
                setCenterB(b);
              }}
            />

            <ColorSlider
              label="Edge Color"
              r={edgeR}
              g={edgeG}
              b={edgeB}
              onColorChange={(r, g, b) => {
                setEdgeR(r);
                setEdgeG(g);
                setEdgeB(b);
              }}
            />
          </View>

          {/* Size Controls */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size</Text>
            <SliderControl
              label="Width (X)"
              value={sizeX}
              onValueChange={setSizeX}
              min={0.1}
              max={2.0}
            />
            <SliderControl
              label="Height (Y)"
              value={sizeY}
              onValueChange={setSizeY}
              min={0.1}
              max={2.0}
            />
          </View>

          {/* Position Controls */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Position</Text>
            <SliderControl
              label="Center X"
              value={centerX}
              onValueChange={setCenterX}
              min={-0.5}
              max={1.5}
            />
            <SliderControl
              label="Center Y"
              value={centerY}
              onValueChange={setCenterY}
              min={-0.5}
              max={1.5}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradientContainer: {
    height: '50%',
    width: '100%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 48,
    left: 24,
    right: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  controlsContainer: {
    flex: 1,
    backgroundColor: '#111',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#aaa',
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'monospace',
  },
  sliderTrackContainer: {
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  sliderTrackFilled: {
    height: '100%',
    backgroundColor: '#4f46e5',
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4f46e5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    top: 10,
  },
  colorSliderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  colorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  colorPreview: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  rgbSliders: {
    gap: 4,
  },
});
