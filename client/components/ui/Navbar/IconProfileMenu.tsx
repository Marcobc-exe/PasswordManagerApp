"use client";

import Link from "next/link";
import { useState } from "react";
import { UserSubMenu } from "./UserSubMenu";
import { useLogout } from "@/hooks/useLogout";
import { Spinner } from "@/components/Spinner";
import { useThemeStore } from "@/app/store/themeStore";
import { Lock, LogOut, Moon, Settings, Sun, User, X } from "lucide-react";
import { IconProfileBtn } from "../../../app/dashboard/components/buttons/IconProfileBtn";
import { useMediaQuery } from "@mui/material";

export const IconProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const darkMode = useThemeStore((state) => state.darkMode);
  const isMobile = useMediaQuery("(max-width: 600px)");

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
  const themeView = darkMode
    ? "bg-[#0f2027] border border-[#21414f]"
    : "bg-white text-black border border-zinc-200";
  const desktopView = `absolute right-18 mt-4 w-52 rounded-2xl shadow-lg z-50 gap-2 ${themeView}`;
  const mobileView = `absolute w-full h-full shadow-lg z-50 gap-2 ${themeView}`;

  const handleViewMenu = () => setOpen((prev) => !prev);

  return (
    <div className="relative">
      <IconProfileBtn handleViewMenu={handleViewMenu} />

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-transparent"
            onClick={handleViewMenu}
          >
            <div
              className={isMobile ? mobileView : desktopView}
              onClick={(e) => e.stopPropagation()}
            >
              <UserSubMenu handleViewMenu={handleViewMenu} />

              <div className="p-2">
                <Link
                  className={stylesIcons}
                  href="/dashboard/profile"
                  onClick={handleViewMenu}
                >
                  <User size={18} />
                  Profile
                </Link>

                <Link
                  className={stylesIcons}
                  href="/dashboard"
                  onClick={handleViewMenu}
                >
                  <Lock size={18} />
                  Passwords
                </Link>

                <button onClick={toggleDarkMode} className={stylesIcons}>
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  Appearance
                </button>

                <Link
                  className={stylesIcons}
                  href="/dashboard/settings"
                  onClick={handleViewMenu}
                >
                  <Settings size={18} />
                  Settings
                </Link>

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
        </div>
      )}
    </div>
  );
};
