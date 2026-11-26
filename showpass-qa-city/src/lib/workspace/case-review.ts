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
export const caseReviewStages = ["scope", ...caseSourceLayers, "engineer", "qase", "lead"] as const;
export type CaseReviewStage = (typeof caseReviewStages)[number];
export const caseReviewActivity = {
  draft: "Tester preparing cases",
  scope: "QA Lead reviewing scope",
  backend: "Backend Master reviewing source",
  frontend: "Frontend Master reviewing source",
  engineer: "Release Engineer consolidating findings",
  qase: "Qase Police reviewing case wording",
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
const coverageTarget = z.object({
  actor: detail,
  outcome: detail,
  setup: detail,
  falsePass: detail,
});
const coverageTargets = z.array(coverageTarget).max(20);
export const caseScopeSchema = caseFindingsSchema.extend({ targets: coverageTargets });
const coverageStatus = z.enum(["covered", "missing", "deferred"]);
const proofLocations = z.array(z.object({ caseLabel: detail, quote: detail })).max(8);
const coverageProof = z.object({
  status: coverageStatus,
  locations: proofLocations,
  reason: detail,
});
const coverageEntry = coverageTarget.extend({ id: z.number().int().positive() }).extend(coverageProof.shape);
const coverageMapSchema = z.object({
  rows: z.array(coverageEntry).min(1),
  previousRevision: z.number().int().positive().nullable(),
  changes: z.array(z.object({
    id: z.number().int().positive(),
    kind: z.enum(["added", "lost", "restored", "proof-changed", "deferred"]),
    before: coverageStatus.nullable(),
    after: coverageStatus,
    previousLocations: proofLocations,
  })),
});
type CoverageMap = z.infer<typeof coverageMapSchema>;
const citation = z.object({ path: sourcePath, line: z.number().int().positive() });
const technicalFindingsSchema = caseFindingsSchema.extend({
  assessment: z.enum(["traced", "insufficient-evidence", "not-applicable"]),
  blockingIssues: notes,
});
const technicalTraceSchema = z.object({ behavior: detail, proof: detail });
function validTechnicalAssessment({ assessment, traces, blockingIssues }: z.infer<typeof technicalFindingsSchema> & { traces: unknown[] }) {
  if (assessment === "traced") return traces.length > 0;
  if (assessment === "insufficient-evidence") return blockingIssues.length > 0;
  return !traces.length && !blockingIssues.length;
}
export const caseTechnicalSchema = technicalFindingsSchema.extend({
  traces: z.array(technicalTraceSchema.extend({ references: z.array(citation).min(1).max(8) })).max(10),
}).refine(validTechnicalAssessment);

export function caseTechnicalResponseSchema(referenceCount: number) {
  return technicalFindingsSchema.extend({
    traces: z.array(technicalTraceSchema.extend({
      reference: z.number().int().min(1).max(Math.max(referenceCount, 1)),
    })).max(referenceCount ? 10 : 0),
  }).refine(validTechnicalAssessment);
}
const copyEdit = z.object({ field: detail, wording: detail, problem: detail, replacement: detail });
export const caseReaderSchema = z.object({
  summary: detail,
  firstObstacle: copyEdit.nullable(),
  otherRequiredEdits: z.array(copyEdit).max(20),
  optionalEdits: z.array(copyEdit).max(20),
});
const caseCopyReviewSchema = z.object({
  summary: detail,
  reads: z.array(z.object({ label: detail, summary: detail })).optional(),
  edits: z.array(copyEdit.extend({ severity: z.enum(["required", "optional"]) })),
});

function readerFields(section: string) {
  const fieldLabel = /^\*\*(Title|Description|Preconditions|Postconditions|Steps|Step Action|Data|Expected Results?|Parameters|Tags|Priority):\*\*/i;
  const lines = section.trim().split("\n");
  if (!lines.some((line) => fieldLabel.test(line))) return section.trim();
  let inField = false;
  return lines.filter((line, index) => {
    if (index === 0 && /^(?:#{1,6} )?(?:(?:TC-|SPT-)\d+|Test Case \d+):/.test(line)) return true;
    if (fieldLabel.test(line) || /^\| Step Action \| Data \| Expected Result \|/.test(line)) inField = true;
    else if (/^\*\*[^*]+:\*\*|^#{1,3} /.test(line)) inField = false;
    return inField;
  }).join("\n").trim();
}

// A local TC heading starts a case. A surrounding section (e.g. source notes
// or a review decision) is outside the case, as in the vault's Qase importer.
export function submittedCases(draft: string) {
  const headings = [...draft.matchAll(/^(?:(?:#{1,6} )?((?:TC-|SPT-)\d+|Test Case \d+):[^\n]*|#{1,2} [^\n]*)$/gm)];
  const cases = headings.flatMap((heading, index) => heading[1] ? [{
    label: heading[1], fields: readerFields(draft.slice(heading.index, headings[index + 1]?.index)),
  }] : []);
  if (cases.length) return cases;
  // A paste from Qase can have titles without local TC numbers.
  const titles = [...draft.matchAll(/^\*\*Title:\*\*/gm)];
  if (titles.length > 1) return titles.map((title, index) => ({
    label: `Case ${index + 1}`, fields: readerFields(draft.slice(title.index, titles[index + 1]?.index)),
  }));
  return [{ label: "Submitted case", fields: readerFields(draft) }];
}

export function recordCaseRead(
  draft: string, previous: z.infer<typeof caseCopyReviewSchema> | undefined, reader: z.infer<typeof caseReaderSchema>,
) {
  const cases = submittedCases(draft);
  const reads = previous?.reads ?? [];
  const current = cases[reads.length];
  if (!current) throw new Error("All cases already have a wording review.");
  const required = reader.firstObstacle ? [reader.firstObstacle, ...reader.otherRequiredEdits] : reader.otherRequiredEdits;
  const edits = [
    ...required.map((edit) => ({ ...edit, severity: "required" as const })),
    ...reader.optionalEdits.map((edit) => ({ ...edit, severity: "optional" as const })),
  ];
  if (edits.some((edit) => !current.fields.includes(edit.wording))) return;
  return {
    summary: `Read ${reads.length + 1} of ${cases.length} cases independently.`,
    reads: [...reads, { label: current.label, summary: reader.summary }],
    edits: [...(previous?.edits ?? []), ...edits.map((edit) => ({ ...edit, field: `${current.label} · ${edit.field}` }))],
  };
}
export const caseHandoffSchema = z.object({ summary: z.string().trim().min(1).max(6000), proposedDraft: draftText, blockingIssues: notes });
export const caseCoverageHandoffSchema = caseHandoffSchema.extend({
  existingTargets: z.array(coverageProof.extend({ id: z.number().int().positive() })),
  additionalTargets: z.array(coverageTarget.extend(coverageProof.shape)).max(20),
});

export function reviewCoverageTargets(review: CaseReview, prior?: CaseReview) {
  const targets = (prior?.coverage?.rows ?? []).map(({ id, actor, outcome, setup, falsePass }) => ({ id, actor, outcome, setup, falsePass }));
  for (const target of review.scope?.targets ?? []) {
    if (targets.some(({ actor, outcome }) => actor.toLowerCase() === target.actor.toLowerCase() && outcome.toLowerCase() === target.outcome.toLowerCase())) continue;
    targets.push({ ...target, id: targets.length + 1 });
  }
  return targets;
}

export function recordCoverage(
  review: CaseReview, prior: CaseReview | undefined, handoff: z.infer<typeof caseCoverageHandoffSchema>,
): CoverageMap | undefined {
  const cases = submittedCases(review.draft);
  const targets = reviewCoverageTargets(review, prior);
  const knownIds = new Set(targets.map(({ id }) => id));
  const returnedIds = handoff.existingTargets.map(({ id }) => id);
  if (new Set(returnedIds).size !== returnedIds.length || returnedIds.some((id) => !knownIds.has(id))) return;

  const rows = targets.map((target) => {
    const proof = handoff.existingTargets.find(({ id }) => id === target.id);
    return { ...target, ...(proof ?? {
      status: "missing" as const, locations: [], reason: "Find the case and step that proves this outcome.",
    }) };
  });
  for (const additional of handoff.additionalTargets) {
    if (rows.some(({ actor, outcome }) => actor.toLowerCase() === additional.actor.toLowerCase() && outcome.toLowerCase() === additional.outcome.toLowerCase())) continue;
    rows.push({ ...additional, id: rows.length + 1 });
  }
  if (!rows.length) return;
  for (const row of rows) {
    if (row.status !== "covered") continue;
    if (row.locations.length && row.locations.every(({ caseLabel, quote }) =>
      cases.some((item) => item.label === caseLabel && item.fields.includes(quote)))) continue;
    row.status = "missing";
    row.locations = [];
    row.reason = "Point to the required setup and result in the submitted case fields.";
  }

  const changes: CoverageMap["changes"] = [];
  for (const row of rows) {
    const previous = prior?.coverage?.rows.find(({ id }) => id === row.id);
    const kind = !previous ? "added"
      : row.status === "deferred" && previous.status !== "deferred" ? "deferred"
      : previous.status === "covered" && row.status !== "covered" ? "lost"
      : previous.status !== "covered" && row.status === "covered" ? "restored"
      : row.status === "covered" && (
        previous.locations.length !== row.locations.length || row.locations.some(({ caseLabel, quote }) =>
          !previous.locations.some((location) => location.caseLabel === caseLabel && location.quote === quote))
      ) ? "proof-changed"
      : undefined;
    if (kind) changes.push({ id: row.id, kind, before: previous?.status ?? null, after: row.status, previousLocations: previous?.locations ?? [] });
  }
  return { rows, previousRevision: prior?.coverage ? prior.number : null, changes };
}
const resolution = z.object({ changeNumber: z.number().int().positive(), draftQuote: detail, reason: detail });
const caseDecisionFields = z.object({
  decision: z.enum(["ready", "changes-requested"]),
  rationale: detail,
  requiredChanges: z.array(z.string().trim().min(1).max(7000)),
});
type Decision = z.infer<typeof caseDecisionFields> & { requiredInput?: string[]; stalled?: boolean };
const validDecision = ({ decision, requiredChanges, requiredInput, stalled }: Decision) =>
  decision === "ready" ? !requiredChanges.length && !requiredInput?.length && !stalled : Boolean(requiredChanges.length);
export const caseDecisionSchema = caseDecisionFields.extend({
  requiredInput: notes.optional(), stalled: z.boolean().optional(), resolutions: z.array(resolution).optional(),
}).refine(validDecision, {
  path: ["requiredChanges"],
});
export const caseLoopDecisionSchema = caseDecisionFields.extend({
  requiredInput: notes, stalled: z.boolean(), resolutions: z.array(resolution),
}).refine(validDecision, {
  path: ["requiredChanges"],
});

const caseReviewRecord = z.object({
  number: z.number().int().positive(),
  owner: caseTesterRole,
  draft: draftText,
  clarification: z.string().trim().max(2200).optional(),
  source: z.object({ backend: pinnedSource.optional(), frontend: pinnedSource.optional() }),
  supporting: z.array(caseFindingsSchema.extend({ role: caseTesterRole })).max(3),
  scope: caseFindingsSchema.extend({ targets: coverageTargets.optional() }).optional(),
  backend: z.union([caseTechnicalSchema, caseFindingsSchema.strict()]).optional(),
  frontend: z.union([caseTechnicalSchema, caseFindingsSchema.strict()]).optional(),
  engineer: caseHandoffSchema.optional(),
  coverage: coverageMapSchema.optional(),
  qase: caseCopyReviewSchema.optional(),
  lead: caseDecisionSchema.optional(),
});
export type CaseReview = z.infer<typeof caseReviewRecord>;
export const caseReviewSchema = caseReviewRecord.refine((review) => {
  if (review.lead?.decision !== "ready") return true;
  // Preserve decisions saved before technical traces and the Qase Police stage existed.
  const currentFormat = review.scope?.targets || review.qase || caseSourceLayers.some((layer) => review[layer] && "assessment" in review[layer]);
  return !currentFormat || (caseReviewStages.every((stage) => review[stage]) && !caseReviewBlockers(review).length);
}, { path: ["lead"], message: "A ready decision requires every review and a draft with no outstanding blockers." });

export function nextCaseReviewStage(review?: CaseReview): CaseReviewStage | "draft" | undefined {
  if (!review || review.lead?.decision === "changes-requested") return "draft";
  if (review.lead?.decision === "ready") return;
  if (review.engineer && review.scope?.targets && !review.coverage) return "engineer";
  return caseReviewStages.find((stage) => stage === "qase"
    ? review.qase?.reads?.length !== submittedCases(review.draft).length
    : !review[stage]);
}

export function caseReviewBlockers(review: CaseReview) {
  const blockers = new Set(review.engineer?.blockingIssues);
  if (review.scope?.targets && !review.coverage) blockers.add("Map the required outcomes to the submitted cases.");
  for (const row of review.coverage?.rows ?? []) {
    if (row.status !== "covered") blockers.add(`Coverage ${row.id} · ${row.outcome} (${row.status}). ${row.reason}`);
  }
  if (review.qase?.reads && review.qase.reads.length !== submittedCases(review.draft).length) {
    blockers.add("Qase Police still needs to read each submitted case on its own.");
  }
  for (const layer of caseSourceLayers) {
    const result = review[layer];
    if (result && "blockingIssues" in result) result.blockingIssues.forEach((issue) => blockers.add(issue));
  }
  for (const edit of review.qase?.edits ?? []) {
    if (edit.severity === "required") blockers.add(`${edit.field}: ${edit.problem} ${edit.replacement}`);
  }
  return [...blockers];
}

export function reconcileCaseDecision(review: CaseReview, lead: z.infer<typeof caseLoopDecisionSchema>) {
  const blockers = caseReviewBlockers(review);
  if (!blockers.length) return lead;
  return {
    ...lead, decision: "changes-requested" as const,
    rationale: lead.decision === "ready" ? "The submitted cases still have required changes from this review." : lead.rationale,
    requiredChanges: [...new Set([...lead.requiredChanges, ...blockers])],
  };
}

export function caseReviewSourceInput(review: CaseReview | undefined, layer: (typeof caseSourceLayers)[number]) {
  const source = review?.source[layer];
  return source ? [`@${source.revision}`, ...source.paths] : [];
}
