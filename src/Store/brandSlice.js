import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const access_token = ()=> Cookies.get("access_token");

const initialState = {
  records: [],
  loading: false,
  error: false,
  complete: false,
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:8008/api/v1",
  headers: { Authorization: `Bearer ${access_token()}` },
});

export const getBrand = createAsyncThunk(
  "brands/getBrand",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.get("/brands");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axiosInstance.delete(`/brands/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBrand = createAsyncThunk(
  "brands/addBrand",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.post("/brands", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editBrand = createAsyncThunk(
  "brands/editBrand",
  async ([id, formData], thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.put(`/brands/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const brandSlice = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getBrand.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch brand. Please try again.";
      })
      
      //  delete
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.complete = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.filter(
          (e) => e._id !== action.payload
        );
        state.complete = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload}`;
        state.complete = false;
      })
      // ADD
      .addCase(addBrand.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.complete = false;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = [...state.records.data, action.payload];
        state.complete = true;
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = ` Error: ${action.payload}`;
        state.complete = false;
      })
      // edit
      .addCase(editBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(editBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.map((item) =>
          item?._id === action.payload.data?._id
            ? { ...item, ...action.payload }
            : item
        );
        state.complete = true;
      })
      .addCase(editBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload}`;
        state.complete = false;
      });
  },
});

export default brandSlice.reducer;
