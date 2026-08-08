import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/redux/authSlice";

import accountReducer from "../features/account/redux/accountSlice";

import transactionReducer from "../features/transaction/redux/transactionSlice";

import statementReducer from "../features/statements/redux/statementSlice";

import notificationReducer from "../features/notification/redux/notificationSlice";

import kycReducer from "../features/kyc/redux/kycSlice";

import dashboardReducer from "../features/dashboard/redux/dashboardSlice";

import adminKycReducer from "../features/admin/redux/adminKycSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
    statements: statementReducer,
    notifications: notificationReducer,
    kyc: kycReducer,
    dashboard: dashboardReducer,
    adminKyc: adminKycReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
