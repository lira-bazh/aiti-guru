import { ENDPOINTS } from "@/constants";

interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export async function checkAuth(): Promise<AuthResponse | null> {
  const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(ENDPOINTS.checkAuth, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Auth failed");
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Check auth error:", error);
    localStorage.removeItem("token");
    return null;
  }
}
