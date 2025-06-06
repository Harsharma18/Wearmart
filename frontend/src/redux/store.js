import { configureStore } from "@reduxjs/toolkit";
import cartslicesReducer from "./features/cartSlice";
import authApi from "./Auth/authapi";
import authReducer from "../redux/Auth/authSlice";
import productapi from "./Products/productapi";
import reviewApi from "./Reviews/reviewApi";
import statsApi from "./Stats/statApi";
import orderApi from "./Orders/Orderapi";
export const store = configureStore({
  reducer: {
    cart: cartslicesReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productapi.reducerPath]: productapi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [orderApi.reducerPath] : orderApi.reducer,
    [statsApi.reducerPath]:statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productapi.middleware,
      reviewApi.middleware,
      statsApi.middleware,
      orderApi.middleware,
    ),
});
