import AdminLayout from "@/components/layouts/AdminLayout";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const AdminPage = () => {
  const dataPelanggan = useQuery(api.tables.user.getAllUser);
  return (
    <AdminLayout textHeader="Admin Dashboard">
      {/* Kartu Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-400 p-4 shadow rounded-lg">
          <h3 className="">Total Pelanggan</h3>
          <p className="font-semibold text-2xl">{dataPelanggan?.length || 0}</p>
        </div>
        <div className="bg-red-400 p-4 shadow rounded-lg">
          <h3 className="">Tagihan Belum Lunas</h3>
          <p className="font-semibold text-2xl">123.50</p>
        </div>
        <div className="bg-emerald-400 p-4 shadow rounded-lg">
          <h3 className="">Pendapatan Bulan Ini</h3>
          <p className="font-semibold text-2xl">1,805</p>
        </div>
        <div className="bg-yellow-400 p-4 shadow rounded-lg">
          <h3 className="">Pelanggan Baru</h3>
          <p className="font-semibold text-2xl">54</p>
        </div>
      </div>

      {/* Grafik Tren Pendapatan */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h3 className="text-lg font-bold">Grafik Tren Pendapatan</h3>
        <div className="mt-4">
          ini grafik tren pendapatan (misal: menggunakan library chart)
        </div>
      </div>

      {/* Tabel Notifikasi Penting */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h3 className="text-lg font-bold">Notifikasi Penting</h3>
        <table className="min-w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Tagihan</th>
              <th className="py-2 px-4 text-left">Jatuh Tempo</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Tagihan 1</td>
              <td className="py-2 px-4">01/12/2023</td>
              <td className="py-2 px-4 text-red-500">Belum Lunas</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Tagihan 2</td>
              <td className="py-2 px-4">05/12/2023</td>
              <td className="py-2 px-4 text-green-500">Lunas</td>
            </tr>
            {/* Tambahkan baris lainnya sesuai kebutuhan */}
          </tbody>
        </table>
      </div>

      {/* Log Aktivitas Admin */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold">Log Aktivitas Admin</h3>
        <ul className="mt-4">
          <li>Admin Budi menambahkan pelanggan baru</li>
          <li>Admin Ani menginput penggunaan untuk 10 pelanggan</li>
          {/* Tambahkan aktivitas lainnya sesuai kebutuhan */}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
