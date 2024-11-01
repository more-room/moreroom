/* IHashtag 및 IParty 관련 타입 정의 */
export interface IHashtag {
  hashtagId: number;
  hashtagName: string;
}

export interface ITheme {
  themeId: number;
  poster: string;
  title: string;
  maxPeople: number;
  regionId: string;
  playtime: number;
  genreList: string[];
  review: {
    count: number;
    score: number;
  };
  cafe: ICafe;
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
  cafe: ICafe;
}
export interface ICafe {
  cafeId: number;
  brandName: string;
  branchName: string;
  cafeName: string;
  address: string;
}
export interface IPartyResponse {
  content: IParty[];
  pageable: any; // 다른 데이터들도 추가적으로 필요할 수 있음
  totalElements: number;
  totalPages: number;
  last: boolean;
  partyList?: IParty[];
}

/* 채팅방 정보 */
export interface IChatRoomInfo {
  roomName: string;
  themeId: number;
  date: string;
  maxMember: number;
  addFlag: boolean;
}

/* 채팅 내역 - 아이템 */
export interface IChatListItem {
  messageId: string;
  nickname: string;
  photo: string;
  message: string;
}

/* 채팅 내역 */
export interface IChatList {
  messageList: IChatListItem[];
  lastMessageId: string;
}

/* 공지사항 조회 */
export interface INotice {
  notice: string;
}

export interface IMember {
  photo: string;
  nickname: string;
}

export interface IMemberListResponse {
  memberList: IMember[];
}