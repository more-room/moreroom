import AxiosMockAdapter from 'axios-mock-adapter';
import { api } from '../apis/interceptors';
import { IThemeList, IThemeListItem } from '../types/themeTypes';
import { ICafeListItem } from '../types/cafeTypes';

export const mock = new AxiosMockAdapter(api);

//========================== theme
mock.onGet('/api/theme/search').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          themeList: [
            {
              themeId: 1,
              title: 'Bad rob Bad',
            },
            {
              themeId: 2,
              title: 'apple',
            },
            {
              themeId: 3,
              title: 'samsung',
            },
          ],
        },
      ]);
    }, 100);
  });
});

const themeListReply = () => {
  let themeList: IThemeListItem[] = [];
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v: number) => {
    themeList.push({
      themeId: v,
      title: 'Bad Rob Bad',
      poster: '/posters/badrobbad.png',
      playtime: 80,
      genreList: ['스토리', '드라마'],
      regionId: '111000000',
      review: {
        count: 10,
        score: 4.5,
      },
      cafe: {
        cafeId: 34,
        brandName: '제로월드',
        branchName: '강남점',
        cafeName: '제로월드 강남점',
        address: '주소',
      },
      member: {
        playFlag: true,
      },
    });
  });
  const reply: IThemeList = {
    content: {
      themeList: [...themeList],
    },
    pageNumber: 0,
    pageSize: 10,
    totalPage: 10,
    totalElements: 99,
  };
  return reply;
};

mock.onGet('/api/theme').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, themeListReply()]);
    }, 500);
  });
});

mock.onGet('/api/theme/1').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          theme: {
            themeId: 1,
            poster: '/posters/last.png',
            title: 'LAST',
            playtime: 60,
            minPeople: 2,
            maxPeople: 4,
            level: 3,
            price: 22000,
            description:
              '이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다. 이것은 방탈출 설명입니다.',
            memberLevel: 3,
            review: {
              count: 10,
              score: 4.5,
            },
            genreList: ['스토리', '드라마'],
            member: {
              playFlag: true,
            },
          },
        },
      ]);
    }, 500);
  });
});

//========================== info
mock.onGet('/api/info/region').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          regions: [
            {
              regionId: '1001000000',
              regionName: '서울',
              cities: [
                {
                  regionId: '1001030000',
                  regionName: '광진구',
                },
                {
                  regionId: '1001040000',
                  regionName: '노원구',
                },
              ],
            },
            {
              regionId: '1',
              regionName: '대전',
              cities: [],
            },
            {
              regionId: '2',
              regionName: '대구',
              cities: [],
            },
            {
              regionId: '3',
              regionName: '부산',
              cities: [],
            },
          ],
        },
      ]);
    }, 100);
  });
});

mock.onGet('/api/info/genre').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          genreList: [
            {
              genreId: 1,
              genreName: '잠입',
            },
            {
              genreId: 2,
              genreName: '스릴러',
            },
            {
              genreId: 3,
              genreName: '타임어택',
            },
            {
              genreId: 4,
              genreName: '모험/탐험',
            },
            {
              genreId: 5,
              genreName: 'SF',
            },
          ],
        },
      ]);
    }, 100);
  });
});

mock.onGet('/api/info/brand').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          brandList: [
            {
              brandId: 12,
              brandName: '이스케이퍼스',
            },
            {
              brandId: 13,
              brandName: '이스케이프 룸',
            },
            {
              brandId: 14,
              brandName: '서울 이스케이프 룸',
            },
          ],
        },
      ]);
    }, 100);
  });
});

//========================== recommend
mock.onGet('/api/recommendations/similar-user-themes').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          themeList: [
            {
              themeId: 1,
              title: 'Heaven',
              poster: '/posters/heaven.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 4.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '넥스트 에디션',
                branchName: '건대 2호점',
                cafeName: '강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 2,
              title: '지옥',
              poster: '/posters/지옥.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 3.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '플레이더월드',
                branchName: '강남점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 3,
              title: 'Bad Rob Bad',
              poster: '/posters/badrobbad.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 2.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '비트포비아',
                branchName: '홍대던전점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 4,
              title: 'LAST',
              poster: '/posters/last.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 5.0,
              },
              cafe: {
                cafeId: 34,
                brandName: '황금열쇠',
                branchName: '대구 동성로점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 5,
              title: '필그림',
              poster: '/posters/필그림.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 4.0,
              },
              cafe: {
                cafeId: 34,
                brandName: '포인트나인',
                branchName: '건대점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
          ],
        },
      ]);
    }, 500);
  });
});

mock.onGet('/api/recommendations/similar-themes').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          themeList: [
            {
              themeId: 1,
              title: 'Heaven',
              poster: '/posters/heaven.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 4.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '넥스트 에디션',
                branchName: '건대 2호점',
                cafeName: '강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 2,
              title: '지옥',
              poster: '/posters/지옥.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 3.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '플레이더월드',
                branchName: '강남점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 3,
              title: 'Bad Rob Bad',
              poster: '/posters/badrobbad.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 2.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '비트포비아',
                branchName: '홍대던전점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 4,
              title: 'LAST',
              poster: '/posters/last.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 5.0,
              },
              cafe: {
                cafeId: 34,
                brandName: '황금열쇠',
                branchName: '대구 동성로점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 5,
              title: '필그림',
              poster: '/posters/필그림.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 4.0,
              },
              cafe: {
                cafeId: 34,
                brandName: '포인트나인',
                branchName: '건대점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
          ],
        },
      ]);
    }, 500);
  });
});

mock.onGet('/api/recommendations/demographics-themes').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          themeList: [
            {
              themeId: 1,
              title: 'Heaven',
              poster: '/posters/heaven.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 4.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '넥스트 에디션',
                branchName: '건대 2호점',
                cafeName: '강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 2,
              title: '지옥',
              poster: '/posters/지옥.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 3.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '플레이더월드',
                branchName: '강남점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 3,
              title: 'Bad Rob Bad',
              poster: '/posters/badrobbad.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 2.5,
              },
              cafe: {
                cafeId: 34,
                brandName: '비트포비아',
                branchName: '홍대던전점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 4,
              title: 'LAST',
              poster: '/posters/last.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 5.0,
              },
              cafe: {
                cafeId: 34,
                brandName: '황금열쇠',
                branchName: '대구 동성로점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
            {
              themeId: 5,
              title: '필그림',
              poster: '/posters/필그림.png',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              regionId: '111000000',
              review: {
                count: 10,
                score: 4.0,
              },
              cafe: {
                cafeId: 34,
                brandName: '포인트나인',
                branchName: '건대점',
                cafeName: '제로월드 강남점',
                address: '주소',
              },
              member: {
                playFlag: true,
              },
            },
          ],
        },
      ]);
    }, 500);
  });
});

// ============mypage
mock.onGet('/api/auth/member').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          email: 'ssafy123@ssafy.com',
          password: 'ssafy123',
          nickname: 'D206탈출왕',
          gender: 'M',
          birth: '1998-07-20',
          regionId: 'D206',
          genreList: [
            {
              id: 1,
              name: '스토리',
            },
            {
              id: 2,
              name: '판타지',
            },
          ],
          clearRoom: 10,
        },
      ]);
    }, 100);
  });
});

mock.onGet('/api/auth/member/mypage').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          nickname: '닉네임',
          genreList: [
            {
              id: 1,
              name: '스토리',
            },
            {
              id: 2,
              name: '판타지',
            },
          ],
          hashtagList: [
            {
              id: 1,
              name: '뉴비',
            },
            {
              id: 2,
              name: '리더십',
            },
          ],
          photo: '프로필사진주소',
        },
      ]);
    }, 100);
  });
});

mock.onPatch('/api/auth/member/hashtag').reply((config) => {
  console.log(config.data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          hashtagIdList: [1, 2],
        },
      ]);
    }, 100);
  });
});

// ============cafe
mock.onGet('/api/cafe/theme/1').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          cafeId: 1,
          regionId: 'D206',
          address: '대구 중구 동성로6길 36',
          brandId: 1,
          brandName: '황금열쇠', // 브랜드 없을 경우 null
          branchName: '동성로점',
          tel: '053-252-4645',
          link: 'http://황금열쇠.com',
          latitude: 37.3,
          longitude: 128.39393,
        },
      ]);
    }, 500);
  });
});

mock.onGet('/api/cafe/search').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          cafeList: [
            {
              cafeId: 1,
              cafeName: '황금열쇠 더킹점',
            },
            {
              cafeId: 2,
              cafeName: '서울 이스케이프 룸',
            },
            {
              cafeId: 3,
              cafeName: '머더파커',
            },
          ],
        },
      ]);
    }, 100);
  });
});

mock.onGet('/api/cafe').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          cafeList: [
            {
              cafeId: 1,
              brandId: 1,
              regionId: '1',
              address: '주소 1입니다',
              cafeName: '1번 카페입니다',
              latitude: 35.8664273,
              longitude: 128.5969341,
              themeCount: 1,
              themePoster: '/posters/last.png',
              reviewCount: 127,
            },
            {
              cafeId: 2,
              brandId: 1,
              regionId: '1',
              address: '주소 2입니다',
              cafeName: '2번 카페입니다',
              latitude: 37.2650820552658,
              longitude: 127.031792506338,
              themeCount: 1,
              themePoster: '/posters/last.png',
              reviewCount: 127,
            },
            {
              cafeId: 3,
              brandId: 1,
              regionId: '1',
              address: '주소 3입니다',
              cafeName: '3번 카페입니다',
              latitude: 35.1472632517458,
              longitude: 126.914468175904,
              themeCount: 1,
              themePoster: '/posters/heaven.png',
              reviewCount: 127,
            },
            {
              cafeId: 4,
              brandId: 1,
              regionId: '1',
              address: '주소 4입니다',
              cafeName: '4번 카페입니다',
              latitude: 35.1607306391844,
              longitude: 129.16247111338,
              themeCount: 1,
              themePoster: '/posters/지옥.png',
              reviewCount: 127,
            },
            {
              cafeId: 5,
              brandId: 1,
              regionId: '1',
              address: '주소 5입니다',
              cafeName: '5번 카페입니다',
              latitude: 36.3518799225033,
              longitude: 127.376208175404,
              themeCount: 1,
              themePoster: '/posters/필그림.png',
              reviewCount: 127,
            },
            {
              cafeId: 6,
              brandId: 1,
              regionId: '1',
              address: '주소 6입니다',
              cafeName: '6번 카페입니다',
              latitude: 37.3474662797341,
              longitude: 127.931838140374,
              themeCount: 1,
              themePoster: '/posters/badrobbad.png',
              reviewCount: 127,
            },
          ],
        },
      ]);
    }, 500);
  });
});

mock.onGet('/api/cafe/1').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          cafeId: 1,
          brandId: 1,
          regionId: 'D206',
          address: '대구 중구 ~~',
          cafeName: '황금열쇠 더킹점',
          tel: '010-0000-0000',
          link: '링크주소',
          latitude: 35.8664273,
          longitude: 128.5969341,
          openFlag: true,
          themeList: [
            {
              title: 'LAST',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              review: {
                count: 10,
                score: 4.5,
              },
              poster: '/posters/last.png',
              themeId: 1,
              member: {
                playFlag: true,
              },
            },
            {
              title: 'LAST2',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              review: {
                count: 10,
                score: 4.5,
              },
              poster: '/posters/last.png',
              themeId: 2,
              member: {
                playFlag: true,
              },
            },
            {
              title: 'LAST3',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              review: {
                count: 10,
                score: 4.5,
              },
              poster: '/posters/last.png',
              themeId: 3,
              member: {
                playFlag: true,
              },
            },
            {
              title: 'LAST4',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              review: {
                count: 10,
                score: 4.5,
              },
              poster: '/posters/last.png',
              themeId: 4,
              member: {
                playFlag: true,
              },
            },
            {
              title: 'LAST5',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              review: {
                count: 10,
                score: 4.5,
              },
              poster: '/posters/last.png',
              themeId: 5,
              member: {
                playFlag: true,
              },
            },
            {
              title: 'LAST6',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              review: {
                count: 10,
                score: 4.5,
              },
              poster: '/posters/last.png',
              themeId: 6,
              member: {
                playFlag: true,
              },
            },
            {
              title: 'LAST7',
              playtime: 80,
              genreList: ['스토리', '드라마'],
              review: {
                count: 10,
                score: 4.5,
              },
              poster: '/posters/last.png',
              themeId: 7,
              member: {
                playFlag: true,
              },
            },
          ],
        },
      ]);
    }, 500);
  });
});

// ============review
mock.onGet('/api/review').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          content: [
            {
              reviewId: 4,
              member: {
                memberId: 1,
                memberName: '유저명',
                memberProfile: '/profiles/profile4.png',
              },
              content: '리뷰 1의 내용입니다.',
              score: 2,
              thumbsUp: 5,
              updatedAt: '2022-08-30 15:40',
            },
            {
              reviewId: 4,
              member: {
                memberId: 1,
                memberName: '유저명',
                memberProfile: '/profiles/profile2.png',
              },
              content: '내용',
              score: 5,
              thumbsUp: 5,
              updatedAt: '2024-07-30 15:40',
            },
          ],
          pageNumber: 0,
          pageSize: 10,
          totalPage: 10,
          totalElements: 99,
        },
      ]);
    }, 500);
  });
});

//========================== chatList mock
mock.onGet('/api/party').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          content: [
            {
              partyId: 1,
              roomName: '헐 같이해요',
              theme: {
                themeId: 1,
                poster: '/posters/badrobbad.png',
                title: 'Bad Rob Bad',
                playtime: 80,
                genreList: ['스토리', '드라마'],
                regionId: '111000000',
                review: {
                  count: 10,
                  score: 4.5,
                },
                cafe: {
                  cafeId: 34,
                  brandName: '제로월드',
                  branchName: '강남점',
                  cafeName: '제로월드 강남점',
                  address: '주소',
                },
              },
              date: '2024-10-24 18:00',
              memberCount: '2',
              maxMember: '3',
              hashtags: [
                {
                  hashtagId: 4,
                  hashtagName: '즐겨요',
                },
              ],
            },
            {
              partyId: 2,
              roomName: '멤버 급구요',
              theme: {
                themeId: 2,
                poster: '/posters/heaven.png',
                title: 'Heaven',
                playtime: 80,
                genreList: ['공포', '미스터리', '추리'],
                regionId: '111000001',
                review: {
                  count: 127,
                  score: 4.7,
                },
                cafe: {
                  cafeId: 35,
                  brandName: '넥스트 에디션',
                  branchName: '건대2호점',
                  cafeName: '넥스트 에디션 - 건대2호점',
                  address: '서울특별시 광진구 화양동 123-45',
                },
              },
              date: '2024-10-24 17:30',
              memberCount: '1',
              maxMember: '5',
              hashtags: [
                {
                  hashtagId: 3,
                  hashtagName: '신나는',
                },
              ],
            },
            {
              partyId: 3,
              roomName: '뉴비만 오세요',
              theme: {
                themeId: 3,
                poster: '/posters/지옥.png',
                title: '지옥',
                playtime: 80,
                genreList: ['공포', '스릴러'],
                regionId: '111000002',
                review: {
                  count: 50,
                  score: 4.2,
                },
                cafe: {
                  cafeId: 36,
                  brandName: '황금열쇠',
                  branchName: '동성로점',
                  cafeName: '황금열쇠 동성로점',
                  address: '대구광역시 중구 동성로 567',
                },
              },
              date: '2024-10-24 17:00',
              memberCount: '3',
              maxMember: '5',
              hashtags: [
                {
                  hashtagId: 1,
                  hashtagName: '초보환영',
                },
              ],
            },
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 5,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false,
            },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalPages: 1,
          totalElements: 3,
          first: true,
          size: 5,
          number: 0,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false,
          },
          numberOfElements: 3,
          empty: false,
        },
      ]);
    }, 100);
  });
});

//=============history
mock.onGet('/api/history').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          historyList: [
            {
              historyId: 1,
              theme: {
                themeId: 1,
                title: '냥탐정 셜록 캣',
                cafeName: '황금열쇠 더킹점',
                poster: '/posters/냥탐정셜록캣.png',
              },
              date: '2024-08-17 15:00',
              memberPlayTime: 2848,
              hintCount: 2,
              updatedAt: '2024-07-30 15:40',
            },
            {
              historyId: 2,
              theme: {
                themeId: 2,
                title: 'Heaven',
                cafeName: '황금열쇠 더킹점',
                poster: '/posters/heaven.png',
              },
              date: '2024-09-22 15:00',
              memberPlayTime: 2848,
              hintCount: 3,
              updatedAt: '2024-07-30 15:40',
            },
            {
              historyId: 3,
              theme: {
                themeId: 3,
                title: '지옥',
                cafeName: '황금열쇠 더킹점',
                poster: '/posters/지옥.png',
              },
              date: '2024-09-13 15:00',
              memberPlayTime: 2848,
              hintCount: 5,
              updatedAt: '2024-07-30 15:40',
            },
            {
              historyId: 4,
              theme: {
                themeId: 4,
                title: '필그림',
                cafeName: '황금열쇠 더킹점',
                poster: '/posters/필그림.png',
              },
              date: '2024-09-26 15:00',
              memberPlayTime: 2848,
              hintCount: 1,
              updatedAt: '2024-07-30 15:40',
            },
            {
              historyId: 5,
              theme: {
                themeId: 5,
                title: 'LAST',
                cafeName: '황금열쇠 더킹점',
                poster: '/posters/last.png',
              },
              date: '2024-09-01 15:00',
              memberPlayTime: 2848,
              hintCount: 0,
              updatedAt: '2024-07-30 15:40',
            },
          ],
        },
      ]);
    }, 500);
  });
});

mock.onGet('/api/history/1').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        {
          historyId: 1,
          themeId: 1,
          date: '2024-09-30 14:00',
          hintCount: 3,
          content:
            '진짜 너무 재미있어서 또 가고 싶어요 진짜로 정말로요. 진짜 너무 재미있어서 또 가고 싶어요 진짜로 정말로요. 진짜 너무 재미있어서 또 가고 싶어요 진짜로 정말로요. 진짜 너무 재미있어서 또 가고 싶어요 진짜로 정말로요. 진짜 너무 재미있어서 또 가고 싶어요 진짜로 정말로요.',
          memberLevel: 3,
          memberPlayTime: 2700,
          players: 3,
          price: 20000,
          successFlag: true,
          updatedAt: '2024-07-30 15:40',
          cafeName: '황금열쇠 더킹점',
        },
      ]);
    }, 500);
  });
});

mock.onPost('/api/history').reply((config) => {
  console.log(config.data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200]);
    }, 500);
  });
});

mock.onPatch('/api/history/1').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200]);
    }, 500);
  });
});

mock.onDelete('/api/history/1').reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200]);
    }, 500);
  });
});
