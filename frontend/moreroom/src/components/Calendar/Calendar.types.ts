import { ReactNode } from 'react';

export interface CalendarProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}
