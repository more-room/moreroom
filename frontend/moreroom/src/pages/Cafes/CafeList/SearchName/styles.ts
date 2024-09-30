import { css } from '@emotion/react';
import { Colors } from '../../../../styles/globalStyle';

export const nameContainer = css`
  width: 100%;
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background-color: ${Colors['grey']['900']};
`;
