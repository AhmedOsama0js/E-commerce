import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initState = {
  records: [],
  loading: false,
  error: false,
  completeSignup: false,
  completeLogin: false,
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post(
      "http://localhost:8008/api/v1/auth/login",
      user
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:8008/api/v1/auth/signup",
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.completeLogin = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
        state.completeLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload.message || action.payload}`;
        state.completeLogin = false;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.completeSignup = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.records = action.payload;
        state.completeSignup = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload.message || action.payload}`;
        state.completeSignup = false;
      });
  },
});

export default authSlice.reducer;
