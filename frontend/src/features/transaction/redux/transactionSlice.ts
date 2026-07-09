import { createSlice } from "@reduxjs/toolkit";

import {
  fetchTransactions,
  depositMoney,
  withdrawMoney,
  transferMoney,
} from "./transactionThunk";

import type { Transaction } from "../types/transaction.types";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",

  initialState,

  reducers: {},

  extraReducers(builder) {
    builder

      // Fetch History

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
      })

      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Deposit

      .addCase(depositMoney.pending, (state) => {
        state.loading = true;
      })

      .addCase(depositMoney.fulfilled, (state, action) => {
        state.loading = false;

        state.transactions.unshift(action.payload.transaction);
      })

      .addCase(depositMoney.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      // Withdraw

      .addCase(withdrawMoney.pending, (state) => {
        state.loading = true;
      })

      .addCase(withdrawMoney.fulfilled, (state, action) => {
        state.loading = false;

        state.transactions.unshift(action.payload.transaction);
      })

      .addCase(withdrawMoney.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      // Transfer

      .addCase(transferMoney.pending, (state) => {
        state.loading = true;
      })

      .addCase(transferMoney.fulfilled, (state, action) => {
        state.loading = false;

        state.transactions.unshift(action.payload.transaction);
      })

      .addCase(transferMoney.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;