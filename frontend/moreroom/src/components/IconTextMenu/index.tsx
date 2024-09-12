/** @jsxImportSource @emotion/react */
import React from 'react';
import { IconTypoMenuProps } from './IconTypoMenu.types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import { containerCss } from './IconTypoMenu.styles';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

export const IconTypoMenu = ({
  children,
  icon = <BellIcon />,
  menu = '메뉴',
  selected = false,
  ...props
}: IconTypoMenuProps) => {
  return (
    <div css={containerCss} {...props}>
      <Icon size={1.5} color={selected ? 'primary' : 'grey'}>
        {icon}
      </Icon>
      <Typography
        size={0.75}
        color={selected ? 'primary' : 'grey'}
        weight={selected ? 700 : 400}
      >
        {menu}
      </Typography>
      {children}
    </div>
  );
};
