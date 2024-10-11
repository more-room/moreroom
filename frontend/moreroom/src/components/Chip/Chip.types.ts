import { ReactNode } from 'react';
import { FontWeight, Palette } from '../../types/globalStyleTypes';

export interface ChipProps extends React.ComponentProps<'span'> {
  children?: ReactNode;
  color?: Palette;
  border?: number;
  fontSize?:number;
  fontWeight?: FontWeight;
}
