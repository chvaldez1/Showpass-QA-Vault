import { codexStatusLabels, isCodexPending, type CodexHandoffStatus } from "../codex/handoff-schema";
import { getPlanReviewMode, isPlanReviewReady } from "./qa-workflow";
import { caseReviewActivity, nextCaseReviewStage, type CaseReviewStage } from "./case-review";
import { canRunEngineeringStage, engineeringActionLabels, engineeringStages, releaseRoles } from "./release";
import type { Run } from "./schema";

export const queueReviewers = ["Release Engineer", "Backend Master", "Frontend Master", "QA Lead"] as const;

const caseReviewers: Record<CaseReviewStage, (typeof queueReviewers)[number]> = {
  scope: "QA Lead", backend: "Backend Master", frontend: "Frontend Master", engineer: "Release Engineer", lead: "QA Lead",
};

export type RunNextAction = {
  label: string;
  reviewer?: (typeof queueReviewers)[number];
  blocker?: string;
};

export function nextRunAction(run: Run, live?: CodexHandoffStatus): RunNextAction | undefined {
  if (run.sample || ["completed", "failed", "cancelled"].includes(run.status)) return;
  if (run.reviewMode === "case-review") {
    const stage = nextCaseReviewStage(run.caseReview);
    if (!stage) return;
    if (run.status === "running") return { label: caseReviewActivity[stage], reviewer: stage === "draft" ? undefined : caseReviewers[stage] };
    return {
      label: run.caseReview || run.caseReviewWorker ? "Continue draft review" : "Start draft review",
      blocker: run.caseReviewWorker?.problem,
    };
  }
  const { revision, browserResult, changeRequest } = run;
  if (changeRequest) return { label: "Prepare revised plan", blocker: changeRequest };
  if (!revision) return { label: run.reviewMode === "draft" ? "Prepare draft plan" : "Prepare plan" };
  if (revision.review?.decision === "disapproved") {
    return { label: "Revise plan", blocker: revision.review.requiredChanges.join(" ") || revision.review.rationale };
  }

  const mode = getPlanReviewMode(run.reviewMode, revision);
  if (!revision.review) {
    if (mode === "short" && !revision.shortReview) return { label: "Run short review", reviewer: "Release Engineer" };
    if (mode === "full") {
      const stage = engineeringStages.find((stage) => canRunEngineeringStage(stage, revision.engineering));
      if (stage) return { label: engineeringActionLabels[stage], reviewer: releaseRoles[stage].name };
    }
    return { label: "Send to QA Lead", reviewer: "QA Lead" };
  }

  if (!isPlanReviewReady(run.reviewMode, revision)) {
    return { label: "Revise plan", blocker: "The current plan needs the shared engineering review." };
  }
  if (browserResult?.outcome === "blocked") return { label: "Open blocked run", blocker: browserResult.summary };
  if (revision.executionKind === "playwright" || revision.executionToken) {
    return { label: "Revise plan", blocker: "The approved plan uses the retired Playwright launcher." };
  }
  if (revision.executionKind === "codex" && !revision.codexHandoffToken) {
    return { label: "Open on the approving Mac", blocker: "This run’s paired Codex handoff is on the Mac that approved it." };
  }
  if (live?.status === "failed" || live?.status === "interrupted") {
    return { label: "Review Codex handoff", blocker: codexStatusLabels[live.status] };
  }
  if (live && isCodexPending(live.status)) return { label: codexStatusLabels[live.status] };
  if (live?.status === "completed") return { label: "Record browser result" };
  return { label: revision.codexHandoffToken ? "Run in Codex" : "Open approved plan in Codex" };
}
