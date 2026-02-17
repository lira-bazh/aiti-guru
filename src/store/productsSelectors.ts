import type { RootState } from ".";

// Базовый селектор
// const selectProductsSlice = (state: RootState) => state.products;

// Основные селекторы
export const selectProducts = (state: RootState) => state.products.data;

export const selectTotalProducts = (state: RootState) => state.products.total;
export const selectSkipProducts = (state: RootState) => state.products.skip;

export const selectDataIsLoading = (state: RootState) => state.products.loading;

export const selectSortedInfo = (state: RootState) => state.products.sortedInfo;
export const selectSearchText = (state: RootState) => state.products.searchText;