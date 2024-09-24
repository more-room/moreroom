import AxiosMockAdapter from 'axios-mock-adapter';
import { api } from '../apis/interceptors';
import { IThemeList, IThemeListItem } from '../types/themeTypes';

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
