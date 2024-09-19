/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { YearsProps } from './Years.types';
import dayjs from 'dayjs';
import { Typography } from '../../Typography';
import { base, box } from './Years.styles';
import { useCalendarStore } from '../../../stores/calendarStore';

export const Years = ({ children, ...props }: YearsProps) => {
  const store = useCalendarStore();
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    let newYears: number[] = [];
    for (let y = 2010; y <= dayjs().year(); y++) {
      newYears.push(y);
    }
    setYears(() => newYears);
  }, []);

  return (
    <div css={base} {...props}>
      {years.map((v: number) => {
        return (
          <div
            key={v}
            css={box(store.curYear === v)}
            onClick={() => {
              store.setCurYear(v);
              store.setBodyType('default');
            }}
          >
            <Typography
              color="light"
              size={0.75}
              weight={store.curYear === v ? 700 : 400}
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
