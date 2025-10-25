import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CircularGradientList: undefined;
  CircularGradientAnimated: undefined;
  CircularGradientStatic: undefined;
  CircularGradientInteractive: undefined;
  LinearGradientList: undefined;
  LinearGradientAnimated: undefined;
  LinearGradientStatic: undefined;
  IridescenceStatic: undefined;
};

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type ExampleCategory = {
  id: string;
  title: string;
  description: string;
  screen: keyof RootStackParamList;
  color: string;
  image: number;
};
