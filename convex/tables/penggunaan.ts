import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createPenggunaan = mutation({
  args: {
    idPelanggan: v.id("user"),
    idTarif: v.id("tarif"),
    bulan: v.string(),
    tahun: v.number(),
    meterAwal: v.number(),
    meterAkhir: v.number(),
  },
  handler: async (
    { db },
    { idPelanggan, idTarif, bulan, tahun, meterAwal, meterAkhir }
  ) => {
    try {
      return await db.insert("penggunaan", {
        idPelanggan,
        idTarif,
        bulan,
        tahun,
        meterAwal,
        meterAkhir,
      });
    } catch (error) {
      console.error("Error creating penggunaan dari server:", error);
    }
  },
});
