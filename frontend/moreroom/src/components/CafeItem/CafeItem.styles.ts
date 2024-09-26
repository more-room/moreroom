import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const base = css`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  background-color: #313131;
`;

export const img = css`
  width: 5rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const info = (onList: boolean) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${onList ? 'center' : 'space-between'};
  ${onList &&
  css`
    border-bottom: 0.0625rem solid ${Colors['grey']['900']};
  `};
`;

export const title = (onList: boolean) => css`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  ${!onList &&
  css`
    margin-top: 0.5rem;
  `}
`;

export const cafename = (onList: boolean) => css`
  ${!onList &&
  css`
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
  `}
`;
