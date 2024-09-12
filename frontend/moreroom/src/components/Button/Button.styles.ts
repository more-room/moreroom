import {css} from '@emotion/react'
import { ColorScale, Palette } from '../../types/globalStyleTypes'
import { Colors, MainColors } from '../../styles/globalStyle'
import { ButtonVariant } from './Button.types'

export const base = (fullwidth:boolean) => css`
  box-sizing: border-box;
  transition: all 100ms ease;
  user-select: none;
  padding: 0.55rem 1rem;


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

export const variantCss = (variant: ButtonVariant, color: Palette, scale?: ColorScale) => {
  switch (variant) {
    case 'contained':
      return css`
        background-color: ${!scale ? MainColors[color] : Colors[color][scale]};
        color: white;
        border : 2px solid ${!scale ? MainColors[color] : Colors[color][scale]};

        :enabled {
          :active {
            background-color: ${Colors[color]['A100']};
            border: 2px solid ${Colors[color]['A100']};
          }
        }

        :disabled {
          background-color: ${Colors[color]['200']};
          border: 2px solid ${Colors[color]['200']};
        }
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        color: ${!scale ? MainColors[color] : Colors[color][scale]};
        border: 2px solid ${!scale ? MainColors[color] : Colors[color][scale]};

        :enabled {
          :active {
            border: 2px solid ${Colors[color]['A100']};
          }
        }

        :disabled {
          color: 2px solid ${Colors[color]['200']};;
          border: 2px solid ${Colors[color]['200']};
        }
      `;
    default:
      return css``;
  }
};
