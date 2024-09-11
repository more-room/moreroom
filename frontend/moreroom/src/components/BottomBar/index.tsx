/** @jsxImportSource @emotion/react */
import React from 'react';
import { BottomBarProps } from './BottomBar.types';
import { containerCss } from './BottomBar.styles';
import { IconTypoMenu } from '../IconTextMenu';
import BellIcon from '@heroicons/react/24/solid/BellIcon';

export const BottomBar = ({
  children,
  icons = [<BellIcon />, <BellIcon />, <BellIcon />],
  menus = ['메뉴1', '메뉴2', '메뉴3'],
  selected = 1,
  onHandleChange,
}: BottomBarProps) => {
  return (
    <div css={containerCss}>
      {icons.map((icon, idx) => {
        return (
          <IconTypoMenu
            key={idx}
            icon={icon}
            menu={menus[idx]}
            selected={selected === idx}
            onClick={() => onHandleChange(idx)}
          />
        );
      })}
    </div>
  );
};
