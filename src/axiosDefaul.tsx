import axios, { AxiosError } from 'axios';

import { refreshToken } from './actions/authActions';

export const requestPackage = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

requestPackage.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requestPackage.interceptors.response.use(
  (response) => response,
  async function (error: AxiosError) {
    const originalRequest = error.config as AxiosError['config'] & {
      _retry: boolean;
    };
    const errResponse = error.response as AxiosError['response'];
    console.log('orig req: ', originalRequest._retry);
    if (errResponse?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refToken = localStorage.getItem('refresh');
        if (refToken) {
          const token = await refreshToken(refToken);

          if (token) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;

            return requestPackage(originalRequest);
          }
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
