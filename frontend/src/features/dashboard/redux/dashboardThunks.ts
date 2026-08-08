import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAccounts } from "../../account/api/account.api";
import { getTransactions } from "../../transaction/api/transaction.api";
import { getNotifications } from "../../notification/api/notification.api";
import { getMyKyc } from "../../kyc/api/kyc.api";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      const [accountsRes, transactionsRes, notificationsRes, kycRes] =
        await Promise.all([
          getAccounts(),
          getTransactions(),
          getNotifications(),
          getMyKyc().catch(() => null),
        ]);

      const accounts = accountsRes.accounts;

      const totalBalance = accounts.reduce(
        (sum, account) => sum + account.balance,
        0,
      );

      return {
        accounts,
        transactions: transactionsRes.transactions,
        notifications: notificationsRes.notifications,
        kyc: kycRes?.kyc ?? null,
        totalBalance,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to load dashboard",
      );
    }
  },
);
