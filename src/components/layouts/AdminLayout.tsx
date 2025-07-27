import { useQuery } from "convex/react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import Hamburger from "../shared/Hamburger";
import SideBar from "../shared/SideBar";
import { Button } from "../ui/button";

type AdminLayoutProps = {
  children: React.ReactNode;
  textHeader: string;
};

const AdminLayout = ({ children, textHeader }: AdminLayoutProps) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const { data } = useSession();
  const userId = data?.user?.id;
  const getUser = useQuery(api.tables.user.getUserByIdQuery, {
    id: userId || "",
  });

  return (
    <div className="flex">
      {/* <!-- Sidebar --> */}
      <SideBar showNav={showNav} setShowNav={setShowNav} />
      {/* <!-- Main Content --> */}
      <div className="flex-1 py-6 px-3 md:px-6 md:ml-64 min-h-screen overflow-hidden bg-coreBg">
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
              {getUser?.username || "Loading..."}
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
        <div className="px-2 md:px-0">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
