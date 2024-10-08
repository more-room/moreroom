import { css } from '@emotion/react';

export const container = css`
  position: relative;
  width: 100%;
  height: 15rem;
  display: flex;
  align-items: end;
`;

export const poster = (imgErr: boolean) => css`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;

  ${imgErr &&
  css`
    box-sizing: border-box;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    row-gap: 0.25rem;
    background-color: #313131;
  `}
`;

export const box = css`
  box-sizing: border-box;
  padding: 2rem 1rem 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: black;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 10;
`;

export const info = css`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
`;

export const row = (gap: number) => css`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: ${gap}rem;
`;

export const empty = css`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  background-color: #424242;
`;
