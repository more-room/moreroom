import { SerializedStyles, css } from '@emotion/react';
import { Palette, Size } from '../../types/globalStyleTypes';
import { ProgressVariant } from './Progress.types';
import ColorStyle from '../../styles/colorStyle';
import { Colors } from '../../styles/globalStyle';

export const base = (transparentBackground: boolean) => css`
  overflow: hidden;
  background-color: ${transparentBackground
    ? 'transparent'
    : Colors['grey']['300']};
`;

export const sizeCss: Record<Size, SerializedStyles> = {
  sm: css`
    height: 0.125rem;
  `,
  md: css`
    height: 0.25rem;
  `,
  lg: css`
    height: 0.5rem;
  `,
  xl: css`
    height: 1rem;
  `,
};

export const variantCss: Record<ProgressVariant, SerializedStyles> = {
  rectangle: css`
    border-radius: 0;
  `,
  rounded: css`
    border-radius: 0.25rem;

    div {
      border-radius: 0.25rem;
    }
  `,
};

export const fillCss = (value: number, max: number, color: Palette) => css`
  width: ${value < 0 ? 0 : Math.round((value / max) * 100)}%;
  background-color: ${ColorStyle[color].main};
  height: 100%;
  transition: all 200ms ease;
`;
