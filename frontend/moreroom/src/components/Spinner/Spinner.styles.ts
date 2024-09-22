import { css, keyframes } from "@emotion/react"
import { ColorScale, Palette, Size } from "../../types/globalStyleTypes"
import { Colors, MainColors } from "../../styles/globalStyle";

const width = {
  sm: '1.875rem',
  md: '2.5rem',
  lg: '3.125rem',
  xl: '3.75rem',
};


export const base = (size: Size, color:Palette, scale?:ColorScale) => {
  const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `

  return css`
  width: ${width[size]};
  height: ${width[size]};
  border: 0.5rem solid #ccc;
  border-radius: 50%;
  border-top-color: ${!scale ? MainColors[color] : Colors[color][scale]};
  animation: ${spin} 0.7s linear infinite;
`
}
  
