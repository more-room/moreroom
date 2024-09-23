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
