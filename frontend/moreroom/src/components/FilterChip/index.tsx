/** @jsxImportSource @emotion/react */
import React from 'react';
import { base } from './FilterChip.styles';
import { FilterChipProps } from './FilterChip.types';

export const FilterChip = ({
  color = 'primary',
  size = 1,
  rounded = false,
  selected = false,
  onHandleClick = () => console.log('hello'),
  children = 'text',
  ...props
}: FilterChipProps) => {
  return (
    <div
      css={base(color, size, rounded, selected)}
      onClick={onHandleClick}
      {...props}
    >
      {children}
    </div>
  );
};
