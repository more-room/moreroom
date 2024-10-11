/** @jsxImportSource @emotion/react */
import React from 'react';
import { base } from './StarPoint.styles';
import { StarPointProps } from './StarPoint.types';
import { StarIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

export const StarPoint = ({
  color = 'primary',
  scale,
  iconSize = 1,
  numberSize = 1,
  children = '3.8',
  ...props
}: StarPointProps) => {
  return (
    <div css={base} {...props}>
      <Icon
        size={iconSize}
        color={color}
        scale={scale}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StarIcon />
      </Icon>
      <Typography size={numberSize} color={color} scale={scale} weight={400}>
        {Number(children).toFixed(1)}
      </Typography>
    </div>
  );
};
