import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    username: v.string(),
    alamat: v.string(),
    nomorKwh: v.number(),
    role: v.string(),
    email: v.string(),
    password: v.string(),
  }),
  tarif: defineTable({
    namaTarif: v.string(),
    daya: v.number(),
    harga: v.number(),
  }),
  penggunaan: defineTable({
    idPelanggan: v.id("user"),
    idTarif: v.id("tarif"),
    bulan: v.string(),
    tahun: v.number(),
    meterAwal: v.number(),
    meterAkhir: v.number(),
  }).index("idPelanggan_idTarif_index", ["idPelanggan", "idTarif"]),
  tagihan: defineTable({
    idPenggunaan: v.id("penggunaan"),
    idPelanggan: v.id("user"),
    periode: v.string(),
    totalPenggunaan: v.number(),
    totalTagihan: v.number(),
    status: v.union(v.literal("Lunas"), v.literal("Belum Lunas")),
  }).index("idPenggunaan_idPelanggan_index", ["idPenggunaan", "idPelanggan"]),
});
