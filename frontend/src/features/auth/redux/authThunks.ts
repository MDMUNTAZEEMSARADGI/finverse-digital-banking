import { createAsyncThunk } from "@reduxjs/toolkit";

import { login, register } from "../api/auth.api";

import type {
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

export const loginUser = createAsyncThunk(
  "auth/login",

  async (data: LoginRequest, thunkAPI) => {
    try {
      return await login(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",

  async (data: RegisterRequest, thunkAPI) => {
    try {
      return await register(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  }
);