import AdminLayout from "@/components/layouts/AdminLayout";
import { TablePelanggan } from "@/components/shared/TablePelanggan";
import { useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";

const PelangganPage = () => {
  const dataPelanggan = useQuery(api.tables.user.getAllUser);
  useEffect(() => {
    console.log(dataPelanggan);
  }, [dataPelanggan]);

  return (
    <AdminLayout textHeader="Pelanggan">
      {/* Sub-menu: Daftar Pelanggan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Daftar Pelanggan</h3>

        {/* Tabel Data Pelanggan */}
        <TablePelanggan data={dataPelanggan || []} />
      </div>
    </AdminLayout>
  );
};

export default PelangganPage;
