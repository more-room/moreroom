import { SerializedStyles, css } from '@emotion/react';
import { Palette, Size } from '../../types/globalStyleTypes';
import ColorStyle from '../../styles/colorStyle';
import { Colors } from '../../styles/globalStyle';

export const base = (size: number) => css`
  position: relative;
  display: inline-block;
  width: ${size}rem;
  height: ${size}rem;
`;

export const glowCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(0.25rem);
  opacity: 0.5;
`;

export const glowStarCss = (color: Palette): SerializedStyles => {
  const actualColor = ColorStyle[color].main;  // ColorStyle 객체를 사용하여 실제 색상 값을 가져옵니다.
  return css`
    color: ${actualColor};
    width: 100%;
    height: 100%;
  `;
};

export const backgroundCss = (transparentBackground: boolean) => css`
  position: absolute;
  top: 0;
  left: 0;
  color: ${transparentBackground ? 'transparent' : '#444'};
  width: 100%;
  height: 100%;
`;

export const filledCss = (fill: number) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: ${fill * 100}%;
  height: 100%;
  overflow: hidden;
`;
