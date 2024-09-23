import { ReactNode } from 'react';
import { Palette } from '../../types/globalStyleTypes';

export interface FilterChipProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  color?: Palette;
  size?: number;
  rounded?: boolean;
  selected?: boolean;
  onHandleClick: () => void;
}
