/** @jsxImportSource @emotion/react */
import React from 'react';
import { ButtonProps } from './Button.types';
import { base, variantCss } from './Button.styles';

//  children: ReactNode;
// variant?: ButtonVariant;
// color?: Palette;
// disabled?: boolean;
// fullwidth?: boolean;

export const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  scale,
  disabled = false,
  fullwidth = false,
  ...props
}: ButtonProps) => {
  return <button 
    css = {[
      base(fullwidth),
      variantCss(variant, color, scale)
    ]}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>;
};
