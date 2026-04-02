"use client";
import { SyntheticEvent, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import { Eye, EyeOff } from "lucide-react";
import { api, API_URL } from "@/api/config";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/Spinner";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const darkMode = useThemeStore((state) => state.darkMode);
  const inputTheme = darkMode
    ? "bg-[#153746] hover:bg-[#15495f]"
    : "bg-[#9c7f53] hover:bg-[#b58b4d]";

  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "/register",
        new URLSearchParams({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return response.data;
    },
    onSuccess: (data) => {
      window.location.href = "/login";
      alert("User created successfully");
    },
    onError: () => {
      alert("Register failed");
    },
  });

  const handleRegister = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please complete all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    registerMutation.mutate();

    // const response = await fetch(`${API_URL}/register`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: new URLSearchParams({
    //     email,
    //     password,
    //   }),
    // });

    // const data = await response.json();

    // if (response.ok) {
    //   alert("User created successfully");
    //   window.location.href = "/login";
    // } else {
    //   alert(data.error || "Register failed");
    // }
  };

  return (
    <main className="flex h-screen items-center justify-center text-white">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-12 rounded-2xl space-y-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center">Create account</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 rounded-lg pr-12 ${inputTheme}`}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full p-3 rounded-lg pr-12 ${inputTheme}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 transition cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className={`w-full p-3 rounded-lg pr-12 ${inputTheme}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 transition cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-white hover:bg-amber-50 transition text-black p-3 rounded-lg font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <div className="h-5 flex items-center justify-center">
            {registerMutation.isPending ? <Spinner /> : "Create account"}
          </div>
        </button>

        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <a href="/login" className="text-white underline">
            Login
          </a>
        </p>
      </form>
    </main>
  );
}
