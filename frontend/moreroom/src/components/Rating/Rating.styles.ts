import { SerializedStyles, css } from '@emotion/react';
import { Palette } from '../../types/globalStyleTypes';
import ColorStyle from '../../styles/colorStyle';

export const base = css`
  top: 0;
  left: 0;
  height: 100%;
`;

export const containerCss = (size: number) => css`
  position: relative;
  display: inline-block;
  width: ${Math.max(size)}rem; 
  height: ${Math.max(size, 1)}rem;
`;

export const glowCss = css`
  position: absolute;
  width: 100%;
  filter: blur(0.75rem);
  opacity: 1;
`;

export const glowStarCss = (color: Palette): SerializedStyles => css`
  color: ${ColorStyle[color].main};
  width: 100%;
  height: 100%;
`;

export const backgroundCss = (transparentBackground: boolean) => css`
  position: relative;
  color: ${transparentBackground ? 'transparent' : '#444'};
  width: 100%;
`;

export const filledCss = (fill: number) => css`
  position: absolute;
  width: ${fill * 100}%;
  overflow: hidden;
`;

