import AdminLayout from "@/components/layouts/AdminLayout";
import FormCreatePenggunaan from "@/components/shared/penggunaan/FormCreatePenggunaan";
import {
  penggunaanCreateSchema,
  type PenggunaanCreateSchemaValue,
} from "@/schema/penggunaanCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";

const PenggunaanPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [idUser, setIdUser] = useState<string | null>(null);
  const createPenggunaan = useMutation(api.tables.penggunaan.createPenggunaan);

  const getUser = useMutation(api.tables.user.getUserByIdMutation);
  const [formKey, setFormKey] = useState(0);

  const createPenggunaanForm = useForm<PenggunaanCreateSchemaValue>({
    resolver: zodResolver(penggunaanCreateSchema),
    defaultValues: {
      bulan: currentDate.toLocaleString("id", {
        month: "long",
      }),
      tahun: currentDate.getFullYear(),
    },
  });

  const handleSubmitForm = async (data: PenggunaanCreateSchemaValue) => {
    setIdUser(data.idPelanggan);
    if (data.meterAkhir < data.meterAwal) {
      toast.error("Meter akhir harus lebih besar dari meter awal.");
      return;
    }
    try {
      const user = await getUser({ id: data.idPelanggan as Id<"user"> });
      if (!user) {
        toast.error("Id Pelanggan tidak ditemukan.");
        return;
      }
      await createPenggunaan({
        idPelanggan: data.idPelanggan as Id<"user">,
        idTarif: data.idTarif as Id<"tarif">,
        bulan: data.bulan,
        tahun: data.tahun,
        meterAwal: data.meterAwal,
        meterAkhir: data.meterAkhir,
      });
      toast.success("Penggunaan berhasil ditambahkan.");
    } catch (error) {
      console.error("Error creating penggunaan:", error);
    }
    createPenggunaanForm.reset({
      bulan: currentDate.toLocaleString("id", {
        month: "long",
      }),
      tahun: currentDate.getFullYear(),
    });
    setFormKey((prevKey) => prevKey + 1); // Update key form
  };
  return (
    <AdminLayout textHeader="Penggunaan">
      {/* Sub-menu: Input Penggunaan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Input Penggunaan</h3>
        <FormCreatePenggunaan
          key={formKey}
          form={createPenggunaanForm}
          onSubmitForm={handleSubmitForm}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>

      {/* Sub-menu: Riwayat Penggunaan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Riwayat Penggunaan</h3>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan nama pelanggan atau periode"
            className="border border-gray-300 rounded-lg p-2 w-1/3"
          />
          <select className="border border-gray-300 rounded-lg p-2 w-1/4">
            <option value="">Filter Periode</option>
            <option value="juli-2025">Juli 2025</option>
            <option value="agustus-2025">Agustus 2025</option>
          </select>
        </div>

        {/* Tabel Riwayat Penggunaan */}
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">ID Penggunaan</th>
              <th className="py-2 px-4 text-left">Nama Pelanggan</th>
              <th className="py-2 px-4 text-left">Periode</th>
              <th className="py-2 px-4 text-left">Meter Awal</th>
              <th className="py-2 px-4 text-left">Meter Akhir</th>
              <th className="py-2 px-4 text-left">Total Pemakaian (kWh)</th>
              <th className="py-2 px-4 text-left">Tanggal Input</th>
            </tr>
          </thead>
          <tbody>
            {/* Contoh data riwayat penggunaan */}
            <tr>
              <td className="py-2 px-4">001</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">Juli 2025</td>
              <td className="py-2 px-4">1000</td>
              <td className="py-2 px-4">1200</td>
              <td className="py-2 px-4">200</td>
              <td className="py-2 px-4">01/08/2025</td>
            </tr>
            {/* Tambahkan baris lainnya sesuai kebutuhan */}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default PenggunaanPage;
