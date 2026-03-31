"use client";
import { SyntheticEvent, useState } from "react";
import { useThemeStore } from "@/app/store/themeStore";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const darkMode = useThemeStore((state) => state.darkMode);
  const inputTheme = darkMode
    ? "bg-[#153746] hover:bg-[#15495f]"
    : "bg-[#9c7f53] hover:bg-[#b58b4d]";

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* 
      http://localhost:8000
      http://127.0.0.1:8000/login
    */
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      window.location.href = "/dashboard";
    } else {
      // change this later, use toast notification system
      alert("Login failed");
    }
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
          className={`w-full p-3 rounded-lg ${inputTheme}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:backdrop-opacity-100 transition cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-white hover:bg-amber-50 transition text-black p-3 rounded-lg font-semibold cursor-pointer"
        >
          Login
        </button>
      </form>
    </main>
  );
}
