import { z } from "zod";

export const caseTesterRoles = ["customer-tester", "public-tester", "organizer-tester", "box-office-tester"] as const;
export const caseTesterRole = z.enum(caseTesterRoles);
export const caseTesterNames = {
  "customer-tester": "Customer Tester",
  "public-tester": "Guest Tester",
  "organizer-tester": "Organizer Tester",
  "box-office-tester": "Box Office Tester",
} satisfies Record<CaseTesterRole, string>;

export type CaseTesterRole = z.infer<typeof caseTesterRole>;

const draftText = z.string().trim().min(1).max(32_000);
const detail = z.string().trim().min(1).max(2200);
const notes = z.array(detail).max(10);

export const caseSourceLayers = ["backend", "frontend"] as const;
export const caseReviewStages = ["scope", ...caseSourceLayers, "engineer", "lead"] as const;
export type CaseReviewStage = (typeof caseReviewStages)[number];
export const caseReviewActivity = {
  draft: "Tester preparing cases",
  scope: "QA Lead reviewing scope",
  backend: "Backend Master reviewing source",
  frontend: "Frontend Master reviewing source",
  engineer: "Release Engineer consolidating findings",
  lead: "QA Lead reviewing the revision",
} satisfies Record<CaseReviewStage | "draft", string>;

const sourcePath = z.string().trim().min(1).max(300);
const sourcePaths = z.array(sourcePath).max(8);
export const caseReviewInputSchema = z.object({
  existingDraft: z.string().trim().max(32_000),
  backend: z.array(sourcePath).max(9),
  frontend: z.array(sourcePath).max(9),
  clarification: z.string().trim().max(2200).optional(),
});
export type CaseReviewInput = z.infer<typeof caseReviewInputSchema>;

export const caseReviewWorkerSchema = z.object({
  id: z.uuid(),
  leaseUntil: z.iso.datetime().optional(),
  input: caseReviewInputSchema.optional(),
  problem: detail.optional(),
});

const pinnedSource = z.object({ revision: z.string().regex(/^[a-f0-9]{40}$/), paths: sourcePaths });
export const caseDraftSchema = z.object({ draft: draftText, supportingRoles: z.array(caseTesterRole).max(3) });
export const caseFindingsSchema = z.object({ summary: detail, findings: notes });
export const caseHandoffSchema = z.object({ summary: detail, proposedDraft: draftText, blockingIssues: notes });
const caseDecisionFields = z.object({
  decision: z.enum(["ready", "changes-requested"]),
  rationale: detail,
  requiredChanges: notes,
});
type Decision = z.infer<typeof caseDecisionFields> & { requiredInput?: string[]; stalled?: boolean };
const validDecision = ({ decision, requiredChanges, requiredInput, stalled }: Decision) =>
  decision === "ready" ? !requiredChanges.length && !requiredInput?.length && !stalled : Boolean(requiredChanges.length);
export const caseDecisionSchema = caseDecisionFields.extend({ requiredInput: notes.optional(), stalled: z.boolean().optional() }).refine(validDecision, {
  path: ["requiredChanges"],
});
export const caseLoopDecisionSchema = caseDecisionFields.extend({ requiredInput: notes, stalled: z.boolean() }).refine(validDecision, {
  path: ["requiredChanges"],
});

export const caseReviewSchema = z.object({
  number: z.number().int().positive(),
  owner: caseTesterRole,
  draft: draftText,
  clarification: z.string().trim().max(2200).optional(),
  source: z.object({ backend: pinnedSource.optional(), frontend: pinnedSource.optional() }),
  supporting: z.array(caseFindingsSchema.extend({ role: caseTesterRole })).max(3),
  scope: caseFindingsSchema.optional(),
  backend: caseFindingsSchema.optional(),
  frontend: caseFindingsSchema.optional(),
  engineer: caseHandoffSchema.optional(),
  lead: caseDecisionSchema.optional(),
});
export type CaseReview = z.infer<typeof caseReviewSchema>;

export function nextCaseReviewStage(review?: CaseReview): CaseReviewStage | "draft" | undefined {
  if (!review || review.lead?.decision === "changes-requested") return "draft";
  return caseReviewStages.find((stage) => !review[stage]);
}

export function caseReviewSourceInput(review: CaseReview | undefined, layer: (typeof caseSourceLayers)[number]) {
  const source = review?.source[layer];
  return source ? [`@${source.revision}`, ...source.paths] : [];
}
