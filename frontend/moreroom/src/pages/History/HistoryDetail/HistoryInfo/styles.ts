import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
  background-color: #212121;
`;

export const item = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.25rem;
`;
