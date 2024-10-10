import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';


export const largeBox = css`
  margin-top: 3rem;
  

`
export const topbarcolor = css`
  position: sticky;  /* 스크롤할 때 화면 상단에 고정 */
  top: 0;            /* 최상단 위치 */
  z-index: 1000;       /* themeItemCss보다 위에 위치하도록 z-index 설정 */
  background-color: #313131;
  padding: 1rem;
  
  /* 박스 그림자와 모서리 둥글게 하여 부드러운 효과 추가 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);

  /* 부드러운 전환을 위한 트랜지션 추가 */
  transition: all 0.3s ease-in-out;

  /* 스크롤되면서 스타일이 변경되는 효과 추가 */
  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
    transform: scale(1.02); /* 살짝 커지는 느낌 */
  }
`;



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
background-color: #313131;
padding: 0.5rem;
margin: 0 0;
border-radius: 10px;
width: 100%;
max-width: 600px;

.theme-img {
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
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
    color: ${Colors['grey']['800']};
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

export const btncss = css`
width: 70%;
margin: 2rem auto;
font-family: 'paperlogy';
display: flex; 
justify-content: center; 
align-items: center;
`