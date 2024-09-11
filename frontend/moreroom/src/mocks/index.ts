import AxiosMockAdapter from 'axios-mock-adapter';
import { api } from '../apis/interceptors';

export const mock = new AxiosMockAdapter(api);

mock.onGet('/test').reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        [
          { id: 1, name: '테스트용 1' },
          { id: 2, name: '테스트용 2' },
          { id: 3, name: '테스트용 3' },
        ],
      ]);
    }, 1000);
  });
});
