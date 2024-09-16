/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button } from '../Button';
import { MenuTabProps } from './MenuTab.types';
import { activeCss, containerCss, inactiveCss, variantCss } from './MenuTab.styles';


export const MenuTab = ({
  children,
  variant = 'contained',
  border = 0,
  color = 'primary',
  fontSize = 1,
  fontWeight = 500,
  onChangeMenu = () => {},
  ...props
}: MenuTabProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onChangeMenu(index);
  };

  const tabCount = React.Children.count(children);

  return (
    <div css={containerCss(border, variant)} {...props}>
      <div css={[activeCss(activeIndex, tabCount), variantCss[variant](color, tabCount)]}></div>
      {React.Children.map(children, (child, index) => (
        <Button
          css={[inactiveCss(tabCount, color, variant, index === activeIndex, fontSize, fontWeight)]}
          handler={() => handleTabClick(index)}
          color={color}
        >
          {child}
        </Button>
      ))}
    </div>
  );
};
