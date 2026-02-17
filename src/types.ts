import type { SortOrder } from "antd/es/table/interface";

export interface IProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  brand: string;
  sku: string;
  rating: number;
  images: string[];
}

export interface SortInfo {
  columnKey?: React.Key | null;
  order?: SortOrder | null;
}