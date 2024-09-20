/** @jsxImportSource @emotion/react */
import React from 'react';
import { SpinnerProps } from './Spinner.types';

export const Spinner = ({
  size = 'md',
  color = 'primary',
  scale = '700',
  ...props
}: SpinnerProps) => {
  return (
    <div {...props}></div>
  );
  
};
