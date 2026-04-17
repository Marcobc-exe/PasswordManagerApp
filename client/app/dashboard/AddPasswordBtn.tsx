"use client";

import { Plus } from "lucide-react";
import { useMediaQuery } from "@mui/material";
import { useOpenModalStore } from "@/app/store/openPasswordModalStore";

export const AddPasswordBtn = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const handleOpenModal = useOpenModalStore((state) => state.handleOpenModal);

  return (
    <button
      className={`flex items-center gap-2 bg-blue-600 text-white ${isMobile ? "p-3 rounded-3xl" : "px-5 py-3 rounded-xl"}  hover:bg-blue-700 transition cursor-pointer`}
      onClick={handleOpenModal}
    >
      <Plus size={isMobile ? 24 : 18} />
      {!isMobile ? "Add password" : ""}
    </button>
  );
};
