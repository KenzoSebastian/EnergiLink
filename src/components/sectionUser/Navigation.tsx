import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Hamburger from "../shared/Hamburger";
import { useState } from "react";

export const Navigation = () => {
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <nav className=" bg-navigation text-white shadow fixed top-0 left-0 right-0 px-4 py-3 md:py-5 z-50">
      <div className="w-full md:w-4/5 flex justify-between items-center mx-auto">
        <Link href="/admin" className="flex items-center gap-3 mr-30">
          <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="md:w-18 md:h-18 w-14 h-14"
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-4xl font-bold">Energi</span>
            <span className="text-base md:text-2xl">Link</span>
          </div>
        </Link>

        <div className="flex items-center justify-end flex-1 gap-25">
          <div className="hidden md:flex items-center w-full justify-end gap-15">
            <Link className="text-lg font-medium transition-all hover:scale-110 duration-300" href="/dashboard">Dashbord</Link>
            <Link className="text-lg font-medium transition-all hover:scale-110 duration-300" href="/dashboard#penggunaan">Input Penggunaan</Link>
            <Link className="text-lg font-medium transition-all hover:scale-110 duration-300" href="/dashboard#tagihan">Daftar Tagihan</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={"destructive"}
              size={"sm"}
              className="sm:h-9 sm:px-4 sm:py-2"
              onClick={() => signOut()}
            >
              Logout
            </Button>
            <DropdownMenu
              open={showNav}
              onOpenChange={() => setShowNav(!showNav)}
            >
              <DropdownMenuTrigger>
                <Hamburger
                  status={showNav}
                  setStatus={setShowNav}
                  type="user"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashbord</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard#penggunaan">Input Penggunaan</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard#tagihan">Daftar Tagihan</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
