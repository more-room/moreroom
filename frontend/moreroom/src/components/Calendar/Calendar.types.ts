import { ReactNode } from 'react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';

export interface CalendarProps extends React.ComponentProps<'div'> {
  bgColor?: Palette;
  bgColorScale?: ColorScale;
  children?: ReactNode;
}
