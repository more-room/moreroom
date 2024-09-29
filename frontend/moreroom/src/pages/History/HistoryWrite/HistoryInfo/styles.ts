import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background-color: #212121;
`;

export const row = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const item = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.25rem;
`;
