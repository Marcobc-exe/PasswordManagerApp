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

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const darkMode = useThemeStore((state) => state.darkMode);
  const { handleLogout, isLoading } = useLogout();
  const label = isLoading ? <Spinner /> : <span>Logout</span>;

  const onLogout = async () => {
    await handleLogout();
    setOpen(false);
  };

  return (
    <>
      <button
        className={`
          p-2 rounded-full transition cursor-pointer
          ${darkMode ? "bg-[#21414f] hover:bg-[#0d1b21]" : "bg-[#ffd391] hover:bg-[#f9c16c]"}
        `}
        onClick={() => setOpen(true)}
      >
        <CircleUserRound size={28} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              className={`absolute right-0 top-0 h-full w-64 p-6 flex flex-col gap-6 ${darkMode ? "bg-[#153746b4]" : "bg-[#dbb985]"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cursor-pointer" onClick={() => setOpen(false)}>
                <X />
              </button>

              <button className={"flex items-center gap-3 cursor-pointer"}>
                <User size={18} />
                Profile
              </button>

              <button className={"flex items-center gap-3 cursor-pointer"}>
                <Lock size={18} />
                Passwords
              </button>

              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-3 cursor-pointer"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                Appearance
              </button>

              <button className={"flex items-center gap-3 cursor-pointer"}>
                <Settings size={18} />
                Settings
              </button>

              <button
                onClick={onLogout}
                disabled={isLoading}
                className="flex items-center gap-3 text-red-400 cursor-pointer"
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
