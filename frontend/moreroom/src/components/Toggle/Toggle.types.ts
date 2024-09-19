import { ReactNode } from 'react'
import { ColorScale, Palette } from '../../types/globalStyleTypes'

export interface ToggleProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  color?: Palette;
  scale?: ColorScale;
  size?: number;
  isOn: boolean;
}