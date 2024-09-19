import { css, SerializedStyles} from '@emotion/react';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';
import { Colors, MainColors } from '../../styles/globalStyle';
import { number } from 'prop-types';

export const base = (
  // color: Palette,
  // fill: Palette,
  border: number,
  size: number,
  weight: FontWeight,
  selected: boolean,
  scale?: ColorScale,
  borderRadius?: number,
  
  
) => css`
  
  // color: ${selected ? Colors['primary']['50'] : Colors['grey']['300']}
  color: ${selected ? Colors['primary']['A200'] : Colors['grey']['500']};
  background-color: ${selected ? Colors['primary']['50'] : 'transparent'};
  font-size: ${size}rem;
  font-weight: ${weight};
  border-radius: ${borderRadius}rem;
  border: ${selected ? `${border}rem` : `0.1rem solid ${Colors['grey']['500']}` }
  
  
`;
