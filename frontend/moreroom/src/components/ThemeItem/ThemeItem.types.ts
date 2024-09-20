import { ReactNode } from "react";
import { ThemeTypes } from "../../types/themeTypes";

export interface ThemeItemInfoProps extends React.ComponentProps<'div'>  {
  theme?: ThemeTypes,
  pattern?:string,
}

// props 서치용인지 보는용인지 추가
