import { FontWeight, Palette } from '../../types/globalStyleTypes';

export interface LabeledTypographyProps {
  str: string;
  pattern: string;
  normalColor?: Palette;
  highlightColor?: Palette;
  weight?: FontWeight;
  size?: number;
}
