import { ReactNode } from 'react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';

export interface IconProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  color?: Palette;
  scale?: ColorScale;
  size?: number;
}
