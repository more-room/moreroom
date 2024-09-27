import { ReactNode } from 'react';

/*  기록 목록 조회 - 요청 파라미터 */
export interface IHistoryListRequestParameter {
  startDate: string;
  endDate: string;
}

/* 기록 목록 조회 - 아이템 */
export interface IHistoryCard {
  historyId: number;
  theme: {
    themeId: number;
    title: string;
    cafeName: string;
    poster: string;
  };
  date: string;
  memberPlayTime: number;
  hintCount: number;
}

/* 기록 목록 조회 */
export interface IHistoryList {
  historyList: IHistoryCard[];
}

/* 기록 상세 조회 */
export interface IHistoryDetail {
  historyId: number;
  themeId: number;
  date: string;
  hintCount: number;
  content: string;
  memberLevel: number;
  memberPlayTime: number;
  players: number;
  price: number;
  successFlag: boolean;
  cafeName: string;
  updatedAt: string;
}

/* 기록 타입 영어 <-> 한글 */
export const typeToKor: Record<string, ReactNode> = {
  successFlag: '탈출 여부',
  memberPlayTime: '탈출 소요 시간',
  hintCount: '사용 힌트',
  players: '플레이 인원 수',
  price: '지불 가격',
  memberLevel: '체감 난이도',
  date: '탈출 날짜',
};

/* 기록 타입 영어 <-> 멘트 */
export const typeToMent: Record<string, string> = {
  successFlag: '탈출에 성공하셨나요?',
  memberPlayTime: '시간을 얼마나 쓰셨나요?',
  hintCount: '몇개의 힌트를 사용하셨나요?',
  players: '몇명과 플레이 하셨나요?',
  price: '얼마를 지불하셨나요?',
  memberLevel: '얼마나 어려우셨나요?',
  date: '언제 탈출하셨나요?',
};

/* 기록 작성 */
export interface IHistoryWrite {
  themeId?: number;
  date?: string;
  content?: string;
  hintCount?: number;
  price?: number;
  memberLevel?: number;
  memberPlayTime?: number;
  players?: number;
  successFlag?: boolean;
}
