import {SerializedStyles, css, Theme} from '@emotion/react'
import { Palette } from '../../types/globalStyleTypes'
import { Colors, MainColors } from '../../styles/globalStyle'
import { ButtonVariant } from './Button.types'

export const base = (fullwidth:boolean) => css`
  box-sizing: border-box;
  border: 0;
  transition: all 100ms ease;
  user-select: none;

  :enabled {
    cursor: pointer;
  }

  :disabled {
    cursor: default;
  }

  ${fullwidth && 
  css`
    width: 100%;
  `}
`

// export const variantCss:Record<ButtonVariant, (color:Palette, theme:Theme, palette:Palette) => SerializedStyles> = {
//   contained: (theme:Theme, palette:Palette) => css`
  
//   `,
//   outlined: (theme: Theme, palette: Palette) => css`
  
//   `
// }

export const variantCss = (variant:ButtonVariant, color:Palette) => css`
  color: ${MainColors[color]};
  
`