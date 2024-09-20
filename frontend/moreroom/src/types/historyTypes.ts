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

export interface IHistoryList {
  historyList: IHistoryCard[];
}
