import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 2rem;
  overflow-y: scroll;
`;

export const regionContainer = css`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  white-space: nowrap;
  overflow-x: scroll;
  min-height: fit-content;
`;

export const item = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const items = css`
  overflow-y: scroll;
  gap: 1rem;
  padding-bottom: 1rem;
`;
