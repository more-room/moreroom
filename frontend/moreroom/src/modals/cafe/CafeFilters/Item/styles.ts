import { css } from '@emotion/react';
import { Colors } from '../../../../styles/globalStyle';

export const container = (fullWidth: boolean, selected: boolean) => css`
  padding: 0.5rem ${fullWidth ? 0 : 1}rem;
  background-color: ${selected
    ? Colors['primary']['50']
    : Colors['grey']['800']};
  border-radius: 0.5rem;

  ${fullWidth &&
  css`
    width: 100%;
  `}
`;
