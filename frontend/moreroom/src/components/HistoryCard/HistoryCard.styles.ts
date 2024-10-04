import { css } from '@emotion/react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';

export const base = (bgColor: Palette, bgColorScale?: ColorScale) => css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${!bgColorScale
    ? MainColors[bgColor]
    : Colors[bgColor][bgColorScale]};
`;

export const box = css`
  display: flex;
  column-gap: 1rem;
`;

export const img = css`
  min-width: 5.5rem;
  max-width: 5.5rem;
  height: 6.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`;

export const info = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const header = css`
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
`;
