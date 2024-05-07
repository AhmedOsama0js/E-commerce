import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initState = {
  records: [],
  loading: false,
  error: false,
  complete: false,
};

const access_token = Cookies.get("access_token");

export const getMe = createAsyncThunk("me/getMe", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(
      "http://localhost:8008/api/v1/users/getMe",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editMyData = createAsyncThunk(
  "me/editMyData",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.patch(
        "http://localhost:8008/api/v1/users/updateMe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "me",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getMe
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.complete = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
        state.complete = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload.message || action.payload}`;
        state.complete = false;
      })
      // edit
      .addCase(editMyData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(editMyData.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data ={...state.records.data ,...action.payload};
        state.complete = true;
      })
      .addCase(editMyData.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload}`;
        state.complete = false;
      });
  },
});

export default authSlice.reducer;
