import { PasswordsProps } from "../type";
import { Eye, EyeOff, Copy, Trash2, Star, StarOff } from "lucide-react";
import { FC } from "react";
import { useThemeStore } from "@/app/store/themeStore";
import {
  useDeletePassword,
  useToggleFavoritePassword,
} from "@/features/passwords/passwords.hook";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ActionButton } from "@/components/ActionButton";

type Props = {
  passwords: PasswordsProps[];
  visiblePasswords: number[];
  handleTogglePassword: (value: number) => void;
  handleCopyPasswords: (value: string) => void;
};

export const PasswordCards: FC<Props> = ({
  passwords,
  visiblePasswords,
  handleTogglePassword,
  handleCopyPasswords,
}) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const deletePasswordMutation = useDeletePassword();
  const toggleFavoriteMutation = useToggleFavoritePassword();

  const handleDelete = (id: number) => {
    deletePasswordMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Password deleted successfully");
      },
      onError: (error) => {
        const message =
          error instanceof Error ? error.message : "Delete failed";
        const messageParsed = JSON.parse(message);
        toast.warning(messageParsed[0]?.message || message);
      },
    });
  };

  const handleFavourite = (id: number) => {
    toggleFavoriteMutation.mutate(id, {
      onSuccess: (data) => {
        toast.success(
          data.favorite ? "Added to favourites" : "Removed from favourites",
        );
      },
      onError: (error) => {
        const message =
          error instanceof Error ? error.message : "Favorite update failed";
        toast.warning(message);
      },
    });
  };

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mx-auto place-items-center">
        {passwords.map((p: PasswordsProps) => {
          const isVisible = visiblePasswords.includes(p.id);

          return (
            <motion.div
              key={p.website}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.4 }}
              className={`
                  w-full max-w-md  p-5 rounded-2xl flex justify-between items-center transition
                  ${
                    darkMode
                      ? "bg-[#0f2027] hover:bg-[#0d1b21] text-white"
                      : "bg-[#dbb985] hover:bg-[#d7ae71] text-black"
                  }
                `}
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p className="text-lg font-semibold truncate">{p.website}</p>
                <p
                  className={`text-zinc-400 text-sm truncate ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  {p.username}
                </p>
                <p
                  className="font-mono mt-2 text-lg truncate"
                  title={isVisible ? p.password : undefined}
                >
                  {isVisible ? p.password : "*********"}
                </p>
              </div>

              <ActionButton
                icon={
                  p.favorite ? (
                    <Star color="#fff220" fill="#fff220" size={18} />
                  ) : (
                    <StarOff size={18} />
                  )
                }
                label="Favourite"
                onClick={() => handleFavourite(p.id)}
                disabled={
                  toggleFavoriteMutation.isPending ||
                  deletePasswordMutation.isPending
                }
                darkMode={darkMode}
              />
              <ActionButton
                icon={isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                label={isVisible ? "Hide" : "Show"}
                onClick={() => handleTogglePassword(p.id)}
                disabled={
                  toggleFavoriteMutation.isPending ||
                  deletePasswordMutation.isPending
                }
                darkMode={darkMode}
              />
              <ActionButton
                icon={<Copy size={18} />}
                label="Copy"
                onClick={() => handleCopyPasswords(p.password)}
                disabled={
                  toggleFavoriteMutation.isPending ||
                  deletePasswordMutation.isPending
                }
                darkMode={darkMode}
              />
              <ActionButton
                icon={<Trash2 size={18} />}
                label="Delete"
                onClick={() => handleDelete(p.id)}
                disabled={
                  toggleFavoriteMutation.isPending ||
                  deletePasswordMutation.isPending
                }
                darkMode={darkMode}
                hoverColor="hover:bg-red-400"
              />
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
};
