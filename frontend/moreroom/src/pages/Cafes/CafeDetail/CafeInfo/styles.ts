import { css } from '@emotion/react';

export const info = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem 1rem;
  background-color: #212121;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const row = (gap: number) => css`
  display: flex;
  align-items: center;
  column-gap: ${gap}rem;
`;
