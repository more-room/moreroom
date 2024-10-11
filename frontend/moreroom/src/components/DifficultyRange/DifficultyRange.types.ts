import { ReactNode } from 'react';

export type TDiffilcultyDir = 'row' | 'col';
export type TDifficultySize = 'xs' | 'sm' | 'md' | 'lg';
export type TDifficultySizeInfo = Record<
  TDifficultySize,
  Record<string, number>
>;

export interface DifficultyRangeProps extends React.ComponentProps<'div'> {
  difficulty?: number;
  dir?: 'row' | 'col';
  size?: TDifficultySize;
  handler?: (difficulty: number) => void;
  children?: ReactNode;
}

export const difficultyArray = [
  '#00ff00',
  '#40bf00',
  '#808000',
  '#bf4000',
  '#ff0000',
];

export const difficultySize: TDifficultySizeInfo = {
  xs: {
    long: 1,
    short: 0.5,
    gap: 0.125,
  },
  sm: {
    long: 1.75,
    short: 0.625,
    gap: 0.25,
  },
  md: {
    long: 2.25,
    short: 0.75,
    gap: 0.375,
  },
  lg: {
    long: 3,
    short: 1,
    gap: 0.5,
  },
};
