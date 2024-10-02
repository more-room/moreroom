import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const posters = css`
  width: 100%;
  height: 15rem;
  object-fit: cover;
`;

export const description = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin-top: 1rem;
  background-color: #212121;
`;
