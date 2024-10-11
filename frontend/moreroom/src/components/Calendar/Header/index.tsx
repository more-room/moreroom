/** @jsxImportSource @emotion/react */
import React from 'react';
import { HeaderProps } from './Header.types';
import dayjs from 'dayjs';
import { base } from './Header.styles';
import { Icon } from '../../Icon';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Typography } from '../../Typography';
import { css } from '@emotion/react';
import { useCalendarStore } from '../../../stores/calendarStore';

export const Header = ({ children, ...props }: HeaderProps) => {
  const store = useCalendarStore();

  const prevHandler = () => {
    if (store.curMonth === 1) {
      if (store.curYear === 2010) return;

      store.setCurYear(store.curYear - 1);
      store.setCurMonth(12);
    } else {
      store.setCurMonth(store.curMonth - 1);
    }
    store.setSelected(undefined);
  };

  const nextHandler = () => {
    if (store.curMonth === 12) {
      if (store.curYear === dayjs(new Date()).year()) return;

      store.setCurYear(store.curYear + 1);
      store.setCurMonth(1);
    } else {
      store.setCurMonth(store.curMonth + 1);
    }
    store.setSelected(undefined);
  };

  return (
    <div css={base} {...props}>
      <Icon
        color={
          store.curYear === 2010 && store.curMonth === 1 ? 'grey' : 'light'
        }
        size={1.5}
        onClick={prevHandler}
      >
        <ChevronLeftIcon />
      </Icon>
      <div
        css={css`
          display: flex;
          column-gap: 0.5rem;
        `}
      >
        <Typography
          weight={600}
          color="light"
          size={0.875}
          onClick={() => store.setBodyType('year')}
        >
          {store.curYear}년
        </Typography>
        <Typography
          weight={600}
          color="light"
          size={0.875}
          onClick={() => store.setBodyType('month')}
        >
          {store.curMonth}월
        </Typography>
      </div>

      <Icon
        color={
          store.curYear === dayjs(new Date()).year() && store.curMonth === 12
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
