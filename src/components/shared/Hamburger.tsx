import React from "react";

const Hamburger = ({
  status,
  setStatus,
}: {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      id="hamburger"
      className={`flex flex-col justify-around p-2 gap-1.5 rounded-lg focus:outline-none z-50 md:hidden group ${status ? "active fixed" : ""}`}
      onClick={() => setStatus(!status)}
    >
      <span className="w-6 h-0.5 bg-black transform transition-all group-[.active]:bg-white duration-500 ease-in-out origin-top-left group-[.active]:rotate-45"></span>
      <span className="w-6 h-0.5 bg-black transform transition-all group-[.active]:bg-white duration-500 ease-in-out group-[.active]:opacity-0 group-[.active]:scale-0 opacity-100"></span>
      <span className="w-6 h-0.5 bg-black transform transition-all group-[.active]:bg-white duration-500 ease-in-out origin-bottom-left group-[.active]:-rotate-45"></span>
    </button>
  );
};

export default Hamburger;
