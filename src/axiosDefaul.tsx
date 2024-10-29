import axios from 'axios';

import { store } from './store';
import { refreshToken } from './actions/authActions';
import { useAppDispatch } from './hooks';
import { logout } from './store/authSlice';

export const requestPackage = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
});

const token = localStorage.getItem('access');
requestPackage.defaults.headers.common['Authorization'] = `Bearer${token}`;
requestPackage.defaults.headers.post['Content-Type'] = 'application/json';

requestPackage.interceptors.request.use(async (config) => {
  const token = store.getState().auth.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

requestPackage.interceptors.response.use(
  (response) => response,
  async function (error) {
    const req = error.config;
    const dispatch = useAppDispatch();
    const refToken = store.getState().auth.refresh_token;
    if (error.response.status === 401 && refToken && !req._retry) {
      try {
        req._retry = true;
        const token = await dispatch(refreshToken(refToken));
        req.headers.Authorization = `Bearer ${token}`;
        return requestPackage(req);
      } catch (err) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);
