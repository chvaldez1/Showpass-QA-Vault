import { z } from "zod";

export const codexActivityItemSchema = z.object({
  id: z.string(),
  kind: z.enum(["commentary", "browser"]),
  text: z.string(),
  at: z.number().optional(),
  state: z.enum(["running", "completed", "failed"]).optional(),
});

export const codexHandoffStatusSchema = z.object({
  status: z.enum(["ready", "queued", "unknown", "running", "completed", "interrupted", "failed"]),
  threadId: z.uuid(),
  turnId: z.string().optional(),
  text: z.string().optional(),
  activity: z.array(codexActivityItemSchema).optional(),
});

export type CodexHandoffStatus = z.infer<typeof codexHandoffStatusSchema>;

export type CodexActivityItem = z.infer<typeof codexActivityItemSchema>;

export const liveCodexRunsSchema = z.record(z.string(), codexHandoffStatusSchema.extend({
  revision: z.number().int().positive(),
}));

export type LiveCodexRuns = z.infer<typeof liveCodexRunsSchema>;

export const codexStatusLabels = {
  ready: "Ready to send",
  queued: "Queued in Codex",
  unknown: "Dispatch unconfirmed",
  running: "Running in Codex",
  completed: "Codex replied",
  interrupted: "Codex turn interrupted",
  failed: "Codex turn failed",
} satisfies Record<CodexHandoffStatus["status"], string>;

export function isCodexPending(status?: CodexHandoffStatus["status"]) {
  return status === "queued" || status === "unknown" || status === "running";
}
