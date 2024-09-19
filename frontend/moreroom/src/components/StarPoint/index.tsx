/** @jsxImportSource @emotion/react */
import React, { Children } from 'react';
import { base } from './StarPoint.styles';
import { StarPointProps } from './StarPoint.types';
import { StarIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';

export const StarPoint = ({
  color = 'primary',
  scale,
  size = 4,
  children = '3.8',
  ...props
}: StarPointProps) => {
  return (
    <div css={base(color, size, scale)} {...props} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
      <Icon  size={size * 0.375} color={color} scale={scale} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}> 
        <StarIcon/>
      </Icon>
        <span style={{ fontSize: `${size * 0.3}rem` }}>{children}</span>
      
    </div>
  );
};