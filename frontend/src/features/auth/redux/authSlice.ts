import { createSlice } from "@reduxjs/toolkit";

import { loginUser, registerUser, loadUser } from "./authThunks";

import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,

  token: localStorage.getItem("accessToken"),

  loading: false,

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.user = null;

      state.token = null;

      state.loading = false;
      state.error = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers(builder) {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.accessToken;

        localStorage.setItem("accessToken", action.payload.accessToken);

        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.accessToken;

        localStorage.setItem("accessToken", action.payload.accessToken);

        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.error = null;
      })

      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;

        state.user = null;

        state.token = null;

        state.error = action.payload as string;

        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
