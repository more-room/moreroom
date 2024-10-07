import { ReactNode } from 'react';
import { IThemeCommon } from './themeTypes';

/* 이름 검색 결과 */
export interface ISearchNameResult {
  cafeId: number;
  cafeName: string;
}

/* 이름 검색 결과 리스트 */
export interface ISearchNameResponse {
  cafeList: ISearchNameResult[];
}

/* 검색 필터 영어 <-> 한글 */
export const nameToKor: Record<string, ReactNode> = {
  region: '지역',
  brandId: '브랜드',
};

/* 검색 필터 영어 <-> 멘트 */
export const nameToMent: Record<string, string> = {
  region: '어떤 지역에서 플레이하고 싶으신가요?',
  brandId: '어떤 브랜드에서 플레이하고 싶으신가요?',
};

/* 카페 검색 요청 */
export interface ISearchCafesRequestParameter {
  region?: string;
  brandId?: number;
  cafeName?: string;
}

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

/* 카페 목록 조회 - 아이템 */
export interface ICafeListItem extends ICafeCommon {
  themePoster: string;
  reviewCount: number;
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
export interface ICafeThemeDetail extends Omit<ICafeCommon, 'cafeName'> {
  brandName: string;
  branchName: string;
  tel: string;
  link: string;
}

export interface ICafeFix {
  brandName: string;
  branchName: string;
}