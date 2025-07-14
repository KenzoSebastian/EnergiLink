import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pelanggan: defineTable({
    username: v.string(),
    alamat: v.string(),
    nomorKwh: v.number(),
    email: v.string(),
    password: v.string(),
  }),
});
