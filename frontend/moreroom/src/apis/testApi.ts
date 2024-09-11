import { api } from './interceptors';

export const testRequest = () => {
  return api.get('/test');
};
