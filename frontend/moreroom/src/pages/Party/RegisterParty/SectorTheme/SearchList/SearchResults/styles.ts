import { css } from '@emotion/react';
import { Colors } from '../../../../../../styles/globalStyle';

export const listContainer = css`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 1rem;
`;

export const checkboxCss = (isChecked: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 100%;
  border-bottom: 0.0625rem solid ${Colors['grey']['700']};
  background-color: ${isChecked ? Colors['primary']['50'] : undefined};
`;

export const containerCss = css`
  display: flex;
`;

export const btnCss = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px; 
  /* z-index: 1; */
`;
