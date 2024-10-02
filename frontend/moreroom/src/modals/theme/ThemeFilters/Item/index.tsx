/** @jsxImportSource @emotion/react */
import React from 'react';
import { container } from './styles';
import { Typography } from '../../../../components/Typography';

export interface ItemProps {
  item: string;
  fullWidth?: boolean;
  selected?: boolean;
  handler?: () => void;
}

export const Item = ({
  item,
  fullWidth = false,
  selected = false,
  handler = () => console.log('click'),
}: ItemProps) => {
  return (
    <div css={container(fullWidth, selected)} onClick={handler}>
      <Typography
        color={selected ? 'primary' : 'grey'}
        weight={selected ? 600 : 400}
        size={0.875}
        style={{ textAlign: 'center', whiteSpace: 'nowrap' }}
      >
        {item}
      </Typography>
    </div>
  );
};
