
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

