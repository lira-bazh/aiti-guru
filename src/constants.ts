import { buildUrls } from "@/helpers";

export const ROUTES = {
  auth: () => "/auth",
  products: () => "/products"
};

export const COMMON_URL = `https://dummyjson.com/`;

export const ENDPOINTS = buildUrls({
  checkAuth: "auth/me",
  authorizeUser: "auth/login"
});