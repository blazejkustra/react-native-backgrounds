import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CircularGradientList: undefined;
  CircularGradientAnimated: undefined;
  CircularGradientStatic: undefined;
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

export type GradientExample = {
  id: string;
  title: string;
  description: string;
  screen: keyof RootStackParamList;
  preview: {
    centerColor: string;
    edgeColor: string;
  };
};
