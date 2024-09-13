import { ReactNode } from 'react';

export interface HeaderProps extends React.ComponentProps<'div'> {
  year?: number;
  month?: number;
  children?: ReactNode;
}
