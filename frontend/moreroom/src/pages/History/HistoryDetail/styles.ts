import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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

export const row = css`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  margin: 1rem 0;
`;
