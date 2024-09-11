import { ReactNode } from 'react';
import { Palette } from '../../types/globalStyleTypes';

export type ButtonVariant = 'contained' | 'outlined';

export interface ButtonProps extends React.ComponentProps<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  color?: Palette;
  disabled?: boolean;
  fullwidth?: boolean;
}
