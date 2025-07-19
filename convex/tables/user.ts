import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { mutation, query } from "../_generated/server";

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
export const getUserById = query({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    try {
      return await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("_id"), id))
        .first();
    } catch (error) {
      console.error("Error getting user by id:", error);
    }
  },
});

export const getAllUser = query({
  handler: async (ctx) => {
    try {
      return await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("role"), "user"))
        .collect();
    } catch (error) {
      console.error("Error getting user by email:", error);
    }
  },
});

export const deleteUsers = mutation({
  args: { idArray: v.array(v.string()) },
  handler: async (ctx, { idArray }) => {
    try {
      // 1. Filter hanya ID yang valid
      const validIds = idArray
        .map((idString): Id<"user"> | null => {
          try {
            return ctx.db.normalizeId("user", idString);
          } catch (e) {
            console.error(`Invalid ID: ${idString}`, e);
            return null;
          }
        })
        .filter((id): id is Id<"user"> => id !== null);

      if (validIds.length === 0) {
        return { success: false, message: "No valid user IDs provided." };
      }

      const deletePromises = validIds.map((id) => ctx.db.delete(id));
      await Promise.all(deletePromises);

      return { success: true, deletedCount: validIds.length };
    } catch (error) {
      console.error("Error deleting users:", error);
      return { success: false, message: "An error occurred during deletion." };
    }
  },
});
