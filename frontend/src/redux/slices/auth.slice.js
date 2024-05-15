import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // *** User Registration ***
    registerUserRequest: (state) => {
      state.isLoading = true;
    },
    registerUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    registerUserFail: (state) => {
      state.user = null;
      state.isLoading = false;
    },

    // *** User Login ***
    loginUserRequest: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    loginUserFail: (state) => {
      state.user = null;
      state.isLoading = false;
    },

    // *** User Get ***
    getUserRequest: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    getUserFail: (state) => {
      state.user = null;
      state.isLoading = false;
    },

    // *** User Logout ***
    logoutUserRequest: (state) => {
      state.isLoading = true;
    },
    logoutUserSuccess: (state) => {
      state.user = null;
      state.isLoading = false;
    },
    logoutUserFail: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice;
export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  userLogoutRequest,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFail,
} = authSlice.actions;
