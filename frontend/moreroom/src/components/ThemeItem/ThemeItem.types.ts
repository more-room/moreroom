import { ReactNode } from "react";
import { ITheme } from "../../types/themeTypes";

export interface ThemeItemInfoProps extends React.ComponentProps<'div'>  {
  theme?: ITheme,
  pattern?:string,
}

// props 서치용인지 보는용인지 추가
