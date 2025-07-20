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
});
