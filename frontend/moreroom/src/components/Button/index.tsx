/** @jsxImportSource @emotion/react */
import React from 'react';
import { ButtonProps } from './Button.types';
import { base, variantCss } from './Button.styles';

export const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  scale,
  disabled = false,
  fullwidth = false,
  rounded= 0 ,
  ...props
}: ButtonProps) => {
  return <button 
    css = {[
      base(fullwidth, rounded),
      variantCss(variant, color, scale)
    ]}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>;
};
