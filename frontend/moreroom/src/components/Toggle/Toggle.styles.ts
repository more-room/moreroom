import { css } from '@emotion/react';
import { ColorScale, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';

export const toggle = (
  isOn: boolean,
  color: Palette = 'primary',
  scale?: ColorScale,
  size: number = 2.5,
) => css`
  position: relative;
  width: ${size * 0.8}rem;
  height: ${size / 2.5}rem;
  border-radius: ${size / 2.5}rem;
  background-color: ${isOn
    ? scale
      ? Colors[color][scale]
      : MainColors[color]
    : Colors.grey[300]};
  transition: background-color 300ms;

  &::after {
    content: '';
    position: absolute;
    width: ${size / 2.5}rem;
    height: ${size / 2.5}rem;
    border-radius: 50%;
    background-color: white;
    left: ${isOn ? `calc(100% - ${size / 2.5}rem)` : '0'};
    transition: left 300ms ease-in-out;
  }
`;
