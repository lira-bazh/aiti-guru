import { createSlice, createAsyncThunk, type PayloadAction, type WritableDraft } from "@reduxjs/toolkit";
import { productsApi } from "@/api/productsApi";
import { selectSearchText, selectSkipProducts } from "./productsSelectors";
import { PRODUCTS_PORTION } from "@/constants";
import type { IProduct, SortInfo } from "@/types";
import type { RootState, AppDispatch } from "./";


export interface IProductsSlice {
  data: IProduct[];
  total: number;
  skip: number | null;
  loading: boolean;
  error: string | null;
  sortedInfo: SortInfo;
  searchText: string;
}

export const loadPage = createAsyncThunk<
  { products: IProduct[]; total: number; skip: number },
  number,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  "products/loadPage",
  async (pageNumber: number = 1, { dispatch, getState }) => {
    const skip = (Math.max(pageNumber, 1) - 1) * PRODUCTS_PORTION;
    const searchText = selectSearchText(getState());

    const params = {
      skip,
      query: searchText.length ? searchText : undefined
    };

    const result = await dispatch(
      productsApi.endpoints.getProducts.initiate(params)
    ).unwrap();

    return {
      products: result.products.map((item) => ({ key: item.id, ...item })),
      total: result.total,
      skip: result.skip
    };
  }
);

export const searchProducts = createAsyncThunk<
  { products: IProduct[]; total: number; searchText: string },
  string,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("products/searchProducts", async (query: string, { dispatch, getState }) => {
  const skip = selectSkipProducts(getState()) || 0;

  console.log(query);

  const result = await dispatch(
    productsApi.endpoints.getProducts.initiate({
      skip,
      query
    })
  ).unwrap();

  return {
    products: result.products.map((item) => ({ key: item.id, ...item })),
    total: result.total,
    searchText: query
  };
});

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    total: 0,
    skip: null,
    loading: false,
    error: null,
    sortedInfo: {},
    searchText: "",
  } as IProductsSlice,
  reducers: {
    changeSort: (
      state: WritableDraft<IProductsSlice>,
      action: PayloadAction<SortInfo>
    ) => {
      state.sortedInfo = { ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      // loadNextPage
      .addCase(loadPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...action.payload.products];
        state.total = action.payload.total;
        state.skip = action.payload.skip;
      })
      .addCase(loadPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      })
      //searchProducts
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...action.payload.products];
        state.total = action.payload.total;
        state.searchText = action.payload.searchText
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  }
});

export const { changeSort } = productsSlice.actions;
