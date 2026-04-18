import { useState } from "react";
import { useThemeStore } from "../store/themeStore";
import {
  CircleUserRound,
  Lock,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const darkMode = useThemeStore((state) => state.darkMode);
  const { handleLogout, isLoading } = useLogout();
  const label = isLoading ? <Spinner /> : <span>Logout</span>;

  const stylesButtons = "flex items-center gap-3 cursor-pointer";

  const handleViewMenu = () => setOpen((prev) => !prev);

  const onLogout = async () => {
    await handleLogout();
    handleViewMenu()
  };

  return (
    <>
      <button
        className={`
          p-2 rounded-full transition cursor-pointer
          ${darkMode ? "bg-[#21414f] hover:bg-[#0d1b21]" : "bg-[#ffd391] hover:bg-[#f9c16c]"}
        `}
        onClick={handleViewMenu}
      >
        <CircleUserRound size={28} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleViewMenu}
          >
            <div
              className={`absolute right-0 top-0 h-full w-64 p-6 flex flex-col gap-6 ${darkMode ? "bg-[#153746b4]" : "bg-[#dbb985]"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cursor-pointer" onClick={handleViewMenu}>
                <X />
              </button>

              <Link
                className={stylesButtons}
                href="/dashboard/profile"
                onClick={handleViewMenu}
              >
                <User size={18} />
                Profile
              </Link>

              <Link
                className={stylesButtons}
                href="/dashboard"
                onClick={handleViewMenu}
              >
                <Lock size={18} />
                Passwords
              </Link>

              <button onClick={toggleDarkMode} className={stylesButtons}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                Appearance
              </button>

              <Link
                className={stylesButtons}
                href="/dashboard/settings"
                onClick={handleViewMenu}
              >
                <Settings size={18} />
                Settings
              </Link>

              <button
                onClick={onLogout}
                disabled={isLoading}
                className={stylesButtons}
              >
                <LogOut size={18} />
                {label}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
