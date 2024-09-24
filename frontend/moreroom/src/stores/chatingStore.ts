import { create } from 'zustand';

/* IHashtag 및 IParty 관련 타입 정의 */
interface IHashtag {
  hashtagId: number;
  hashtagName: string;
}

interface ITheme {
  poster: string;
  title: string;
  maxPeople: number;
}

export interface IParty {
  partyId: number;
  roomName: string;
  theme: ITheme;
  cafeName: string;
  date: string;
  memberCount: string;
  maxMember: string;
  hashtags: IHashtag[];
}

interface IPartyResponse {
  content: IParty[];
  pageable: any; // 다른 데이터들도 추가적으로 필요할 수 있음
  totalElements: number;
  totalPages: number;
  last: boolean;
}

/* 파티 페이지 스토어 */
type PartyPageStoreState = {
  type: 'default' | 'search'; // 파티 페이지 유형 ('default' | 'search')
};

type PartyPageStoreAction = {
  setType: (type: PartyPageStoreState['type']) => void; // 페이지 유형 설정
};

export const usePartyPageStore = create<PartyPageStoreState & PartyPageStoreAction>()((set) => ({
  type: 'default',
  setType: (type) => set(() => ({ type: type })),
}));

/* 파티 목록 검색 스토어 */
type SearchPartiesState = {
  filters: any; // 필터 파라미터 (필요에 따라 세부적으로 정의 가능)
  results: IPartyResponse; // 파티 검색 결과
};

type SearchPartiesAction = {
  setFilters: (filters: SearchPartiesState['filters']) => void; // 필터 설정
  setResults: (results: SearchPartiesState['results']) => void; // 결과 설정
};

export const useSearchPartiesStore = create<SearchPartiesState & SearchPartiesAction>()((set) => ({
  filters: {
    genreList: [], // 예시로 기본 필터
  },
  results: {
    content: [], // 파티 리스트 초기화
    pageable: null,
    totalElements: 0,
    totalPages: 0,
    last: true,
  },
  setFilters: (filters) => set(() => ({ filters: filters })),
  setResults: (results) => set(() => ({ results: results })),
}));

/* 파티 제목 검색 스토어 */
type SearchPartyTitleStoreState = {
  title: string; // 검색할 파티 제목
  results: IPartyResponse; // 제목 검색 결과
};

type SearchPartyTitleStoreAction = {
  setTitle: (title: SearchPartyTitleStoreState['title']) => void; // 제목 설정
  setResults: (results: SearchPartyTitleStoreState['results']) => void; // 결과 설정
};

export const useSearchPartyTitleStore = create<
  SearchPartyTitleStoreState & SearchPartyTitleStoreAction
>()((set) => ({
  title: '',
  results: {
    content: [],
    pageable: null,
    totalElements: 0,
    totalPages: 0,
    last: true,
  },
  setTitle: (title) => set(() => ({ title: title })),
  setResults: (results) => set(() => ({ results: results })),
}));
