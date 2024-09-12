/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { BottomBarProps } from './BottomBar.types';
import { containerCss } from './BottomBar.styles';
import { IconTypoMenu } from '../IconTextMenu';
import BellIcon from '@heroicons/react/24/solid/BellIcon';

export const BottomBar = ({
  children,
  icons = [<BellIcon />, <BellIcon />, <BellIcon />],
  menus = ['메뉴1', '메뉴2', '메뉴3'],
  defaultSelect,
  onHandleChange,
}: BottomBarProps) => {
  const [curMenu, setCurMenu] = useState<number>(
    defaultSelect ? defaultSelect : 0,
  );

  const handler = (menu: number) => {
    onHandleChange(menu);
    setCurMenu(menu);
  };
  return (
    <div css={containerCss}>
      {icons.map((icon, idx) => {
        return (
          <div key={idx} onClick={() => handler(idx)}>
            <IconTypoMenu
              key={idx}
              icon={icon}
              menu={menus[idx]}
              selected={curMenu === idx}
            />
          </div>
        );
      })}
    </div>
  );
};
