import { usePasswords } from "@/features/passwords/passwords.hook";
import { useState } from "react";
import { Loading } from "./Loading";
import { ErrorMsg } from "./ErrorMessage";
import { NoPasswordsYet } from "./noPasswords";
import { AddPassModal } from "./addPassModal";
import { TitleDashboard } from "./TitleDashboard";
import { MobileMenu } from "./MobileMenu";
import { ThemeBtn } from "./ThemeBtn";
import { AddPasswordBtn } from "./AddPasswordBtn";
import { LogoutBtn } from "./LogoutBtn";
import { SearchBar } from "./SearchBar";
import { PasswordCards } from "./passwordCards";
import { useMediaQuery } from "@mui/material";
import { FilterPasswords } from "./FilterPasswords";

export const DashboardContent = () => {
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("date_desc");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { data: passwords = [], isLoading, error } = usePasswords();

  const handleSetWebsite = (value: string) => setWebsite(value);
  const handleSetUsername = (value: string) => setUsername(value);
  const handleSetPassword = (value: string) => setPassword(value);
  const handleOpenModal = (value: boolean) => setOpenModal(value);
  const handleSearch = (value: string) => setSearch(value);
  const handleFilter = (value: string) => setFilter(value);

  const togglePassword = (id: number) => {
    setVisiblePasswords((prev) =>
      prev.includes(id) ? prev.filter((p) => p != id) : [...prev, id],
    );
  };

  const copyPasswords = (passwords: string) => {
    navigator.clipboard.writeText(passwords);
  };

  const handleInputsValues = () => {
    setOpenModal(false);
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  const filteredPasswords = [...passwords]
    .filter((password) =>
      password.website.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    )
    .sort((a, b) => {
      switch (filter) {
        case "favorites":
          if (a.favorite !== b.favorite) {
            return Number(b.favorite) - Number(a.favorite);
          }
          return a.website.localeCompare(b.website);

        case "az":
          return a.website.localeCompare(b.website);

        case "za":
          return b.website.localeCompare(a.website);

        case "date_asc":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );

        case "date_desc":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

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
          handleInputsValues={handleInputsValues}
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
          <MobileMenu handleOpenModal={handleOpenModal} />
        ) : (
          <div className="flex justify-between items-end gap-3">
            <ThemeBtn />
            <AddPasswordBtn
              isMobile={isMobile}
              handleOpenModal={handleOpenModal}
            />
            <LogoutBtn isMobile={isMobile} />
          </div>
        )}
      </div>
      <div className="max-w-4xl mx-auto">
        <SearchBar search={search} handleSearch={handleSearch} />
        <FilterPasswords value={filter} onChange={handleFilter} />
        <PasswordCards
          passwords={filteredPasswords}
          visiblePasswords={visiblePasswords}
          handleTogglePassword={togglePassword}
          handleCopyPasswords={copyPasswords}
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
        handleOpenModal={handleOpenModal}
        handleInputsValues={handleInputsValues}
      />
    </main>
  );
};
