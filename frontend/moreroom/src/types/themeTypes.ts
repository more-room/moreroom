import { ReactNode } from 'react';
import { ICafeThemeList } from './cafeTypes';
import { IThemeReview } from './reviewTypes';

/* 제목 검색 결과 */
export interface ISearchTitleResult {
  themeId: number;
  title: string;
}

/* 제목 검색 결과 리스트 */
export interface ISearchTitleResponse {
  themeList: ISearchTitleResult[];
}

/* 검색 필터 영어 <-> 한글 */
export const filterToKor: Record<string, ReactNode> = {
  region: '지역',
  genreList: '장르',
  people: '인원 수',
  level: '난이도',
  brandId: '브랜드',
  playtime: '플레이 타임',
  price: '가격',
};

/* 테마 검색 요청 */
export interface ISearchThemesRequestParameter {
  genreList?: number[];
  people?: number;
  region?: string;
  level?: number;
  brandId?: number;
  playtime?: number;
  price?: number;
  title?: string;
  pageNumber?: number;
  pageSize?: number;
}

/* 테마 공통 */
export interface IThemeCommon {
  themeId: number;
  title: string;
  poster: string;
  playtime: number;
  genreList: string[];
  review: IThemeReview;
  member: {
    playFlag: boolean;
  };
}

/* 테마 목록 조회 - 각 목록 아이템 */
export interface IThemeListItem extends IThemeCommon {
  regionId: string;
  cafe: ICafeThemeList;
}

/* 테마 목록 조회 */
export interface IThemeList {
  content?: {
    themeList: IThemeListItem[];
  };
  pageNumber: number;
  pageSize?: number;
  totalPage?: number;
  totalElements?: number;
}

/* 테마 상세 조회 - 아이템 */
export interface IThemeDetailItem extends IThemeCommon {
  minPeople: number;
  maxPeople: number;
  level: number;
  price: number;
  description: string;
  memberLevel: number;
}

/* 테마 상세 조회 */
export interface IThemeDetail {
  theme: IThemeDetailItem;
}
