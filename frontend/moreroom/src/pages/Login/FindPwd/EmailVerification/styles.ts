import { css } from "@emotion/react";

export const nextStepBtnCss = (step: number) => css`
  margin-top: 0.5rem;
  ${step < 1 &&
  css`
    display: none;
  `}
`;
