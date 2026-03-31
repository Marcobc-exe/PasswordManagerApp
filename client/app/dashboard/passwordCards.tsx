import { PasswordsProps } from "../type";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import { FC } from "react";
import { useThemeStore } from "@/app/store/themeStore";

type Props = {
  search: string;
  passwords: PasswordsProps[];
  visiblePasswords: number[];
  handleTogglePassword: (value: number) => void;
  handleCopyPasswords: (value: string) => void;
  handleDeletePassword: (value: number) => void;
};

export const PasswordCards: FC<Props> = ({
  search,
  passwords,
  visiblePasswords,
  handleTogglePassword,
  handleCopyPasswords,
  handleDeletePassword,
}) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  
  return (
    <div
      className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
          w-full
          max-w-4xl
          mx-auto
          place-items-center
        "
    >
      {passwords
        .filter((p) =>
          p.website.toLocaleLowerCase().includes(search.toLowerCase()),
        )
        .map((p: PasswordsProps) => {
          const isVisible = visiblePasswords.includes(p.id);

          return (
            <div
              key={p.website}
              className={`
                w-full max-w-md  p-5 rounded-2xl flex justify-between items-center transition
                ${
                  darkMode
                    ? "bg-[#0f2027] hover:bg-[#0d1b21] text-white"
                    : "bg-[#dbb985] hover:bg-[#d7ae71] text-black"
                }
              `}
            >
              <div className="flex flex-col gap-1 w-2/3">
                <p className="text-lg font-semibold">{p.website}</p>
                <p className="text-zinc-400 text-sm">{p.username}</p>
                <p className="font-mono mt-2 text-lg truncate">
                  {isVisible ? p.password : "*********"}
                </p>
              </div>

              <TooltipProvider>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        onClick={() => handleTogglePassword(p.id)}
                        className={`
                          p-2 rounded-lg transition cursor-pointer
                          ${
                            darkMode
                              ? "bg-[#21414f] hover:bg-[#0d1b21]"
                              : "bg-[#ffd391] hover:bg-[#f9c16c]"
                          }
                        `}
                      >
                        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isVisible ? "Hide" : "Show"}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        onClick={() => handleCopyPasswords(p.password)}
                        className={`
                          p-2 rounded-lg transition cursor-pointer
                          ${
                            darkMode
                              ? "bg-[#21414f] hover:bg-[#0d1b21]"
                              : "bg-[#ffd391] hover:bg-[#f9c16c]"
                          }
                        `}
                      >
                        <Copy size={18} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        onClick={() => handleDeletePassword(p.id)}
                        className={`
                          p-2 rounded-lg transition cursor-pointer
                          ${
                            darkMode
                              ? "bg-[#21414f] hover:bg-red-400"
                              : "bg-[#e49d33] hover:bg-red-400"
                          }
                        `}
                      >
                        <Trash2 size={18} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          );
        })}
    </div>
  );
};
