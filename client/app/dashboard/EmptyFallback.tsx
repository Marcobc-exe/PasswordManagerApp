import { FC } from "react";
import { AddPassModal } from "./addPassModal";
import { NoPasswordsYet } from "./noPasswords";

type Props = {
  website: string;
  username: string;
  password: string;
  openModal: boolean;
  handleOpenModal: (value: boolean) => void;
  handleSetWebsite: (value: string) => void;
  handleSetPassword: (value: string) => void;
  handleSetUsername: (value: string) => void;
  handleInputsValues: () => void;
};

export const EmptyFallback: FC<Props> = ({
  website,
  username,
  password,
  openModal,
  handleOpenModal,
  handleSetWebsite,
  handleSetPassword,
  handleSetUsername,
  handleInputsValues,
}) => {
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
};
