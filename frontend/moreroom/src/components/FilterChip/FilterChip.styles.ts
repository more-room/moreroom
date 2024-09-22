import { css } from '@emotion/react';
import { Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';

export const base = (
  color: Palette,
  size: number,
  rounded: boolean,
  selected: boolean,
) => css`
  width: fit-content;
  height: fit-content;
  padding: 0.5rem 1rem;
  color: ${selected ? MainColors[color] : MainColors['grey']};
  background-color: ${selected
    ? Colors[color][color === 'grey' ? '200' : '50']
    : 'transparent'};
  font-size: ${size}rem;
  font-weight: ${selected ? 700 : 400};
  border: ${selected ? 0 : 0.0625}rem solid ${MainColors['grey']};
  border-radius: ${rounded ? 1 : 0.5}rem;
`;
