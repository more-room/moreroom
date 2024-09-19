import { css } from '@emotion/react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';
import { Colors } from '../../styles/globalStyle';

export const base = (bgColor: Palette, bgColorScale: ColorScale) => css`
  width: 100%;
  padding: 1rem;
  background-color: ${Colors[bgColor][bgColorScale]};
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
