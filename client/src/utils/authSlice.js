import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Import the js-cookie library

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null, // Get the token from a cookie
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      // Set the token in a cookie when logging in
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
