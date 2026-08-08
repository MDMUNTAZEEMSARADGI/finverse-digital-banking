import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getMyKyc,
  submitKyc,
  updateKyc,
} from "../api/kyc.api";

export const fetchKyc = createAsyncThunk(
  "kyc/fetch",
  async (_, thunkAPI) => {
    try {
      return await getMyKyc();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ??
        "Unable to fetch KYC"
      );
    }
  }
);

export const createKyc = createAsyncThunk(
  "kyc/create",
  async (data: any, thunkAPI) => {
    try {
      return await submitKyc(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ??
        "Unable to submit KYC"
      );
    }
  }
);

export const editKyc = createAsyncThunk(
  "kyc/update",
  async (data: any, thunkAPI) => {
    try {
      return await updateKyc(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ??
        "Unable to update KYC"
      );
    }
  }
);