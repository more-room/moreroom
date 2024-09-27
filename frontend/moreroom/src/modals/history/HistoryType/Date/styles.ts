import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
`;

export const row = (gap: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: ${gap}rem;
`;

export const input = css`
  width: fit-content;
  background-color: transparent;
  border: none;
  border-bottom: 0.0625rem solid white;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  text-align: center;
`;
