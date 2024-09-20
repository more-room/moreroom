import { ReactNode } from "react";
import { ThemeTypes } from "../../types/themeTypes";

export interface ThemeSimpleInfoProps extends React.ComponentProps<'div'> {
  theme?: ThemeTypes,
}
