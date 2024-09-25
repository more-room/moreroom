import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 2rem;
`;

export const regionContainer = css`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  white-space: nowrap;
  overflow-x: scroll;
`;

export const items = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;
