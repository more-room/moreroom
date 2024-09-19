import { css } from '@emotion/react';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';

export const base = (
  color: Palette,
  scale?: ColorScale,
  size?: number,
  weight?: FontWeight,
  // fontSize?: number,
  borderRadius?: number,

) => css`

color: ${!scale ? MainColors[color] : Colors[color][scale]};
background-color: ${Colors['grey']['800']};
font-size: ${size}rem;
font-weight: ${weight};
border-radius: ${borderRadius}rem;
text-align: center;
display: flex;
width: fit-content;
align-items: center;
`