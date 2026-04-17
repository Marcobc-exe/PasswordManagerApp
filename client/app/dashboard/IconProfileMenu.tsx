"use client";

import { useState } from "react";
import { useThemeStore } from "@/app/store/themeStore";
import { useLogout } from "@/hooks/useLogout";
import {
  CircleUserRound,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { Spinner } from "@/components/Spinner";
import { useMediaQuery } from "@mui/material";

export const IconProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const darkMode = useThemeStore((state) => state.darkMode);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const { handleLogout, isLoading } = useLogout();

  const text = !isMobile && <span>Logout</span>;
  const label = isLoading ? <Spinner /> : text;

  const stylesIcons = `cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-xl transition
    ${
      darkMode
        ? "bg-[#0f2027] hover:bg-white/10"
        : "hover:bg-[#f6c479] text-black"
    }
  `;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          p-2 rounded-full transition cursor-pointer
          ${darkMode ? "bg-[#21414f] hover:bg-[#0d1b21]" : "bg-[#ffd391] hover:bg-[#f9c16c]"}
        `}
      >
        <CircleUserRound size={24} />
      </button>

      {open && (
        <div
          className={`
            absolute right-0 mt-2 w-52 rounded-2xl shadow-lg p-2 z-50 gap-2
            ${darkMode ? "bg-[#0f2027] border border-[#21414f]" : "bg-white text-black border border-zinc-200"}
          `}
        >
          <button className={stylesIcons}>
            <User size={18} />
            Profile
          </button>

          <button className={stylesIcons}>
            <Settings size={18} />
            Settings
          </button>

          <button onClick={toggleDarkMode} className={stylesIcons}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            Appearance
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`cursor-pointer w-full flex items-center gap-3 p-3 rounded-xl transition 
              ${
                darkMode
                  ? "text-white bg-[#0f2027] hover:bg-red-700"
                  : "text-black hover:bg-red-700 hover:text-white"
              }
            `}
          >
            <LogOut size={18} />
            {label}
          </button>
        </div>
      )}
    </div>
  );
};
