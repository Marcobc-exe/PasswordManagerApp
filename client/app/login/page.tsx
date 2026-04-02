"use client";
import { SyntheticEvent, useState } from "react";
import { useThemeStore } from "@/app/store/themeStore";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/Spinner";
import { useLogin } from "@/features/login/login.hook";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const darkMode = useThemeStore((state) => state.darkMode);
  const inputTheme = darkMode
    ? "bg-[#153746] hover:bg-[#15495f]"
    : "bg-[#9c7f53] hover:bg-[#b58b4d]";
  const loginMutation = useLogin();

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.access_token);
          window.location.href = "/dashboard";
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Login failed";
          alert(message);
        },
      },
    );
  };

  return (
    <main className="flex h-screen items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className={`bg-zinc-900 p-12 rounded-2xl space-y-6`}
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className={`w-full p-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed ${inputTheme}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginMutation.isPending}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full p-3 rounded-lg pr-12 disabled:opacity-60 disabled:cursor-not-allowed ${inputTheme}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loginMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:backdrop-opacity-100 transition cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-white hover:bg-amber-50 transition text-black p-3 rounded-lg font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <div className="h-5 flex items-center justify-center">
            {loginMutation.isPending ? <Spinner /> : "Login"}
          </div>
        </button>
        <p className="text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-white underline">
            Create one
          </a>
        </p>
      </form>
    </main>
  );
}
