/** @jsxImportSource @emotion/react */
import React from 'react';
import { Item } from '../Item';
import { container, items } from './styles';

export const People = () => {
  return (
    <div css={container}>
      <div css={items}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count: number) => (
          <Item item={count + '명'}></Item>
        ))}
      </div>
    </div>
  );
};
