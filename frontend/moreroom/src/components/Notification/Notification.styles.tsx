import { css } from '@emotion/react';

export const base = css`
  position: relative;
  width: 70%;
  height: 15%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #313131;
`;

export const btnCss = css`
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
`;

export const btnContainerCss = css`
  display: flex;
  justify-content: center;
  position: absolute; 
  margin: 0 1.5rem;
  gap: 1rem;
  bottom: 1.5rem;
  left: 0;
  right: 0;
`;
