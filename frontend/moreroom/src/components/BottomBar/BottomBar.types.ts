import { ReactNode } from 'react';

export interface BottomBarProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  icons: ReactNode[];
  menus: string[];
  selected: number;
  onHandleChange: (menu: number) => void;
}
