import { ReactNode } from 'react';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';

export interface TypographyProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  color?: Palette;
  scale?: ColorScale;
  size?: number;
  weight?: FontWeight;
}
