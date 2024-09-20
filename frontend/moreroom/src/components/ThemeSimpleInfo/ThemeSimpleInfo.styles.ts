import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const base = css`
  background-color: #313131;
  width: fit-content;
`;

export const imgCss = css`
  width: 5.625rem;
  height: 7rem;
  border-radius: 0.25rem;
`

export const titleCss = css`
  color: #fff;
  font-size: 1rem;
  font-weight: 900;
`

export const genreCss = css`
  color: ${Colors['grey']['500']};
  font-size: 0.625rem;
  font-weight: 400;
  margin-top: 0.1rem;
`