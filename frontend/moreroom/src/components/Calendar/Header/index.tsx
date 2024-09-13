/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { HeaderProps } from './Header.types';
import dayjs from 'dayjs';
import { base } from './Header.styles';
import { Icon } from '../../Icon';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Typography } from '../../Typography';

export const Header = ({
  year = dayjs(new Date()).year(),
  month = dayjs(new Date()).month(),
  children,
  ...props
}: HeaderProps) => {
  const [curYear, setCurYear] = useState<number>(year);
  const [curMonth, setCurMonth] = useState<number>(month);

  const prevHandler = () => {
    if (curMonth === 1) {
      if (curYear === 2010) return;

      setCurYear((prev) => prev - 1);
      setCurMonth(12);
    } else {
      setCurMonth((prev) => prev - 1);
    }
  };

  const nextHandler = () => {
    if (curMonth === 12) {
      if (curYear === dayjs(new Date()).year()) return;

      setCurYear((prev) => prev + 1);
      setCurMonth(1);
    } else {
      setCurMonth((prev) => prev + 1);
    }
  };

  return (
    <div css={base} {...props}>
      <Icon
        color={curYear === 2010 && curMonth === 1 ? 'grey' : 'light'}
        size={1.5}
        onClick={prevHandler}
      >
        <ChevronLeftIcon />
      </Icon>
      <Typography weight={600} color="light" size={0.875}>
        {curYear}년 {curMonth}월
      </Typography>
      <Icon
        color={
          curYear === dayjs(new Date()).year() && curMonth === 12
            ? 'grey'
            : 'light'
        }
        size={1.5}
        onClick={nextHandler}
      >
        <ChevronRightIcon />
      </Icon>
      {children}
    </div>
  );
};
