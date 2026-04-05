"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/helpers/helpers";
import { Spinner } from "./Spinner";
import { useThemeStore } from "@/app/store/themeStore";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const token = getAccessToken();
  const darkMode = useThemeStore((state) => state.darkMode);
  const fontColor = darkMode ? "text-white" : "text-black";
  const spinnerColor = darkMode ? "border-white" : "border-black";

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  if (!token) {
    return (
      <main
        className={`min-h-screen flex items-center justify-center gap-3 ${fontColor}`}
      >
        <Spinner color={spinnerColor} />
        <p className="text-xl">Loading passwords</p>
      </main>
    );
  }

  return <>{children}</>;
}
