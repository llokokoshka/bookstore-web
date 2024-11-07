import { createSlice } from '@reduxjs/toolkit';

import { getUserApi, loginUser, regUser } from './thunk';
import { AuthState } from '../lib/types';

const initialState: AuthState = {
  user: null,
  error: null,
  load: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
    addUser: (state, action) => {
      const user = action.payload.user;
      state.load = false;
      state.user = user;
    },
    setUser: (state, action) => {
      if (state.user) {
        if (action.payload.avatar) {
          state.user.avatar = action.payload.avatar;
        }
        if (action.payload.password) {
          state.user.password = action.payload.password;
        }
        if (action.payload.fullName) {
          state.user.fullName = action.payload.fullName;
        }
        if (action.payload.email) {
          state.user.email = action.payload.email;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.load = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.load = false;
        state.user = action.payload.user;
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.load = false;
        state.error = action.payload as string;
      })
      .addCase(regUser.pending, (state) => {
        state.load = true;
        state.error = null;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.load = false;
        state.user = action.payload.user;
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(regUser.rejected, (state, action) => {
        state.load = false;
        state.error = action.payload as string;
      })
      .addCase(getUserApi.pending, (state) => {
        state.load = true;
        state.error = null;
      })
      .addCase(getUserApi.fulfilled, (state, action) => {
        state.load = false;
        state.user = action.payload.user;
        console.log('Данные пользователя в слайсе: ', action.payload);
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(getUserApi.rejected, (state, action) => {
        state.load = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, addUser, setUser } = authSlice.actions;

export default authSlice.reducer;
