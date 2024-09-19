import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const base = css`
  background-color: #313131;
  display: flex;
  align-items: center;
  padding: 0.375rem;
`;

export const imgCss = css`
  width: 5rem;
  height: 6.25rem;
`

export const brandCss = css`
  color: ${Colors['grey']['500']};
  font-size: 0.625rem;
  font-weight: 600;
`

export const titleCss = css`
  color:#fff;
  font-size: 1rem;
  font-weight: 700;
  padding-left: 0.55rem;
`

export const contentCss = css`
  color: ${Colors['grey']['500']};
  font-size: 0.76rem;
  font-weight: 400;
  padding-top: 0.375rem;
  padding-left: 0.55rem;
`