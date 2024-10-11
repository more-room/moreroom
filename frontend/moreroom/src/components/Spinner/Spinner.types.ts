import { ColorScale, Palette, Size } from "../../types/globalStyleTypes";

export interface SpinnerProps extends React.ComponentProps<'div'> {
  size?: Size;
  color?: Palette;
  scale?: ColorScale;
}
