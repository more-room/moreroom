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

/* 검색 필터 영어 <-> 멘트 */
export const filterToMent: Record<string, string> = {
  region: '어떤 지역에서 플레이하고 싶으신가요?',
  genreList: '어떤 장르를 플레이하고 싶으신가요?',
  people: '몇명과 플레이하고 싶으신가요?',
  level: '어떤 난이도로 플레이하고 싶으신가요?',
  brandId: '어떤 카페에서 플레이하고 싶으신가요?',
  playtime: '몇 분 동안 플레이하고 싶으신가요?',
  price: '얼마까지 알아보고 오셨어요?',
};

/* 난이도 설명 */
export const levelMent = [
  '1단계 : 초보자도 언제든 즐겁게 즐길 수 있어요!',
  '2단계 : 방탈출의 매력에 빠지기 시작하셨군요~',
  '3단계 : 방탈출 경험이 꽤 있으시군요?',
  '4단계 : 방탈출에 자신 있으신가봐요?',
  '5단계 : 이제는 기록 갱신을 위해 달려봐요!',
];

/* 테마 검색 요청 */
export interface ISearchThemesRequestParameter {
  genreList: number[];
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
