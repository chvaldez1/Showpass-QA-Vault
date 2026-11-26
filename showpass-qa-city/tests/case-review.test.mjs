import assert from "node:assert/strict";
import test from "node:test";
import { caseReaderSchema, caseReviewSchema, caseTechnicalSchema, caseTechnicalResponseSchema, nextCaseReviewStage, reconcileCaseDecision, recordCaseRead, recordCoverage, submittedCases } from "../src/lib/workspace/case-review.ts";

const weak = "Verify the email is correct.";
const revised = "In the checkout inbox, compare the email’s order reference with the one recorded after checkout.";
const findings = { summary: "Reviewed", findings: [] };
const legacy = {
  number: 1, owner: "customer-tester", supporting: [], source: {}, draft: weak,
  scope: findings, backend: findings, frontend: findings,
  engineer: { summary: "Revised wording proposed", proposedDraft: revised, blockingIssues: [] },
};
const edit = {
  severity: "required", field: "TC-1, Expected Result", wording: weak,
  problem: "An older order’s email could pass.", replacement: revised,
};
const ready = {
  decision: "ready", rationale: "Reviewed", requiredInput: [], requiredChanges: [], stalled: false, resolutions: [],
};

test("a proposal that fixes a required copy edit cannot approve the submitted draft", () => {
  const review = { ...legacy, qase: { summary: "Needs an order match", edits: [edit] } };
  const lead = reconcileCaseDecision(review, ready);
  assert.equal(lead.decision, "changes-requested");
  assert.ok(lead.requiredChanges[0].includes(revised));
  assert.equal(nextCaseReviewStage({ ...review, lead }), "draft");
  assert.equal(caseReviewSchema.safeParse({ ...review, lead: ready }).success, false);
});

test("a material finding from either Master or the Release Engineer survives sign-off", () => {
  const blocker = "The case can pass when the client omits the selected language.";
  for (const role of ["backend", "frontend", "engineer"]) {
    const result = role === "engineer" ? legacy.engineer : {
      ...findings, assessment: "traced", traces: [{
        behavior: "The language can be omitted.", references: [{ path: "checkout.ts", line: 2 }], proof: "Inspect the delivered email.",
      }],
    };
    const review = {
      ...legacy, qase: { summary: "Runnable", edits: [] },
      [role]: { ...result, blockingIssues: [blocker] },
    };
    const lead = reconcileCaseDecision(review, ready);
    assert.ok(lead.requiredChanges.includes(blocker));
    assert.equal(caseReviewSchema.safeParse({ ...review, lead }).success, true);
  }
});

test("optional edits allow the revised case to finish", () => {
  const review = {
    ...legacy, number: 2, draft: revised, qase: { summary: "Runnable", edits: [{
      ...edit, severity: "optional", wording: "after checkout", problem: "Could be shorter.", replacement: "at checkout",
    }] },
  };
  const lead = reconcileCaseDecision(review, ready);
  assert.equal(lead.decision, "ready");
  assert.equal(nextCaseReviewStage(caseReviewSchema.parse({ ...review, lead })), undefined);
});

test("completed legacy decisions remain readable and in-progress reviews acquire the wording check", () => {
  assert.equal(nextCaseReviewStage(caseReviewSchema.parse({ ...legacy, lead: ready })), undefined);
  assert.equal(nextCaseReviewStage(caseReviewSchema.parse(legacy)), "qase");
  const oldCopyReview = { ...legacy, qase: { summary: "Reviewed as a set", edits: [edit] } };
  assert.equal(nextCaseReviewStage(caseReviewSchema.parse(oldCopyReview)), "qase");
  assert.equal(recordCaseRead(weak, oldCopyReview.qase, cleanRead).edits[0].severity, "required");
});

test("technical claims need a cited trace and insufficient evidence needs an actionable blocker", () => {
  const empty = { ...findings, traces: [], blockingIssues: [] };
  assert.equal(caseTechnicalSchema.safeParse({ ...empty, assessment: "traced" }).success, false);
  assert.equal(caseTechnicalSchema.safeParse({ ...empty, assessment: "insufficient-evidence" }).success, false);
  assert.equal(caseTechnicalSchema.safeParse({ ...empty, assessment: "not-applicable" }).success, true);
});

test("technical reviewers can cite only numbered lines in their own supplied excerpts", () => {
  const trace = { behavior: "The buyer’s language is saved.", proof: "Check the new confirmation.", reference: 4 };
  const result = { ...findings, assessment: "traced", traces: [trace], blockingIssues: [] };
  assert.equal(caseTechnicalResponseSchema(4).safeParse(result).success, true);
  assert.equal(caseTechnicalResponseSchema(3).safeParse(result).success, false);
  assert.equal(caseTechnicalResponseSchema(0).safeParse(result).success, false);
});

const venueLine = "Reload the Dashboard with Network open. Check HTTP 200, id, name and language (en or fr).";
const venueSetup = "Get the name of an English Venue and its public Event from the teammate who verified the Venue language.";
const apiCheck = "In the API client, GET /api/user/venues/session/get/ for the prepared English Venue. Expect HTTP 200 and language en.";
const caseFields = (line) => `### TC-1: Purchase confirmation
**Preconditions:** ${line}
**Steps:** Change checkout to French and check the delivered email.
**Source notes:** The reviewer already knows the Venue.
## Engineering review
Use the verified Venue from the setup team.
### TC-2: Venue settings API
**Steps:** ${apiCheck}`;
const cleanRead = { summary: "The API tester compares the returned language with the prepared setting.", firstObstacle: null, otherRequiredEdits: [], optionalEdits: [] };
const obstacle = { field: "Preconditions", wording: venueLine, problem: "The buyer has to interpret a diagnostic to select an Event.", replacement: venueSetup };

test("each reader gets one case, without the source notes or another case's instructions", () => {
  const cases = submittedCases(caseFields(venueLine));
  assert.deepEqual(cases.map(({ label }) => label), ["TC-1", "TC-2"]);
  assert.ok(cases[0].fields.includes(venueLine));
  assert.doesNotMatch(cases[0].fields, /Source notes|Engineering review|setup team|API client/);
  assert.ok(cases[1].fields.includes(apiCheck));
  assert.deepEqual(submittedCases(weak), [{ label: "Submitted case", fields: weak }]);
  assert.deepEqual(submittedCases("**Title:** First\n**Steps:** A\n**Title:** Second\n**Expected Result:** B").map(({ fields }) => fields),
    ["**Title:** First\n**Steps:** A", "**Title:** Second\n**Expected Result:** B"]);
  assert.equal(recordCaseRead(caseFields(venueLine), undefined, { ...cleanRead, firstObstacle: { ...obstacle, wording: apiCheck } }), undefined);
});

test("a reader obstacle returns the customer case even when the Lead and engineer would approve", () => {
  const draft = caseFields(venueLine);
  const first = recordCaseRead(draft, undefined, { ...cleanRead, summary: "The buyer cannot select the Event.", firstObstacle: obstacle });
  const partial = { ...legacy, draft, qase: first };
  assert.equal(nextCaseReviewStage(partial), "qase");
  assert.equal(caseReviewSchema.safeParse({ ...partial, lead: ready }).success, false);
  assert.equal(caseReaderSchema.safeParse({ summary: "Looks fine", optionalEdits: [], otherRequiredEdits: [] }).success, false);
  const reviewed = { ...partial, qase: recordCaseRead(draft, first, cleanRead) };
  assert.equal(nextCaseReviewStage(reviewed), "lead");
  const lead = reconcileCaseDecision(reviewed, ready);
  assert.equal(nextCaseReviewStage({ ...reviewed, lead }), "draft");
  assert.ok(lead.requiredChanges.some((change) => change.includes(venueSetup) && change.includes("TC-1")));
  assert.equal(caseReviewSchema.safeParse({ ...reviewed, lead: ready }).success, false);
});

test("the revised buyer case and a separate API case can finish after both independent reads", () => {
  const draft = caseFields(venueSetup);
  const first = recordCaseRead(draft, undefined, { ...cleanRead, summary: "The buyer uses the named English Venue and checks the French receipt." });
  const qase = recordCaseRead(draft, first, cleanRead);
  const review = { ...legacy, draft, qase };
  assert.equal(nextCaseReviewStage(review), "lead");
  assert.equal(nextCaseReviewStage(caseReviewSchema.parse({ ...review, lead: reconcileCaseDecision(review, ready) })), undefined);
});

const checkoutTarget = {
  actor: "Customer",
  outcome: "The buyer gets the confirmation in the language selected at checkout.",
  setup: "Use an English Venue and switch checkout to French.",
  falsePass: "A French Venue would send French even if checkout ignored the switch.",
};
const holdTarget = {
  actor: "Venue Employee",
  outcome: "The recipient can use the localized hold invitation to open the correct hold.",
  setup: "Use an English Venue and choose French for the hold.",
  falsePass: "A success message can appear even if the invitation has the wrong link or language.",
};
const checkoutProof = "Use an English Venue. Switch checkout to French and open the French confirmation for this order.";
const holdProof = "Send the hold in French and open the matching hold from the recipient’s inbox.";
const proof = (id, caseLabel, quote) => ({ id, status: "covered", locations: [{ caseLabel, quote }], reason: "The submitted case proves the outcome." });
const coverageHandoff = (existingTargets) => ({ ...legacy.engineer, existingTargets, additionalTargets: [] });
const baseline = {
  ...legacy, scope: { ...findings, targets: [checkoutTarget, holdTarget] },
  draft: `### TC-1: Checkout\n**Steps:** ${checkoutProof}\n### TC-2: Hold\n**Steps:** ${holdProof}`,
};

test("the first review blocks missing coverage and a buyer instruction that requires browser traffic", () => {
  const draft = `### TC-1: Checkout\n**Preconditions:** ${venueLine}\n**Steps:** Switch checkout to French.\n## Notes\n${checkoutProof}`;
  const review = { ...baseline, draft, scope: { ...findings, targets: [checkoutTarget] } };
  assert.equal(nextCaseReviewStage(review), "engineer");
  const coverage = recordCoverage(review, undefined, coverageHandoff([proof(1, "TC-1", checkoutProof)]));
  assert.equal(coverage.rows[0].status, "missing", "text in the notes cannot prove case coverage");
  const qase = recordCaseRead(draft, undefined, { ...cleanRead, firstObstacle: obstacle });
  const lead = reconcileCaseDecision({ ...review, coverage, qase }, ready);
  assert.equal(lead.decision, "changes-requested");
  assert.equal(lead.requiredInput.length, 0);
  assert.equal(nextCaseReviewStage({ ...review, coverage, qase, lead }), "draft");
  assert.ok(lead.requiredChanges.some((change) => change.includes(checkoutTarget.outcome)));
  assert.ok(lead.requiredChanges.some((change) => change.includes(venueSetup)));
});

test("an omitted legacy case is shown as lost and the owning tester gets a revision", () => {
  const coverage = recordCoverage(baseline, undefined, coverageHandoff([
    proof(1, "TC-1", checkoutProof), proof(2, "TC-2", holdProof),
  ]));
  const first = { ...baseline, coverage };
  const split = {
    ...legacy, number: 2, scope: { ...findings, targets: [] },
    draft: `### TC-3: Checkout\n**Steps:** ${checkoutProof}`,
  };
  const revision = recordCoverage(split, first, coverageHandoff([proof(1, "TC-3", checkoutProof)]));
  assert.deepEqual(revision.changes.map(({ id, kind }) => [id, kind]), [[1, "proof-changed"], [2, "lost"]]);
  assert.deepEqual(revision.changes[1].previousLocations, [{ caseLabel: "TC-2", quote: holdProof }]);
  const qase = recordCaseRead(split.draft, undefined, cleanRead);
  const lead = reconcileCaseDecision({ ...split, coverage: revision, qase }, ready);
  assert.equal(lead.requiredInput.length, 0);
  assert.equal(nextCaseReviewStage({ ...split, coverage: revision, qase, lead }), "draft");
  assert.equal(caseReviewSchema.safeParse({ ...split, coverage: revision, qase, lead: ready }).success, false);

  const corrected = { ...split, number: 3, draft: baseline.draft };
  const restored = recordCoverage(corrected, { ...split, coverage: revision }, coverageHandoff([
    proof(1, "TC-1", checkoutProof), proof(2, "TC-2", holdProof),
  ]));
  assert.equal(restored.changes.find(({ id }) => id === 2).kind, "restored");
  assert.equal(reconcileCaseDecision({ ...corrected, coverage: restored }, ready).decision, "ready");
});

test("deferring a required outcome is visible and blocks approval", () => {
  const coverage = recordCoverage(baseline, undefined, coverageHandoff([proof(1, "TC-1", checkoutProof), {
    id: 2, status: "deferred", reason: "The correct hold recipient has not been established.", locations: [],
  }]));
  assert.equal(coverage.rows[1].status, "deferred");
  assert.equal(reconcileCaseDecision({ ...baseline, coverage }, ready).decision, "changes-requested");
});
