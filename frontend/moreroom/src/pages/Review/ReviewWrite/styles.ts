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

export const ratingcss = css`
   display: flex;
   justify-content: center;
   align-items: center;
`
// export const themeCardStyles = css`
//   display: flex;
//   align-items: center;
//   background-color: ${Colors['grey']['800']}; /* 다크 배경색 */

//   margin: 1rem 0;
//   border-radius: 10px;
  
//   width: 100%;
//   max-width: 600px;
//   `

export const themeCardStyles = css`
display: flex;
align-items: center;
background-color: #2c2c2e;
padding: 1rem;
margin: 1rem 0;
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
width: 100%;
max-width: 600px;

.theme-img {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 1rem;
  object-fit: cover;
}

.theme-content {
  display: flex;
  flex-direction: column;
  color: #ffffff;

  .theme-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .theme-info {
    font-size: 0.875rem;
    color: #b0b0b0;
  }

  .theme-review {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    .review-star {
      color: #ffc107;
      margin-right: 0.25rem;
    }

    .review-count {
      font-size: 0.875rem;
      color: #b0b0b0;
    }
  }
}
`;
