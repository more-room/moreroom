export interface ITheme {
  themeId?: number;
  poster?: string;
  title?: string;
  genreId?: number;
  genrename?: string;
  playtime?: number;
  minPeople?: number;
  maxPeople?: number;
  level?: number;
  price?: number;
  description?: string;
  memberLevel?: number;
  reviewCount?: number;
  reviewScore?: number;
  brandName?: string;
  branchName?: string;
  playFlag?: boolean;
  // cafeId: number,
  // regionId: string,
  // address: string,
}

export interface ThemeList {
  themeList: ITheme[];
}

export interface ICafe {
  cafeId: number;
  brandId: number;
  regionId: string;
  address: string;
  cafeName: string;
  tel: string;
  link: string;
  latitude: number;
  longitude: number;
  themeCount: number;
}

/* 제목 검색 결과 */
export interface ISearchTitleResult {
  themeId: number;
  title: string;
}

/* 제목 검색 결과 리스트 */
export interface ISearchTitleResponse {
  themeList: ISearchTitleResult[];
}

/* 테마 검색 요청 */
export interface ISearchThemesRequestParameter {
  genreList: string[];
  people: number;
  region: string;
  level: number;
  brandId: number;
  playtime: number;
  price: number;
  title: string;
  pageNumber: number;
  pageSize: number;
  sort: string;
}
