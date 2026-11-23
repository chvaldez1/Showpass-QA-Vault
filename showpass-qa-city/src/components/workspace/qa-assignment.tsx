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
import { builderRecordsSchema } from "@/lib/workspace/builder-result";
import {
  browserOutcomeLabels, browserOutcomes, browserResultSchema, getPlanReviewMode, getQaWorkflow,
  isPlanReviewReady, leadDecisionSchema, liveProposalSchema, planReviewLabels, proposalSchema, workflowSkills, type Revision,
} from "@/lib/workspace/qa-workflow";
import { type AgentRole, type Run } from "@/lib/workspace/schema";
import { canRunEngineeringStage, engineeringActionLabels, engineeringStages, type EngineeringStage } from "@/lib/workspace/release";
import { requestRevision, saveBrowserResult, savePlanStage, saveProposal, saveReview, saveShortReview } from "@/lib/workspace/store";

type Action = "propose" | EngineeringStage | "short-review" | "review" | "save" | "save-revision";

function handoffText(run: Run, revision: Revision, source: Run["browserResult"]) {
  const { plan, review, number, workflow, change } = revision;
  const skill = workflowSkills[workflow];
  const engineeringHandoff = revision.engineering?.engineer;
  const shortReview = revision.shortReview;
  const steps = plan.steps.map(({ action, proof }, index) => `${index + 1}. ${action} Expected proof: ${proof}`);
  return [
    `$${skill} — ${run.title}`,
    `QA City handoff for assignment ${run.id}, Plan ${number}. The City's independent QA Lead approved this version: ${review?.rationale}`,
    engineeringHandoff && `Release Engineer handoff informed by both source reviews: ${engineeringHandoff.impact}\n${[...engineeringHandoff.checks, ...engineeringHandoff.concerns].map((item) => "- " + item).join("\n")}`,
    !engineeringHandoff && shortReview && `Release Engineer short review: ${shortReview.impact}\n${[...shortReview.checks, ...shortReview.concerns].map((item) => "- " + item).join("\n")}\nReview stop point: ${shortReview.stop}`,
    `Mode: ${run.mode === "drive" ? "drive in the Codex in-app browser" : "guide me through the approved checks"}`,
    run.target && `Target: ${run.target}`,
    run.instructions && `Assignment details: ${run.instructions}`,
    source?.records && `Saved Showpass records from the previous run:\n${JSON.stringify(source.records, null, 2)}`,
    change && `Revision request: ${change}`,
    `Approach: ${plan.approach}`,
    `Start: ${plan.startingPoint}`,
    ...(plan.prerequisites.length ? ["Confirm before starting dependent work:", ...plan.prerequisites.map((item) => "- " + item)] : []),
    ...steps,
    `Data changes: ${plan.changes}`,
    `Cleanup: ${plan.cleanup}`,
    `Stop: ${plan.stop}`,
    "Apply the QA Vault permission rules and confirm the user's authorized scope. Treat the City decision as approval of the quoted plan only. If its approval cannot be established in this chat or the plan must change, get independent QA Lead approval before acting.",
    "Apply the UX and UI checks in the shared Interactive Browser Release Testing note. Report any confirmed bug, usability finding, observation, or blocker with expected versus actual, impact, and evidence. Use the Showpass bug drafter for confirmed bugs.",
    workflow === "event-builder" && "Return the saved Draft details and Event Preview URL for an independent Public Tester assignment. Leave the artwork for the user to add.",
    workflow === "event-builder" && 'Return a JSON array for QA City with { "kind": "event", "record": { ... } }. Use the Event serializer field names: id, name, slug, status, venue, description, starts_on, ends_on, opens_at, timezone, location_name, inventory, is_recurring, assigned_space, tickettype_set. Ticket types use id, name, description, price, inventory, purchase_limit, sale_starts_on, sale_ends_on, scan_starts_on, scan_ends_on, custom_ticket_event_starts_on, custom_ticket_event_ends_on, custom_ticket_event_opens_at, visibility. Required Event fields are id, name, slug and status. Include the saved ticket types, each with its name and verified values. Give prices as strings with two decimal places and dates as ISO 8601 with an offset. Use sp_event_draft for a verified Draft and omit unverified values.',
    workflow === "offering-builder" && 'Return a JSON array of { "kind": "product" | "membership_group" | "membership_benefit", "record": { ... } } for QA City. Use the venue-based serializer field names. Product uses id, name, description, venue, is_active, product_attributes. Membership Group uses id, name, venue, description, slug, status, renewals_enabled, custom_expiry_date, membership_levels. Product variants and levels use id, name, price, inventory, purchase_limit; variants also support sku and levels support description. Membership Benefit uses id, name, membership_group, membership_level, benefit_type, ticket_type, scans_allowed, discount_uses_allowed, venue. Give prices as strings with two decimal places. Include verified values only.',
    "Return the verified outcome and evidence so it can be recorded in QA City.",
  ].filter(Boolean).join("\n");
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
  const { plan, engineer, engineering, review, number, change, shortReview } = revision;
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
  const { revision, changeRequest, browserResult, revisionHistory } = run;
  const number = revision?.number ?? 0;
  const workflow = getQaWorkflow(role, run.title);
  if (!workflow) return null;

  const builder = workflow === "event-builder" || workflow === "offering-builder";
  const reviewMode = getPlanReviewMode(run.reviewMode, revision);
  const draftOnly = reviewMode === "draft";
  const current = ["queued", "needs-input"].includes(run.status) || (draftOnly && run.status === "completed");
  const awaitingReview = current && !draftOnly && revision && !revision.review && !changeRequest;
  const engineeringReady = isPlanReviewReady(run.reviewMode, revision);
  const canHandoff = current && engineeringReady && revision?.review?.decision === "approved" && !changeRequest;
  const source = previousRun?.browserResult;
  const assignment = { role, title: run.title, instructions: run.instructions, mode: run.mode, reviewMode: run.reviewMode, target: run.target, sourceRecords: source?.records };

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
      if (revision) await requestRevision(run.id, number, change, requireFullReview);
      const nextAssignment = requireFullReview ? { ...assignment, reviewMode: "full" as const } : assignment;
      const data = await askLocalCodex({ action: "propose", assignment: nextAssignment, previous: revision, change });
      const risk = draftOnly ? undefined : liveProposalSchema.parse(data).risk;
      await saveProposal(run.id, { number: number + 1, workflow, change, plan: proposalSchema.parse(data), risk });
      setRevising(false);
    });
  }

  function review() {
    void perform("review", async () => {
      const data = await askLocalCodex({ action: "review", assignment, revision });
      await saveReview(run.id, number, leadDecisionSchema.parse(data));
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
        await requestRevision(run.id, number, change, requireFullReview);
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

  const handoff = canHandoff ? handoffText(run, revision, source) : undefined;
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
          The {builder ? "Organizer Builder" : "tester"} prepares the plan. {draftOnly ? "The assignment ends with the written draft." : "The Release Engineer reviews it at the required depth before QA Lead sign-off."}
        </p>
      )}
      {busy && <p role="status">{actionLabel[busy]}</p>}
      {error && <p role="alert" className="text-destructive">{error}</p>}
      {current && (
        <div className="flex flex-wrap items-center gap-2">
          {!revision && <Button onClick={() => propose()} disabled={!!busy}>{draftOnly ? "Prepare draft plan" : "Prepare plan"}</Button>}
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
      {handoff && codexPrompt && !revising && (
        <div className="grid gap-2 rounded-lg border p-3">
          <h3 className="font-semibold">Ready for Codex handoff</h3>
          <p className="text-muted-foreground">Send the approved plan in Codex to continue. Confirm the prerequisites there before starting browser work.</p>
          <div className="flex flex-wrap gap-2">
            <a href={`codex://new?${codexPrompt}`} className={buttonVariants()}>Open in Codex</a>
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
              {builder && (
                <FormField label="Saved Showpass records (JSON)">
                  {(field) => <Textarea {...field} name="records" rows={5} maxLength={24_000} defaultValue={browserResult?.records ? JSON.stringify(browserResult.records, null, 2) : ""} placeholder="Paste the saved records returned by the builder in Codex." className="font-mono" />}
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
          <h3 className="font-semibold">Reported browser result · {browserOutcomeLabels[browserResult.outcome]}</h3>
          <p className="text-muted-foreground wrap-anywhere whitespace-pre-wrap">{browserResult.summary}</p>
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
