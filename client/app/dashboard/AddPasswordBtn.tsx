import { Plus } from "lucide-react";
import { FC } from "react";

type Props = {
  isMobile: boolean;
  handleOpenModal: (value: boolean) => void;
};

export const AddPasswordBtn: FC<Props> = ({ isMobile, handleOpenModal }) => {
  return (
    <button
      className={`flex items-center gap-2 bg-blue-600 text-white ${isMobile ? "p-3 rounded-3xl" : "px-5 py-3 rounded-xl"}  hover:bg-blue-700 transition cursor-pointer`}
      onClick={() => handleOpenModal(true)}
    >
      <Plus size={isMobile ? 24 : 18} />
      {!isMobile ? "Add password" : ""}
    </button>
  );
};
