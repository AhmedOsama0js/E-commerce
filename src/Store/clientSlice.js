import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const access_token = Cookies.get("access_token");

const initState = {
  records: [],
  loading: false,
  error: false,
  complete: false,
};

export const getClients = createAsyncThunk(
  "clients/getClients",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get("http://localhost:8008/api/v1/users", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteClients = createAsyncThunk(
  "clients/deleteClients",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8008/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const addUser = createAsyncThunk(
//   "clients/addUser",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8008/api/v1/users",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const editClients = createAsyncThunk(
//   "brands/editBrand",
//   async ([id, formData], thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const response = await fetch(`http://localhost:8008/api/v1/users/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Failed to edit addClients item");
//       }
//       const data = await response.json();

//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

const clientsSlice = createSlice({
  name: "clients",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getClients.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch addClients. Please try again.";
      })
      //  delete
      .addCase(deleteClients.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.complete = false;
      })
      .addCase(deleteClients.fulfilled, (state, action) => {
        state.loading = false;
        state.records.data = state.records.data.filter(
          (e) => e._id !== action.payload
        );
        state.complete = true;
      })
      .addCase(deleteClients.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error: ${action.payload}`;
        state.complete = false;
      });
    // // ADD
    // .addCase(addClients.pending, (state) => {
    //   state.loading = true;
    //   state.error = false;
    //   state.complete = false;
    // })
    // .addCase(addClients.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.records.data = [...state.records.data, action.payload];
    //   state.complete = true;
    // })
    // .addCase(addClients.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = ` Error: ${action.payload}`;
    //   state.complete = false;
    // })
    // // edit
    // .addCase(editClients.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.complete = false;
    // })
    // .addCase(editClients.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.records.data = state.records.data.map((item) =>
    //     item?._id === action.payload.data?._id
    //       ? { ...item, ...action.payload }
    //       : item
    //   );
    //   state.complete = true;
    // })
    // .addCase(editClients.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = `Error: ${action.payload}`;
    //   state.complete = false;
    // });
  },
});

export default clientsSlice.reducer;
