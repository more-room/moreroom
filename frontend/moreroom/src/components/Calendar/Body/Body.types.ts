import { ReactNode } from 'react';

export interface BodyProps extends React.ComponentProps<'div'> {
  year: number;
  month: number;
  children?: ReactNode;
}
