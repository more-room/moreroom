import { css } from '@emotion/react';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';

export const base = (
  color: Palette,
  size: number,
  weight: FontWeight,
  scale?: ColorScale,
) => css`
  color: ${!scale ? MainColors[color] : Colors[color][scale]};
  font-size: ${size}rem;
  font-weight: ${weight};
`;
