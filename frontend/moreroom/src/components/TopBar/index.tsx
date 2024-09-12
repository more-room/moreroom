/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBarProps } from './TopBar.types';
import { base } from './TopBar.styles';
import { Right } from './Right';
import { Title } from './Title';

export const TopBar = ({
  children,
  bgColor,
  bgColorScale,
  ...props
}: TopBarProps) => {
  return (
    <div css={base(bgColor, bgColorScale)} {...props}>
      {children}
    </div>
  );
};

TopBar.Right = Right;
TopBar.Title = Title;
