import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createPelanggan = mutation({
  args: {
    username: v.string(),
    alamat: v.string(),
    nomorKwh: v.number(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, alamat, nomorKwh, email, password }) => {
    return await ctx.db.insert("pelanggan", {
      username,
      alamat,
      nomorKwh,
      email,
      password,
    });
  },
});
