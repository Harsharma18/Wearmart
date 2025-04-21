import {configureStore} from '@reduxjs/toolkit';
import cartslicesReducer from "./features/cartSlice";
import authApi from './Auth/authapi';
import authReducer from "../redux/Auth/authSlice";
export const store = configureStore({
    reducer: {
        cart: cartslicesReducer,
        [authApi.reducerPath] :authApi.reducer,
        auth:authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})
