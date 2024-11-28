import axios, { AxiosError } from 'axios';
import { ERROR_REFRESH_TOKEN } from './constants/errorConstants';
import { ApiPath } from './constants/textConstants';

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
    const refToken = localStorage.getItem('refresh');
    if (
      (errResponse?.status === 401 || errResponse?.status === 403) &&
      !originalRequest._retry &&
      refToken !== 'undefined' &&
      refToken !== null
    ) {
      originalRequest._retry = true;
      try {
        console.log('here');

        const response = await axiosToken.post(ApiPath.refreshToken, {
          refresh_token: refToken,
        });
        const { access_token, refresh_token } = response.data;
        if (access_token === 'undefined') {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
        }

        localStorage.setItem('access', access_token);
        localStorage.setItem('refresh', refresh_token);

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${access_token}`;

        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        console.error(ERROR_REFRESH_TOKEN, refreshErr);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);
