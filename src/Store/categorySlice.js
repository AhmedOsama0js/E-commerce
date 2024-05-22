import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const access_token = () => Cookies.get("access_token");

const initState = {
  records: [],
  loading: false,
  error: false,
  complete: false,
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:8008/api/v1",
  // headers: { Authorization: `Bearer ${access_token()}` },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = access_token();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/categories", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ([id, formData], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(getCategory.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch categories. Please try again.";
      })
      //  delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.filter(
          (e) => e._id !== action.payload
        );
        state.complete = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload.message}`;
        state.complete = false;
      })
      // add
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = [...state.records.data, action.payload];
        state.complete = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.payload}`;
        state.complete = false;
      })
      // edit
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.map((item) =>
          item?._id === action.payload.data?._id ? action.payload : item
        );
        state.complete = true;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload}`;
        state.complete = false;
      });
  },
});

export default categorySlice.reducer;
