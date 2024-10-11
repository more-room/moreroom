import { css } from '@emotion/react';
import { Colors } from '../../../../styles/globalStyle';

export const container = (isMine: boolean) => css`
  width: 100%;
  display: flex;

  ${isMine
    ? css`
        justify-content: end;
      `
    : css`
        align-items: center;
        column-gap: 0.5rem;
      `}
`;

export const bubble = (isMine: boolean) => css`
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${isMine ? Colors['primary']['A700'] : 'white'};
`;

export const profile = css`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  object-fit: contain;
`;
