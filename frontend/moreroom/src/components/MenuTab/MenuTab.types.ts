import React, { ReactNode } from "react";
import { FontWeight, Palette, Size } from "../../types/globalStyleTypes";

export type MenuTabVariant = 'contained' | 'outlined';

export interface MenuTabProps extends React.ComponentProps<'div'> {
  children: ReactNode[];
  variant?: MenuTabVariant;
  color?: Palette;
  border?: number;
  fontSize? : number;
  fontWeight? :FontWeight;
  onChangeMenu: (menu: number) => void;
}
