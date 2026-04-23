"use client";

import { useState } from "react";
import { useThemeStore } from "@/app/store/themeStore";
import { DeleteAccountModal } from "./components/ui/DeleteAccountModal";

export default function SettingsPage() {
  const darkMode = useThemeStore((state) => state.darkMode);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <main className="min-h-screen flex justify-center items-start p-6">
        <div
          className={`
            w-full max-w-2xl p-6 rounded-2xl shadow-lg flex flex-col gap-6
            ${darkMode ? "bg-[#0f2027] text-white" : "bg-white text-black"}
          `}
        >
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage your account settings and profile actions.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="rounded-2xl border border-red-500/40 p-5 flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-semibold text-red-400">
                  Danger Zone
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>

              <button
                onClick={() => setOpenDeleteModal(true)}
                className="self-start px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </main>

      <DeleteAccountModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}
