import AdminLayout from "@/components/layouts/AdminLayout";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { ChartPendapatan } from "@/components/shared/ChartPendapatan";
import Link from "next/link";

const AdminPage = () => {
  const dataPelanggan = useQuery(api.tables.user.getAllUser);
  const newUser = useQuery(api.tables.user.getNewUser);
  const tagihanUnDone = useQuery(api.tables.tagihan.getTagihanUnDone);
  const tagihanDone = useQuery(api.tables.tagihan.getTagihanDone);
  const [pendapatanBulanIni, setPendapatanBulanIni] = useState<number>(0);
  const [listPendapatan, setListPendapatan] = useState<{ amount: number }[]>([]);

useEffect(() => {
  setListPendapatan([]);
  if (tagihanDone) {
    const totalPendapatan = tagihanDone.reduce(
      (acc, tagihan) => acc + tagihan.totalTagihan,
      0
    );
    setPendapatanBulanIni(totalPendapatan);
    setListPendapatan(
      tagihanDone.slice(-7).map((tagihan) => ({
        amount: tagihan.totalTagihan,
      }))
    );
  }
}, [tagihanUnDone, tagihanDone]);

  return (
    <AdminLayout textHeader="Admin Dashboard">
      {/* Kartu Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link href="/admin/pelanggan" className="bg-core text-white p-4 shadow rounded-lg">
          <h3 className="">Total Pelanggan</h3>
          <p className="font-semibold text-2xl">{dataPelanggan?.length || 0}</p>
        </Link>
        <Link href="/admin/tagihan" className="bg-red-700 text-white p-4 shadow rounded-lg">
          <h3 className="">Tagihan Belum Lunas</h3>
          <p className="font-semibold text-2xl">{tagihanUnDone?.length || 0}</p>
        </Link>
        <div className="bg-emerald-500 p-4 shadow rounded-lg">
          <h3 className="">Pendapatan</h3>
          <p className="font-semibold text-2xl">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(pendapatanBulanIni)}
          </p>
        </div>
        <div className="bg-yellow-500 p-4 shadow rounded-lg">
          <h3 className="">Pelanggan Baru</h3>
          <p className="font-semibold text-2xl">{newUser?.length || 0}</p>
        </div>
      </div>

      {/* Grafik Tren Pendapatan */}
      <div className="mb-6">
        <ChartPendapatan
          dataPendapatan={listPendapatan}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
