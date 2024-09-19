import { ReactNode } from 'react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';

export interface StarPointProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  color?: Palette;
  scale?: ColorScale;
  size?: number;
}
