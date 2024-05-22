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

export const getSubcategory = createAsyncThunk(
  "subcategory/getSubcategory",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/Subcategories");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteSubcategory = createAsyncThunk(
  "subcategory/deleteSubcategory",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/Subcategories/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addSubcategory = createAsyncThunk(
  "subcategory/addSubcategory",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/Subcategories", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editSubcategory = createAsyncThunk(
  "subcategory/editSubcategory",
  async ([id, formData], thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/Subcategories/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(getSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
        state.complete = false;
      })
      .addCase(getSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch Subcategory. Please try again.";
        state.complete = false;
      })
      //  delete
      .addCase(deleteSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.filter(
          (e) => e._id !== action.payload
        );
        state.complete = true;
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload.message}`;
        state.complete = false;
      }) // add
      .addCase(addSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = [...state.records.data, action.payload];
        state.complete = true;
      })
      .addCase(addSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.payload}`;
        state.complete = false;
      })
      // edit
      .addCase(editSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complete = false;
      })
      .addCase(editSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.map((item) =>
          item._id === action.payload.data._id ? action.payload : item
        );
        state.complete = true;
      })
      .addCase(editSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.payload}`;
        state.complete = false;
      });
  },
});

export default subcategorySlice.reducer;
