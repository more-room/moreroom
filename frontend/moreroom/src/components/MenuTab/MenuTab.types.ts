import React, { ReactNode } from "react";
import { Palette, Size } from "../../types/globalStyleTypes";

export type MenuTabVariant = 'contained' | 'outlined';

export interface MenuTabProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  size? : Size;
  variant?: MenuTabVariant;
  color?: Palette;
  border?: number;
  onChangeMenu: (menu: number) => void;
}
