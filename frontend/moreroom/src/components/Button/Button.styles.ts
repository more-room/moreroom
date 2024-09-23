import { css } from '@emotion/react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';
import { ButtonVariant } from './Button.types';
import ColorStyle from '../../styles/colorStyle';

export const base = (
  color: Palette,
  fullwidth: boolean,
  rounded: number,
  scale?: ColorScale,
) => css`
  box-sizing: border-box;
  transition: all 100ms ease;
  user-select: none;
  padding: 0.55rem 1rem;
  border-radius: ${rounded}rem;
  border: 0.125rem solid ${!scale ? MainColors[color] : Colors[color][scale]};
  font-family: 'Paperlogy';

  :enabled {
    cursor: pointer;
    :active {
      background-color: ${ColorStyle[color].active};
      border: 0.125rem solid ${ColorStyle[color].active};
    }
  }

  :disabled {
    cursor: default;
    color: ${ColorStyle[color].contrastText};
    background-color: ${ColorStyle[color].disabled};
    border: 0.125rem solid ${ColorStyle[color].disabled};
  }

  ${fullwidth &&
  css`
    width: 100%;
  `}
`;

export const variantCss = (
  variant: ButtonVariant,
  color: Palette,
  scale?: ColorScale,
) => {
  switch (variant) {
    case 'contained':
      return css`
        background-color: ${!scale ? MainColors[color] : Colors[color][scale]};
        color: ${ColorStyle[color].contrastText};
      `;

    case 'outlined':
      return css`
        background-color: transparent;
        color: ${!scale ? MainColors[color] : Colors[color][scale]};
      `;
  }
};
