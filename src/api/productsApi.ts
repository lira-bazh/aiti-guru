import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COMMON_URL, ENDPOINTS, PRODUCTS_FIELDS, PRODUCTS_PORTION } from "@/constants";
import type { IProduct } from "@/types";

export interface GetProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COMMON_URL
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, { skip?: number; query?: string }>({
      query: ({ skip = 0, query = '' }) => {
        const params = new URLSearchParams({
          skip: String(skip),
          limit: String(PRODUCTS_PORTION),
          select: PRODUCTS_FIELDS.join(","),
        });

        if (query) {
          params.set("q", query);
        }

        return {
          url: `${query ? ENDPOINTS.seachProducts : ENDPOINTS.products}?${params.toString()}`,
          method: "GET"
        };
      }
    })
  })
});

// Экспортируем хуки
export const { useGetProductsQuery, useLazyGetProductsQuery } = productsApi;
