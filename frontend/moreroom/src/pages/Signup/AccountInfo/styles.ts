import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

export const containerCss = css`
  margin: 2rem 1rem;
`;

export const inputCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.6rem;
  margin-top: 1rem;
`;

export const btnCss = css`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 500;
`;

export const iconcolors = css`
  color: ${Colors['primary']['500']};
`;
