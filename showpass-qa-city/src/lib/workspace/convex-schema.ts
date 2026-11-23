import { z } from "zod";
import { qaAccountsSchema, qaVenueSchema } from "./schema";

const entryKind = z.enum(["agent", "run", "release"]);
const entryKey = z.object({ kind: entryKind, key: z.string().min(1) });
const entry = entryKey.extend({ payload: z.string() });
const state = z.object({
  version: z.number().int().nonnegative(),
  qaVenue: qaVenueSchema.optional(),
  qaAccounts: qaAccountsSchema.optional(),
});

export const convexReadSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("empty") }),
  z.object({ status: z.literal("unchanged") }),
  state.extend({ status: z.literal("ready"), entries: z.array(entry) }),
]);
export const convexCommitSchema = state.extend({
  expectedVersion: state.shape.version.nullable(),
  upserts: z.array(entry),
  removed: z.array(entryKey),
});
export type WorkspaceEntry = z.infer<typeof entry>;
