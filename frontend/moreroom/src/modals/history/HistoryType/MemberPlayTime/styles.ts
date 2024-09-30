import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  flex: 1;
  justify-content: center;
  margin-top: 2rem;
`;

export const row = (gap: number) => css`
  display: flex;
  align-items: center;
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

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
