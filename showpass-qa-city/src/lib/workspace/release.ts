import { z } from "zod";

export const engineeringStages = ["intake", "backend", "frontend", "engineer"] as const;
export const releaseStages = [...engineeringStages, "lead"] as const;
export type EngineeringStage = (typeof engineeringStages)[number];
export type ReleaseStage = (typeof releaseStages)[number];

export const releaseRoles = {
  intake: { name: "Release Engineer", skill: "showpass-release-engineer" },
  backend: { name: "Backend Master", skill: "showpass-backend-master" },
  frontend: { name: "Frontend Master", skill: "showpass-frontend-master" },
  engineer: { name: "Release Engineer", skill: "showpass-release-engineer" },
  lead: { name: "QA Lead", skill: "showpass-qa-lead" },
} as const;

export const engineeringActionLabels = {
  intake: "Scope with Release Engineer",
  backend: "Run Backend Master review",
  frontend: "Run Frontend Master review",
  engineer: "Prepare engineering handoff",
} satisfies Record<EngineeringStage, string>;

const note = z.string().trim().min(1).max(3000);
const notes = z.array(note).max(12);

export const releaseInputSchema = z.object({
  title: z.string().trim().min(1).max(100),
  candidate: z.string().trim().min(1).max(240),
  scope: z.string().trim().min(1).max(3000),
  backendSource: z.string().trim().max(6000),
  frontendSource: z.string().trim().max(6000),
  testEvidence: z.string().trim().max(6000),
});

export const sourceReviewSchema = z.object({
  findings: notes,
  gaps: notes,
}).refine(({ findings, gaps }) => findings.length + gaps.length > 0);

export const releaseIntakeSchema = z.object({
  scope: note,
  questions: notes,
});

export const engineeringSourceSchema = z.object({
  intake: releaseIntakeSchema.optional(),
  backend: sourceReviewSchema.optional(),
  frontend: sourceReviewSchema.optional(),
});

const businessCase = z.enum([
  "Purchase and recovery", "Post-purchase and admission", "Fees, taxes and credits",
  "Reports, earnings and payouts", "Organizer and staff operations",
]);
export const releaseHandoffSchema = z.object({
  impact: note,
  checks: z.array(z.object({
    businessCase,
    scenario: note,
    required: z.boolean(),
    result: z.enum(["Passed", "Failed", "Blocked", "Not run", "Not applicable"]),
    evidence: note,
    nextAction: note,
  }).refine(({ required, result }) => !required || result !== "Not applicable")).min(1).max(20),
  rollout: note,
  recovery: note,
  communication: note,
});

export const releaseRecommendations = [
  "Go", "Go with known non-blocking issues", "No-Go", "Decision blocked by named missing evidence",
] as const;

export const releaseDecisionSchema = z.object({
  handoff: z.enum(["Ready for Engineering", "Changes requested"]),
  recommendation: z.enum(releaseRecommendations),
  rationale: note,
  nextActions: notes,
}).refine(({ handoff, nextActions }) => handoff !== "Changes requested" || nextActions.length > 0);

export const stageSchemas = {
  intake: releaseIntakeSchema,
  backend: sourceReviewSchema,
  frontend: sourceReviewSchema,
  engineer: releaseHandoffSchema,
  lead: releaseDecisionSchema,
};

const releaseRevisionSchema = engineeringSourceSchema.extend({
  number: z.number().int().positive(),
  input: releaseInputSchema,
  engineer: releaseHandoffSchema.optional(),
  lead: releaseDecisionSchema.optional(),
});

export const releaseSchema = z.object({
  id: z.uuid(),
  current: releaseRevisionSchema,
  history: z.array(releaseRevisionSchema),
});

export const releaseRequestSchema = z.object({
  stage: z.enum(releaseStages),
  revision: releaseRevisionSchema,
});

export type ReleaseInput = z.infer<typeof releaseInputSchema>;
export type ReleaseRevision = z.infer<typeof releaseRevisionSchema>;
export type Release = z.infer<typeof releaseSchema>;

export function canRunReleaseStage(stage: ReleaseStage, revision: ReleaseRevision) {
  if (isLegacyReleaseReview(revision)) return false;
  if (stage === "lead") return !revision.lead && hasEngineeringHandoff(revision);
  return canRunEngineeringStage(stage, revision);
}

export function isLegacyReleaseReview(revision: ReleaseRevision) {
  return !revision.intake && Boolean(revision.backend || revision.frontend || revision.engineer || revision.lead);
}

type EngineeringReview = z.infer<typeof engineeringSourceSchema> & { engineer?: unknown };

export function canRunEngineeringStage(stage: EngineeringStage, review: EngineeringReview = {}) {
  if (review[stage]) return false;
  if (stage === "intake") return true;
  if (stage === "backend") return Boolean(review.intake);
  if (stage === "frontend") return Boolean(review.intake && review.backend);
  return Boolean(review.intake && review.backend && review.frontend);
}

export function hasEngineeringHandoff(review?: EngineeringReview) {
  return Boolean(review?.intake && review.backend && review.frontend && review.engineer);
}

export function requiredReleaseRecommendation(revision: ReleaseRevision): (typeof releaseRecommendations)[number] | undefined {
  const checks = revision.engineer?.checks.filter((check) => check.required && check.result !== "Not applicable") ?? [];
  if (checks.some(({ result }) => result === "Failed")) return "No-Go";
  if (!checks.length || !revision.input.testEvidence || checks.some(({ result }) => result !== "Passed")) {
    return "Decision blocked by named missing evidence";
  }
}

export function releaseDecisionMatchesEvidence(revision: ReleaseRevision, decision: z.infer<typeof releaseDecisionSchema>) {
  const required = requiredReleaseRecommendation(revision);
  const recommendsRelease = decision.recommendation.startsWith("Go");
  if (recommendsRelease && decision.handoff === "Changes requested") return false;
  if (decision.recommendation === "Go" && revision.engineer?.checks.some(({ result }) => result === "Failed")) return false;
  return !required || decision.recommendation === "No-Go" || decision.recommendation === required;
}
