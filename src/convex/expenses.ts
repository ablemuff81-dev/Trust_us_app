import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const expenseInput = v.object({
  localId: v.string(),
  amount: v.number(),
  description: v.string(),
  category: v.string(),
  date: v.number(),
  updatedAt: v.number(),
});

/** Expenses of the signed in user, ready to merge into the local store. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];

    const docs = await ctx.db
      .query("expenses")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return docs.map((doc) => ({
      localId: doc.localId,
      amount: doc.amount,
      description: doc.description,
      category: doc.category,
      date: doc.date,
      updatedAt: doc.updatedAt,
    }));
  },
});

/**
 * Push the local expenses to the server. Records that do not exist yet are
 * inserted, records whose local copy is newer are patched, and older ones are
 * left alone so a stale device cannot overwrite fresher data.
 */
export const upsertMany = mutation({
  args: { expenses: v.array(expenseInput) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("expenses")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const byLocalId = new Map(existing.map((doc) => [doc.localId, doc]));
    let inserted = 0;
    let updated = 0;

    for (const item of args.expenses) {
      const doc = byLocalId.get(item.localId);
      if (doc === undefined) {
        await ctx.db.insert("expenses", {
          ...item,
          userId,
          createdAt: item.updatedAt,
        });
        inserted += 1;
      } else if (item.updatedAt > doc.updatedAt) {
        await ctx.db.patch(doc._id, {
          amount: item.amount,
          description: item.description,
          category: item.category,
          date: item.date,
          updatedAt: item.updatedAt,
        });
        updated += 1;
      }
    }

    return { inserted, updated };
  },
});

/** Delete the expenses matching the given local ids. */
export const removeMany = mutation({
  args: { localIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const targets = new Set(args.localIds);
    const docs = await ctx.db
      .query("expenses")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    let deleted = 0;
    for (const doc of docs) {
      if (targets.has(doc.localId)) {
        await ctx.db.delete(doc._id);
        deleted += 1;
      }
    }

    return deleted;
  },
});

/** Budgets of the signed in user. */
export const budgetList = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];

    const docs = await ctx.db
      .query("budgets")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return docs.map((doc) => ({
      category: doc.category,
      amount: doc.amount,
      month: doc.month,
      year: doc.year,
    }));
  },
});

/** Create or update the monthly budget of one category. */
export const setBudget = mutation({
  args: {
    category: v.string(),
    amount: v.number(),
    month: v.number(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const docs = await ctx.db
      .query("budgets")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("year", args.year).eq("month", args.month),
      )
      .collect();

    const existing = docs.find((doc) => doc.category === args.category);
    if (existing !== undefined) {
      await ctx.db.patch(existing._id, {
        amount: args.amount,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("budgets", {
      ...args,
      userId,
      updatedAt: Date.now(),
    });
  },
});
