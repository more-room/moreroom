import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_BASE_URL
      : process.env.REACT_APP_API_BASE_URL,
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
    const regex = /^(\/(login|signup))(\/.*)?$/;
    if (regex.test(window.location.pathname)) {
      window.location.href = '/';
    }
    return response;
  },
  (error) => {
    if (error.response.status === 400) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
