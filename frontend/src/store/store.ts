import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/redux/authSlice";

import accountReducer from "../features/account/redux/accountSlice";

import transactionReducer from "../features/transaction/redux/transactionSlice";

import statementReducer from "../features/statements/redux/statementSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
    statements: statementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
