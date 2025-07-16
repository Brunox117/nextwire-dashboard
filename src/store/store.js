import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice/authSlice";
import { productSlice } from "./productsSlice/productSlice";
import { applicationSlice } from "./applicationSlice/applicationSlice";
import { familySlice } from "./familySlice/familySlice";
import { categorySlice } from "./categorySlice/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    application: applicationSlice.reducer,
    family: familySlice.reducer,
    category: categorySlice.reducer,
  },
});
