/** @jsxImportSource @emotion/react */
import React from 'react';
import { DateProps } from './Date.types';
import { base, hasContentsCss } from './Date.styles';
import { Typography } from '../Typography';

export const Date = ({
  date,
  type = 'default',
  selected = false,
  hasContents = false,
  children,
  ...props
}: DateProps) => {
  const getDateColor = () => {
    if (type === 'default') return 'light';
    else if (type === 'disable') return 'grey';
    else if (type === 'sat') return 'secondary';
    else return 'danger';
  };

  return (
    <div css={base(selected)} {...props}>
      <Typography color={getDateColor()} size={0.75} weight={600}>
        {date}
      </Typography>
      {hasContents && <div css={hasContentsCss(type)} />}
      {children}
    </div>
  );
};
