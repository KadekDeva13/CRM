import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Types biar aman di TSX
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
