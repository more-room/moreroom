import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

// 상단 바의 색상
export const topbarcolor = css`
  background-color: #313131;
`;

// 카드 컨테이너 스타일
export const cardcontainer = css`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* 카드 간격을 유지하면서 보기 쉽게 만듦 */
`;

// 개별 카드 스타일
export const themeCard = css`
  position: relative;
  background-color: ${Colors['grey']['800']}; /* 배경색을 조금 더 연하게 하여 가독성 향상 */
  border-radius: 0.5rem; /* 테두리 둥글게 */
  padding: 2%; /* 패딩을 카드 크기에 따라 유동적으로 조정 */
  margin-bottom: 1rem;
  margin-left: 0.8rem;
  width: 90%;
  max-width: 95%;
  height: auto;
  flex-shrink: 0;
  color: ${Colors['light']['200']}; /* 글자 색을 더 가독성 좋게 흰색으로 */
  border: none;

  & > div {
    margin-bottom: 0.5rem; /* 카드 안의 요소 간의 간격을 비율로 설정 */
  }

  .header {
    display: flex;
    justify-content: space-between; /* 양쪽 끝으로 배치 */
    align-items: center;
    margin-bottom: 2%; /* 상단 프로필 정보와 리뷰 내용을 분리 */
  }

  .rating-container {
    display: flex;
    align-items: center;
    
  }

  .profile-container {
    display: flex;
    align-items: center;
  }

  .profile {
    width: 10%; /* 카드의 너비에 비례하는 크기 */
    max-width: 3rem; /* 최대 크기를 제한 */
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .review-content {
    margin-top: 1rem;
    font-size: 0.9em; /* 부모 크기에 비례한 폰트 크기 */
  }

  .footer {
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    font-size: 0.85em;
  }

  .thumbs-up {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
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
  background-color: #313131; /* 바텀바 배경색 */
  z-index: 1000; /* 다른 요소 위에 위치 */
  padding: 0.25rem; /* 바텀바 안의 패딩 */
  border-top: 1px solid #ffffff;
  
`
export const allViewButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 10%;
`

export const averageRating = css`
  text-align: left;
  align-items: left;
  margin: 1rem;
`

export const reviewWrite = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin: 0 65%;
`