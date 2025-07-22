import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getAllTarif = query({
  handler: async (ctx) => {
    try {
      return await ctx.db.query("tarif").collect();
    } catch (error) {
      console.error("Error fetching all tarif:", error);
      throw new Error("Failed to fetch tarif data");
    }
  },
});

export const editTarif = mutation({
  args: { id: v.id("tarif"), daya: v.number(), harga: v.number() },
  handler: async (ctx, { id, daya, harga }) => {
    try {
      return await ctx.db.patch(id, { daya, harga });
    } catch (error) {
      console.error("Error editing tarif:", error);
      // throw new Error("Failed to edit tarif data");
    }
  },
});

export const getTarifById = mutation({
  args: { id: v.id("tarif") },
  handler: async (ctx, { id }) => {
    try {
      return await ctx.db.get(id);
    } catch (error) {
      console.error("Error fetching tarif by ID:", error);
      throw new Error("Failed to fetch tarif data by ID");
    }
  },
});
