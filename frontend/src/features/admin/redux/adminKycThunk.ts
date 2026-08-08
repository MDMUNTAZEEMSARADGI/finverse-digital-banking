import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllKyc, approveKyc, rejectKyc } from "../api/adminKyc.api";

export const fetchAdminKyc = createAsyncThunk(
  "adminKyc/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getAllKyc();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load KYC applications",
      );
    }
  },
);

export const approveAdminKyc = createAsyncThunk(
  "adminKyc/approve",
  async (id: string, thunkAPI) => {
    try {
      return await approveKyc(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to approve KYC",
      );
    }
  },
);

export const rejectAdminKyc = createAsyncThunk(
  "adminKyc/reject",
  async (data: { id: string; reason: string }, thunkAPI) => {
    try {
      return await rejectKyc(data.id, data.reason);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reject KYC",
      );
    }
  },
);
