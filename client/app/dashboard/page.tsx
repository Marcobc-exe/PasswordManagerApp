"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Copy, Trash2 } from "lucide-react";

type PasswordsProps = {
  id: number;
  website: string;
  username: string;
  password: string;
};

export default function Dashboard() {
  const [passwords, setPasswords] = useState<PasswordsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);

  useEffect(() => {
    const getUserPasswords = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const res = await fetch("http://127.0.0.1:8000/get-passwords", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError("Something went wrong fetching passwords");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setPasswords(data);
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    getUserPasswords();
  }, []);

  const togglePassword = (id: number) => {
    setVisiblePasswords((prev) =>
      prev.includes(id) ? prev.filter((p) => p != id) : [...prev, id],
    );
  };

  const copyPasswords = (passwords: string) => {
    navigator.clipboard.writeText(passwords);
  };

  const deletePassword = async (id: number) => {
    console.log(id);
    const token = localStorage.getItem("token");

    await fetch(`http://127.0.0.1:8000/delete-password/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPasswords((pre) => pre.filter((p) => p.id != id));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading passwords...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </main>
    );
  }
  console.log(passwords);
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {passwords.map((p: PasswordsProps) => {
        const isVisible = visiblePasswords.includes(p.id);

        return (
          <div
            key={p.website}
            className="bg-zinc-900 p-5 rounded-2xl mb-4 flex justify-between items-center hover:bg-zinc-800 transition"
          >
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">{p.website}</p>
              <p className="text-zinc-400 text-sm">{p.username}</p>
              <p className="font-mono mt-2 text-lg">
                {isVisible ? p.password : "*********"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => togglePassword(p.id)}
                className="bg-zinc-800 p-2 rounded-lg hover:bg-zinc-700 transition"
              >
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button
                onClick={() => copyPasswords(p.password)}
                className="bg-zinc-800 p-2 rounded-lg hover:bg-zinc-700 transition"
              >
                <Copy size={18} />
              </button>
              <button
                onClick={() => deletePassword(p.id)}
                className="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </main>
  );
}
