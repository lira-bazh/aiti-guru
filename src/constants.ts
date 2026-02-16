export const ROUTES = {
  auth: () => "/auth",
  products: () => "/products"
};

export const COMMON_URL = `https://dummyjson.com/`;

export const ENDPOINTS = {
  checkAuth: "auth/me",
  authorizeUser: "auth/login",
  products: "products",
  seachProducts: "products/search"
};

export const PRODUCTS_FIELDS = [
  "title",
  "category",
  "price",
  "rating",
  "sku",
  "brand",
  "images"
];

export const PRODUCTS_PORTION = 5;