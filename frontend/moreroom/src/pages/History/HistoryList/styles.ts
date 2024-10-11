import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const list = css`
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem 0;

  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin: 1rem 0;
  overflow-y: scroll;
`;

export const empty = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
  align-items: center;
`;
