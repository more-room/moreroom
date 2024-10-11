import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem 1rem;
  background-color: #212121;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 1rem;
`;

export const title = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const info = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const profile = css`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

export const img = css`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  object-fit: cover;
`;

export const rating = css`
  display: flex;
  align-items: center;
  column-gap: 0.125rem;
`;

/* 외부 리뷰 */
export const row = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const center = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 0 0;
`;
