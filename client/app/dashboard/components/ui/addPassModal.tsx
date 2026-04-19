import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FC, SyntheticEvent } from "react";
import { useThemeStore } from "../../../store/themeStore";
import { useSavePassword } from "@/features/passwords/passwords.hook";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";
import { useOpenModalStore } from "../../../store/openPasswordModalStore";

type Props = {
  website: string;
  username: string;
  password: string;
  handleSetWebsite: (value: string) => void;
  handleSetUsername: (value: string) => void;
  handleSetPassword: (value: string) => void;
  handleInputsValues: () => void;
};

export const AddPassModal: FC<Props> = ({
  website,
  username,
  password,
  handleSetWebsite,
  handleSetUsername,
  handleSetPassword,
  handleInputsValues,
}) => {
  const { handleOpenModal, open } = useOpenModalStore((state) => state);

  const savePasswordMutation = useSavePassword();
  const darkMode = useThemeStore((state) => state.darkMode);
  const inputTheme = darkMode
    ? "bg-[#153746] hover:bg-[#15495f]"
    : "bg-[#9c7f53] hover:bg-[#b58b4d]";

  const handleSavePassword = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    savePasswordMutation.mutate(
      {
        website,
        username,
        password,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          handleInputsValues();
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Failed to save password";
          const messageParsed = JSON.parse(message);
          toast.warning(messageParsed[0]?.message || message);
        },
      },
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOpenModal}
        >
          <motion.div
            className="bg-zinc-900 p-8 rounded-2xl w-100 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Add new password</h2>

              <button className="cursor-pointer" onClick={handleOpenModal}>
                <X size={20} color="white" />
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Website"
                className={`p-3 rounded-lg outline-none ${inputTheme}`}
                value={website}
                onChange={(e) => handleSetWebsite(e.target.value)}
                disabled={savePasswordMutation.isPending}
              />

              <input
                type="text"
                placeholder="Username"
                className={`p-3 rounded-lg outline-none ${inputTheme}`}
                value={username}
                onChange={(e) => handleSetUsername(e.target.value)}
                disabled={savePasswordMutation.isPending}
              />

              <input
                type="text"
                placeholder="Password"
                className={`p-3 rounded-lg outline-none ${inputTheme}`}
                value={password}
                onChange={(e) => handleSetPassword(e.target.value)}
                disabled={savePasswordMutation.isPending}
              />

              <button
                type="submit"
                disabled={savePasswordMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <div className="h-5 flex items-center justify-center">
                  {savePasswordMutation.isPending ? (
                    <Spinner color="border-white" />
                  ) : (
                    "Save password"
                  )}
                </div>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
