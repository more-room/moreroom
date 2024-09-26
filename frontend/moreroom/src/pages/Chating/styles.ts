import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const container = css`
  max-width: 22.5rem; /* 360px를 rem 단위로 변경 (360px / 16px = 22.5rem) */
  margin: 0 auto;
  padding: 0.625rem; /* 10px을 rem 단위로 변경 */
  padding-left: 1rem;  /* 왼쪽에 여백 추가 */
  padding-right: 1rem; /* 오른쪽에 여백 추가 */
  background-color: #313131; /* 배경 색 설정 */
  min-height: 100vh; /* 화면을 채우도록 설정 */
`;

export const cardcontainer = css`
  width: 100%;  /* 카드의 너비를 전체 컨테이너에 맞추기 */
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
  width: 94%; /* 카드가 화면 크기에 맞게 조절되도록 */
  height: auto;
  max-width: 22.5rem; /* 최대 너비를 360px에 맞춤 */
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
`;

export const filterContainer = css`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem; /* 필터 버튼과 카드 사이 여백 */
`;

export const chipstyle = css`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.75rem; /* 칩 텍스트 크기 줄이기 */
  padding: 0.25rem 0.35rem !important;
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
  max-width: 22.5rem; /* 컨테이너와 동일한 최대 너비 */
  margin: 0 auto; /* 중앙 정렬 */
  background-color: ${Colors['grey']['900']}; /* 바텀바 배경색 */
  z-index: 1000; /* 다른 요소 위에 위치 */
  padding: 0.25rem; /* 바텀바 안의 패딩 */
`
