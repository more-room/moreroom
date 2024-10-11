import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background-color: #212121;
`;

export const title = (memberFlag: boolean = false) => css`
  ${memberFlag &&
  css`
    display: flex;
    align-items: end;
    justify-content: space-between;
  `}
`;

export const rating = css`
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
`;
