/** @jsxImportSource @emotion/react */
import React from 'react';
import { BodyProps } from './Body.types';
import { Typography } from '../../Typography';
import { head, base, week, headBox } from './Body.styles';
import {
  getDays,
  getHasContents,
  getSelected,
  heads,
} from '../../../utils/dateUtils';
import { Date } from '../../Date';
import { useCalendarStore } from '../../../stores/calendarStore';
import { Dayjs } from 'dayjs';

export const Body = ({ contents, children, ...props }: BodyProps) => {
  const store = useCalendarStore();
  const handler = (d: Dayjs) => {
    if (!store.selected) store.setSelected(d);
    else {
      if (getSelected(d, store.selected)) store.setSelected(undefined);
      else store.setSelected(d);
    }

    if (store.curMonth !== d.month() + 1) store.setCurMonth(d.month() + 1);
    if (store.curYear !== d.year()) store.setCurYear(d.year());
  };

  return (
    <div css={base} {...props}>
      <div css={head}>
        {heads.map((head) => (
          <div css={headBox}>
            <Typography color="grey" scale="300" size={0.75} weight={600}>
              {head}
            </Typography>
          </div>
        ))}
      </div>
      {getDays(store.curYear, store.curMonth).map((w) => {
        return (
          <div css={week}>
            {w.map((d) => (
              <Date
                key={d.date()}
                date={d.date()}
                type={
                  d.month() + 1 !== store.curMonth
                    ? 'disable'
                    : d.day() === 0
                      ? 'sun'
                      : d.day() === 6
                        ? 'sat'
                        : 'default'
                }
                hasContents={getHasContents(contents!, d)}
                selected={store.selected && getSelected(d, store.selected)}
                onClick={() => handler(d)}
              />
            ))}
          </div>
        );
      })}
      {children}
    </div>
  );
};
