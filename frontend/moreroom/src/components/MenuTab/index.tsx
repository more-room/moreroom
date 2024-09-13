/** @jsxImportSource @emotion/react */
import React, { Children, useState } from 'react';
import { Button } from '../Button';
import { MenuTabProps } from './MenuTab.types';
import { activeCss, containerCss, inactiveCss } from './MenuTab.styles';

export const MenuTab = ({
  children,
  size = 'md',
  variant = 'contained',
  border = 0,
  color = 'primary',
  onChangeMenu,
  ...props
}: MenuTabProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onChangeMenu(index);
  };


  return (
    <div css={containerCss} {...props}>
      <div css={activeCss}></div>
      {React.Children.map(children, (child, index) => (
        <Button css={inactiveCss} onClick={()=>handleTabClick(index)} size={size} color={color}>
          {child}
        </Button>
      ))}
      {/* <Button onClick={() => handleTabClick(index)}></Button> */}
    </div>
  )
}