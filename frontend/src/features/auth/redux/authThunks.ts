import { createAsyncThunk } from "@reduxjs/toolkit";

import { login, register } from "../api/auth.api";

import { getProfile } from "../api/profile.api";

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

export const loadUser = createAsyncThunk(
  "auth/loadUser",

  async (_, thunkAPI) => {
    try {
      return await getProfile();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ??
        "Unable to load user"
      );
    }
  }
);

