"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Copy, Trash2, Lock, Plus, X } from "lucide-react";

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
  const [openModal, setOpenModal] = useState(false);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const savePassword = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("website", website);
    formData.append("username", username);
    formData.append("password", password);

    await fetch("http://127.0.0.1:8000/save-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setOpenModal(false);
    window.location.reload();
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

  if (passwords.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <Lock size={40} />
        </div>

        <h1 className="text-2xl font-bold">No passwords yet</h1>

        <p className="text-zinc-400 text-center max-w-sm">
          Start by adding your first password. It will appear here once saved.
        </p>

        <button className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer">
          Add your first password
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          className="flex items-center gap-2 bg-blue-600 px-5 py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={18} />
          Add password
        </button>
      </div>

      <div className="flex flex-col items-center w-full gap-4">
        {passwords.map((p: PasswordsProps) => {
          const isVisible = visiblePasswords.includes(p.id);

          return (
            <div
              key={p.website}
              className="w-full max-w-md bg-zinc-900 p-5 rounded-2xl mb-4 flex justify-between items-center hover:bg-zinc-800 transition"
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
      </div>
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

                <button onClick={() => setOpenModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Website"
                  className="bg-zinc-800 p-3 rounded-lg outline-none"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Username"
                  className="bg-zinc-800 p-3 rounded-lg outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Password"
                  className="bg-zinc-800 p-3 rounded-lg outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => savePassword()}
                >
                  Save password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
