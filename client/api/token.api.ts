import {
  RefreshTokenFailedSchema,
  RefreshTokenSuccessSchema,
} from "@/features/token/token.schemas";
import { api } from "./config";
import { clearTokens, getRefreshToken, saveTokens } from "../helpers/helpers";

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) throw new Error("No refresh token found");

  const { data } = await api.post("/auth/refresh", {
    refresh_token: refreshToken,
  });

  const success = RefreshTokenSuccessSchema.safeParse(data);
  if (success.success) {
    const newAccessToken = success.data.access_token;
    const newRefreshToken = success.data.refresh_token ?? refreshToken;

    saveTokens(newAccessToken, newRefreshToken);
    return newAccessToken;
  }

  const failed = RefreshTokenFailedSchema.safeParse(data);
  if (failed.success) {
    clearTokens();
    throw new Error(failed.data.detail);
  }

  clearTokens();
  throw new Error("Unexpected refresh response");
}
