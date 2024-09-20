import { IThemeListReview } from './reviewTypes';

/* 카페 공통 */
export interface ICafeCommon {
  cafeId: number;
  brandId: number;
  regionId: string;
  address: string;
  cafeName: string;
  latitude: number;
  longitude: number;
}

/* 카페 목록 조회 - 카페 목록 요소 */
export interface ICafeListItem extends ICafeCommon {
  themeCount: number;
}

export interface ICafeList {
  cafeList: ICafeListItem[];
}

/* 카페 상세 조회 - 내부 테마 정보 */
export interface ICafeDetailThemeInfo {
  title: string;
  playtime: number;
  genreList: string[];
  review: IThemeListReview;
}

// 테마 상세 조회용
export interface ICafeDetailForTheme extends ICafeCommon {
  tel: string;
  link: string;
}

export interface ICafeDetail extends ICafeDetailForTheme {
  themeList: ICafeDetailThemeInfo[];
}
