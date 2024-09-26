import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  height: 100%;
`;

export const info = css`
  width: fit-content;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  border-radius: 0.5rem;
  background-color: #313131;
  margin-bottom: 11rem;
`;

export const infoBox = css`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const row = css`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  white-space: nowrap;
`;
