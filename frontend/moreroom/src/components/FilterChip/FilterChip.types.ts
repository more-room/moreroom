import { ReactNode } from 'react';
import {ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes'

export interface FilterChipProps extends React.ComponentProps<'button'>{
  children: ReactNode;
  // color?: Palette;
  // fill: Palette;
  border: number;
  scale?: ColorScale;
  size?: number;
  weight?: FontWeight;
  selected?: boolean;
 
  borderRadius? : number
  onHandleChange: (index: number) => void;
}