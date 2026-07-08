import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAccounts,
  createAccount,
} from "./accountThunk";

import type { Account } from "../types/account.types";

interface AccountState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "accounts",

  initialState,

  reducers: {},

  extraReducers(builder) {
    builder

      // Fetch Accounts

      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.accounts;
      })

      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Account

      .addCase(createAccount.pending, (state) => {
        state.loading = true;
      })

      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.push(action.payload.account);
      })

      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default accountSlice.reducer;