"use client";

import { useState } from "react";
import { useThemeStore } from "@/app/store/themeStore";
import { useLogout } from "@/hooks/useLogout";
import {
  CircleUserRound,
  Lock,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { Spinner } from "@/components/Spinner";

export const IconProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const darkMode = useThemeStore((state) => state.darkMode);

  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const { handleLogout, isLoading } = useLogout();

  const label = isLoading ? <Spinner /> : <span>Logout</span>;

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
        className={`
          p-2 rounded-full transition cursor-pointer
          ${darkMode ? "bg-[#21414f] hover:bg-[#0d1b21]" : "bg-[#ffd391] hover:bg-[#f9c16c]"}
        `}
        onClick={() => setOpen((prev) => !prev)}
      >
        <CircleUserRound size={28} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setOpen(false)}
          >
            <div
              className={`
                absolute right-0 mt-13 w-52 rounded-2xl shadow-lg p-2 z-50 gap-2
                ${darkMode ? "bg-[#0f2027] border border-[#21414f]" : "bg-white text-black border border-zinc-200"}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={stylesIcons}>
                <User size={18} />
                Profile
              </button>

              <button className={stylesIcons}>
                <Lock size={18} />
                Passwords
              </button>

              <button onClick={toggleDarkMode} className={stylesIcons}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                Appearance
              </button>

              <button className={stylesIcons}>
                <Settings size={18} />
                Settings
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
          </div>
        </div>
      )}
    </div>
  );
};
