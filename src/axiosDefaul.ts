import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserF, RefTokenF } from './actions/authActions';
import { addUser } from './store/authSlice';
import { useAppDispatch } from './hooks';

export const axiosInstance = axios.create({
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
    const navigate = useNavigate();

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
        RefTokenF();
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
