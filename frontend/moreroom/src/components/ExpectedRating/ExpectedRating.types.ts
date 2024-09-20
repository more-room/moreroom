import { ReactNode } from "react";
import { ColorScale, FontWeight, Palette } from "../../types/globalStyleTypes";

export interface ExpectedRatingProps extends React.ComponentProps<'div'> {
  children?: [string, string];
  backgroundColor1?: Palette;
  color1? : Palette;
  backgroundColor2?: Palette;
  color2? : Palette;
  // border: number;
  scale?: ColorScale;
  weight?: FontWeight;
  size?: number;
  borderRadius?: number;
}