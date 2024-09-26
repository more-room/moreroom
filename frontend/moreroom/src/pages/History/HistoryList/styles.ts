import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const list = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 1rem;
  overflow-y: scroll;
`;
