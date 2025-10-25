import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type BackButtonProps = {
  style?: ViewStyle;
};

export function BackButton({ style }: BackButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.backButtonText}>← Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
