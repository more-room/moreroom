import { ReactNode } from 'react';

export interface HeaderProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}
