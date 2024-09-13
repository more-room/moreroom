/** @jsxImportSource @emotion/react */
import React from 'react';
import { CalendarProps } from './Calendar.types';

export const Calendar = ({ children, ...props }: CalendarProps) => {
  return <div {...props}>{children}</div>;
};
