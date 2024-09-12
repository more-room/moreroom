import { css } from '@emotion/react';

export const base = (opacity: number, blur: number) => css`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: rgba(0, 0, 0, ${opacity / 100});
  backdrop-filter: blur(${blur / 10}px);
`;
