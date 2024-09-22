import { ReactNode } from "react";
import { ITheme } from "../../types/themeTypes";

export interface ThemeRecommendProps extends React.ComponentProps<'div'>  {
  theme?: ITheme,
  pattern?:string,
}