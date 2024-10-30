import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../actions/authActions';
import { getUser } from '../actions/authActions';
import { regUser } from '../actions/regActions';
import { AuthState } from '../lib/actionTypes';

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
        console.log(action.payload.user);
        localStorage.setItem('access', action.payload.access_token);
        localStorage.setItem('refresh', action.payload.refresh_token);
      })
      .addCase(regUser.rejected, (state, action) => {
        state.load = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, addUser } = authSlice.actions;

export default authSlice.reducer;
