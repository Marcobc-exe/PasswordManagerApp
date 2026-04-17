"use client";

import { useThemeStore } from "@/app/store/themeStore";

export const TitleDashboard = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  
  return (
    <h1
      className={`text-3xl font-bold ${darkMode ? "text-white" : "text-black"}`}
    >
      Dashboard
    </h1>
  );
};
