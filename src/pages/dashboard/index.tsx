import { HeroSection } from "@/components/sectionUser/HeroSection";
import { Navigation } from "@/components/sectionUser/Navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { PenggunaanSection } from "@/components/sectionUser/PenggunaanSection";
import { TagihanSection } from "@/components/sectionUser/TagihanSection";

const DashboardPage = () => {
  const { data: sessionData } = useSession();
  const [idUser, setIdUser] = useState<string>("");
  const userData = useQuery(api.tables.user.getUserByIdQuery, {
    id: idUser || "",
  });
  // const tagihanData = useQuery(api.tables.tagihan.getTagihanByUserId, {
  //   userId,
  // });

  const [usage, setUsage] = useState("");

  useEffect(() => {
    if (sessionData) {
      setIdUser(sessionData?.user?.id);
    }
  }, [sessionData]);

  const handleUsageSubmit = (e) => {
    e.preventDefault();
    // Handle input usage submission logic here, e.g., send to API
    console.log("Usage submitted:", usage);
    setUsage("");
  };

  return (
    <div className="flex flex-col min-h-5000 bg-white">
      {/* Fixed Navigation Bar */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection username={userData?.username || ""} />

      <div className="w-full md:w-4/5 mx-auto p-6">
        {/* Input Penggunaan */}
        <div className="pt-24 md:pt-32" id="penggunaan">
          <PenggunaanSection userId={idUser} />
        </div>

        {/* Daftar Tagihan */}
        <div className="pt-24 md:pt-32" id="tagihan">
          <TagihanSection userId={idUser} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
