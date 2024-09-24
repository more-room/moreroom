import { create } from 'zustand';

type TProfile = {
  email: string;
  password: string;
  nickname: string;
  gender: string;
  birth: string;
  regionId: string;
  genreId: number;
  genrename: string;
};

// export const useProfileStore = create<TProfile>()((set) => {

// })

// 해시태그
type HashTagStoreState = {
  selectedHashtags: number[];
};

type HashTagAction = {
  setHashtags: (hashtags: number[]) => void;
  toggleHashtag: (hashtagId: number) => void;
};

// 해시태그 스토어 생성
export const useHashtagStore = create<HashTagStoreState & HashTagAction>()(
  (set) => ({
    selectedHashtags: [],
    setHashtags: (hashtags) => set({ selectedHashtags: hashtags }), // 해시태그 배열 설정
    toggleHashtag: (hashtagId) =>
      set((state) => {
        if (state.selectedHashtags.includes(hashtagId)) {
          return {
            selectedHashtags: state.selectedHashtags.filter(
              (id) => id !== hashtagId,
            ),
          }; // 이미 선택된 경우 해제
        } else {
          return { selectedHashtags: [...state.selectedHashtags, hashtagId] }; // 선택되지 않은 경우 추가
        }
      }),
  }),
);
