import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { entryKey, qaAccounts, qaVenue, workspaceEntry } from "./schema";

export const read = internalQuery({
  args: { since: v.optional(v.number()) },
  handler: async (ctx, { since }) => {
    const state = await ctx.db.query("workspaceState").unique();
    if (!state) return { status: "empty" as const };
    if (state.version === since) return { status: "unchanged" as const };

    // The existing City API loads a complete snapshot when the version changes.
    const entries = await ctx.db.query("workspaceEntries").collect();
    return {
      status: "ready" as const, version: state.version, qaVenue: state.qaVenue, qaAccounts: state.qaAccounts,
      entries: entries.map(({ kind, key, payload }) => ({ kind, key, payload })),
    };
  },
});

export const commit = internalMutation({
  args: {
    expectedVersion: v.union(v.null(), v.number()), version: v.number(),
    qaVenue: v.optional(qaVenue),
    qaAccounts: v.optional(qaAccounts),
    upserts: v.array(workspaceEntry),
    removed: v.array(entryKey),
  },
  handler: async (ctx, { expectedVersion, version, qaVenue, qaAccounts, upserts, removed }) => {
    const state = await ctx.db.query("workspaceState").unique();
    if ((state?.version ?? null) !== expectedVersion) return false;
    if (state && version !== state.version + 1) throw new Error("Invalid workspace version.");

    for (const { kind, key } of removed) {
      const row = await ctx.db.query("workspaceEntries").withIndex("by_kind_and_key", (q) =>
        q.eq("kind", kind).eq("key", key)).unique();
      if (row) await ctx.db.delete("workspaceEntries", row._id);
    }
    for (const entry of upserts) {
      const row = await ctx.db.query("workspaceEntries").withIndex("by_kind_and_key", (q) =>
        q.eq("kind", entry.kind).eq("key", entry.key)).unique();
      if (row) await ctx.db.replace("workspaceEntries", row._id, entry);
      else await ctx.db.insert("workspaceEntries", entry);
    }
    const nextState = { version, qaVenue, qaAccounts };
    if (state) await ctx.db.replace("workspaceState", state._id, nextState);
    else await ctx.db.insert("workspaceState", nextState);
    return true;
  },
});
