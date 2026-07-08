import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAccounts,
  openAccount,
} from "../api/account.api";

import type {
  OpenAccountRequest,
} from "../types/account.types";

export const fetchAccounts =
  createAsyncThunk(
    "accounts/fetch",

    async (_, thunkAPI) => {
      try {
        return await getAccounts();
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to fetch accounts"
        );
      }
    }
  );

export const createAccount =
  createAsyncThunk(
    "accounts/open",

    async (
      data: OpenAccountRequest,
      thunkAPI
    ) => {
      try {
        return await openAccount(data);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to open account"
        );
      }
    }
  );