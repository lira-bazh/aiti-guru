import { ENDPOINTS } from "@/constants";

interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
}

interface AuthSuccessResult {
  success: true;
  data: AuthResponse;
}

interface AuthErrorResult {
  success: false;
  error: string;
}

export async function authorizeUser(
  username: string,
  password: string
): Promise<AuthSuccessResult | AuthErrorResult> {
  try {
    const response = await fetch(ENDPOINTS.authorizeUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as {
        message?: string;
      };
      throw new Error(
        errorData.message || `Ошибка авторизации: ${response.status}`
      );
    }

    const authData = data as AuthResponse;

    return { success: true, data: authData };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    console.error("Ошибка при авторизации:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
