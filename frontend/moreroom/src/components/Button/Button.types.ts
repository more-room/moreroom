import { ReactNode } from 'react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';

export type ButtonVariant = 'contained' | 'outlined';

export interface ButtonProps extends React.ComponentProps<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  color?: Palette;
  scale?: ColorScale;
  disabled?: boolean;
  fullwidth?: boolean;
  rounded?: number;
}
