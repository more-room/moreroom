/** @jsxImportSource @emotion/react */
import React from 'react';
import { Item } from '../Item';
import { container, items } from './styles';

export const Playtime = () => {
  return (
    <div css={container}>
      <div css={items}>
        {[30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((count: number) => (
          <Item item={count + '분'}></Item>
        ))}
      </div>
    </div>
  );
};
