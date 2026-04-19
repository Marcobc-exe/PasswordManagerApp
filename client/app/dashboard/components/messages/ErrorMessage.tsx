"use client";

import { FC } from "react";

type Props = {
  error: string;
};

export const ErrorMsg: FC<Props> = ({ error }) => {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-red-500 text-xl">{error}</p>
    </main>
  );
};
