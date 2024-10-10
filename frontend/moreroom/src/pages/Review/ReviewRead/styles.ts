import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

// 상단 바의 색상
export const topbar = css`
  position: sticky; /* 스크롤할 때 화면 상단에 고정 */
  top: 0; /* 최상단 위치 */
  z-index: 20; /* themeItemCss보다 위에 위치하도록 z-index 설정 */

  /* 박스 그림자와 모서리 둥글게 하여 부드러운 효과 추가 */
  box-shadow:
    0 0.25rem 0.375rem rgba(0, 0, 0, 0.1),
    0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.06);

  /* 부드러운 전환을 위한 트랜지션 추가 */
  transition: all 0.3s ease-in-out;

  /* 스크롤되면서 스타일이 변경되는 효과 추가 */
  &:hover {
    box-shadow:
      0 0.375rem 0.625rem rgba(0, 0, 0, 0.15),
      0 0.1875rem 0.375rem rgba(0, 0, 0, 0.1);
    transform: scale(1.02); /* 살짝 커지는 느낌 */
  }
`;

export const themeitem = css`
  position: sticky;
  top: 2.5rem; /* 탑바 아래에 위치하도록 top을 조절 */
  z-index: 10; /* 탑바 아래에 위치하도록 z-index 설정 */
  padding: 1rem;

  /* 박스 그림자와 모서리 둥글게 하여 부드러운 효과 추가 */
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.06);

  /* 부드러운 전환을 위한 트랜지션 추가 */
  transition: all 0.3s ease-in-out;

  /* 스크롤되면서 작아지거나 스타일이 변경되는 효과 추가 */
  &:not(:first-of-type) {
    transform: scale(0.98); /* 살짝 축소된 느낌 */
    opacity: 0.99;
  }

  /* 스크롤이 내려가면서 고정되기 전 점진적인 변화 */
  &:hover {
    box-shadow:
      0 6px 10px rgba(0, 0, 0, 0.15),
      0 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

/* 리뷰 분포 컨테이너 */
export const reviewchart = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

/* row */
export const row = (gap: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: ${gap}rem;
`;

// 카드 컨테이너 스타일
export const cardcontainer = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* 카드 간격을 유지하면서 보기 쉽게 만듦 */
`;

// 개별 카드 스타일
export const themeCard = css`
  background-color: ${Colors['grey'][
    '800'
  ]}; /* 배경색을 조금 더 연하게 하여 가독성 향상 */
  border-radius: 0.5rem; /* 테두리 둥글게 */
  height: auto;
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
  width: 100%; /* 바텀바의 너비를 전체 화면에 맞춤 */
  /* max-width: 22.5rem; 컨테이너와 동일한 최대 너비 */
  margin: 0 auto; /* 중앙 정렬 */
  background-color: #313131; /* 바텀바 배경색 */
  z-index: 1000; /* 다른 요소 위에 위치 */
  padding: 0.25rem; /* 바텀바 안의 패딩 */
  border-top: 1px solid #ffffff;
`;

export const averageRating = css`
  text-align: left;
  align-items: left;
  margin: 1rem;
`;

export const allViewButton = css`
  position: relative;
  margin: 0.5rem auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  background-color: #ff00ff; /* 강조색을 추가하여 보기 쉽게 */
  padding: 0.5rem 1rem;
`;

export const reviewWrite = css`
  position: fixed; /* 스크롤 시에도 고정된 위치에 */
  right: 1rem; /* 화면의 오른쪽에서 2rem 떨어진 위치 */
  bottom: 2rem; /* 바텀바 바로 위에 위치 */
  width: 3.5rem; /* 버튼의 크기 */
  height: 3.5rem; /* 버튼의 크기 */
  border-radius: 50%; /* 원형으로 만들기 */
  background-color: ${Colors['secondary']['200']}; /* 눈에 띄는 색상 */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 버튼에 입체감을 주기 위한 그림자 */
  z-index: 1100; /* 다른 요소들보다 앞에 위치하게 설정 */
  color: #fff; /* 아이콘 색상을 흰색으로 설정 */
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1); /* 마우스 호버 시 살짝 커지는 효과 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자가 강조됨 */
  }
`;

export const excontainer = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const excard = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${Colors['grey']['800']};
`;

export const exrow = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
