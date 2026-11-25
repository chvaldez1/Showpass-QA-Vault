"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { FormField } from "@/components/ui/form-field";
import { Textarea } from "@/components/ui/textarea";
import { withAssignmentLock } from "@/lib/workspace/assignment-lock";
import { caseReviewActivity, caseReviewSourceInput, caseReviewStages, caseSourceLayers, caseTesterNames, nextCaseReviewStage, type CaseReview as Review, type CaseReviewInput } from "@/lib/workspace/case-review";
import type { Run } from "@/lib/workspace/schema";
import { refreshWorkspace } from "@/lib/workspace/store";
import { EvidenceList } from "./evidence-list";

const stageNames = {
  scope: "QA Lead scope review",
  backend: "Backend Master findings",
  frontend: "Frontend Master findings",
  engineer: "Release Engineer handoff",
  lead: "QA Lead decision",
} as const;

function DraftSnapshot({ review }: { review: Review }) {
  const [copyStatus, setCopyStatus] = useState("");
  return (
    <div className="space-y-3">
      <pre className="whitespace-pre-wrap wrap-anywhere font-sans text-sm" data-testid={`case-review-draft-${review.number}`}>{review.draft}</pre>
      <Button variant="outline" size="sm" onClick={async () => {
        try {
          await navigator.clipboard.writeText(review.draft);
          setCopyStatus("Test cases copied.");
        } catch {
          setCopyStatus("Couldn’t copy to the clipboard. Select the text above to copy it.");
        }
      }}>Copy test cases</Button>
      {copyStatus && <p role="status" className="text-sm text-muted-foreground">{copyStatus}</p>}
    </div>
  );
}

export function DraftReviewRecord({ review }: { review: Review }) {
  const { lead, number } = review;
  return (
    <section className="grid gap-4" aria-label={`Draft revision ${number}`}>
      <div>
        <h3 className="font-semibold">Revision {number} · {caseTesterNames[review.owner]}</h3>
        <p className="text-sm text-muted-foreground">Execution not run</p>
      </div>
      {lead && (
        <section data-testid={`case-review-decision-${number}`} className="space-y-2 rounded-lg border p-3 text-sm">
          <h4 className="font-semibold">QA Lead · {lead.decision === "ready" ? "Ready to use" : "Changes requested"}</h4>
          <p>{lead.rationale}</p>
          <EvidenceList label="Required changes" entries={lead.requiredChanges} />
          <EvidenceList label="Information needed" entries={lead.requiredInput ?? []} />
        </section>
      )}
      <Disclosure testId={`case-review-cases-${number}`} label="Test cases for this revision">
        <DraftSnapshot review={review} />
      </Disclosure>
      {review.supporting.map(({ role, summary, findings }) => (
        <Disclosure key={role} testId={`case-review-tester-${role}-${number}`} label={caseTesterNames[role]}>
          <p>{summary}</p>
          <EvidenceList label="Findings" entries={findings} />
        </Disclosure>
      ))}
      {caseReviewStages.filter((stage) => stage !== "lead").map((stage) => {
        const result = review[stage];
        if (!result) return null;
        const source = stage === "backend" || stage === "frontend" ? review.source[stage] : undefined;
        return (
          <Disclosure key={stage} testId={`case-review-record-${stage}-${number}`} label={stageNames[stage]}>
            <p>{result.summary}</p>
            {source && <EvidenceList label={`Source at ${source.revision.slice(0, 12)}`} entries={source.paths} />}
            {"findings" in result && <EvidenceList label="Findings" entries={result.findings} />}
            {"blockingIssues" in result && <>
              <EvidenceList label="Issues to resolve" entries={result.blockingIssues} />
              {result.proposedDraft !== review.draft && (
                <Disclosure testId={`case-review-proposal-${number}`} label="Suggested revision">
                  <pre className="whitespace-pre-wrap wrap-anywhere font-sans text-sm">{result.proposedDraft}</pre>
                </Disclosure>
              )}
            </>}
          </Disclosure>
        );
      })}
    </section>
  );
}

export function CaseReview({ run }: { run: Run }) {
  const review = run.caseReview;
  const worker = run.caseReviewWorker;
  const stage = ["queued", "running", "needs-input"].includes(run.status) ? nextCaseReviewStage(review) : undefined;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [expiredLease, setExpiredLease] = useState<string>();
  const lease = worker?.leaseUntil;
  const running = run.status === "running" && lease !== expiredLease;

  useEffect(() => {
    if (!lease) return;
    const timer = window.setTimeout(() => setExpiredLease(lease), Math.max(0, Date.parse(lease) - Date.now()));
    return () => window.clearTimeout(timer);
  }, [lease]);

  async function send(payload: object) {
    if (pending) return;
    setPending(true);
    setError("");
    try {
      await withAssignmentLock(run.id, async () => {
        const response = await fetch("/api/case-review", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ runId: run.id, ...payload }),
        });
        const result = await response.json().catch(() => null);
        if (!response.ok || !result) throw new Error(result?.error ?? "City couldn’t update this draft review.");
        await refreshWorkspace();
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Try again on the current revision.");
    } finally {
      setPending(false);
    }
  }

  function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const paths = (layer: string) => String(data.get(layer) ?? "").split("\n").map((path) => path.trim()).filter(Boolean);
    const input: CaseReviewInput | undefined = stage === "draft" ? {
      existingDraft: String(data.get("draft") ?? ""), backend: paths("backend"), frontend: paths("frontend"),
      clarification: String(data.get("clarification") ?? ""),
    } : undefined;
    void send({ action: "start", number: review?.number ?? 0, input });
  }

  return (
    <div className="grid max-w-prose gap-4" data-testid="case-review-workflow">
      {running && stage && worker && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 text-sm">
          <p role="status" data-testid="case-review-progress">
            {caseReviewActivity[stage]} · Revision {stage === "draft" ? (review?.number ?? 0) + 1 : review?.number}
          </p>
          <Button variant="outline" size="sm" disabled={pending} onClick={() => void send({ action: "pause", workerId: worker.id })}>Pause review</Button>
        </div>
      )}
      {worker?.problem && <p role="status" className="rounded-lg border p-3 text-sm" data-testid="case-review-pause-reason">{worker.problem}</p>}
      {run.status === "running" && !running && <p role="status" className="text-sm">Review was interrupted. Continue from the last saved stage.</p>}
      {review && <DraftReviewRecord review={review} />}
      {stage && !running && (
        <form key={`${review?.number ?? 0}-${worker?.id ?? "new"}`} onSubmit={start} className="grid gap-3" aria-busy={pending}>
          {stage === "draft" && <>
            <FormField testId="case-review-input-draft" label={review ? "Revised test cases (optional)" : "Existing test cases (optional)"}
              hint={review ? "Leave blank to have the tester revise the cases." : "Leave blank to have the tester draft cases from the assignment instructions."}>
              {(field) => <Textarea {...field} name="draft" rows={5} maxLength={32_000} defaultValue={worker?.input?.existingDraft} disabled={pending} />}
            </FormField>
            {review && <FormField testId="case-review-clarification" label="Clarification or fixture details (optional)">
              {(field) => <Textarea {...field} name="clarification" rows={3} maxLength={2200} defaultValue={worker?.input?.clarification ?? review.clarification} disabled={pending} />}
            </FormField>}
            {caseSourceLayers.map((layer) => {
              const paths = worker?.input?.[layer] ?? caseReviewSourceInput(review, layer);
              return (
                <FormField key={layer} testId={`case-review-input-${layer}`} label={`${layer === "backend" ? "Backend" : "Frontend"} source references`}
                  hint="One repository-relative path per line. Add :start-end for an excerpt. An optional @commit on the first line selects a local commit.">
                  {(field) => <Textarea {...field} name={layer} rows={2} defaultValue={paths.join("\n")} disabled={pending} />}
                </FormField>
              );
            })}
            <p className="text-sm text-muted-foreground">City sends the draft and selected source excerpts to your configured Codex account during review.</p>
          </>}
          <div>
            <Button type="submit" data-testid="case-review-start" disabled={pending}>
              {pending ? "Working…" : review || worker ? "Continue review" : "Start draft review"}
            </Button>
          </div>
        </form>
      )}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
