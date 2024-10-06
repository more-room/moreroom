import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const base = css`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  background-color: #313131;
`;

export const img = (imgErr: boolean) => css`
  min-width: 5rem;
  max-width: 5rem;
  height: 6.5rem;
  border-radius: 0.5rem;

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

export const info = (onList: boolean) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.5rem;

  ${onList &&
  css`
    border-bottom: 0.0625rem solid ${Colors['grey']['900']};
  `};
`;

export const title = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
`;

export const cafename = css`
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
`;
