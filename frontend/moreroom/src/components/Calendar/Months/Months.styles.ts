import { css } from '@emotion/react';
import { MainColors } from '../../../styles/globalStyle';

export const base = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  text-align: center;
`;

export const box = (selected: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.5rem;

  ${selected &&
  css`
    background-color: ${MainColors['primary']};
  `};
`;
