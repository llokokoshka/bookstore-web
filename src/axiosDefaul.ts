import axios, { AxiosError } from 'axios';
import { ERROR_REFRESH_TOKEN } from './constants/errorConstants';

// import { getUserApi } from './store/thunk';
// import { getUserF } from './api/authApi';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosToken = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error: AxiosError) {
    const originalRequest = error.config as AxiosError['config'] & {
      _retry: boolean;
    };
    const errResponse = error.response as AxiosError['response'];
    if (
      (errResponse?.status === 401 || errResponse?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refToken = localStorage.getItem('refresh');

        const response = await axiosToken.post('/auth/refresh-token', {
          refresh_token: refToken,
        });
        const { access_token, refresh_token } = response.data;

        localStorage.setItem('access', access_token);
        localStorage.setItem('refresh', refresh_token);

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${access_token}`;

        // const user = getUserApi();
        // console.log('user in refresh token function ', user);

        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        console.error(ERROR_REFRESH_TOKEN, refreshErr);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        window.location.href = '/';
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);
