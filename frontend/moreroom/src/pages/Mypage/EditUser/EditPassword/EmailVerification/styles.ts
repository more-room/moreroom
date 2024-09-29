import { css } from "@emotion/react";

export const codeInputCss = (step: number) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.5rem;
  margin-top: 0.5rem;

  ${step < 1 &&
  css`
    display: none;
  `}
`;

export const nextStepBtnCss = (step: number) => css`
  margin-top: 0.5rem;
  ${step < 2 &&
  css`
    display: none;
  `}
`;
