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

export const map = css`
  width: 100%;
  height: 15rem;
  border-radius: 0.5rem;
  background-color: #313131;
`;

export const row = css`
  width: 100%;
  display: flex;
  align-items: start;
  column-gap: 0.5rem;
`;
