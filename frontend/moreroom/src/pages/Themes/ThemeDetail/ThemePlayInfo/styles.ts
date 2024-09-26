import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  box-sizing: border-box;
  padding: 2rem 0;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  background-color: #212121;
`;

export const row = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const item = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.25rem;
`;
