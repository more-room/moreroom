import { ReactNode } from "react";
import { ThemeTypes } from "../../types/themeTypes";

export interface ThemeItemInfoProps extends React.ComponentProps<'div'>  {
  poster?: string,
  title?: string,
  genreList?:ReactNode[],
  brandName?:string,
  branchName?:string,
  playtime?:number,
  reviewCount?:number,
  labeled?:boolean,
  pattern?:string,
}

// props 서치용인지 보는용인지 추가
