import { css } from "@emotion/react";
import { Colors, MainColors } from "../../styles/globalStyle";

export const containerCss = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 4rem;
  background-color: ${Colors.grey['300']};
`;


export const activeCss = () => css`

`

export const inactiveCss = () => css`
  /* margin: 0 2rem; */
`