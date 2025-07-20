import { query } from "../_generated/server";

export const getAllTarif = query({
  handler: async (ctx) => {
    try {
      return await ctx.db.query("tarif").collect();
    } catch (error) {
      console.error("Error fetching all tarif:", error);
      throw new Error("Failed to fetch tarif data");
    }
  },
})