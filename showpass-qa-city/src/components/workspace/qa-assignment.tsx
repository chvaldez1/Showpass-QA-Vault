"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";
import { buttonVariants, Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { askLocalCodex } from "@/lib/codex/client";
import { CodexHandoff } from "./codex-handoff";
import { builderRecordsSchema } from "@/lib/workspace/builder-result";
import { draftExecutionResultSchema } from "@/lib/workspace/event-draft";
import { handoffText } from "@/lib/workspace/handoff";
import {
  asBuilderWorkflow, browserOutcomeLabels, browserOutcomes, browserResultSchema, eventDraftProposalSchema, getPlanReviewMode, getQaWorkflow,
  isPlanReviewReady, leadResponseSchema, liveProposalSchema, planReviewLabels, proposalSchema, type Revision,
} from "@/lib/workspace/qa-workflow";
import { type AgentRole, type Run } from "@/lib/workspace/schema";
import { canRunEngineeringStage, engineeringActionLabels, engineeringStages, type EngineeringStage } from "@/lib/workspace/release";
import { requestRevision, saveBrowserResult, saveDraftExecution, savePlanStage, saveProposal, saveReview, saveShortReview } from "@/lib/workspace/store";

type Action = "propose" | EngineeringStage | "short-review" | "review" | "save" | "save-revision" | "open-browser" | "run";

async function requestBetaBrowser(payload: object) {
  const response = await fetch("/api/run-approved-plan", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || !body) throw new Error(body?.error ?? "The dedicated beta browser could not finish.");
  return body.result as unknown;
}


function Items({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="space-y-1">
      <h4 className="font-medium">{title}</h4>
      <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

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

function Plan({ revision }: { revision: Revision }) {
  const { plan, engineer, engineering, eventDraft, review, number, change, shortReview } = revision;
  return (
    <section className="space-y-3 rounded-lg border p-3 text-sm wrap-anywhere">
      <h3 className="font-semibold">Plan {number}</h3>
      {change && <p className="text-muted-foreground">Revision request: {change}</p>}
      <p>{plan.approach}</p>
      <p><strong className="font-medium">Start here:</strong> {plan.startingPoint}</p>
      <Items title="Before starting" items={plan.prerequisites} />
      <ol className="list-decimal space-y-2 pl-5">
        {plan.steps.map(({ action, proof }, index) => (
          <li key={index}>
            <p>{action}</p>
            <p className="text-muted-foreground">Expected: {proof}</p>
          </li>
        ))}
      </ol>
      <p><strong className="font-medium">Data changes:</strong> {plan.changes}</p>
      <p><strong className="font-medium">Cleanup:</strong> {plan.cleanup}</p>
      <p><strong className="font-medium">Stop:</strong> {plan.stop}</p>
      {eventDraft && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="font-semibold">Event Draft in Showpass beta</h4>
          <p>{eventDraft.name} · {eventDraft.category}</p>
          <p className="text-muted-foreground">{eventDraft.organization} · {eventDraft.location}</p>
          <p className="text-muted-foreground">{eventDraft.date} · {eventDraft.startsAt} to {eventDraft.endsAt} · {eventDraft.timezone}</p>
          <p className="whitespace-pre-line text-muted-foreground">{eventDraft.description}</p>
          <Items title="Optional questions during checkout" items={eventDraft.questions} />
        </div>
      )}
      <Items title="References" items={plan.sources} />
      {shortReview && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="font-semibold">Release Engineer short review</h4>
          <p>{shortReview.impact}</p>
          <Items title="Checks" items={shortReview.checks} />
          <p><strong>Stop point</strong> {shortReview.stop}</p>
          <Items title={shortReview.requiredReview === "full" ? "Why full review is needed" : "Concerns"} items={shortReview.concerns} />
        </div>
      )}
      {engineer && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="font-semibold">Earlier consultation on Plan {number}</h4>
          <p>{engineer.impact}</p>
          <Items title="Suggested checks" items={engineer.checks} />
          <Items title="Concerns for the QA Lead" items={engineer.concerns} />
        </div>
      )}
      {engineering?.intake && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="font-semibold">Release Engineer scope</h4>
          <p>{engineering.intake.scope}</p>
          <Items title="Questions for the Masters" items={engineering.intake.questions} />
        </div>
      )}
      {engineering?.backend && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="font-semibold">Backend Master review</h4>
          <Items title="Findings" items={engineering.backend.findings} />
          <Items title="Missing proof" items={engineering.backend.gaps} />
        </div>
      )}
      {engineering?.frontend && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="font-semibold">Frontend Master review</h4>
          <Items title="Findings" items={engineering.frontend.findings} />
          <Items title="Missing proof" items={engineering.frontend.gaps} />
        </div>
      )}
      {engineering?.engineer && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="font-semibold">Release Engineer handoff</h4>
          <p>{engineering.engineer.impact}</p>
          <Items title="Suggested checks" items={engineering.engineer.checks} />
          <Items title="Concerns for the QA Lead" items={engineering.engineer.concerns} />
        </div>
      )}
      {review && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="font-semibold">QA Lead {review.decision} Plan {number}</h4>
          <p>{review.rationale}</p>
          <Items title="Alternatives considered" items={review.alternatives} />
          <Items title="Required changes" items={review.requiredChanges} />
        </div>
      )}
    </section>
  );
}

export function QaAssignment({ run, role, previousRun }: { run: Run; role: AgentRole; previousRun?: Run }) {
  const [busy, setBusy] = useState<Action>();
  const [error, setError] = useState("");
  const [revising, setRevising] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [readyRevision, setReadyRevision] = useState(0);
  const [browserMessage, setBrowserMessage] = useState("");
  const { revision, changeRequest, browserResult, revisionHistory } = run;
  const number = revision?.number ?? 0;
  const workflow = run.workflow ?? getQaWorkflow(role, run.title, run.builderWorkflow);
  if (!workflow) return null;

  const builderWorkflow = asBuilderWorkflow(workflow);
  const reviewMode = getPlanReviewMode(run.reviewMode, revision);
  const draftOnly = reviewMode === "draft";
  const current = ["queued", "needs-input"].includes(run.status) || (draftOnly && run.status === "completed");
  const awaitingReview = current && !draftOnly && revision && !revision.review && !changeRequest;
  const engineeringReady = isPlanReviewReady(run.reviewMode, revision);
  const canHandoff = current && engineeringReady && revision?.review?.decision === "approved" && !changeRequest;
  const canUseRunner = workflow === "event-builder" && !draftOnly && run.mode === "drive";
  const canExecute = canHandoff && revision.executionToken;
  const source = previousRun?.browserResult;
  const assignment = { role, builderWorkflow, runId: run.id, title: run.title, instructions: run.instructions, mode: run.mode, reviewMode: run.reviewMode, target: run.target, sourceRecords: source?.records };

  async function perform(action: Action, work: () => Promise<void>) {
    setError("");
    setBusy(action);
    try {
      if (navigator.locks) {
        await navigator.locks.request(`qa-city-work:${run.id}`, { ifAvailable: true }, async (lock) => {
          if (!lock) throw new Error("This assignment is already running in another tab.");
          await work();
        });
      } else {
        await work();
      }
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
      const executable = canUseRunner ? eventDraftProposalSchema.parse(data) : undefined;
      const risk = draftOnly ? undefined : (executable ?? liveProposalSchema.parse(data)).risk;
      await saveProposal(run.id, {
        number: number + 1, workflow, change, plan: proposalSchema.parse(data), risk, eventDraft: executable?.eventDraft ?? undefined,
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

  function openBrowser() {
    void perform("open-browser", async () => {
      const result = await requestBetaBrowser({ action: "open-browser" });
      if (typeof result === "string") setBrowserMessage(result);
    });
  }

  function executePlan() {
    void perform("run", async () => {
      const result = await requestBetaBrowser({
        action: "run", runId: run.id, revision: number, executionToken: revision?.executionToken,
        ready: readyRevision === number,
      });
      await saveDraftExecution(run.id, number, draftExecutionResultSchema.parse(result));
    });
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

  function submitRevision(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const change = String(fields.get("change") ?? "").trim();
    if (!change) return;
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

  function submitResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    void perform("save", async () => {
      const result = browserResultSchema.parse({
        outcome: fields.get("outcome"),
        summary: String(fields.get("summary") ?? ""),
        preview: String(fields.get("preview") ?? ""),
        records: parseRecords(String(fields.get("records") ?? "").trim()),
      });
      await saveBrowserResult(run.id, number, result);
      setReporting(false);
      toast.success(workflow === "event-builder" && result.outcome === "passed" ? "Result saved and Public Tester assignment queued" : "Result saved");
    });
  }

  const handoff = canHandoff ? handoffText(run, revision, source?.records) : undefined;
  const workspacePath = process.env.NEXT_PUBLIC_QA_CITY_VAULT_PATH;
  const codexPrompt = handoff && new URLSearchParams({ prompt: handoff, ...(workspacePath ? { path: workspacePath } : {}) });
  const actionLabel = {
    propose: "Preparing the tester plan…",
    "short-review": "Release Engineer is checking the routine plan…",
    intake: "Release Engineer is scoping the plan…",
    backend: "Backend Master is reviewing the plan…",
    frontend: "Frontend Master is reviewing the plan…",
    engineer: "Release Engineer is preparing the handoff…",
    review: "QA Lead is reviewing the plan…",
    save: "Saving the browser result…",
    "save-revision": "Saving the revision request…",
    "open-browser": "Opening the dedicated beta browser…",
    run: "Running the approved plan in the dedicated beta browser…",
  };

  return (
    <div className="grid gap-3 text-sm">
      {revisionHistory?.map((previous) => (
        <details key={previous.number} className="space-y-2">
          <summary className="cursor-pointer text-muted-foreground">
            Plan {previous.number} · {previous.review?.decision ?? "not reviewed"} · superseded
          </summary>
          <Plan revision={previous} />
        </details>
      ))}
      {revision && <Plan revision={revision} />}
      {revision && (
        <p className="text-muted-foreground">
          {planReviewLabels[reviewMode]}. {draftOnly ? "Execution is not run." : revision.risk?.reason}
          {revision.shortReview?.requiredReview === "full" && " The Release Engineer escalated this plan to full review."}
        </p>
      )}
      {current && revision?.review && !engineeringReady && !changeRequest && (
        <p className="text-muted-foreground">This decision used the earlier review flow. Revise the plan for the full engineering review before browser work.</p>
      )}
      {changeRequest && <p className="text-muted-foreground">{draftOnly ? "Draft revision requested." : "Revision requested. The prior decision cannot be used for browser work."}</p>}
      {current && !revision && (
        <p className="text-muted-foreground">
          The {builderWorkflow ? "Organizer Builder" : "tester"} prepares the plan. {draftOnly ? "The assignment ends with the written draft." : "The Release Engineer reviews it at the required depth before QA Lead sign-off."}
        </p>
      )}
      {busy && <p role="status">{actionLabel[busy]}</p>}
      {error && <p role="alert" className="text-destructive">{error}</p>}
      {current && (
        <div className="flex flex-wrap items-center gap-2">
          {!revision && <Button onClick={() => propose()} disabled={!!busy}>{draftOnly ? "Prepare draft plan" : "Prepare plan"}</Button>}
          {canUseRunner && !revision?.codexHandoffToken && <Button variant="outline" onClick={openBrowser} disabled={!!busy}>Open beta browser</Button>}
          {awaitingReview && reviewMode === "short" && !revision.shortReview && <Button onClick={shortReview} disabled={!!busy}>Run short review</Button>}
          {awaitingReview && reviewMode === "full" && engineeringStages.filter((stage) => canRunEngineeringStage(stage, revision.engineering)).map((stage) => (
            <Button key={stage} onClick={() => runEngineering(stage)} disabled={!!busy}>{engineeringActionLabels[stage]}</Button>
          ))}
          {awaitingReview && engineeringReady && <Button onClick={review} disabled={!!busy}>Send to QA Lead</Button>}
          {revision && !revising && (
            <Button variant="outline" disabled={!!busy} onClick={() => setRevising(true)}>
              {changeRequest ? "Retry revision" : "Revise plan"}
            </Button>
          )}
        </div>
      )}
      {current && browserMessage && <p role="status" className="text-muted-foreground">{browserMessage}</p>}
      {current && revising && (
        <form className="grid gap-2" onSubmit={submitRevision}>
          <FormField label="What needs to change?">
            {(field) => <Textarea {...field} name="change" maxLength={1000} rows={3} defaultValue={changeRequest ?? ""} required />}
          </FormField>
          {run.reviewMode === "short" && (
            <label className="flex items-center gap-2">
              <input name="require-full-review" type="checkbox" className="size-4 accent-primary" />
              Use full review on the next revision
            </label>
          )}
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={!!busy}>Prepare revised plan</Button>
            <Button type="submit" value="save-revision" variant="outline" disabled={!!busy}>Save for later</Button>
          </div>
        </form>
      )}
      {canExecute && !revising && (
        <div className="grid gap-3 rounded-lg border p-3">
          <h3 className="font-semibold">Run in City</h3>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-0.5 size-4 accent-primary"
              checked={readyRevision === number} onChange={(event) => setReadyRevision(event.target.checked ? number : 0)} />
            I verified the Organization and existing Event location. My Organizer can use the migrated Create event and Order form pages.
          </label>
          <Button className="justify-self-start" disabled={!!busy || readyRevision !== number} onClick={executePlan}>
            Run approved plan
          </Button>
        </div>
      )}
      {revision?.draftExecution && (
        <div className="space-y-2 rounded-lg border p-3">
          <h3 className="font-semibold">City result · {browserOutcomeLabels[revision.draftExecution.outcome]}</h3>
          <p>{revision.draftExecution.summary}</p>
          {revision.draftExecution.editorUrl && (
            <a href={revision.draftExecution.editorUrl} target="_blank" rel="noreferrer" className="inline-block underline">Open Event Draft in Showpass beta</a>
          )}
          <Items title="Verified saved questions" items={revision.draftExecution.verifiedQuestions} />
        </div>
      )}
      {handoff && codexPrompt && !revising && (!canExecute || role === "organizer-builder") && (
        <div className="grid gap-2 rounded-lg border p-3">
          <h3 className="font-semibold">Ready for Codex handoff</h3>
          {revision?.codexHandoffToken ? (
            <CodexHandoff key={number} runId={run.id} revision={number} token={revision.codexHandoffToken} disabled={!!busy || !!revision.draftExecution} />
          ) : (
            <p className="text-muted-foreground">
              Open the approved plan in Codex and confirm its prerequisites before browser work.
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {!revision?.codexHandoffToken && <a href={`codex://new?${codexPrompt}`} className={buttonVariants({ variant: "outline" })}>Open in Codex</a>}
            <Button variant="outline" onClick={async () => {
              try {
                await navigator.clipboard.writeText(handoff);
                toast.success("Handoff copied");
              } catch {
                setError("Clipboard access is unavailable. Open the handoff in Codex.");
              }
            }}>Copy handoff</Button>
            {!reporting && <Button variant="outline" onClick={() => setReporting(true)}>Record browser result</Button>}
          </div>
          {reporting && (
            <form className="grid gap-2 border-t pt-3" onSubmit={submitResult}>
              <FormField label="Outcome">
                {(field) => (
                  <Select {...field} name="outcome" defaultValue={browserResult?.outcome ?? ""} required>
                    <option value="">Choose an outcome</option>
                    {browserOutcomes.map((outcome) => <option key={outcome} value={outcome}>{browserOutcomeLabels[outcome]}</option>)}
                  </Select>
                )}
              </FormField>
              <FormField label="What happened?">
                {(field) => <Textarea {...field} name="summary" maxLength={2000} rows={3} defaultValue={browserResult?.summary} placeholder="What worked, any issues, and the evidence or report link" required />}
              </FormField>
              {workflow === "event-builder" && (
                <FormField label="Beta Event Preview URL">
                  {(field) => <Input {...field} name="preview" type="url" maxLength={1000} defaultValue={browserResult?.preview} />}
                </FormField>
              )}
              {builderWorkflow && (
                <FormField label={builderWorkflow === "organizer-builder" ? "Saved Events, Products or Memberships (optional JSON)" : "Saved Showpass records (JSON)"}>
                  {(field) => <Textarea {...field} name="records" rows={5} maxLength={24_000} defaultValue={browserResult?.records ? JSON.stringify(browserResult.records, null, 2) : ""} placeholder="Paste supported saved records returned by the builder in Codex." className="font-mono" />}
                </FormField>
              )}
              <Button type="submit" className="justify-self-start" disabled={!!busy}>
                Save result
              </Button>
            </form>
          )}
        </div>
      )}
      {browserResult && (
        <div className="space-y-1 rounded-lg border p-3">
          {!revision?.draftExecution && (
            <>
              <h3 className="font-semibold">Reported browser result · {browserOutcomeLabels[browserResult.outcome]}</h3>
              <p className="text-muted-foreground wrap-anywhere whitespace-pre-wrap">{browserResult.summary}</p>
            </>
          )}
          {browserResult.preview && <p className="text-muted-foreground wrap-anywhere">{browserResult.preview}</p>}
          {browserResult.records && (
            <details className="space-y-2">
              <summary className="cursor-pointer font-medium">Saved Showpass records</summary>
              <pre className="overflow-auto rounded bg-muted p-2 text-xs">{JSON.stringify(browserResult.records, null, 2)}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
