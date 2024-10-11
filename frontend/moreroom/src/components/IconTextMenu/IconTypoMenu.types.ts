import { ReactNode } from 'react';

export interface IconTypoMenuProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  icon: ReactNode;
  menu: string;
  selected: boolean;
}
