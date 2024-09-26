import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem 1rem;
  margin-top: 1rem;
  background-color: #212121;

  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const list = css`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  overflow-x: scroll;
`;

export const row = css`
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
  margin-top: 0.25rem;
`;
