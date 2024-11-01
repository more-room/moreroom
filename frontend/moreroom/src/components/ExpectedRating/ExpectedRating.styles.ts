import { css } from '@emotion/react';
import { Palette, ColorScale } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';



export const base = css`
  display: flex;
  width: fit-content;
`;

// 첫 번째 박스 스타일
export const boxStyle1 = (
  size: number,
  weight: number,
  borderRadius: number,
  backgroundColor: Palette,
  color: Palette,
  scale?: ColorScale,
) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size * 3}rem; /* 첫 번째 박스 너비 */
  height: ${size * 3}rem; /* 첫 번째 박스 높이 */
  font-weight: ${weight};
  font-size: ${size}rem;
  padding: ${size * 0.5}rem;
  /* background-color: ${Colors['grey']['100']};
  color: ${Colors['primary']['A200']}; */

  background-color: ${scale ? Colors[backgroundColor][scale] : Colors[backgroundColor]['100']};
  color: ${scale ? Colors[color][scale] : Colors[color]['A200']};

  border-radius: ${borderRadius}rem; /* 둥글기 설정 */
`;

// 두 번째 박스 스타일
export const boxStyle2 = (
  size: number,
  weight: number,
  borderRadius: number,
  backgroundColor: Palette,
  color: Palette,
  scale?: ColorScale,
) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size * 3}rem; /* 두 번째 박스 너비 */
  height: ${size * 3}rem; /* 두 번째 박스 높이 */
  font-weight: ${weight};
  font-size: ${size}rem;
  padding: ${size * 0.5}rem;


  background-color: ${scale ? Colors[backgroundColor][scale] : Colors[backgroundColor]['A200']};
  color: ${scale ? Colors[color][scale] : Colors[color]['100']};

  border-radius: ${borderRadius}rem; /* 둥글기 설정 */
`;
