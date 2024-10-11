import { css } from '@emotion/react';

export const base = (opacity: number, blur: number) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 50;
  background-color: rgba(0, 0, 0, ${opacity / 100});
  backdrop-filter: blur(${blur / 10}px);
`;
