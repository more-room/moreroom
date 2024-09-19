/** @jsxImportSource @emotion/react */
import React from 'react';
import { BodyProps } from './Body.types';
import { Typography } from '../../Typography';
import { head, base, week, headBox } from './Body.styles';
import { getDays, heads } from '../../../utils/dateUtils';
import { Date } from '../../Date';
import { useCalendarStore } from '../../../stores/calendarStore';

export const Body = ({ children, ...props }: BodyProps) => {
  const store = useCalendarStore();

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
              />
            ))}
          </div>
        );
      })}
      {children}
    </div>
  );
};
