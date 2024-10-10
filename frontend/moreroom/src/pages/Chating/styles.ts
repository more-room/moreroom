import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const container = css`
  /* max-width: 22.5rem; 360px를 rem 단위로 변경 (360px / 16px = 22.5rem) */
  margin: 0 0;
  padding: 0.625rem; /* 10px을 rem 단위로 변경 */
  padding-left: 1rem;  /* 왼쪽에 여백 추가 */
  padding-right: 1rem; /* 오른쪽에 여백 추가 */
  background-color: #313131; /* 배경 색 설정 */
`;

export const cardcontainer = css`
  width: 100%;  
  margin-bottom: 0.75rem; /* 카드 간격 줄이기 */
`;

export const topbarcolor = css`
  background-color: #313131;
`

export const themeCard = css`
  
  position: relative;
  display: flex;
  flex-direction: row; /* 가로 정렬 */
  align-items: center;
  background-color: #212121;
  border-radius: 0.3rem;
  padding: 0.625rem;
  margin-bottom: 1rem;
  width: 94%;
  height: auto;
  max-width: 50rem; 
  flex-shrink: 0; 
`;

export const posterImage = css`
  width: 25%; 
  min-width: 95px;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
  margin-right: 0.7rem; /* 10px을 rem 단위로 변경 */
  flex-shrink: 0; /* 이미지가 줄어들지 않도록 설정 */
`;

export const cardContent = css`
  flex-grow: 1;
  color: ${Colors['grey']['300']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.75rem; /* 기본 글씨 크기를 14px로 설정 (rem 단위) */
`;

export const roomname = css`
  margin: 0.4rem 0;
  font-size: 1rem; /* 기본 폰트 크기를 줄임 */
`;



export const themeTitle = css`
  color: ${Colors['light']['100']};
  font-size: 0.8rem; 
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  margin-bottom: 0.3rem;
`;

export const themeDetails = css`
  color: ${Colors['grey']['500']};
  flex-shrink: 0; /* 줄어듦 */

  p {
    margin: 0.125rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.75rem; /* 텍스트 크기를 작게 설정 */
  }
  div {
    display: flex;
    flex-wrap: wrap;  /* 칩들이 가로로 배치되며, 필요하면 다음 줄로 넘어가도록 설정 */
    gap: 0.5rem;  /* 칩 간의 간격 조절 */
    margin-top: 0.5rem;
  }
`;

export const filterContainer = css`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem; /* 필터 버튼과 카드 사이 여백 */
  margin-top: 0.5rem;
`;


export const chipstyle = css`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.35rem !important;
  font-size: 0.75rem;
  gap: 0.5rem;
  margin-top: 0.5rem;
  white-space: nowrap;  /* 칩의 텍스트가 잘리지 않도록 설정 */
`;

export const ellipsisIconWrapper = css`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
`;

export const iconcolors = css`
  color: ${Colors['primary']['A200']};
`;

export const iconcolors2 = css`
  color: ${Colors['light']['200']};
`;

export const filterButton = (isSelected: boolean) => css`
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: ${isSelected ? '1px solid #e040fb' : 'none'};
  background-color: ${isSelected ? 'transparent' : Colors['grey']['700']};
  color: ${Colors['grey']['300']};
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  font-family: 'Paperlogy';
  

  &:hover {
    background-color: ${Colors['primary']['800']};
  }

  svg {
    color: ${isSelected ? Colors['primary']['500'] : Colors['grey']['300']};
  }
`;

export const bottombarcss = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;  /* 바텀바의 너비를 전체 화면에 맞춤 */
  /* max-width: 22.5rem; 컨테이너와 동일한 최대 너비 */
  margin: 0 auto; /* 중앙 정렬 */
  background-color: ${Colors['grey']['900']}; /* 바텀바 배경색 */
  z-index: 1000; /* 다른 요소 위에 위치 */
  padding: 0.25rem; /* 바텀바 안의 패딩 */
  border-top: 1px solid #ffffff;
`
export const posterText = css`
  width: 25%; 
  min-width: 95px;
  height: 17vh;
  border-radius: 0.3rem;
  object-fit: cover;
  margin-right: 0.7rem;
  flex-shrink: 0;
  background-color: #000; /* 검정색 배경 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${Colors['light']};
  
  
`;
