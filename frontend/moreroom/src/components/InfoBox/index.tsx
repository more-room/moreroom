/** @jsxImportSource @emotion/react */
import React, {Children} from 'react';
import { base } from './InfoBox.styles';
import { InfoBoxProps } from './InfoBox.types';

export const InfoBox = ({
  color = 'primary',
  weight = 400,
  scale,
  size = 1,
  borderRadius = 0.5,
  children = 'text',
  ...props
}: InfoBoxProps) => {
  return (
    <div css={base( color, scale, size, weight, borderRadius)} {...props}>
      {children}
    </div>
  )
}