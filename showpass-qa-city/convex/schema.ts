import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const recordKind = v.union(v.literal("agent"), v.literal("run"), v.literal("release"));
export const entryKey = v.object({ kind: recordKind, key: v.string() });
export const workspaceEntry = entryKey.extend({ payload: v.string() });
export const qaVenue = v.object({
  environment: v.string(),
  organization: v.string(),
  location: v.string(),
});
export const qaAccounts = v.array(v.object({
  role: v.union(
    v.literal("public-tester"), v.literal("customer-tester"), v.literal("organizer-tester"),
    v.literal("organizer-builder"), v.literal("box-office-tester"),
  ),
  email: v.string(),
}));

export default defineSchema({
  workspaceState: defineTable({
    version: v.number(), qaVenue: v.optional(qaVenue), qaAccounts: v.optional(qaAccounts),
  }),
  workspaceEntries: defineTable(workspaceEntry).index("by_kind_and_key", ["kind", "key"]),
});
