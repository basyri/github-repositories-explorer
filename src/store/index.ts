import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import repoReducer from "./repo/repo.slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    repos: repoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
