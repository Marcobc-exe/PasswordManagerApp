"use client";

import { SyntheticEvent, useEffect, useState } from "react";
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
import { MobileMenu } from "./MobileMenu";
import { API_URL } from "@/api/config";
import {
  usePasswords,
  useSavePassword,
} from "@/features/passwords/passwords.hook";

export default function Dashboard() {
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { data: passwords = [], isLoading, error } = usePasswords();
  const savePasswordMutation = useSavePassword();
  
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
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/delete-password/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.reload();
  };

  const handleSavePassword = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    savePasswordMutation.mutate(
      {
        website,
        username,
        password,
      },
      {
        onSuccess: () => {
          setOpenModal(false);
          setWebsite("");
          setUsername("");
          setPassword("");
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Failed to save password";
          alert(message);
        },
      },
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (isLoading) return <Loading />;
  if (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return <ErrorMsg error={message} />;
  }
  if (passwords.length == 0) {
    return (
      <>
        <NoPasswordsYet handleOpenModal={handleOpenModal} />
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
      </>
    );
  }

  return (
    <main className={`relative min-h-screen p-10`}>
      <div className="flex justify-between items-center mb-8">
        <TitleDashboard />
        {isMobile ? (
          <MobileMenu
            handleLogout={handleLogout}
            handleOpenModal={handleOpenModal}
          />
        ) : (
          <div className="flex justify-between items-end gap-3">
            <ThemeBtn />
            <AddPasswordBtn
              isMobile={isMobile}
              handleOpenModal={handleOpenModal}
            />
            <LogoutBtn isMobile={isMobile} handleLogout={handleLogout} />
          </div>
        )}
      </div>
      <div className="max-w-4xl mx-auto">
        <SearchBar search={search} handleSearch={handleSearch} />
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
