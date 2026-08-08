import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAdminKyc,
  approveAdminKyc,
  rejectAdminKyc,
} from "./adminKycThunk";

import type { AdminKyc } from "../api/adminKyc.api";

interface AdminKycState {
  kycs: AdminKyc[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminKycState = {
  kycs: [],
  loading: false,
  error: null,
};

const adminKycSlice = createSlice({
  name: "adminKyc",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminKyc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminKyc.fulfilled, (state, action) => {
        state.loading = false;
        state.kycs = action.payload.kycs;
      })

      .addCase(fetchAdminKyc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(approveAdminKyc.fulfilled, (state, action) => {
        const updated = action.payload.kyc;

        const index = state.kycs.findIndex((kyc) => kyc.id === updated.id);

        if (index !== -1) {
          state.kycs[index] = updated;
        }
      })

      .addCase(rejectAdminKyc.fulfilled, (state, action) => {
        const updated = action.payload.kyc;

        const index = state.kycs.findIndex((kyc) => kyc.id === updated.id);

        if (index !== -1) {
          state.kycs[index] = updated;
        }
      });
  },
});

export default adminKycSlice.reducer;
