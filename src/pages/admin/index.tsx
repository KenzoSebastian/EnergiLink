import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

const AdminPage = () => {
  return (
    <div className="flex">
      {/* <!-- Sidebar --> */}
      <div className="w-64 bg-blue-950 text-white flex flex-col h-screen">
        <div className="flex items-center p-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="w-18 h-18"
            />
            <div className="flex flex-col">
              <span className="text-4xl font-bold">Energi</span>
              <span className="text-2xl">Link</span>
            </div>
          </div>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Dashboard</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Widgets</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Elements</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Tables</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Apps</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Pricing Tables</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Contact</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Additional Pages</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Map</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Charts</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Settings</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* <!-- Main Content --> */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div>
            <span className="text-gray-600">John David</span>
            <Button variant={"destructive"} onClick={() => signOut()}>Logout</Button>
          </div>
        </header>

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
          <div className="mt-4">gbsdg</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
