import { IThemeCommon } from './themeTypes';

/* 카페 공통 */
export interface ICafeCommon {
  cafeId: number;
  brandId: number;
  regionId: number;
  address: string;
  cafeName: string;
  latitude: number;
  longitude: number;
}

/* 카페 목록 조회 - 아이템 */
export interface ICafeListItem extends ICafeCommon {
  themeCount: number;
}

/* 카페 목록 조회 */
export interface ICafeList {
  cafeList: ICafeListItem[];
}

/* 카페 상세 조회 */
export interface ICafeDetail extends ICafeCommon {
  tel: string;
  link: string;
  themeList: IThemeCommon[];
}

/* 카페 정보 - 테마 목록 조회용 */
export interface ICafeThemeList {
  cafeId: number;
  brandName: string;
  branchName: string;
  cafeName: string;
  address: string;
}

/* 카페 정보 - 테마 상세 조회용 */
export interface ICafeThemeDetail extends ICafeCommon {
  brandName: string;
  branchName: string;
  tel: string;
  link: string;
}
