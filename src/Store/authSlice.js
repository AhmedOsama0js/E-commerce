import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initState = {
  records: [],
  loading: false,
  error: false,
  complete: false,
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
        state.complete = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
        state.complete = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload.message || action.payload}`;
        state.complete = false;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.complete = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.records = action.payload;
        state.complete = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload.message || action.payload}`;
        state.complete = false;
      });
  },
});

export default authSlice.reducer;
