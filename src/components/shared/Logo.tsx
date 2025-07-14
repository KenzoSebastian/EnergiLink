import Image from "next/image";
import React from "react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <Image src="/logo.png" alt="Logo" width={500} height={500} className="w-22 h-22" />
      <div className="flex flex-col">
        <span className="text-5xl font-bold">Energi</span>
        <span className="text-3xl">Link</span>
      </div>
    </div>
  );
};