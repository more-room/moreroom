import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

export const topbarcolor = css`
  background-color: #313131;
`;

export const bottombarcss = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;  /* 바텀바의 너비를 전체 화면에 맞춤 */
  /* max-width: 22.5rem; 컨테이너와 동일한 최대 너비 */
  margin: 0 auto; /* 중앙 정렬 */
  background-color: #313131; /* 바텀바 배경색 */
  z-index: 1000; /* 다른 요소 위에 위치 */
  padding: 0.25rem; /* 바텀바 안의 패딩 */
  border-top: 1px solid #ffffff;
  
`