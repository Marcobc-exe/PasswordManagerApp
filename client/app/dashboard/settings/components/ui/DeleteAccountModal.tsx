"use client";

import { SyntheticEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { clearTokens } from "@/helpers/helpers";
import { clearAuthCookie } from "@/helpers/cookies";
import { useDeleteCurrentUserAccount } from "@/features/user/user.hook";
import { useThemeStore } from "@/app/store/themeStore";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DeleteAccountModal({ open, onClose }: Props) {
  const darkMode = useThemeStore((state) => state.darkMode);
  const router = useRouter();
  const deleteAccountMutation = useDeleteCurrentUserAccount();

  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!open) return null;

  const isValid =
    currentPassword.trim() !== "" && confirmationText === "DELETE";

  const handleDelete = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    deleteAccountMutation.mutate(currentPassword, {
      onSuccess: (data) => {
        toast.success(data.message);
        clearTokens();
        clearAuthCookie();
        router.replace("/login");
      },
      onError: (error) => {
        const message =
          error instanceof Error ? error.message : "Failed to delete account";
        toast.warning(message);
      },
    });
  };

  const handleCloseModal = () => {
    setCurrentPassword("");
    setConfirmationText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`
          absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-xl
          ${darkMode ? "bg-[#0f2027] text-white border border-[#21414f]" : "bg-white text-black border border-zinc-200"}
        `}
      >
        <form className="flex flex-col gap-4" onSubmit={handleDelete}>
          <div>
            <h2 className="text-xl font-semibold text-red-400">
              Delete account
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              This action is permanent. To confirm, enter your current password
              and type <span className="font-semibold text-white">DELETE</span>.
            </p>
          </div>

          <div>
            <label className="text-sm text-zinc-400">Current password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-transparent border border-zinc-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 transition cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Type DELETE to confirm
            </label>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-transparent border border-zinc-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-3 rounded-xl border border-zinc-500 hover:bg-white/5 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid || deleteAccountMutation.isPending}
              className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              {deleteAccountMutation.isPending
                ? "Deleting..."
                : "Delete account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
