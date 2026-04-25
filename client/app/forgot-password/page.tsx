"use client";

import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/Spinner";
import { useThemeStore } from "@/app/store/themeStore";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const darkMode = useThemeStore((state) => state.darkMode);

  const inputTheme = darkMode
    ? "bg-[#153746] hover:bg-[#15495f]"
    : "bg-[#9c7f53] hover:bg-[#b58b4d]";

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.warning("Email is required");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: call API later
      // await requestPasswordReset(email);

      setSent(true);
      toast.success("Reset instructions sent");
    } catch {
      toast.warning("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 p-8 sm:p-12 rounded-2xl space-y-6"
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-600 p-4">
            <Mail size={28} />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-sm text-zinc-400">
            Enter your email and we’ll send instructions to reset your password.
          </p>
        </div>

        {sent ? (
          <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-sm text-green-300">
            If an account exists for <strong>{email}</strong>, reset
            instructions have been sent.
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed ${inputTheme}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-amber-50 transition text-black p-3 rounded-lg font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <div className="h-5 flex items-center justify-center">
                {isLoading ? <Spinner /> : "Send reset link"}
              </div>
            </button>
          </>
        )}

        <p className="text-center text-sm text-zinc-400">
          Remember your password?{" "}
          <Link href="/login" className="text-white underline">
            Back to login
          </Link>
        </p>
      </form>
    </main>
  );
}
