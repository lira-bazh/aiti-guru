import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { authApi } from "@/api/authApi";
import { productsApi } from "@/api/productsApi";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
