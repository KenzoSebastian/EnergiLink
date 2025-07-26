import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import {
  dataTagihanUserType,
  TableTagihanUser,
} from "../shared/tagihan/TableTagihanUser";

export const TagihanSection = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<dataTagihanUserType[]>([]);
  const dataTagihan = useQuery(api.tables.tagihan.getTagihanByIdUser, {
    idUser: userId as Id<"user">,
  });

  useEffect(() => {
    setData([]);
    dataTagihan?.forEach((item) => {
      setData((prevData) => [
        ...prevData,
        {
          _id: item._id,
          periode: item.periode,
          meterAwal: item.penggunaan!.meterAwal,
          meterAkhir: item.penggunaan!.meterAkhir,
          totalTagihan: item.totalTagihan,
          jenisTarif: item.tarif!.namaTarif,
          daya: item.tarif!.daya,
          harga: item.tarif!.harga,
          status: item.status,
          totalPenggunaan: item.totalPenggunaan,
        },
      ]);
    });
  }, [dataTagihan]);
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Daftar Tagihan</h3>
      <TableTagihanUser data={data} />
    </div>
  );
};
