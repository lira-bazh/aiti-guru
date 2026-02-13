import { COMMON_URL } from "@/constants";

export function buildUrls<T extends Record<string, string>>(endpoints: T): T {
  const result = {} as T;
  for (const key in endpoints) {
    result[key] = `${COMMON_URL}${endpoints[key]}` as T[typeof key];
  }
  return result;
}