import { createSlice } from "@reduxjs/toolkit";

import type { Kyc } from "../types/kyc.types";

import {
  fetchKyc,
  createKyc,
  editKyc,
} from "./kycThunks";

interface KycState {
  kyc: Kyc | null;

  loading: boolean;

  error: string | null;
}

const initialState: KycState = {
  kyc: null,

  loading: false,

  error: null,
};

const kycSlice = createSlice({
  name: "kyc",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchKyc.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchKyc.fulfilled, (state, action) => {
        state.loading = false;

        state.kyc = action.payload.kyc;

        state.error = null;
      })

      .addCase(fetchKyc.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      .addCase(createKyc.fulfilled, (state, action) => {
        state.kyc = action.payload.kyc;
      })

      .addCase(editKyc.fulfilled, (state, action) => {
        state.kyc = action.payload.kyc;
      });
  },
});

export default kycSlice.reducer;