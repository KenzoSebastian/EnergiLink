import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBar = ({
  showNav,
  setShowNav,
}: {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <div
        className={`md:w-64 w-48 bg-blue-950 text-white flex flex-col h-screen fixed transition-all md:left-0 z-30 duration-500 ${showNav ? "left-0" : "-left-50"}`}
      >
        <div className="flex items-center pt-6 px-4">
          <div className="items-center gap-3 hidden md:flex">
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="w-18 h-18"
              priority
            />
            <div className="flex flex-col">
              <span className="text-4xl font-bold">Energi</span>
              <span className="text-2xl">Link</span>
            </div>
          </div>
        </div>
        <nav className="pt-10 flex flex-col flex-1 justify-between">
          <ul className="flex flex-col">
            <li className="hover:bg-blue-700 ">
              <Link className="px-5 py-3 inline-block w-full" href="/admin">
                Dashboard
              </Link>
            </li>
            <li className="hover:bg-blue-700 ">
              <Link className="px-5 py-3 inline-block w-full" href="/admin/pelanggan">
                Pelanggan
              </Link>
            </li>
            <li className="hover:bg-blue-700 ">
              <Link className="px-5 py-3 inline-block w-full" href="/admin/penggunaan">
                pengunaan
              </Link>
            </li>
            <li className="hover:bg-blue-700 ">
              <Link className="px-5 py-3 inline-block w-full" href="/admin/tagihan">
                Tagihan
              </Link>
            </li>
            <li className="hover:bg-blue-700 ">
              <Link className="px-5 py-3 inline-block w-full" href="/admin/laporan">
                Laporan
              </Link>
            </li>
            <li className="hover:bg-blue-700 ">
              <Link className="px-5 py-3 inline-block w-full" href="/admin/pengaturan">
                Pengaturan
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={` md:hidden fixed top-0 bottom-0 left-0 right-0 z-20 bg-black opacity-50 ${showNav ? "block" : "hidden"}`}
        onClick={() => setShowNav(false)}
      ></div>
    </div>
  );
};

export default SideBar;
