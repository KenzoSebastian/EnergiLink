import AdminLayout from "@/components/layouts/AdminLayout";
import { TableTarif } from "@/components/shared/tarif/TableTarif";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

const PengaturanPage = () => {
  const dataTarif = useQuery(api.tables.tarif.getAllTarif);
  return (
    <AdminLayout textHeader="Pengaturan">
      {/* Sub-menu: Manajemen Tarif Listrik */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Manajemen Tarif Listrik</h3>
        <TableTarif data={dataTarif || []} />
      </div>

      {/* Sub-menu: Profil Admin */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Profil Admin</h3>
        <form className="bg-white p-4 shadow rounded-lg">
          <div className="mb-4">
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Ubah Password</label>
            <input
              type="password"
              placeholder="Masukkan Password Baru"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default PengaturanPage;
