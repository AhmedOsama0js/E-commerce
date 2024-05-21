import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const access_token = () => Cookies.get("access_token");

const initState = { records: [], loading: false, error: null, complete: false };

const axiosInstance = axios.create({
  baseURL: "http://localhost:8008/api/v1",
  headers: {
    Authorization: `Bearer ${access_token()}`,
    "Content-Type": "multipart/form-data",
  },
});

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axiosInstance.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProducts = createAsyncThunk(
  "products/addProducts",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.post("/products", formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editProducts = createAsyncThunk(
  "products/editProducts",
  async ([id, formData], thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const productSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch Products. Please try again.";
      })
      // add
      .addCase(addProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.complete = false;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = [...state.records.data, action.payload];
        state.complete = true;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = ` Error: ${action.payload}`;
        state.complete = false;
      })
      //delete
      .addCase(deleteProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.filter(
          (e) => e._id !== action.payload
        );
        state.complete = true;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload.message}`;
        state.complete = false;
      })
      // edit
      .addCase(editProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(editProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.map((item) =>
          item._id === action.payload.data._id ? action.payload : item
        );
        state.complete = true;
      })
      .addCase(editProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.payload}`;
        state.complete = false;
      });
  },
});

export default productSlice.reducer;
