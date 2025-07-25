import {
  penggunaanCreateSchema,
  type PenggunaanCreateSchemaValue,
} from "@/schema/penggunaanCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import FormCreatePenggunaan from "../shared/penggunaan/FormCreatePenggunaan";
import { type dataPenggunaanUserType, TablePenggunaanUser } from "../shared/penggunaan/TablePenggunaanUser";

export const PenggunaanSection = ({ userId }: { userId: string }) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [formKey, setFormKey] = useState(0);
  const [data, setData] = useState<dataPenggunaanUserType[]>([]);

  const createPenggunaan = useMutation(api.tables.penggunaan.createPenggunaan);
  const createTagihan = useMutation(api.tables.tagihan.createTagihan);
  const getTarif = useMutation(api.tables.tarif.getTarifById);
  const userPenggunaan = useQuery(api.tables.penggunaan.getPenggunaanByIdUser, {idUser: userId as Id<"user">});
  const getUser = useMutation(api.tables.user.getUserByIdMutation);

  const createPenggunaanForm = useForm<PenggunaanCreateSchemaValue>({
    resolver: zodResolver(penggunaanCreateSchema),
    defaultValues: {
      bulan: currentDate.toLocaleString("id", {
        month: "long",
      }),
      tahun: currentDate.getFullYear(),
      idPelanggan: userId,
    },
  });

  useEffect(() => {
    setData([]);
    userPenggunaan?.forEach((item) => {
      setData((prevData) => [
        ...prevData,
        {
          bulan: item.bulan,
          tahun: item.tahun,
          meterAwal: item.meterAwal,
          meterAkhir: item.meterAkhir,
          totalPenggunaan: item.meterAkhir - item.meterAwal,
        },
      ]);
    });
    createPenggunaanForm.setValue("idPelanggan", userId);
  }, [userPenggunaan, createPenggunaanForm, userId]);

  const handleSubmitForm = async (data: PenggunaanCreateSchemaValue) => {
    if (data.meterAkhir < data.meterAwal) {
      toast.error("Meter akhir harus lebih besar dari meter awal.");
      return;
    }
    try {
      // Fetch user and tarif data
      const user = await getUser({ id: data.idPelanggan as Id<"user"> });
      const tarif = await getTarif({ id: data.idTarif as Id<"tarif"> });
      if (!user || !tarif) {
        toast.error("Pengguna atau tarif tidak ditemukan.");
        return;
      }
      // Create penggunaan
      const resultId = await createPenggunaan({
        idPelanggan: data.idPelanggan as Id<"user">,
        idTarif: data.idTarif as Id<"tarif">,
        bulan: data.bulan,
        tahun: data.tahun,
        meterAwal: data.meterAwal,
        meterAkhir: data.meterAkhir,
      });
      if (!resultId) {
        toast.error("Gagal membuat penggunaan.");
        throw new Error("Gagal membuat penggunaan.");
      }
      const totalPenggunaan = data.meterAkhir - data.meterAwal;
      const periode = `${data.bulan} ${data.tahun}`;
      const totalTagihan = totalPenggunaan * tarif.harga;

      // Create tagihan
      await createTagihan({
        idPenggunaan: resultId,
        idPelanggan: data.idPelanggan as Id<"user">,
        periode,
        totalPenggunaan,
        totalTagihan,
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
      idPelanggan: userId,
    });
    setFormKey((prevKey) => prevKey + 1); // Update key form
  };
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Input Penggunaan</h3>
        <FormCreatePenggunaan
          key={formKey}
          form={createPenggunaanForm}
          onSubmitForm={handleSubmitForm}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          type="user"
        />
      </div>

      {/* Sub-menu: Riwayat Penggunaan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Riwayat Penggunaan</h3>
        <TablePenggunaanUser data={data} />
      </div>
    </div>
  );
};
