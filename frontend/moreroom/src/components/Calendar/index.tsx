/** @jsxImportSource @emotion/react */
import React from 'react';
import { CalendarProps } from './Calendar.types';
import { base } from './Calendar.styles';
import { Header } from './Header';
import { Body } from './Body';
import { Years } from './Years';
import { Months } from './Months';

export const Calendar = ({
  bgColor = 'grey',
  bgColorScale = '800',
  children,
  ...props
}: CalendarProps) => {
  return (
    <div css={base(bgColor, bgColorScale)} {...props}>
      {children}
    </div>
  );
};

Calendar.Header = Header;
Calendar.DefaultBody = Body;
Calendar.YearBody = Years;
Calendar.MonthBody = Months;
