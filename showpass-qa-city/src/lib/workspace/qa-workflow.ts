import { z } from "zod";
import { builderRecordsSchema } from "./builder-result";

export const qaWorkflows = [
  "event-builder", "offering-builder", "organizer-tester",
  "public-tester", "customer-tester", "box-office-tester",
] as const;

export const workflowSkills = {
  "event-builder": "showpass-beef-up-event",
  "offering-builder": "showpass-beef-up-event",
  "organizer-tester": "showpass-organizer-tester",
  "public-tester": "showpass-public-tester",
  "customer-tester": "showpass-customer-tester",
  "box-office-tester": "showpass-box-office-tester",
} satisfies Record<(typeof qaWorkflows)[number], string>;

const description = z.string().min(1).max(1500);
const notes = z.array(description).max(8);

export const proposalSchema = z.object({
  approach: description,
  startingPoint: description,
  prerequisites: notes,
  steps: z.array(z.object({ action: description, proof: description })).min(1).max(10),
  changes: description,
  cleanup: description,
  stop: description,
  sources: notes,
});

export const leadDecisionSchema = z.object({
  decision: z.enum(["approved", "disapproved"]),
  rationale: description,
  alternatives: notes.min(1),
  requiredChanges: notes,
}).refine(({ decision, requiredChanges }) =>
  decision === "approved" ? !requiredChanges.length : requiredChanges.length > 0,
);

export const revisionSchema = z.object({
  number: z.number().int().positive(),
  workflow: z.enum(qaWorkflows),
  change: z.string().max(1000),
  plan: proposalSchema,
  review: leadDecisionSchema.optional(),
});

export const browserOutcomes = ["passed", "failed", "blocked", "not-run"] as const;
export const browserOutcomeLabels = {
  passed: "Passed", failed: "Failed", blocked: "Blocked", "not-run": "Not run",
} satisfies Record<(typeof browserOutcomes)[number], string>;

export const browserResultSchema = z.object({
  outcome: z.enum(browserOutcomes).default("passed"),
  summary: z.string().trim().min(1, "Enter what was verified in Codex.").max(2000),
  preview: z.string().trim().max(1000),
  records: builderRecordsSchema.optional(),
});

export type Proposal = z.infer<typeof proposalSchema>;
export type Revision = z.infer<typeof revisionSchema>;
export type LeadDecision = z.infer<typeof leadDecisionSchema>;

export function getQaWorkflow(role: string, title: string) {
  if (role === "organizer-tester" &&
    /^(?:(?:please|can you)\s+)?(?:create|build|make|set up|draft|beef up)\b/i.test(title)) {
    if (/\b(products?|membership|memberships)\b/i.test(title) && !/\bevents?\b/i.test(title)) {
      return "offering-builder";
    }
    if (/\b(events?|raves?|concerts?|shows?)\b/i.test(title)) return "event-builder";
  }
  return z.enum(qaWorkflows.slice(2)).safeParse(role).data;
}
