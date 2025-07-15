import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice/authSlice";
import { productSlice } from "./productsSlice/productSlice";
import { categorySlice } from "./categorySlice/categorySlice";
import { applicationSlice } from "./application/applicationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    category: categorySlice.reducer,
    application: applicationSlice.reducer,
  },
});
