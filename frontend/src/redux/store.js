import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import api from "./api/api";
import miscSlice from "./slices/misc.slice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});

export default store;
