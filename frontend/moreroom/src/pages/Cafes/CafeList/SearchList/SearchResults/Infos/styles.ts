import { css } from '@emotion/react';

export const container = (onList: boolean) => css`
  width: 100%;
  height: fit-content;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${onList &&
  css`
    max-height: 70%;
  `}
  position: absolute;
  bottom: 0;
`;

export const btn = css`
  width: fit-content;
  padding: 0.5rem 1rem;
  background-color: #313131;
  border-radius: 2rem;
  font-family: 'Paperlogy';
`;

export const box = (onList: boolean) => css`
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 1rem;
  margin-top: 1rem;
  overflow-y: scroll;
  background-color: #313131;
  border-radius: 1rem 1rem 0 0;
  ${onList &&
  css`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  `};
`;
