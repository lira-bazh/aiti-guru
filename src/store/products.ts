import {
  createSlice,
  // type PayloadAction,
  // type WritableDraft
} from "@reduxjs/toolkit";
// import { PalettesServices } from "@/services/palettes";
// import type { IPalette } from "@/types";

export interface IProductsSlice {
  data: string[];
}

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: []
  } as IProductsSlice,
  reducers: {}
});

export const {
} = productsSlice.actions;
