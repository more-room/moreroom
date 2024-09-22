import { FontWeight, Palette } from '../../types/globalStyleTypes';

export interface LabeledTypographyProps extends React.ComponentProps<'div'> {
  str: string;
  pattern: string;
  normalColor?: Palette;
  highlightColor?: Palette;
  weight?: FontWeight;
  size?: number;
}
