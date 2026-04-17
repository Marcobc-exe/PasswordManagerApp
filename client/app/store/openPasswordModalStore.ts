import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  open: boolean;
  handleOpenModal: () => void;
};

export const useOpenModalStore = create<ThemeStore>()(
  persist(
    (set) => ({
      open: false,
      handleOpenModal: () => set((state) => ({ open: !state.open })),
    }),
    {
      name: "open-password-modal-storage",
    },
  ),
);
