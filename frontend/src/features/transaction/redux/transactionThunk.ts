import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  deposit,
  withdraw,
  transfer,
  getTransactions,
} from "../api/transaction.api";

import type {
  DepositRequest,
  WithdrawRequest,
  TransferRequest,
} from "../types/transaction.types";

export const depositMoney =
  createAsyncThunk(
    "transactions/deposit",

    async (
      data: DepositRequest,
      thunkAPI
    ) => {
      try {
        return await deposit(data);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Deposit failed"
        );
      }
    }
  );

export const withdrawMoney =
  createAsyncThunk(
    "transactions/withdraw",

    async (
      data: WithdrawRequest,
      thunkAPI
    ) => {
      try {
        return await withdraw(data);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Withdraw failed"
        );
      }
    }
  );

export const transferMoney =
  createAsyncThunk(
    "transactions/transfer",

    async (
      data: TransferRequest,
      thunkAPI
    ) => {
      try {
        return await transfer(data);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Transfer failed"
        );
      }
    }
  );

export const fetchTransactions =
  createAsyncThunk(
    "transactions/history",

    async (_, thunkAPI) => {
      try {
        return await getTransactions();
      } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
          
          return thunkAPI.rejectWithValue(
            axiosError.response?.data?.message ??
            "Unable to fetch transactions"
        );
      }
    }
  );