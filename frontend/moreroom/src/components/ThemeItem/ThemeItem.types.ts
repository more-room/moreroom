import { ReactNode } from "react";

export interface ThemeItemInfoProps extends React.ComponentProps<'div'> {
  poster?: string,
  title?: string,
  genreList?:ReactNode[],
  brandName?:string,
  branchName?:string,
  playtime?:number,
  review?:number,
}