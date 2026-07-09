import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { getStatement } from "../api/statement.api";

export const fetchStatement = createAsyncThunk(
  "statements/fetch",

  async (accountId: string, thunkAPI) => {
    try {
      return await getStatement(accountId);
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message ??
          "Unable to fetch statement"
      );
    }
  }
);