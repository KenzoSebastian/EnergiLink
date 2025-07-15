import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createUser = mutation({
  args: {
    username: v.string(),
    alamat: v.string(),
    nomorKwh: v.number(),
    role: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (
    ctx,
    { username, alamat, nomorKwh, role, email, password }
  ) => {
    try {
      const userExist = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("email"), email))
        .first();
      if (userExist) {
        return null;
      }
      return await ctx.db.insert("user", {
        username,
        alamat,
        nomorKwh,
        role,
        email,
        password,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },
});

export const getUserByEmail = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    try {
      return await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("email"), email))
        .first();
    } catch (error) {
      console.error("Error getting user by email:", error);
    }
  },
});
