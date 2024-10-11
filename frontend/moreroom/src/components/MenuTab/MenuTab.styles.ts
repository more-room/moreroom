import { css, SerializedStyles } from '@emotion/react';
import { FontWeight, Palette } from '../../types/globalStyleTypes';
import ColorStyle from '../../styles/colorStyle';
import { MenuTabVariant } from './MenuTab.types';
import { Colors } from '../../styles/globalStyle';

export const containerCss = (border: number, variant: MenuTabVariant) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${variant === 'contained'
    ? Colors['grey']['800']
    : 'transparent'};
  border-radius: ${border}rem;
  position: relative;
  border-bottom: ${variant === 'contained' ? '' : '0.125rem solid #eee'};
`;

// 선택된 메뉴탭 스타일
export const activeCss = (activeIndex: number, tabCount: number) => css`
  height: calc(100% - 0.625rem);
  width: calc(${100 / tabCount}% - 0.625rem);
  position: absolute;
  top: 0.3125rem;
  left: ${activeIndex * (100 / tabCount)}%;
  transform: translateX(0.3125rem);
  border-radius: inherit;
  transition: all 300ms;
`;

export const variantCss: Record<
  MenuTabVariant,
  (color: Palette, tabCount: number) => SerializedStyles
> = {
  contained: (color: Palette, tabCount: number) => css`
    background-color: ${ColorStyle[color].main};
    width: calc(${100 / tabCount}% - 0.625rem);
  `,
  outlined: (color: Palette, tabCount: number) => css`
    background-color: transparent;
    border-bottom: 0.14375rem solid ${ColorStyle[color].main};
    margin-left: -0.2625rem;
    padding-bottom: 0.3125rem;
    width: ${100 / tabCount}%;
  `,
};

// 선택 안 된 버튼 스타일
export const inactiveCss = (
  tabCount: number,
  color: Palette,
  variant: MenuTabVariant,
  isActive: boolean,
  fontSize: number,
  fontWeight: FontWeight,
) => css`
  width: ${100 / tabCount}%;
  background: none;
  border: none;
  padding: 0.5rem;
  z-index: 2;
  font-size: ${fontSize}rem;
  font-weight: ${fontWeight};
  color: ${variant === 'contained'
    ? ColorStyle[color].contrastText
    : isActive
      ? ColorStyle[color].main
      : '#eee'};

  :enabled {
    :active {
      background-color: transparent;
      border: none !important;
    }
  }
`;
