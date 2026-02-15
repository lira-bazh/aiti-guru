import { authorizeUser } from "@/api";

interface AuthCredentials {
  username: string;
  password: string;
  remember: boolean;
}

export const AuthorizationServices = {
  async login({ username, password, remember }: AuthCredentials): Promise<boolean> {
    const result = await authorizeUser(username, password);

    if (result.success) {
      if (remember) {
        localStorage.setItem("token", result.data.accessToken);
      } else {
        sessionStorage.setItem("token", result.data.accessToken);
      }

      return true;
    }
    return false
  }
};
