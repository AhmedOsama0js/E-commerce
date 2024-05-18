import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

// Actions to reset completeSignup and completeLogin
const resetCompleteSignup = createAction("auth/resetCompleteSignup");
const resetCompleteLogin = createAction("auth/resetCompleteLogin");

const initState = {
  records: [],
  loading: false,
  error: false,
  completeSignup: false,
  completeLogin: false,
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const response = await axios.post(
      "http://localhost:8008/api/v1/auth/login",
      user
    );
    dispatch(scheduleResetCompleteLogin());
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "An error occurred";
    return rejectWithValue(errorMessage);
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:8008/api/v1/auth/signup",
        user
      );
      dispatch(scheduleResetCompleteSignup());
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        error.response.data ||
        "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunks to schedule the reset of completeSignup and completeLogin
export const scheduleResetCompleteSignup = createAsyncThunk(
  "auth/scheduleResetCompleteSignup",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    setTimeout(() => {
      dispatch(resetCompleteSignup());
    }, 7000);
  }
);

export const scheduleResetCompleteLogin = createAsyncThunk(
  "auth/scheduleResetCompleteLogin",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    setTimeout(() => {
      dispatch(resetCompleteLogin());
    }, 7000);
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
        state.error = `Error: ${action.payload}`;
        state.completeLogin = false;
      })
      .addCase(resetCompleteLogin, (state) => {
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
        state.error = `Error: ${action.payload}`;
        state.completeSignup = false;
      })
      .addCase(resetCompleteSignup, (state) => {
        state.completeSignup = false;
      });
  },
});

export default authSlice.reducer;
