import { z } from "zod";
import { builderRecordsSchema } from "./builder-result";
import { draftExecutionResultSchema, eventDraftSchema } from "./event-draft";
import { engineeringSourceSchema, hasEngineeringHandoff, stageSchemas } from "./release";

export const planReviewModes = ["short", "full", "draft"] as const;
export type PlanReviewMode = (typeof planReviewModes)[number];
export const planReviewLabels = {
  short: "Short review · routine live work",
  full: "Full review · high-risk live work",
  draft: "Draft plan only",
} satisfies Record<PlanReviewMode, string>;

export const builderWorkflows = ["event-builder", "offering-builder", "organizer-builder"] as const;
const testerWorkflows = ["organizer-tester", "public-tester", "customer-tester", "box-office-tester"] as const;
export const qaWorkflows = [...builderWorkflows, ...testerWorkflows] as const;
export type BuilderWorkflow = (typeof builderWorkflows)[number];

export const workflowSkills = {
  "event-builder": "showpass-beef-up-event",
  "offering-builder": "showpass-beef-up-event",
  "organizer-builder": "showpass-beef-up-event",
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

const planRiskSchema = z.object({
  level: z.enum(["routine", "high-risk"]),
  reason: description,
});

export const liveProposalSchema = proposalSchema.extend({ risk: planRiskSchema });
export const eventDraftProposalSchema = liveProposalSchema.extend({ eventDraft: eventDraftSchema.nullable() });

export const leadDecisionSchema = z.object({
  decision: z.enum(["approved", "disapproved"]),
  rationale: description,
  alternatives: notes.min(1),
  requiredChanges: notes,
}).refine(({ decision, requiredChanges }) =>
  decision === "approved" ? !requiredChanges.length : requiredChanges.length > 0,
);

export const leadResponseSchema = leadDecisionSchema.safeExtend({
  executionToken: z.string().optional(),
  codexHandoffToken: z.uuid().optional(),
});

const planHandoffSchema = z.object({
  impact: description,
  checks: notes,
  concerns: notes,
});

export const shortReviewSchema = planHandoffSchema.extend({
  requiredReview: z.enum(["short", "full"]),
  stop: description,
}).refine(({ requiredReview, concerns }) => requiredReview !== "full" || concerns.length > 0);

const planEngineeringSchema = engineeringSourceSchema.extend({ engineer: planHandoffSchema.optional() });
export const planStageSchemas = {
  intake: stageSchemas.intake,
  backend: stageSchemas.backend,
  frontend: stageSchemas.frontend,
  engineer: planHandoffSchema,
};

export const revisionSchema = z.object({
  number: z.number().int().positive(),
  workflow: z.enum(qaWorkflows),
  change: z.string().max(1000),
  plan: proposalSchema,
  risk: planRiskSchema.optional(),
  eventDraft: eventDraftSchema.optional(),
  executionToken: z.string().optional(),
  codexHandoffToken: z.uuid().optional(),
  draftExecution: draftExecutionResultSchema.optional(),
  shortReview: shortReviewSchema.optional(),
  engineer: planHandoffSchema.optional(), // Saved consultation from before the full review layer.
  engineering: planEngineeringSchema.optional(),
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

export function getPlanReviewMode(requested?: PlanReviewMode, revision?: Revision): PlanReviewMode {
  if (requested === "draft") return "draft";
  if (requested === "short" && revision?.risk?.level === "routine" && revision.shortReview?.requiredReview !== "full") {
    return "short";
  }
  return "full";
}

export function isPlanReviewReady(requested: PlanReviewMode | undefined, revision?: Revision) {
  const mode = getPlanReviewMode(requested, revision);
  if (mode === "short") return revision?.shortReview?.requiredReview === "short";
  return mode === "full" && hasEngineeringHandoff(revision?.engineering);
}

export function inferBuilderWorkflow(subject: string): BuilderWorkflow {
  if (/\b(products?|memberships?)\b/i.test(subject) && !/\bevents?\b/i.test(subject)) return "offering-builder";
  if (/\b(events?|raves?|concerts?|shows?)\b/i.test(subject)) return "event-builder";
  return "organizer-builder";
}

export function asBuilderWorkflow(workflow: string | undefined) {
  return z.enum(builderWorkflows).safeParse(workflow).data;
}

export function getQaWorkflow(role: string, title: string, builderWorkflow?: BuilderWorkflow) {
  if (role === "organizer-builder") {
    const subject = title.split(/\s+(?:at|for|from|in|of|on|to|under|using|with)\s+/i, 1)[0];
    return builderWorkflow ?? inferBuilderWorkflow(subject);
  }
  return z.enum(testerWorkflows).safeParse(role).data;
}
