/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { MonthsProps } from './Months.types';
import { Typography } from '../../Typography';
import { base, box } from './Months.styles';
import { useCalendarStore } from '../../../stores/calendarStore';

export const Months = ({ children, ...props }: MonthsProps) => {
  const store = useCalendarStore();
  const [months, setMonths] = useState<number[]>([]);

  useEffect(() => {
    let newMonths: number[] = [];
    for (let m = 1; m <= 12; m++) {
      newMonths.push(m);
    }
    setMonths(() => newMonths);
  }, []);

  return (
    <div css={base} {...props}>
      {months.map((v: number) => {
        return (
          <div
            key={v}
            css={box(store.curMonth === v)}
            onClick={() => {
              store.setCurMonth(v);
              store.setBodyType('default');
            }}
          >
            <Typography
              color="light"
              size={0.75}
              weight={store.curMonth === v ? 700 : 400}
            >
              {v}
            </Typography>
          </div>
        );
      })}
      {children}
    </div>
  );
};
