import { configureStore } from "@reduxjs/toolkit";
import cartslicesReducer from "./features/cartSlice";
import authApi from "./Auth/authapi";
import authReducer from "../redux/Auth/authSlice";
import productapi from "./Products/productapi";
export const store = configureStore({
  reducer: {
    cart: cartslicesReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productapi.reducerPath]: productapi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productapi.middleware),
});
  