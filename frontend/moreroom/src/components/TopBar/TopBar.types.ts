import { ReactNode } from 'react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';

export type TTopBar = 'default' | 'withoutBack' | 'search' | 'withoutRight';

export interface TopBarProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  bgColor?: Palette;
  bgColorScale?: ColorScale;
}
