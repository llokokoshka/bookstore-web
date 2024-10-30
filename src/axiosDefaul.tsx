import axios from 'axios';

import { refreshToken } from './actions/authActions';

export const requestPackage = axios.create({
  baseURL: 'http://localhost:4000',
});

requestPackage.defaults.headers.post['Content-Type'] = 'application/json';

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
  async function (error) {
    const req = error.config;
    if (error.response.status === 401 && !req._retry) {
      try {
        const refToken = localStorage.getItem('refresh');
        req._retry = true;
        if (refToken) {
          const token = await refreshToken(refToken);
          if (token) {
            req.headers['Authorization'] = `Bearer ${token}`;
            return requestPackage(req);
          }
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
