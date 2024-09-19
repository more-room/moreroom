 import { ReactNode } from 'react';
 import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';

 export interface InfoBoxProps extends React.ComponentProps<'span'> {
  children: ReactNode;
  color?: Palette;
  scale?: ColorScale;
  size?: number;
  fontSize?: number,
  fontWeight?: FontWeight;
  borderRadius?: number;
 }