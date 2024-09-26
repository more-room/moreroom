import { css } from '@emotion/react';
import { Colors } from '../../../../styles/globalStyle';

export const titletext = css`
  color: ${Colors['light']['100']};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
`
export const textcolor = css`
  color: ${Colors['light']['100']};
  margin: 1rem;
`

export const infobox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'paperlogy';
  margin-bottom: 1rem;
`
export const buttoncss = css`
  margin: 0 1rem;
  font-weight: 700;
  border: none;
  font-size: 1rem;
`
export const hr = css`
  margin: 1rem 0;
  background-color: ${Colors['grey']['500']};
  height: 1px;
  border: none;

`

export const exitbutton = css`
  border: none;
  background-color: ${Colors['danger']['A200']};
  font-size: 1rem;
  
`