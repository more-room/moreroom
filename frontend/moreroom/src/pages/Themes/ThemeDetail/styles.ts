import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const posters = (imgErr: boolean) => css`
  width: 100%;
  height: 15rem;

  ${imgErr
    ? css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 0.25rem;
        background-color: #313131;
      `
    : css`
        object-fit: cover;
      `}
`;

export const description = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin-top: 1rem;
  background-color: #212121;
`;
