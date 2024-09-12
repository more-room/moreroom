import { ReactNode } from 'react';

export interface BottomBarProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  icons: ReactNode[];
  menus: string[];
  defaultSelect?: number;
  onHandleChange: (menu: number) => void;
}
