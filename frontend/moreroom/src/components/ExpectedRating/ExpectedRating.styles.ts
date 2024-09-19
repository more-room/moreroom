import { css } from '@emotion/react';
import { Palette, ColorScale} from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';

export const base = (
  backgroundColor: Palette,  // Palette 타입으로 유지
  color: Palette,        // Palette 타입으로 유지
  border?: number,
  weight?: number,
  size?: number,
  scale?: ColorScale,
  borderRadius?: number
) => css`
  display: inline-block;
  color: ${!scale ? MainColors[color] : Colors[color][scale]};  // 텍스트 색상
  background-color: ${!scale ? MainColors[backgroundColor] : Colors[backgroundColor][scale]};  // 배경 색상
  font-size: ${size ? size : 1.5}rem;
  font-weight: ${weight ? weight : 'bold'};
  border-radius: ${borderRadius ? borderRadius : 0.5}rem;
  padding: 0.5rem 1rem;
  border: ${border ? `${border}rem solid ${Colors['grey']['500']}` : 'none'};
  text-align: center;
  width: auto;  // width는 auto로 설정
`;
