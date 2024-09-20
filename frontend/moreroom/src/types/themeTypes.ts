import { ReactNode } from "react";

export interface ThemeTypes {
  themeId?: number,
  poster?: string,
  title?: string,
  genreId?: number,
  genrename?: string,
  playtime?: number,
  minPeople?: number,
  maxPeople?: number,
  level?: number,
  price?: number,
  description?: string,
  memberLevel?: number,
  reviewCount?: number,
  reviewScore?: number,
  brandName?: string,
  branchName?: string,
  playFlag?: boolean,
  // cafeId: number,
  // regionId: string,
  // address: string,
}

export interface ThemeList {
  themeList : ThemeTypes[];
}

export interface CafeTypes {
  cafeId: number,
  brandId: number,
  regionId: string,
  address: string,
  cafeName: string,
  tel: string,
  link: string,
  latitude: number,
  longitude: number,
  themeCount: number
}