/** @jsxImportSource @emotion/react */
import React from 'react';
import { toggle } from './Toggle.styles';
import { ToggleProps } from './Toggle.types';

export const Toggle = ({
  isOn = true,
  color = 'primary',
  scale,
  size = 2.5,
  children,
  ...props
}: ToggleProps) => {
  return (
    <div css={toggle(isOn, color, scale, size)} {...props}>
      
    </div>
  );
};