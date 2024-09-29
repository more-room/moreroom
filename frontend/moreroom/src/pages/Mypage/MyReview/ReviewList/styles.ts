import { css } from '@emotion/react';

export const containerCss = css`
  background-color: #424242;
  width: 100%;
  max-width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
`;

export const contentCss = css`
  flex: 1;
  margin-right: 1rem;
  min-width: 0; // 이것이 중요합니다. flexbox 내에서 자식 요소가 축소되도록 합니다.
`;

export const userInfoCss = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;

export const themeCss = css`
  border-left: 3px solid #666;
  padding-left: 0.4rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const brandCss = css`
  display: flex;
  gap: 0.2rem;
  margin-top: 0.3rem;
`;

export const posterCss = css`
  width: 4rem;
  height: 5rem;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;