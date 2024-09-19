import { ReactNode } from "react";
import { ColorScale, FontWeight, Palette } from "../../types/globalStyleTypes";

export interface ExpectedRatingProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  backgroundColor?: Palette;
  color? : Palette;
  border: number;
  scale?: ColorScale;
  weight?: FontWeight;
  size?: number;
  borderRadius?: number;
}