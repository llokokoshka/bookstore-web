import { createSlice } from '@reduxjs/toolkit';

import { loginUser, regUser, getUser } from './authThunk';
import { IAuthState } from '../../lib/authTypes';

const initialState: IAuthState = {
  user: null,
  error: null,
  loading: false,
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
      state.loading = false;
      state.user = user;
    },
    setUser: (state, action) => {
      if (state.user) {
        if (action.payload.avatar) {
          state.user.avatar = action.payload.avatar;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(regUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(regUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export const { logout, addUser, setUser } = authSlice.actions;

export default authSlice.reducer;
