import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import productReducer from "./productSlice";
import clientReducer from "./clientSlice";
import subcategoryReducer from "./subcategorySlice";
import meReducer from "./getMeSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    subcategory: subcategoryReducer,
    brand: brandReducer,
    product: productReducer,
    client: clientReducer,
    auth: authReducer,
    me: meReducer,
  },
});

export default store;
