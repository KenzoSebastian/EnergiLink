import AdminLayout from "@/components/layouts/AdminLayout";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

const AdminPage = () => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const { data } = useSession();
  const getUser = useQuery(api.tables.user.getUserById, { id: data?.user?.id });

  return (
    <AdminLayout
      showNav={showNav}
      setShowNav={setShowNav}
      textHeader="Admin Dashboard"
      userName={getUser?.username}
    >
      {/* <!-- Cards --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-gray-600">2500</h3>
          <p className="text-gray-400">Welcome</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-gray-600">123.50</h3>
          <p className="text-gray-400">Average Time</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-gray-600">1,805</h3>
          <p className="text-gray-400">Collections</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-gray-600">54</h3>
          <p className="text-gray-400">Comments</p>
        </div>
      </div>
      {/* <!-- Social Media Stats --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 p-4 text-white shadow rounded-lg">
          <h3 className="text-lg">Facebook</h3>
          <p>35k Friends</p>
          <p>128 Feeds</p>
        </div>
        <div className="bg-blue-400 p-4 text-white shadow rounded-lg">
          <h3 className="text-lg">Twitter</h3>
          <p>584k Followers</p>
          <p>978 Tweets</p>
        </div>
        <div className="bg-blue-300 p-4 text-white shadow rounded-lg">
          <h3 className="text-lg">LinkedIn</h3>
          <p>758+ Contacts</p>
          <p>365 Feeds</p>
        </div>
        <div className="bg-red-500 p-4 text-white shadow rounded-lg">
          <h3 className="text-lg">Google+</h3>
          <p>450 Followers</p>
          <p>57 Circles</p>
        </div>
      </div>
      {/* <!-- Chart Area --> */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold">Extra Area Chart</h3>
        <div className="mt-4">ini area chart</div>
      </div>
      
    </AdminLayout>
  );
};

export default AdminPage;
