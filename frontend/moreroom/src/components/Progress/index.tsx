/** @jsxImportSource @emotion/react */
import React from 'react';
import { ProgressProps } from './Progress.types';
import { base, fillCss, sizeCss, variantCss } from './Progress.styles';

export const Progress = ({
  color = 'primary',
  variant = 'rounded',
  transparentBackground = false,
  size = 'sm',
  value,
  max,
  ...props
}: ProgressProps) => {
  return (
    <div
      css={[base(transparentBackground), sizeCss[size], variantCss[variant]]}
      {...props}
    >
      <div
        css={fillCss(value, max, color)}
      ></div>
    </div>
  );
};
