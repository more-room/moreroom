import { css } from '@emotion/react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';

export const base = (color: Palette, size: number, scale?: ColorScale) => css`
  width: ${size}rem;
  height: ${size}rem;
  color: ${!scale ? MainColors[color] : Colors[color][scale]};
`;
