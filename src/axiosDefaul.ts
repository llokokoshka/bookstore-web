import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ERROR_REFRESH_TOKEN } from './constants/errorConstants';
import { ApiPath } from './constants/textConstants';

let isRefresh = false;
let requestQueue: Array<{
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (err?: any) => void;
  config: AxiosRequestConfig;
}> = [];

const processQueue = (error: any) => {
  requestQueue.forEach((action) => {
    if (error) {
      action.reject(error);
    } else {
      action.resolve(axiosInstance(action.config));
    }
  });
  requestQueue = [];
};

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
      refToken
    ) {
      if (isRefresh) {
        return new Promise((resolve, reject) => {
          requestQueue.push({ resolve, reject, config: originalRequest });
        });
      }
      originalRequest._retry = true;
      isRefresh = true;

      try {
        const response = await axiosToken.post(ApiPath.refreshToken, {
          refresh_token: refToken,
        });

        const { access_token, refresh_token } = response.data;

        if (access_token === 'undefined' || access_token === null) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
        } else {
          localStorage.setItem('access', access_token);
          localStorage.setItem('refresh', refresh_token);

          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${access_token}`;

          processQueue(null);
          return axiosInstance(originalRequest);
        }
      } catch (refreshErr) {
        processQueue(refreshErr);
        console.error(ERROR_REFRESH_TOKEN, refreshErr);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        return Promise.reject(refreshErr);
      } finally {
        isRefresh = false;
      }
    }
    return Promise.reject(error);
  }
);
