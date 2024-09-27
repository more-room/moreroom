import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* 기록 작성 */
type HistoryWriteStoreState = {
  themeId?: number;
  date?: string;
  content?: string;
  hintCount?: number;
  price?: number;
  memberLevel?: number;
  memberPlayTime?: number;
  players?: number;
  successFlag?: boolean;
};

type HistoryWriteStoreAction = {
  setThemeId: (themeId: HistoryWriteStoreState['themeId']) => void;
  setDate: (date: HistoryWriteStoreState['date']) => void;
  setContent: (content: HistoryWriteStoreState['content']) => void;
  setHintCount: (hintCount: HistoryWriteStoreState['hintCount']) => void;
  setPrice: (price: HistoryWriteStoreState['price']) => void;
  setMemberLevel: (memberLevel: HistoryWriteStoreState['memberLevel']) => void;
  setMemberPlayTime: (
    memberPlayTime: HistoryWriteStoreState['memberPlayTime'],
  ) => void;
  setPlayers: (players: HistoryWriteStoreState['players']) => void;
  setSuccessFlag: (successFlag: HistoryWriteStoreState['successFlag']) => void;
};

export const useHistoryWriteStore = create<
  HistoryWriteStoreState & HistoryWriteStoreAction
>()(
  persist(
    (set) => ({
      content: '',
      setThemeId: (themeId) => set(() => ({ themeId: themeId })),
      setDate: (date) => set(() => ({ date: date })),
      setContent: (content) => set(() => ({ content: content })),
      setHintCount: (hintCount) => set(() => ({ hintCount: hintCount })),
      setPrice: (price) => set(() => ({ price: price })),
      setMemberLevel: (memberLevel) =>
        set(() => ({ memberLevel: memberLevel })),
      setMemberPlayTime: (memberPlayTime) =>
        set(() => ({ memberPlayTime: memberPlayTime })),
      setPlayers: (players) => set(() => ({ players: players })),
      setSuccessFlag: (successFlag) =>
        set(() => ({ successFlag: successFlag })),
    }),
    { name: 'historyWriteStore' },
  ),
);
