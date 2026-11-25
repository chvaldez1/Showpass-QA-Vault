"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Button, ButtonLink } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Disclosure } from "@/components/ui/disclosure";
import { FormField } from "@/components/ui/form-field";
import { Textarea } from "@/components/ui/textarea";
import { askLocalCodex } from "@/lib/codex/client";
import type { CodexHandoffStatus } from "@/lib/codex/handoff-schema";
import { AssignmentProgress } from "./assignment-progress";
import { BrowserResultForm } from "./browser-result-form";
import { ReportedFindings } from "./browser-findings";
import { CodexHandoff } from "./codex-handoff";
import { EvidenceList } from "./evidence-list";
import { withAssignmentLock } from "@/lib/workspace/assignment-lock";
import { sourceRecordsFor } from "@/lib/workspace/build-catalog";
import { jobLabels, jobStops } from "@/lib/workspace/job";
import { pilotProofSchema } from "@/lib/workspace/transfer-pilot";
import type { BrowserFinding } from "@/lib/workspace/browser-finding";
import { builderRecordsSchema } from "@/lib/workspace/builder-result";
import { handoffText } from "@/lib/workspace/handoff";
import { buildPresets, buildThemes } from "@/lib/workspace/build-presets";
import {
  asBuilderWorkflow, browserOutcomeLabels, browserResultSchema, builderSourceReviewsSchema, canReviewBuilderSources, getPlanReviewMode, getQaWorkflow,
  isPlanReviewReady, leadResponseSchema, liveProposalSchema, planReviewLabels, proposalSchema, type Revision,
} from "@/lib/workspace/qa-workflow";
import { type AgentRole, type Run } from "@/lib/workspace/schema";
import { canRunEngineeringStage, engineeringActionLabels, engineeringStages, type EngineeringStage } from "@/lib/workspace/release";
import { requestRevision, saveBrowserResult, saveBuilderSourceReviews, savePlanStage, saveProposal, saveReview, saveShortReview } from "@/lib/workspace/store";

type Action = "propose" | EngineeringStage | "engineering-sources" | "short-review" | "review" | "save" | "save-revision";

function parseRecords(text: string) {
  if (!text) return undefined;
  try {
    return builderRecordsSchema.parse(JSON.parse(text));
  } catch (error) {
    if (error instanceof ZodError) {
      const issue = error.issues[0];
      const field = issue.path.join(".");
      throw new Error(field ? `Check saved records field ${field}. ${issue.message}` : issue.message);
    }
    throw new Error("Paste the builder’s JSON array of saved records.");
  }
}

function PlanSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2 border-t pt-3">
      <h4 className="font-semibold">{title}</h4>
      {children}
    </section>
  );
}

export function Plan({ revision }: { revision: Revision }) {
  const { plan, engineer, engineering, eventDraft, review, number, change, shortReview } = revision;
  return (
    <section aria-label={`Plan ${number}`} data-testid={`run-plan-${number}`} className="max-w-prose space-y-4 text-sm leading-relaxed wrap-anywhere">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h3 className="text-base font-semibold">Plan {number}</h3>
        {review && <p className="text-sm text-muted-foreground">QA Lead {review.decision}</p>}
      </div>
      <p className="whitespace-pre-wrap">{plan.approach}</p>
      <p><strong className="font-medium">Start here:</strong> {plan.startingPoint}</p>
      <EvidenceList label="Before starting" entries={plan.prerequisites} />
      <h4 className="font-medium">Checks and expected proof</h4>
      <ol data-testid={`run-plan-${number}-steps`} className="list-decimal space-y-3 pl-5">
        {plan.steps.map(({ action, proof }, index) => (
          <li key={index} data-testid={`run-plan-${number}-step-${index + 1}`}>
            <p>{action}</p>
            <p className="text-muted-foreground">Expected: {proof}</p>
          </li>
        ))}
      </ol>
      <p><strong className="font-medium">Data changes:</strong> {plan.changes}</p>
      <p><strong className="font-medium">Cleanup:</strong> {plan.cleanup}</p>
      <div className="space-y-1">
        <h4 className="font-medium">When to stop</h4>
        <p>{plan.stop}</p>
      </div>
      {eventDraft && (
        <PlanSection title="Event Draft in Showpass beta">
          <p>{eventDraft.name} · {eventDraft.category}</p>
          <p className="text-muted-foreground">{eventDraft.organization} · {eventDraft.location}</p>
          <p className="text-muted-foreground">{eventDraft.date} · {eventDraft.startsAt} to {eventDraft.endsAt} · {eventDraft.timezone}</p>
          <p className="whitespace-pre-line text-muted-foreground">{eventDraft.description}</p>
          <EvidenceList label="Optional questions during checkout" entries={eventDraft.questions} />
        </PlanSection>
      )}
      <EvidenceList label="References" entries={plan.sources} />
      {change && (
        <Disclosure testId={`run-plan-${number}-revision-request`} label="Revision request">
          <p className="whitespace-pre-wrap">{change}</p>
        </Disclosure>
      )}
      {(shortReview || engineer || engineering || review) && (
        <Disclosure testId={`run-plan-${number}-reviews`} label="Review notes">
          {shortReview && (
            <PlanSection title="Release Engineer short review">
              <p>{shortReview.impact}</p>
              <EvidenceList label="Checks" entries={shortReview.checks} />
              <p><strong>Stop point</strong> {shortReview.stop}</p>
              <EvidenceList label={shortReview.requiredReview === "full" ? "Why full review is needed" : "Concerns"} entries={shortReview.concerns} />
            </PlanSection>
          )}
          {engineer && (
            <PlanSection title={`Earlier consultation on Plan ${number}`}>
              <p>{engineer.impact}</p>
              <EvidenceList label="Suggested checks" entries={engineer.checks} />
              <EvidenceList label="Concerns for the QA Lead" entries={engineer.concerns} />
            </PlanSection>
          )}
          {engineering?.intake && (
            <PlanSection title="Release Engineer scope">
              <p>{engineering.intake.scope}</p>
              <EvidenceList label="Questions for the Masters" entries={engineering.intake.questions} />
            </PlanSection>
          )}
          {[
            { title: "Backend Master review", evidence: engineering?.backend },
            { title: "Frontend Master review", evidence: engineering?.frontend },
          ].map(({ title, evidence }) => evidence && (
            <PlanSection key={title} title={title}>
              <EvidenceList label="Findings" entries={evidence.findings} />
              <EvidenceList label="Missing proof" entries={evidence.gaps} />
            </PlanSection>
          ))}
          {engineering?.engineer && (
            <PlanSection title="Release Engineer handoff">
              <p>{engineering.engineer.impact}</p>
              <EvidenceList label="Suggested checks" entries={engineering.engineer.checks} />
              <EvidenceList label="Concerns for the QA Lead" entries={engineering.engineer.concerns} />
            </PlanSection>
          )}
          {review && (
            <PlanSection title={`QA Lead ${review.decision} Plan ${number}`}>
              <p>{review.rationale}</p>
              <EvidenceList label="Alternatives considered" entries={review.alternatives} />
              <EvidenceList label="Required changes" entries={review.requiredChanges} />
            </PlanSection>
          )}
        </Disclosure>
      )}
    </section>
  );
}

export function QaAssignment({ run, role, owner, previousRun, liveStatus }: {
  run: Run;
  role: AgentRole;
  owner: string;
  previousRun?: Run;
  liveStatus?: CodexHandoffStatus["status"];
}) {
  const [busy, setBusy] = useState<Action>();
  const [error, setError] = useState("");
  const [revising, setRevising] = useState(false);
  const [revisionError, setRevisionError] = useState("");
  const [reporting, setReporting] = useState(false);
  const editTrigger = useRef<HTMLButtonElement>(null);
  const changeInput = useRef<HTMLTextAreaElement>(null);
  const reportTrigger = useRef<HTMLButtonElement>(null);
  const workPanel = useRef<HTMLDivElement>(null);
  const wasRevising = useRef(false);
  const wasReporting = useRef(false);
  const { revision, changeRequest, browserResult } = run;
  const number = revision?.number ?? 0;
  const workflow = run.workflow ?? getQaWorkflow(role, run.title, run.builderWorkflow);

  useEffect(() => {
    if (revising) changeInput.current?.focus();
    else if (wasRevising.current) (editTrigger.current ?? workPanel.current)?.focus();
    wasRevising.current = revising;
  }, [revising]);

  useEffect(() => {
    if (!reporting && wasReporting.current) (reportTrigger.current ?? workPanel.current)?.focus();
    wasReporting.current = reporting;
  }, [reporting]);

  if (!workflow) return null;

  const builderWorkflow = asBuilderWorkflow(workflow);
  const reviewMode = getPlanReviewMode(run.reviewMode, revision);
  const draftOnly = reviewMode === "draft";
  const current = ["queued", "needs-input"].includes(run.status) || (draftOnly && run.status === "completed");
  const awaitingReview = current && !draftOnly && revision && !revision.review && !changeRequest;
  const reviewSourcesTogether = awaitingReview && reviewMode === "full" && canReviewBuilderSources(revision);
  const engineeringReady = isPlanReviewReady(run.reviewMode, revision);
  const canHandoff = current && engineeringReady && revision?.review?.decision === "approved" && !changeRequest;
  const canRecordResult = run.status === "needs-input";
  const requiresCodexRevision = revision?.executionKind === "playwright" || Boolean(revision?.executionToken && !revision.codexHandoffToken);
  const needsLocalCodex = revision?.executionKind === "codex" && !revision.codexHandoffToken;
  const sourceRecords = sourceRecordsFor(run, previousRun);
  const assignment = {
    role, builderWorkflow, runId: run.id, title: run.title, instructions: run.instructions,
    buildPreset: run.buildPreset, buildTheme: run.buildTheme,
    mode: run.mode, reviewMode: run.reviewMode, target: run.target, sourceRecords,
    qaVenue: run.qaVenue, qaAccountEmail: run.qaAccountEmail, executionPath: "codex" as const,
    job: run.job, pilot: run.pilot, pilotInput: run.pilotInput,
  };

  async function perform(action: Action, work: () => Promise<void>) {
    if (busy) return;
    setError("");
    setBusy(action);
    try {
      await withAssignmentLock(run.id, work);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The assignment step could not finish.");
    } finally {
      setBusy(undefined);
    }
  }

  function propose(change = "", requireFullReview = false) {
    void perform("propose", async () => {
      if (!workflow) return;
      if (revision) await revise(change, requireFullReview);
      const nextAssignment = requireFullReview ? { ...assignment, reviewMode: "full" as const } : assignment;
      const data = await askLocalCodex({ action: "propose", assignment: nextAssignment, previous: revision, change });
      const risk = draftOnly ? undefined : liveProposalSchema.parse(data).risk;
      await saveProposal(run.id, {
        number: number + 1, workflow, job: run.job, change, plan: proposalSchema.parse(data), risk,
      });
      setRevising(false);
    });
  }

  function review() {
    void perform("review", async () => {
      const data = await askLocalCodex({ action: "review", assignment, revision });
      const { executionToken, codexHandoffToken, ...decision } = leadResponseSchema.parse(data);
      await saveReview(run.id, number, decision, executionToken, codexHandoffToken);
    });
  }

  async function revise(change: string, requireFullReview: boolean) {
    if (revision?.executionToken || revision?.codexHandoffToken) {
      await askLocalCodex({ action: "revoke-execution", runId: run.id, revision: number });
    }
    await requestRevision(run.id, number, change, requireFullReview);
  }

  function shortReview() {
    void perform("short-review", async () => {
      const data = await askLocalCodex({ action: "short-review", assignment, revision });
      await saveShortReview(run.id, number, data);
    });
  }

  function runEngineering(stage: EngineeringStage) {
    void perform(stage, async () => {
      const data = await askLocalCodex({ action: "engineering", stage, assignment, revision });
      await savePlanStage(run.id, number, stage, data);
    });
  }

  function reviewBuilderSources() {
    void perform("engineering-sources", async () => {
      const result = builderSourceReviewsSchema.parse(await askLocalCodex({ action: "engineering-sources", assignment, revision }));
      await saveBuilderSourceReviews(run.id, number, result);
      if (!result.backend || !result.frontend) {
        setError(`One review saved. Retry the ${result.backend ? "Frontend Master" : "Backend Master"} review.`);
      }
    });
  }

  function submitRevision(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const change = String(fields.get("change") ?? "").trim();
    if (!change) {
      setRevisionError("Describe what needs to change.");
      changeInput.current?.focus();
      return;
    }
    const requireFullReview = fields.get("require-full-review") === "on";
    if ((event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "save-revision") {
      void perform("save-revision", async () => {
        await revise(change, requireFullReview);
        setRevising(false);
        toast.success("Revision request saved");
      });
      return;
    }
    propose(change, requireFullReview);
  }

  function closeRevision() {
    setRevising(false);
    setRevisionError("");
  }

  function submitResult(outcome: NonNullable<Run["browserResult"]>["outcome"], fields: FormData, findings: BrowserFinding[]) {
    void perform("save", async () => {
      const pilotProof = run.pilot && outcome === "passed" && run.job !== "setup" ? pilotProofSchema.parse({
        kind: run.job,
        orderReference: fields.get("orderReference"),
        transferReference: fields.get("transferReference"),
        issued: Number(fields.get("issued")),
        pending: Number(fields.get("pending")),
        retained: Number(fields.get("retained")),
        accepted: Number(fields.get("accepted")),
      }) : undefined;
      const result = browserResultSchema.parse({
        outcome,
        summary: String(fields.get("summary") ?? ""),
        preview: String(fields.get("preview") ?? ""),
        records: parseRecords(String(fields.get("records") ?? "").trim()),
        findings: findings.length ? findings : undefined,
        pilotProof,
      });
      await saveBrowserResult(run.id, number, result);
      setReporting(false);
      const queuedNext = result.outcome === "passed" && (run.pilot ? run.job !== "accept-transfer" : workflow === "event-builder");
      toast.success(queuedNext ? "Result saved and next assignment queued" : "Result saved");
    });
  }

  const handoff = canHandoff ? handoffText(run, revision, sourceRecords) : undefined;
  const workspacePath = process.env.NEXT_PUBLIC_QA_CITY_VAULT_PATH;
  const codexPrompt = handoff && new URLSearchParams({ prompt: handoff, ...(workspacePath ? { path: workspacePath } : {}) });
  const actionLabel = {
    propose: `${owner} is preparing the plan…`,
    "short-review": "Release Engineer is checking the routine plan…",
    intake: "Release Engineer is scoping the plan…",
    backend: "Backend Master is reviewing the plan…",
    frontend: "Frontend Master is reviewing the plan…",
    "engineering-sources": "Both source reviewers are checking the same plan…",
    engineer: "Release Engineer is preparing the handoff…",
    review: "QA Lead is reviewing the plan…",
    save: "Saving the browser result…",
    "save-revision": "Saving the revision request…",
  };

  return (
    <div ref={workPanel} tabIndex={-1} data-testid="run-work" className="grid min-w-0 gap-4 text-sm">
      <AssignmentProgress run={run} owner={owner} liveStatus={liveStatus} />
      {run.job && <div data-testid="run-assigned-job">
        <p className="font-medium">{jobLabels[run.job]}</p>
        <p className="text-muted-foreground">{jobStops[run.job]}</p>
      </div>}
      {builderWorkflow && (run.buildPreset || run.buildTheme || run.publishSupportingEvents) && (
        <div data-testid="run-build-scenario" className="space-y-1">
          <p className="font-medium">{[run.buildPreset && buildPresets[run.buildPreset].label, run.buildTheme && buildThemes[run.buildTheme].label].filter(Boolean).join(" · ") || "Builder scope"}</p>
          {run.buildPreset && <p className="text-muted-foreground">{buildPresets[run.buildPreset].summary}</p>}
          {run.publishSupportingEvents && <p className="text-muted-foreground">Full review for supporting Event publication on beta.</p>}
        </div>
      )}
      {revision && (
        <div className="space-y-1">
          <p className="font-medium">Plan {number}{revision.review && ` · QA Lead ${revision.review.decision}`}</p>
          <p className="text-muted-foreground">
            {planReviewLabels[reviewMode]}. {draftOnly ? "Execution is not run." : revision.risk?.reason}
            {revision.shortReview?.requiredReview === "full" && " The Release Engineer escalated this plan to full review."}
          </p>
        </div>
      )}
      {current && revision?.review && !engineeringReady && !changeRequest && (
        <p className="text-muted-foreground">This decision used the earlier review flow. Revise the plan for the full engineering review before browser work.</p>
      )}
      {changeRequest && <p className="text-muted-foreground">{draftOnly ? "Draft revision requested." : "Revision requested. The prior decision cannot be used for browser work."}</p>}
      {busy && <p role="status" data-testid="run-work-status">{actionLabel[busy]}</p>}
      {error && <p role="alert" data-testid="run-work-error" className="text-destructive">{error}</p>}
      {current && (
        <div data-testid="run-plan-actions" className="flex flex-wrap items-center gap-2 empty:hidden">
          {!revision && <Button data-testid="run-prepare-plan" onClick={() => propose()} disabled={!!busy}>{draftOnly ? "Prepare draft plan" : "Prepare plan"}</Button>}
          {awaitingReview && reviewMode === "short" && !revision.shortReview && <Button data-testid="run-short-review" onClick={shortReview} disabled={!!busy}>Run short review</Button>}
          {reviewSourcesTogether && <Button data-testid="run-review-sources" onClick={reviewBuilderSources} disabled={!!busy}>Review backend and frontend</Button>}
          {awaitingReview && reviewMode === "full" && !reviewSourcesTogether && engineeringStages.filter((stage) => canRunEngineeringStage(stage, revision.engineering)).map((stage) => (
            <Button key={stage} data-testid={`run-review-${stage}`} onClick={() => runEngineering(stage)} disabled={!!busy}>{engineeringActionLabels[stage]}</Button>
          ))}
          {awaitingReview && engineeringReady && <Button data-testid="run-review-lead" onClick={review} disabled={!!busy}>Send to QA Lead</Button>}
          {revision && !revising && (
            <Button ref={editTrigger} data-testid="run-revise-plan" variant="outline" disabled={!!busy} onClick={() => setRevising(true)}>
              {changeRequest ? "Retry revision" : "Revise plan"}
            </Button>
          )}
        </div>
      )}
      {current && revising && (
        <form data-testid="run-revision-form" className="grid gap-3 rounded-lg border p-4" onSubmit={submitRevision}>
          <FormField testId="run-revision-change" label="What needs to change?" error={revisionError}>
            {(field) => <Textarea {...field} ref={changeInput} name="change" maxLength={1000} rows={3} defaultValue={changeRequest ?? ""} onChange={() => setRevisionError("")} required />}
          </FormField>
          {run.reviewMode === "short" && (
            <Checkbox data-testid="run-revision-full-review" name="require-full-review">
              Use full review on the next revision
            </Checkbox>
          )}
          <div className="flex flex-wrap gap-2">
            <Button data-testid="run-revision-prepare" type="submit" disabled={!!busy}>Prepare revised plan</Button>
            <Button data-testid="run-revision-save" type="submit" value="save-revision" variant="outline" disabled={!!busy}>Save for later</Button>
            <Button data-testid="run-revision-cancel" type="button" variant="ghost" disabled={!!busy} onClick={closeRevision}>Cancel</Button>
          </div>
        </form>
      )}
      {revision?.draftExecution && (
        <Disclosure testId="run-city-result" label={`Playwright result · ${browserOutcomeLabels[revision.draftExecution.outcome]}`} className="rounded-lg border p-3">
          <p>{revision.draftExecution.summary}</p>
          {revision.draftExecution.editorUrl && (
            <a data-testid="run-event-draft-link" href={revision.draftExecution.editorUrl} target="_blank" rel="noreferrer" className="inline-block underline">Open Event Draft in Showpass beta</a>
          )}
          <EvidenceList label="Verified saved questions" entries={revision.draftExecution.verifiedQuestions} />
        </Disclosure>
      )}
      {handoff && codexPrompt && !revising && (
        <section aria-label="Codex handoff" data-testid="run-codex-handoff" className="grid min-w-0 gap-3 rounded-lg border p-3">
          <h3 className="font-semibold">Codex handoff</h3>
          {requiresCodexRevision ? (
            <p className="text-muted-foreground">Revise this plan for the Codex browser before running it.</p>
          ) : needsLocalCodex ? (
            <p className="text-muted-foreground">Open this handoff on the Mac that approved the plan.</p>
          ) : revision?.codexHandoffToken ? (
            <CodexHandoff key={number} runId={run.id} revision={number} token={revision.codexHandoffToken} disabled={!!busy || !!revision.draftExecution} />
          ) : (
            <p className="text-muted-foreground">
              Open the approved plan in Codex and confirm its prerequisites before browser work.
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {!requiresCodexRevision && !needsLocalCodex && !revision?.codexHandoffToken && <ButtonLink data-testid="run-open-codex" href={`codex://new?${codexPrompt}`} prefetch={false}>Open in Codex</ButtonLink>}
            {!requiresCodexRevision && !needsLocalCodex && <Button data-testid="run-copy-handoff" variant="outline" onClick={async () => {
              try {
                await navigator.clipboard.writeText(handoff);
                toast.success("Handoff copied");
              } catch {
                setError("Clipboard access is unavailable. Open the handoff in Codex.");
              }
            }}>Copy handoff</Button>}
            {canRecordResult && (
              <Button ref={reportTrigger} data-testid="run-record-result" variant="outline" aria-expanded={reporting} onClick={() => setReporting(!reporting)}>
                Record browser result
              </Button>
            )}
          </div>
          {canRecordResult && reporting && <BrowserResultForm result={browserResult} workflow={workflow} pilotJob={run.pilot ? run.job : undefined} pending={!!busy} onSubmit={submitResult} />}
        </section>
      )}
      {browserResult && (
        <Disclosure testId="run-reported-result" label={`Reported browser result · ${browserOutcomeLabels[browserResult.outcome]}`} className="rounded-lg border p-3">
          {browserResult.summary !== revision?.draftExecution?.summary && (
            <p className="text-muted-foreground wrap-anywhere whitespace-pre-wrap">{browserResult.summary}</p>
          )}
          {!!browserResult.findings?.length && <ReportedFindings findings={browserResult.findings} />}
          {browserResult.preview && <p className="text-muted-foreground wrap-anywhere">{browserResult.preview}</p>}
          {browserResult.pilotProof && (
            <p data-testid="run-pilot-proof" className="wrap-anywhere">
              {browserResult.pilotProof.kind === "purchase"
                ? `Order ${browserResult.pilotProof.orderReference} · ${browserResult.pilotProof.issued} issued`
                : browserResult.pilotProof.kind === "send-transfer"
                  ? `Transfer ${browserResult.pilotProof.transferReference} · ${browserResult.pilotProof.pending} pending · ${browserResult.pilotProof.retained} retained`
                  : `${browserResult.pilotProof.accepted} accepted and verified`}
            </p>
          )}
          {browserResult.records && (
            <Disclosure testId="run-saved-records" label="Saved Showpass records">
              <pre tabIndex={0} aria-label="Saved records JSON" className="max-h-64 overflow-auto rounded bg-muted p-2 text-xs">{JSON.stringify(browserResult.records, null, 2)}</pre>
            </Disclosure>
          )}
        </Disclosure>
      )}
    </div>
  );
}
