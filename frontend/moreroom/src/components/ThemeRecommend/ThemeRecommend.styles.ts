import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const containerCss = css`
  background-color: #313131;
  display: flex;
  width: 19rem;
  height: 20.25rem;
  align-items: flex-start;
  border-radius: 0.25rem;
  margin-bottom: 10rem;
`;

export const imgCss = css`
  width: 18rem;
  height: 13.25rem;
  /* border-radius: 0.25rem; */
  margin-left: 0.5rem;      
  margin-right: 0%.5; 
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  position: 'relative';
`;



export const infoCss = css`
  padding: 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding-left: 0.7rem;
`;

export const infoItemCss = css`
  display: flex;
  align-items: center;
  gap: 0.28125rem;
`;

export const contentCss = css`
  padding-left: 0.1rem;
`;

export const lineCss = css`
  width: 50vw; 
  border: 0.0625rem solid ${Colors['light']['900']};
  margin-top: 0.18rem !important;
  align-self: flex-end;
`;

export const checkboxContainerCss = css`
  width: 1rem;  // 박스 크기
  height: 1rem;
  background-color: ${Colors['primary']['A200']}; // 배경색 설정
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.1rem;  // 둥근 모서리
`;

// 체크 아이콘 스타일
export const checkIconCss = css`
  color: ${Colors['dark']};  // 체크 아이콘 색상
  width: 1.5rem;
  height: 1.5rem;
  
`;

export const titleCss = css`
  padding-left: 0.5rem;
`

export const imgWrapperCss = css`
  position: relative; /* 자식들이 이 요소를 기준으로 배치됨 */
  width: fit-content; /* 이미지 크기와 동일하게 설정 */
`;
export const ratingCss = css`
  position: absolute;
  bottom: 6.3rem;
  left: 0.5rem;
  padding: 0.25rem 0.5rem;
`;