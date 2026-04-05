export function setAuthCookie() {
  document.cookie = "pm_logged_in=true; path=/; max-age=604800; samesite=lax";
}

export function clearAuthCookie() {
  document.cookie =
    "pm_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax";
}