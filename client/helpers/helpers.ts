import { PasswordsProps } from "@/src/types/type";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

export function saveTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export function clearAccessToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
}

export function clearRefreshToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("refresh_token");
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export const sorters: Record<
  string,
  (a: PasswordsProps, b: PasswordsProps) => number
> = {
  favorites: (a, b) => {
    if (a.favorite !== b.favorite) {
      return Number(b.favorite) - Number(a.favorite);
    }
    return a.website.localeCompare(b.website);
  },

  az: (a, b) => a.website.localeCompare(b.website),

  za: (a, b) => b.website.localeCompare(a.website),

  date_asc: (a, b) =>
    new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf(),

  date_desc: (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
};
