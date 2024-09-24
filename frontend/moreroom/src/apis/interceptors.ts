import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? '' : 'https://j11d206.p.ssafy.io',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
