import { css } from '@emotion/react';
import { Colors } from '../../../../styles/globalStyle';

export const containerCss = css`
  background-color: #424242;
  width: 100%;
  max-width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const headerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const leftContentCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

export const profileCss = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;

export const themeCss = css`
  padding-left: 0.5rem;
  border-left: 0.3rem solid ${Colors['grey']['700']};
`;

export const brandCss = css`
  display: flex;
  gap: 0.2rem;
  margin-top: 0.3rem;
  align-items: center;
`;

export const posterCss = css`
  width: 4rem;
  height: 5rem;
  flex-shrink: 0;
  overflow: hidden;
  margin-left: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const errorimg = css`
  width: 4rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.25rem;
  margin-bottom: 0.25rem;
  background-color: #212121;
`;

export const contentCss = css`
  width: 100%;
  display: flex;
  margin-bottom: 0.3rem;
`;

export const updatedAtCss = css`
  margin-top: 0.3rem;
`;

export const fixReview = css`
  padding: 0.5rem 1rem;
  font-family: 'paperlogy';
  background-color: ${Colors['secondary']};
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;

export const btnCss = css`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 1rem; /* 삭제하기와 리뷰 수정 버튼 사이 간격 */
  margin-top: 0.5rem;
`
