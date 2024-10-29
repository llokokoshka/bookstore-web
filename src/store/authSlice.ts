import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../actions/authActions';
import { refreshToken } from '../actions/authActions';
import { regUser } from '../actions/regActions';
import { AuthState } from '../lib/actionTypes';

const initialState: AuthState = {
  user: null,
  access_token: localStorage.getItem('access'),
  refresh_token: localStorage.getItem('refresh'),
  error: null,
  load: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
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
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.load = false;
        state.error = action.payload as string;
      })
      .addCase(refreshToken.pending, (state) => {
        state.load = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.load = false;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.load = false;
        state.error = action.payload as string;
      })
      .addCase(regUser.pending, (state) => {
        state.load = true;
        state.error = null;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.load = false;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.user = action.payload.user;
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(regUser.rejected, (state, action) => {
        state.load = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
