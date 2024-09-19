/** @jsxImportSource @emotion/react */
import React from "react";
import { ThemeSimpleInfoProps } from "./ThemeSimpleInfo.types";

export const ThemeSimpleInfo = ({
  poster,
  title,
  genreList,
  ...props
}:ThemeSimpleInfoProps) => {
  return (
    <div {...props}></div>
  )
}