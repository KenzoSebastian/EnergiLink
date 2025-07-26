import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const createTagihan = mutation({
  args: {
    idPenggunaan: v.id("penggunaan"),
    idPelanggan: v.id("user"),
    periode: v.string(),
    totalPenggunaan: v.number(),
    totalTagihan: v.number(),
  },
  handler: async (
    { db },
    { idPenggunaan, idPelanggan, periode, totalPenggunaan, totalTagihan }
  ) => {
    try {
      return await db.insert("tagihan", {
        idPenggunaan,
        idPelanggan,
        periode,
        totalPenggunaan,
        totalTagihan,
        status: "Belum Lunas", // Default status
      });
    } catch (error) {
      console.error("Error creating tagihan from server:", error);
    }
  },
});

export const getAllTagihan = query({
  handler: async (ctx) => {
    try {
      const tagihanList = await ctx.db.query("tagihan").order("desc").collect();
      return await Promise.all(
        tagihanList.map(async (tagihan) => {
          const penggunaan = await ctx.db.get(tagihan.idPenggunaan);
          const pelanggan = await ctx.db.get(tagihan.idPelanggan);
          return {
            ...tagihan,
            penggunaan,
            pelanggan,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching all tagihan:", error);
      throw new Error("Failed to fetch tagihan data");
    }
  },
});

export const getTagihanUnDone = query({
  handler: async (ctx) => {
    try {
      const tagihanList = await ctx.db
        .query("tagihan")
        .filter((q) => q.eq(q.field("status"), "Belum Lunas"))
        .collect();
      return tagihanList;
    } catch (error) {
      console.error("Error fetching undone tagihan:", error);
      throw new Error("Failed to fetch undone tagihan data");
    }
  },
});

export const getTagihanDone = query({
  handler: async (ctx) => {
    try {
      const tagihanList = await ctx.db
        .query("tagihan")
        .filter((q) => q.eq(q.field("status"), "Lunas"))
        .collect();
      return tagihanList;
    } catch (error) {
      console.error("Error fetching done tagihan:", error);
      throw new Error("Failed to fetch done tagihan data");
    }
  },
});

export const getTagihanByIdUser = query({
  args: { idUser: v.id("user") },
  handler: async ({ db }, { idUser }) => {
    try {
      const tagihanList = await db
        .query("tagihan")
        .filter((q) => q.eq(q.field("idPelanggan"), idUser))
        .order("desc")
        .collect();

      return await Promise.all(
        tagihanList.map(async (tagihan) => {
          const penggunaan = await db.get(tagihan.idPenggunaan);
          const tarif = await db.get(penggunaan!.idTarif);
          return {
            ...tagihan,
            penggunaan,
            tarif,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching done tagihan:", error);
      throw new Error("Failed to fetch tagihan data by id user");
    }
  },
});

export const bayarTagihan = mutation({
  args: { id: v.id("tagihan") },
  handler: async ({ db }, { id }) => {
    try {
      return await db.patch(id, { status: "Lunas" });
    } catch (error) {
      console.error("Error bayar tagihan:", error);
      throw new Error("Failed to bayar tagihan");
    }
  },
});
