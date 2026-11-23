import { z } from "zod";
import { workspaceSchema, type Run } from "./schema";

export const workspaceVersionSchema = z.object({
  version: z.number().int().nonnegative(),
  workspace: workspaceSchema,
  recoveredHandoffs: z.literal(true).optional(),
});

export type WorkspaceVersion = z.infer<typeof workspaceVersionSchema>;

export function codexRevision(run: Run) {
  if (run.revision?.codexHandoffToken && !run.changeRequest) return run.revision.number;
  return run.recoveredCodexRevision;
}
