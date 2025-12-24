import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, LoginRequest } from "../../api/auth.api";

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      return await loginRequest(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);
