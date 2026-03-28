"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
    <main className="flex h-screen items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-2xl space-y-6">
        <h1 className="text-2xl font-bold  text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-zinc-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-zinc-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-white text-black p-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </div>
    </main>
  );
}
