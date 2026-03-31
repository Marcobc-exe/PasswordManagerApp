"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { AddPassModal } from "./addPassModal";
import { PasswordsProps } from "../type";
import { PasswordCards } from "./passwordCards";
import { NoPasswordsYet } from "./noPasswords";
import { Loading } from "./Loading";
import { ErrorMsg } from "./ErrorMessage";
import { SearchBar } from "./SearchBar";
import { ThemeBtn } from "./ThemeBtn";
import { AddPasswordBtn } from "./AddPasswordBtn";
import { LogoutBtn } from "./LogoutBtn";
import { TitleDashboard } from "./TitleDashboard";

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
  const handleSearch = (value: string) => setSearch(value);

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
    <main className={`relative min-h-screen p-10`}>
      <div className="flex justify-between items-center mb-8">
        <TitleDashboard />
        <div className="flex justify-between items-end gap-3">
          <ThemeBtn />
          <AddPasswordBtn
            isMobile={isMobile}
            handleOpenModal={handleOpenModal}
          />
          <LogoutBtn isMobile={isMobile} handleLogout={handleLogout} />
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <SearchBar
          search={search}
          handleSearch={handleSearch}
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
