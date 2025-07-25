import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

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

export const getAllPenggunaan = query({
  handler: async ({ db }) => {
    try {
      const penggunaanList = await db
        .query("penggunaan")
        .order("desc")
        .collect();
      
      return await Promise.all(
        penggunaanList.map(async (penggunaan) => {
          const pelanggan = await db.get(penggunaan.idPelanggan);
          const tarif = await db.get(penggunaan.idTarif);
          return {
            ...penggunaan,
            pelanggan,
            tarif,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching all penggunaan:", error);
      return [];
    }
  },
});

export const getPenggunaanByIdUser = query({
  args: { idUser: v.id("user") },
  handler: async ({ db }, { idUser }) => {
    try {
      const penggunaanList = await db
        .query("penggunaan")
        .filter((q) => q.eq(q.field("idPelanggan"), idUser))
        .collect();
      
      return await Promise.all(
        penggunaanList.map(async (penggunaan) => {
          const pelanggan = await db.get(penggunaan.idPelanggan);
          const tarif = await db.get(penggunaan.idTarif);
          return {
            ...penggunaan,
            pelanggan,
            tarif,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching all penggunaan:", error);
      return [];
    }
  },
});