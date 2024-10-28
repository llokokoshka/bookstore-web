import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  load: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
//   extraReducers{}
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
