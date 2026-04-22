"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getRefreshToken } from "@/helpers/helpers";
import { Spinner } from "./Spinner";
import { useThemeStore } from "@/app/store/themeStore";

type Props = {
  children: React.ReactNode;
};

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const darkMode = useThemeStore((state) => state.darkMode);
  const fontColor = darkMode ? "text-white" : "text-black";
  const spinnerColor = darkMode ? "border-white" : "border-black";

  const isClient = useIsClient();
  const accessToken = isClient ? getAccessToken() : null;
  const refreshToken = isClient ? getRefreshToken() : null;

  useEffect(() => {
    if (isClient && !accessToken && !refreshToken) {
      router.replace("/login");
    }
  }, [isClient, accessToken, refreshToken, router]);

  if (!isClient) {
    return (
      <main
        className={`min-h-screen flex items-center justify-center gap-3 ${fontColor}`}
      >
        <Spinner color={spinnerColor} />
        <p className="text-xl">Loading passwords</p>
      </main>
    );
  }

  if (!accessToken && !refreshToken) return null;

  return <>{children}</>;
}
