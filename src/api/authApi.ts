import { COMMON_URL, ENDPOINTS } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
}

export interface AuthorizeUserParams {
  username: string;
  password: string;
  remember: boolean;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COMMON_URL
  }),
  endpoints: (builder) => ({
    // Эндпоинт для проверки авторизации
    checkAuth: builder.query<AuthResponse | null, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const token =
          localStorage.getItem("token") ?? sessionStorage.getItem("token");

        if (!token) {
          return { data: null };
        }

        const result = await fetchWithBQ({
          url: ENDPOINTS.checkAuth,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        return result.data
          ? { data: result.data as AuthResponse }
          : { data: null };
      }
    }),

    // Функция для авторизации
    authorizeUser: builder.mutation<
      AuthResponse,
      { username: string; password: string; remember: boolean }
    >({
      query: ({ username, password }) => ({
        url: ENDPOINTS.authorizeUser,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          username,
          password
        }
      }),
      transformResponse: (
        response: AuthResponse,
        _meta,
        arg: AuthorizeUserParams
      ): AuthResponse => {
        if (arg.remember) {
          localStorage.setItem("token", response.accessToken);
        } else {
          sessionStorage.setItem("token", response.accessToken);
        }

        return response;
      },
      transformErrorResponse: (response: any): string => {
        let errorMessage = "Неизвестная ошибка";

        if (response.data && response.data.message) {
          errorMessage = response.data.message;
        } else if (response.error) {
          errorMessage = response.error;
        } else if (response.status) {
          errorMessage = `Ошибка авторизации: ${response.status}`;
        }

        console.error("Ошибка при авторизации:", errorMessage);

        return errorMessage;
      }
    })
  })
});

// Экспортируем хуки
export const { useAuthorizeUserMutation, useCheckAuthQuery } = authApi;
