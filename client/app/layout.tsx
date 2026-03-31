"use client";
import "./globals.css";
import { useThemeStore } from "./store/themeStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkMode = useThemeStore((state) => state.darkMode);

  return (
    <html lang="en">
      <body
        className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? "bg-linear-to-br from-[#153746] via-[#0b1316] to-[#0a1f29] text-white animate-gradient"
            : "bg-linear-to-br from-[#ffffff] from-5% via-[#eef1f9] via-90% to-[#f3dfee] text-black animate-gradient"
        }`}
      >
        {children}
      </body>
    </html>
  );
}
