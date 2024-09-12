/** @jsxImportSource @emotion/react */
import React from 'react';
import { Icon } from '../../Icon';
import { BellIcon } from '@heroicons/react/24/outline';
import { RightProps } from './Right.types';

export const Right = ({
  icon = <BellIcon />,
  handler = () => console.log('right icon click'),
  ...props
}: RightProps) => {
  return (
    <Icon size={1.5} color="light" onClick={handler} {...props}>
      {icon}
    </Icon>
  );
};
