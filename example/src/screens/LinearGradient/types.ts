import type { RootStackParamList } from '../../types';

export type GradientExample = {
  id: string;
  title: string;
  description: string;
  screen: keyof RootStackParamList;
  preview: {
    startColor: string;
    endColor: string;
  };
};
