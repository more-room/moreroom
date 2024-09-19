/** @jsxImportSource @emotion/react */
import React, {Children} from 'react';
import { base } from './InfoBox.styles';
import { InfoBoxProps } from './InfoBox.types';
import { number } from 'prop-types';

export const InfoBox = ({
  color = 'primary',
  fontSize = number,
  fontWeight = 400,
  scale,
  size = 1,
  borderRadius = 0.5,
  children = 'text',
  ...props
}: InfoBoxProps) => {
  return (
    <span css={base( color, scale, size, fontSize, fontWeight, borderRadius)} {...props}>
      {children}
    </span>
  )
}