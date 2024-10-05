import { api } from './interceptors';

export const postDeviceToken = (token: string) => {
  return api.post('/api/fcm/register', {
    token: token,
  });
};
