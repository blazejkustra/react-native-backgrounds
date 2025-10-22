import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CircularGradientExamples: undefined;
};

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type ExampleCategory = {
  id: string;
  title: string;
  description: string;
  screen: keyof RootStackParamList;
  color: string;
};

export type CircularGradientExample = {
  id: string;
  title: string;
  description: string;
  centerColor: string;
  edgeColor: string;
};
