
/* IHashtag 및 IParty 관련 타입 정의 */
export interface IHashtag {
  hashtagId: number;
  hashtagName: string;
}

export interface ITheme {
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

export interface IPartyResponse {
  content: IParty[];
  pageable: any; // 다른 데이터들도 추가적으로 필요할 수 있음
  totalElements: number;
  totalPages: number;
  last: boolean;
}

/* 파티 페이지 스토어 */
export type PartyPageStoreState = {
  type: 'default' | 'search'; // 파티 페이지 유형 ('default' | 'search')
};

export type PartyPageStoreAction = {
  setType: (type: PartyPageStoreState['type']) => void; // 페이지 유형 설정
};

/* 파티 목록 검색 스토어 */
export type SearchPartiesState = {
  filters: any; // 필터 파라미터 (필요에 따라 세부적으로 정의 가능)
  results: IPartyResponse; // 파티 검색 결과
};

export type SearchPartiesAction = {
  setFilters: (filters: SearchPartiesState['filters']) => void; // 필터 설정
  setResults: (results: SearchPartiesState['results']) => void; // 결과 설정
};

/* 파티 제목 검색 스토어 */
export type SearchPartyTitleStoreState = {
  title: string; // 검색할 파티 제목
  results: IPartyResponse; // 제목 검색 결과
};

export type SearchPartyTitleStoreAction = {
  setTitle: (title: SearchPartyTitleStoreState['title']) => void; // 제목 설정
  setResults: (results: SearchPartyTitleStoreState['results']) => void; // 결과 설정
};