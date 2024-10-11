import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1.5rem;
  margin-top: -2rem;
`;

export const imgCss = css`
  width: 100%;
  height: 8rem;
  object-fit: contain;
`;

export const form = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export const inputbox = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
  border-radius: 0.5rem;
  border: 0.0625rem solid white;
`;

export const input = css`
  width: 100%;
  color: white;
  border: none;
  background-color: transparent;
  outline: none;
`;

export const err = css`
  margin-left: 1rem;
  margin-top: 0.25rem;
`;

export const row = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
