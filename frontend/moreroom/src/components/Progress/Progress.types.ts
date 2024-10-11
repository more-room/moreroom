import { ReactNode } from 'react';
import { ColorScale, Palette, Size } from '../../types/globalStyleTypes';

export type ProgressVariant = 'rounded' | 'rectangle';

export interface ProgressProps extends React.ComponentProps<'div'> {
  color?: Palette;
  value: number;
  max: number;
  variant?: ProgressVariant;
  transparentBackground?: boolean;
  size: Size;
}
