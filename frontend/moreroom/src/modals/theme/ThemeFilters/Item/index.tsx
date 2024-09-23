/** @jsxImportSource @emotion/react */
import React from 'react';
import { container } from './styles';
import { Typography } from '../../../../components/Typography';

export interface ItemProps {
  item: string;
  fullWidth?: boolean;
  selected?: boolean;
}

export const Item = ({
  item,
  fullWidth = false,
  selected = false,
}: ItemProps) => {
  return (
    <div css={container(fullWidth, selected)}>
      <Typography
        color={selected ? 'primary' : 'grey'}
        weight={selected ? 600 : 400}
        size={0.875}
        style={{ textAlign: 'center' }}
      >
        {item}
      </Typography>
    </div>
  );
};
