import { ReactNode } from "react";
import { IThemeListItem } from "../../types/themeTypes";

export interface ThemeRecommendProps extends React.ComponentProps<'div'>  {
  theme: IThemeListItem,
  pattern?:string,
}