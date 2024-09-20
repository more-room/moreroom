import { css } from '@emotion/react';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';
import ColorStyle from '../../styles/colorStyle';

export const base = (
  color: Palette,
  // backgroundColor: Palette,
  size: number,
  borderRadius: number,
  fontWeight: FontWeight,
  fontSize: number,
  // scale?: ColorScale,
  colorScale?: ColorScale,  // 컬러 스케일
  // backgroundColorScale?: ColorScale
) => css`
  color: ${!colorScale ? MainColors[color] : Colors[color][colorScale]};  /* 컬러에 스케일 적용 */
  background-color: ${Colors['grey']['800']};  /* 기본 배경색은 'grey 800', 설정된 배경색이 있을 경우 적용 */
  font-size: ${fontSize}rem;
  font-weight: ${fontWeight};
  border-radius: ${borderRadius}rem;
  padding: ${size * 0.4}rem;
  position: relative;  /* 자식 요소의 absolute 위치를 제어할 수 있도록 relative 설정 */
  width: ${size * 5}rem;
  height: ${size * 3}rem;

  .text {
    position: absolute;
    top: ${size * 0.7}rem;   /* 텍스트를 상단에 배치 */
    left: ${size * 0.7}rem;  /* 텍스트를 왼쪽에 배치 */
    word-break: break-word;  /* 긴 단어가 있을 경우 자동으로 줄바꿈 */
    white-space: normal;     /* 텍스트가 길어지면 줄바꿈 허용 */
    text-align: left;        /* 텍스트를 왼쪽 정렬 */
    line-height: 1.2;        /* 텍스트 간격 조정 */
    overflow-wrap: break-word;
    max-width: ${size * 4}rem;
  }

  .icon {
    position: absolute;
    bottom: ${size * 0.8}rem;  /* 아이콘을 하단에 배치 */
    right: ${size * 0.8}rem;   /* 아이콘을 오른쪽에 배치 */
    color:  ${Colors['grey']['500']};
  }
`;
