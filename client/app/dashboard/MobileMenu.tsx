import { FC, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import { LogOut, Menu, Moon, Plus, Sun, X } from "lucide-react";

type Props = {
  handleLogout: () => void;
  handleOpenModal: (value: boolean) => void;
};

export const MobileMenu: FC<Props> = ({ handleLogout, handleOpenModal }) => {
  const [open, setOpen] = useState(false);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const darkMode = useThemeStore((state) => state.darkMode);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Menu size={28} />
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

              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-3 cursor-pointer"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                Toggle theme
              </button>

              <button
                onClick={() => {
                  handleOpenModal(true);
                  setOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Plus size={20} />
                Add password
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-400 cursor-pointer"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
