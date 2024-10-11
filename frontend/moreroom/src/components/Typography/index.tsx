/** @jsxImportSource @emotion/react */
import React from 'react';
import { base } from './Typography.styles';
import { TypographyProps } from './Typography.types';

export const Typography = ({
  color = 'primary',
  scale,
  size = 1,
  weight = 700,
  children = 'Typography',
  ...props
}: TypographyProps) => {
  return (
    <div css={base(color, size, weight, scale)} {...props}>
      {children}
    </div>
  );
};
