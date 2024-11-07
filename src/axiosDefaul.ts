import axios, { AxiosError } from 'axios';

// import { getUserF } from './api/authApi';
import { getUserApi } from './store/thunk';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosToken = axios.create({
  baseURL: 'http://localhost:4000',
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
        console.log('in interceptor');
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

        const user = getUserApi();
        console.log('user in refresh token function ', user);

        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        console.error('Token refresh failed:', refreshErr);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        window.location.href = '/sign-in';
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);
