import { create } from "zustand";

// 상태 타입 정의
type HashTagStoreState = {
  selectedHashtags: number[]; // 선택된 해시태그 배열
}

// 액션 타입 정의
type HashTagAction = {
  setHashtags: (hashtags: number[]) => void; // 해시태그 설정 함수
  toggleHashtag: (hashtagId: number) => void; // 해시태그 선택/해제 함수
}

// Zustand store 생성
export const useHashtagStore = create<HashTagStoreState & HashTagAction>()((set) => ({
  selectedHashtags: [], // 선택된 해시태그 배열 초기값
  setHashtags: (hashtags) => set({ selectedHashtags: hashtags }), // 해시태그 배열 설정
  toggleHashtag: (hashtagId) => set((state) => {
    if (state.selectedHashtags.includes(hashtagId)) {
      return { selectedHashtags: state.selectedHashtags.filter(id => id !== hashtagId) }; // 이미 선택된 경우 해제
    } else {
      return { selectedHashtags: [...state.selectedHashtags, hashtagId] }; // 선택되지 않은 경우 추가
    }
  }),
}));