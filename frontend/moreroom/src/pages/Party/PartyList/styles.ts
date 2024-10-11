import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

export const containerCss = css`
  /* background-color: #424242;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  padding: 3.75rem;
  gap: 0.5rem; */
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const backdropCss = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;