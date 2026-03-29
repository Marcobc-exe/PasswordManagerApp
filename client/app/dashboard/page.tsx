"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useMediaQuery } from "@mui/material";
import { AddPassModal } from "./addPassModal";
import { PasswordsProps } from "../type";
import { PasswordCards } from "./passwordCards";
import { NoPasswordsYet } from "./noPasswords";
import { Loading } from "./Loading";
import { ErrorMsg } from "./ErrorMessage";

export default function Dashboard() {
  const [passwords, setPasswords] = useState<PasswordsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const isMobile = useMediaQuery("(max-width: 640px)");

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

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

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

  const handleSetWebsite = (value: string) => setWebsite(value);
  const handleSetUsername = (value: string) => setUsername(value);
  const handleSetPassword = (value: string) => setPassword(value);
  const handleOpenModal = (value: boolean) => setOpenModal(value);

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

  const handleSavePassword = async () => {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMsg error={error} />;
  if (passwords.length == 0) return <NoPasswordsYet />;

  return (
    <main
      className={`min-h-screen p-10 transition-all duration-700 ${
        darkMode
          ? "bg-linear-to-br from-indigo-950 via-zinc-900 to-black text-white"
          : "bg-linear-to-br from-[tan] from-1% via-white via-90% to-[#f3d5ae]"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <div className="flex justify-between items-end gap-3">
          <button
            className={`flex items-center gap-2 bg-blue-600 ${isMobile ? "p-3 rounded-3xl" : "px-5 py-3 rounded-xl"}  hover:bg-blue-700 transition cursor-pointer`}
            onClick={() => setOpenModal(true)}
          >
            <Plus size={isMobile ? 24 : 18} />
            {!isMobile ? "Add password" : ""}
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-zinc-700 cursor-pointer px-5 py-3 rounded-lg hover:bg-zinc-800 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 cursor-pointer px-5 py-3 rounded-xl hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search passwords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 bg-zinc-900/70 backdrop-blur px-5 py-3 rounded-2xl outline-none border border-zinc-800 focus:border-zinc-500 transition"
        />
        <PasswordCards
          search={search}
          passwords={passwords}
          visiblePasswords={visiblePasswords}
          handleTogglePassword={togglePassword}
          handleCopyPasswords={copyPasswords}
          handleDeletePassword={deletePassword}
        />
      </div>
      <AddPassModal
        openModal={openModal}
        website={website}
        username={username}
        password={password}
        handleSetWebsite={handleSetWebsite}
        handleSetUsername={handleSetUsername}
        handleSetPassword={handleSetPassword}
        handleSavePassword={handleSavePassword}
        handleOpenModal={handleOpenModal}
      />
    </main>
  );
}
