import { css } from '@emotion/react';
import { Colors, MainColors } from '../../styles/globalStyle';
import { TDate } from './Date.types';

export const base = (selected: boolean) => css`
  flex: 1;
  max-width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;

  ${selected &&
  css`
    background-color: ${Colors['grey']['900']};
  `}
`;

export const hasContentsCss = (type: TDate) => css`
  width: 50%;
  max-width: 1rem;
  height: 0.125rem;
  margin-top: 0.125rem;
  background-color: ${type === 'disable'
    ? Colors['primary']['200']
    : MainColors['primary']};
`;
