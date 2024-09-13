/** @jsxImportSource @emotion/react */
import React from 'react';
import { BodyProps } from './Body.types';
import { Typography } from '../../Typography';
import { head, base, week, headBox } from './Body.styles';
import { getDays, heads } from '../../../utils/dateUtils';
import { Date } from '../../Date';
import dayjs from 'dayjs';

export const Body = ({
  year = dayjs().year(),
  month = dayjs().month() + 1,
  children,
  ...props
}: BodyProps) => {
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
      {getDays(year, month).map((w) => {
        return (
          <div css={week}>
            {w.map((d) => (
              <Date
                date={d.date()}
                type={
                  d.month() + 1 !== month
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
