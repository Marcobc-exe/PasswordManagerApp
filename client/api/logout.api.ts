import { clearTokens, getRefreshToken } from "@/helpers/helpers";
import { api } from "./config";
import { clearAuthCookie } from "@/helpers/cookies";

export async function logoutUser() {
  const refreshToken = getRefreshToken();

  try {
    if (refreshToken) {
      await api.post(
        "/auth/logout",
        {
          refresh_token: refreshToken,
        },
        {
          validateStatus: () => true,
          skipAuthRefresh: true
        }
      );
    }
  } finally {
    clearTokens();
    clearAuthCookie();
  }
}
