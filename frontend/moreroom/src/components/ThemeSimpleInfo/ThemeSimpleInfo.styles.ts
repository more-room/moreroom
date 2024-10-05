import { css } from '@emotion/react';

export const base = css`
  max-width: 5.625rem;
  background-color: #313131;
`;

export const imgCss = (imgErr: boolean) => css`
  width: 5.625rem;
  height: 7rem;
  border-radius: 0.25rem;

  ${imgErr &&
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: #212121;
  `}
`;

export const title = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
