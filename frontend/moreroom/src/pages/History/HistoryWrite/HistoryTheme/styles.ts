import { css } from '@emotion/react';

export const container = (themeSelected: boolean) => css`
  width: 100%;
  height: ${themeSelected ? '15rem' : '12rem'};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #212121;
`;

export const poster = (imgErr: boolean) => css`
  width: 100%;
  height: 15rem;
  object-fit: cover;

  ${imgErr &&
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.25rem;
    background-color: #212121;
  `}
`;

export const btn = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
`;

export const themebox = css`
  width: 100%;
  height: fit-content;
`;

export const info = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  background-color: #212121;
`;

export const row = css`
  display: flex;
  align-items: end;
  column-gap: 0.25rem;
`;
