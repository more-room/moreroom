import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const container = css`
  max-width: 640px;
  margin: 0 auto;
  padding: 10px;
  background-color: ${Colors['grey']['900']}; /* 배경 색 설정 */
  min-height: 100vh; /* 화면을 채우도록 설정 */
`;

export const themeCard = css`
  display: flex;
  align-items: center; /* 아이템을 위쪽으로 맞춰 정렬 */
  background-color: ${Colors['grey']['800']}; /* 카드 배경 색 */
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 2rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 95%; /* 카드가 전체 폭을 차지하도록 설정 */
`;

export const posterImage = css`

  width: 40%; 
  min-width: 140px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1rem; /* 이미지와 텍스트 사이 여백을 줄임 */
`;

export const cardContent = css`
  width: 35%;
  min-width: 130px;
  height: auto;
  
  color: ${Colors['grey']['300']}; /* 텍스트 색 */
`;

export const themeTitle = css`
  
  font-weight: bold;
  margin-bottom: 2px; /* h3과 h4 사이의 간격을 줄임 */
`;

export const themeDetails = css`
  margin-top: 4px; /* 위쪽 간격 줄이기 */
  color: ${Colors['grey']['500']}; /* 서브 텍스트 색 */
 
  p {
    margin: 0.125rem 0; /* 각 줄 간격을 최소화 */
  }
`;

export const filterContainer = css`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px; /* 필터 버튼 아래 여백 */
`;

export const filterButton = (isSelected: boolean) => css`
  padding: 8px 16px;
  border-radius: 0.5rem;
  border: ${isSelected ? '1px solid #e040fb' : 'none'}; /* 선택 시 테두리 추가 */
  background-color: ${isSelected ? 'transparent' : Colors['grey']['700']}; /* 선택되지 않았을 때 배경색 */
  color: ${isSelected ? Colors['grey']['300'] : Colors['grey']['300']};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${Colors['primary']['800']};
  }

  svg {
    color: ${isSelected ? Colors['primary']['500'] : Colors['grey']['300']}; /* 아이콘 색상 변경 */
  }
`;
export const iconcolors = css`
  color: ${Colors['primary']['A200']};
`
export const chipstyle = css`
  display: flex;
    gap: 0.5rem; /* Chip 사이에 여백 추가 */
    margin-top: 1rem; /* 위쪽과 여백 추가 */
    
`