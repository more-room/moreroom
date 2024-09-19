import { ReactNode } from "react";

export interface ThemeSimpleInfoProps extends React.ComponentProps<'div'> {
  poster?: string,
  title?: string,
  genreList?:ReactNode[],
}
