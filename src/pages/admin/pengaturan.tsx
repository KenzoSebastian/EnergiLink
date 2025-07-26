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
        <h3 className="text-lg font-bold mb-4">Manajemen Tarif Listrik</h3>
        <TableTarif data={dataTarif || []} />
      </div>

    </AdminLayout>
  );
};

export default PengaturanPage;
