import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { BackButton } from './BackButton';

type HeaderProps = {
  title: string;
  subtitle?: string;
  transparent?: boolean;
  style?: ViewStyle;
  backButtonStyle?: ViewStyle;
};

export function Header({
  title,
  subtitle,
  transparent = false,
  style,
  backButtonStyle,
}: HeaderProps) {
  return (
    <View
      style={[
        styles.header,
        transparent ? styles.transparentHeader : styles.solidHeader,
        style,
      ]}
    >
      <BackButton style={backButtonStyle} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  solidHeader: {
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
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
});
