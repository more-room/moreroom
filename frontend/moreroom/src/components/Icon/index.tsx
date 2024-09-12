/** @jsxImportSource @emotion/react */
import React from 'react';
import { base } from './Icon.styles';
import { IconProps } from './Icon.types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';

export const Icon = ({
  color = 'primary',
  scale,
  size = 1,
  children = <BellIcon />,
  ...props
}: IconProps) => {
  return (
    <div css={base(color, size, scale)} {...props}>
      {children}
    </div>
  );
};
