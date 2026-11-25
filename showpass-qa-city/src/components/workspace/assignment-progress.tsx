import { CheckIcon } from "lucide-react";
import { codexStatusLabels, type CodexHandoffStatus } from "@/lib/codex/handoff-schema";
import { browserOutcomeLabels, getPlanReviewMode, isPlanReviewReady } from "@/lib/workspace/qa-workflow";
import type { Run } from "@/lib/workspace/schema";
import { cn } from "@/lib/utils";

export function AssignmentProgress({ run, owner, liveStatus }: {
  run: Run;
  owner: string;
  liveStatus?: CodexHandoffStatus["status"];
}) {
  const { revision, changeRequest } = run;
  const reviewMode = getPlanReviewMode(run.reviewMode, revision);
  const draftOnly = reviewMode === "draft";
  const review = revision?.review;
  const planReady = Boolean(revision && !changeRequest);
  const engineeringReady = planReady && isPlanReviewReady(run.reviewMode, revision);
  const approved = engineeringReady && review?.decision === "approved";
  const needsRevision = Boolean(changeRequest || review?.decision === "disapproved" || (review?.decision === "approved" && !engineeringReady));
  const outcome = run.browserResult?.outcome ?? revision?.draftExecution?.outcome;
  const executionReported = Boolean(outcome || liveStatus === "completed");
  const stopped = ["cancelled", "completed", "failed"].includes(run.status);

  const plan = {
    id: "plan", label: "Plan", owner,
    detail: needsRevision ? "Revision needed" : planReady ? `Plan ${revision?.number} ready` : "Awaiting plan",
    complete: planReady && !needsRevision,
  };
  const stages = draftOnly ? [plan] : [
    plan,
    {
      id: "engineering", label: "Engineering review", owner: "Release Engineer",
      detail: engineeringReady ? "Reviewed" : !planReady ? "Awaiting plan" : reviewMode === "full" ? "Full review pending" : "Short review pending",
      complete: engineeringReady,
    },
    {
      id: "approval", label: "Sign-off", owner: "QA Lead",
      detail: approved ? "Approved" : review?.decision === "disapproved" && planReady ? "Changes requested"
        : engineeringReady ? "Awaiting decision" : "Awaiting engineering review",
      complete: approved,
    },
    {
      id: "execution", label: "Run checks", owner,
      detail: outcome === "not-run" ? "Not run" : outcome ? "Result available" : approved && liveStatus ? codexStatusLabels[liveStatus]
        : approved ? "Awaiting run" : "Awaiting sign-off",
      complete: executionReported && outcome !== "not-run",
    },
    {
      id: "result", label: "Record evidence", owner,
      detail: outcome ? browserOutcomeLabels[outcome] : executionReported ? "Awaiting result" : "Awaiting checks",
      complete: Boolean(outcome),
    },
  ];
  const active = stopped ? undefined : stages.find(({ complete }) => !complete)?.id;

  return (
    <section aria-label="Assignment progress" data-testid="assignment-progress" className="rounded-lg border bg-background p-3">
      <h3 className="font-semibold">Assignment progress</h3>
      <ol className="mt-2 grid gap-1" aria-live="polite">
        {stages.map(({ id, label, owner, detail, complete }) => (
          <li key={id} aria-current={active === id ? "step" : undefined} data-testid={`assignment-progress-${id}`}
            className={cn("flex min-w-0 items-start gap-2 rounded-md px-2 py-1.5", active === id && "bg-muted")}>
            <span aria-hidden="true" className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border text-primary">
              {complete ? <CheckIcon className="size-3" /> : active === id && <span className="size-1.5 rounded-full bg-current" />}
            </span>
            <span className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-2">
              <span className="font-medium">{label} <span className="font-normal text-muted-foreground">· {owner}</span></span>
              <span className="text-xs text-muted-foreground">{detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
