import AdminLayout from "@/components/layouts/AdminLayout";
import {
  dataTagihanType,
  TableTagihan,
} from "@/components/shared/tagihan/TableTagihan";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";

const TagihanPage = () => {
  const [data, setData] = useState<dataTagihanType[]>([]);
  const dataTagihan = useQuery(api.tables.tagihan.getAllTagihan);

  useEffect(() => {
    dataTagihan?.forEach((item) => {
      setData((prevData) => [
        ...prevData,
        {
          _id: item._id,
          namaPelanggan: item.pelanggan!.username,
          periode: item.periode,
          totalTagihan: item.totalTagihan,
          status: item.status,
          totalPenggunaan: item.totalPenggunaan,
        },
      ]);
    });
  }, [dataTagihan]);

  return (
    <AdminLayout textHeader="Tagihan">
      {/* Sub-menu: Daftar Tagihan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Daftar Tagihan</h3>
        <TableTagihan data={data} />
      </div>

    </AdminLayout>
  );
};

export default TagihanPage;
