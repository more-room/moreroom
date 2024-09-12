import { css } from '@emotion/react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';

export const base = (bgColor?: Palette, bgColorScale?: ColorScale) => css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  background-color: ${bgColor
    ? !bgColorScale
      ? MainColors[bgColor]
      : Colors[bgColor][bgColorScale]
    : '#313131'};
`;
