import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FC } from "react";

type Props = {
  openModal: boolean;
  website: string;
  username: string;
  password: string;
  handleSetWebsite: (value: string) => void;
  handleSetUsername: (value: string) => void;
  handleSetPassword: (value: string) => void;
  handleSavePassword: () => void;
  handleOpenModal: (value: boolean) => void;
};

export const AddPassModal: FC<Props> = ({
  openModal,
  website,
  username,
  password,
  handleSetWebsite,
  handleSetUsername,
  handleSetPassword,
  handleSavePassword,
  handleOpenModal,
}) => {
  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-zinc-900 p-8 rounded-2xl w-100 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add new password</h2>

              <button className="cursor-pointer" onClick={() => handleOpenModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Website"
                className="bg-zinc-800 p-3 rounded-lg outline-none"
                value={website}
                onChange={(e) => handleSetWebsite(e.target.value)}
              />

              <input
                type="text"
                placeholder="Username"
                className="bg-zinc-800 p-3 rounded-lg outline-none"
                value={username}
                onChange={(e) => handleSetUsername(e.target.value)}
              />

              <input
                type="text"
                placeholder="Password"
                className="bg-zinc-800 p-3 rounded-lg outline-none"
                value={password}
                onChange={(e) => handleSetPassword(e.target.value)}
              />

              <button
                type="submit"
                className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleSavePassword()}
              >
                Save password
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
