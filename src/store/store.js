import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice/authSlice";
import { productSlice } from "./productsSlice/productSlice";
import { categorySlice } from "./categorySlice/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    category: categorySlice.reducer,
  },
});
