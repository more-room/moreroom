/** @jsxImportSource @emotion/react */
import React, { Children } from 'react';
import { base } from './FilterChip.styles'
import { FilterChipProps } from './FilterChip.types';

export const FilterChip = ({
  // color = 'primary',
  // fill = 'secondary',
  border = 0,
  weight = 400,
  selected = false,
  scale,
  size = 1,
  borderRadius = 0.5,
 
  children = 'text',
  ...props
}: FilterChipProps) => {
  return (
    <button css={base( border, size, weight, selected, scale, borderRadius)} {...props}>
      {children}
    </button>
  );
};