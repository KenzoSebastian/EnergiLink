import React from 'react'
import SideBar from '../shared/SideBar';
import Hamburger from '../shared/Hamburger';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

type AdminLayoutProps = {
  children: React.ReactNode
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  textHeader: string
  userName?: string | undefined
}

const AdminLayout = ({ children, showNav, setShowNav, textHeader, userName }: AdminLayoutProps) => {
  return (
    <div className="flex">
      {/* <!-- Sidebar --> */}
      <SideBar showNav={showNav} setShowNav={setShowNav} />
      {/* <!-- Main Content --> */}
      <div className="flex-1 py-6 px-3 md:px-6 md:ml-64 min-h-screen bg-stone-100">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1">
            <Hamburger setStatus={setShowNav} status={showNav} />
            <span className={`w-10 ${showNav ? "block" : "hidden"}`}></span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              {textHeader}
            </h2>
          </div>

          <div className="items-center sm:gap-3 gap-1.5 flex">
            <span className="text-gray-600 text-sm sm:text-base truncate max-w-22 capitalize">
              {userName || "Loading..."}
            </span>
            <Button
              variant={"destructive"}
              size={"sm"}
              className="sm:h-9 sm:px-4 sm:py-2"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

export default AdminLayout