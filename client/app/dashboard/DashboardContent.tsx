import { usePasswords } from "@/features/passwords/passwords.hook";
import { useMemo, useState } from "react";
import { Loading } from "./Loading";
import { ErrorMsg } from "./ErrorMessage";
import { AddPassModal } from "./addPassModal";
import { SearchBar } from "./SearchBar";
import { PasswordCards } from "./passwordCards";
import { FilterPasswords } from "./FilterPasswords";
import { QueryStateHandler } from "./QueryStateHandler";
import { EmptyFallback } from "./EmptyFallback";
import { sorters } from "@/helpers/helpers";
import { useOpenModalStore } from "../store/openPasswordModalStore";

export const DashboardContent = () => {
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("date_desc");
  const { data: passwords = [], isLoading, error } = usePasswords();
  const handleOpenModal = useOpenModalStore((state) => state.handleOpenModal);

  const handleSetWebsite = (value: string) => setWebsite(value);
  const handleSetUsername = (value: string) => setUsername(value);
  const handleSetPassword = (value: string) => setPassword(value);
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
    handleOpenModal();
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  const filteredPasswords = useMemo(() => {
    const sorter = sorters[filter] || sorters.date_desc;

    return [...passwords]
      .filter((p) => p.website.toLowerCase().includes(search.toLowerCase()))
      .sort(sorter);
  }, [passwords, search, filter]);

  return (
    <QueryStateHandler
      isLoading={isLoading}
      error={error}
      data={filteredPasswords}
      loadingFallback={<Loading />}
      errorFallback={(message) => <ErrorMsg error={message} />}
      emptyFallback={
        <EmptyFallback
          website={website}
          username={username}
          password={password}
          handleSetWebsite={handleSetWebsite}
          handleSetUsername={handleSetUsername}
          handleSetPassword={handleSetPassword}
          handleInputsValues={handleInputsValues}
        />
      }
    >
      <main className={`relative min-h-screen`}>
        <div className="max-w-4xl mx-auto p-10">
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
          website={website}
          username={username}
          password={password}
          handleSetWebsite={handleSetWebsite}
          handleSetUsername={handleSetUsername}
          handleSetPassword={handleSetPassword}
          handleInputsValues={handleInputsValues}
        />
      </main>
    </QueryStateHandler>
  );
};
