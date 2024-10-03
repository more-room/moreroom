import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? ''
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

const loginReg = /^(\/(login))(\/.*)?$/;
const signupReg = /^(\/(signup))(\/.*)?$/;
const chatReg = /^(\/(chating))(\/.*)?$/;

api.interceptors.response.use(
  (response) => {
    if (loginReg.test(window.location.pathname)) {
      window.location.href = '/';
    }
    return response;
  },
  (error) => {
    if (error.response.status === 400) {
      if (
        !loginReg.test(window.location.pathname) &&
        !signupReg.test(window.location.pathname) &&
        !chatReg.test(window.location.pathname)
      ) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
