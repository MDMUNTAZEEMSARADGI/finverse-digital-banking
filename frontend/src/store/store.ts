import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/redux/authSlice";

import accountReducer from "../features/account/redux/accountSlice";

export const store = configureStore({
 reducer: {
    auth: authReducer,
    accounts: accountReducer,
},
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;