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
