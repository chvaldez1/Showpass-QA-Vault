"use client";

import { ActivityIcon, ChevronRightIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Disclosure } from "@/components/ui/disclosure";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildKindLabels, sourceRecordsFor } from "@/lib/workspace/build-catalog";
import { jobLabels } from "@/lib/workspace/job";
import { nextRunAction } from "@/lib/workspace/run-queue";
import { runModeLabels, type Agent, type Run, type RunStatus } from "@/lib/workspace/schema";
import { codexStatusLabels, type CodexHandoffStatus, type LiveCodexRuns } from "@/lib/codex/handoff-schema";
import { CodexActivity, liveStatus, runFilterStatus } from "./codex-activity";
import { CaseReview, DraftReviewRecord } from "./case-review";
import { cancelRun } from "@/lib/workspace/store";

const QaAssignment = dynamic(() => import("./qa-assignment").then((module) => module.QaAssignment), {
  loading: () => <p role="status" data-testid="run-work-loading" className="text-muted-foreground">Loading assignment actions…</p>,
});

const Plan = dynamic(() => import("./qa-assignment").then((module) => module.Plan), {
  loading: () => <p role="status" className="text-muted-foreground">Loading plan…</p>,
});

export const statusDisplay = {
  queued: {
    label: "Queued",
    className: "bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300",
  },
  running: {
    label: "Running",
    className: "bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300",
  },
  "needs-input": {
    label: "Needs input",
    className: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
  },
  failed: {
    label: "Failed",
    className: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground",
  },
} satisfies Record<RunStatus, { label: string; className: string }>;

const shortDate = new Intl.DateTimeFormat("en-CA", {
  month: "short", day: "numeric", timeZone: "UTC",
});

const fullDate = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "medium", timeStyle: "short", timeZone: "UTC",
});

export function RunStatusBadge({ status, draftOnly, codex }: {
  status: RunStatus; draftOnly?: boolean; codex?: CodexHandoffStatus["status"];
}) {
  const { label, className } = statusDisplay[status];
  return (
    <Badge data-testid="run-status" variant="secondary" className={className}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {codex ? codexStatusLabels[codex] : draftOnly && status === "completed" ? "Draft ready" : label}
    </Badge>
  );
}

function RunRow({ run, agent, previousRun, activity, showNextAction }: {
  run: Run; agent?: Agent; previousRun?: Run; activity: LiveCodexRuns; showNextAction: boolean;
}) {
  const [cancelling, setCancelling] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const date = new Date(run.createdAt);
  const agentName = agent?.name ?? "Unknown agent";
  const caseReview = run.reviewMode === "case-review";
  const draftOnly = run.reviewMode === "draft" || caseReview;
  const result = liveStatus(run, activity);
  const next = showNextAction ? nextRunAction(run, result) : undefined;
  const status = runFilterStatus(run, activity);
  const badge = result && run.status !== "completed" && run.status !== "failed" ? result.status : undefined;
  const role = !run.recoveredCodexRevision && !run.sample ? agent?.role : undefined;
  const recoveredActivity = run.recoveredCodexRevision ? result : undefined;
  const history = role ? run.revisionHistory : undefined;
  const hasHistory = Boolean(history?.length || run.caseReviewHistory?.length);
  const currentPlan = role ? run.revision : undefined;
  const showPlanFirst = currentPlan && status !== "queued" && status !== "running" && status !== "needs-input";
  const sourceRecords = sourceRecordsFor(run, previousRun) ?? [];
  const sourceBuilds = sourceRecords.map(({ kind, record }) => ({ kind, recordId: record.id, name: record.name }));
  const buildReference = run.sourceRecord;
  const builds = sourceBuilds.length || !buildReference
    ? sourceBuilds
    : [{ ...buildReference, name: "Record details unavailable" }];

  const details = (
    <div className="max-w-prose space-y-5" data-testid="run-details-content">
      <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 rounded-lg border bg-background p-4">
        <dt className="text-muted-foreground">Agent</dt>
        <dd className="wrap-anywhere">{agentName}</dd>
        <dt className="text-muted-foreground">Mode</dt>
        <dd>{caseReview ? "Draft test cases with review" : draftOnly ? "Draft plan only" : runModeLabels[run.mode]}</dd>
        {run.job && <>
          <dt className="text-muted-foreground">Job</dt>
          <dd className="wrap-anywhere">{jobLabels[run.job]}</dd>
        </>}
        {run.target && (
          <>
            <dt className="text-muted-foreground">Test target</dt>
            <dd className="wrap-anywhere">{run.target}</dd>
          </>
        )}
        {run.qaVenue && (
          <>
            <dt className="text-muted-foreground">QA venue</dt>
            <dd className="wrap-anywhere">{run.qaVenue.environment} · {run.qaVenue.organization}{run.qaVenue.location && ` · ${run.qaVenue.location}`}</dd>
          </>
        )}
        {run.qaAccountEmail && (
          <>
            <dt className="text-muted-foreground">Showpass test account</dt>
            <dd className="wrap-anywhere">{run.qaAccountEmail}</dd>
          </>
        )}
        {run.sourceRunId && (
          <>
            <dt className="text-muted-foreground">Handoff from</dt>
            <dd className="wrap-anywhere">{previousRun?.title ?? "Previous run unavailable"}</dd>
          </>
        )}
        {run.pilotInput?.orderReference && <>
          <dt className="text-muted-foreground">Original order</dt>
          <dd className="wrap-anywhere">{run.pilotInput.orderReference}</dd>
        </>}
        {run.pilotInput?.transferReference && <>
          <dt className="text-muted-foreground">Transfer</dt>
          <dd className="wrap-anywhere">{run.pilotInput.transferReference}</dd>
        </>}
        {builds.length > 0 && (
          <>
            <dt className="text-muted-foreground">{builds.length === 1 ? "Saved build" : "Saved builds"}</dt>
            <dd data-testid="run-source-builds" className="min-w-0">
              <ul className="space-y-2">
                {builds.map(({ kind, recordId, name }) => (
                  <li key={`${kind}-${recordId}`} className="wrap-anywhere">
                    <span className="block font-medium">{name}</span>
                    <span className="block text-xs text-muted-foreground">{buildKindLabels[kind]} · ID {recordId}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </>
        )}
        <dt className="text-muted-foreground">Created</dt>
        <dd><time data-testid="run-created-at" dateTime={run.createdAt}>{fullDate.format(date)} UTC</time></dd>
      </dl>
      {run.instructions && (
        <section className="grid gap-2" aria-label="Instructions" data-testid="run-instructions">
          <h3 className="text-sm font-semibold">Instructions</h3>
          <p className="leading-relaxed wrap-anywhere whitespace-pre-wrap">{run.instructions}</p>
        </section>
      )}
    </div>
  );

  async function handleCancelRun() {
    setCancelling(true);
    try {
      await cancelRun(run.id);
      toast.success("Run cancelled");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn’t cancel the run.");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <li data-testid={`run-row-${run.id}`}>
      <Dialog>
        <DialogTrigger
          data-testid={`open-run-${run.id}`}
          render={<Button variant="ghost" />}
          className="group h-auto w-full justify-start gap-3 rounded-none px-4 py-3.5 text-left font-normal whitespace-normal hover:bg-muted/70 focus-visible:-outline-offset-2 sm:gap-4 sm:px-5"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{run.title}</span>
            <span className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              <span className="max-w-full truncate">{agentName}</span>
              <span aria-hidden="true">·</span>
              <time data-testid="run-list-date" dateTime={run.createdAt}>{shortDate.format(date)}</time>
              {run.sample && <span>· Sample</span>}
            </span>
            {next && <span data-testid="run-next-action" className="mt-1 block text-xs font-medium">{next.label}</span>}
            {next?.blocker && <span data-testid="run-queue-blocker" className="mt-1 line-clamp-2 text-xs text-muted-foreground wrap-anywhere">{next.blocker}</span>}
          </span>
          <RunStatusBadge status={status} draftOnly={draftOnly} codex={badge} />
          <ChevronRightIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
        </DialogTrigger>
        <DialogContent testId="run-dialog" width="xl" initialFocus={titleRef} className="max-h-[min(45rem,calc(100dvh-1rem))] sm:max-h-[min(45rem,calc(100dvh-2rem))]">
          <DialogHeader className="gap-2.5">
            <DialogTitle ref={titleRef} tabIndex={-1} data-testid="run-dialog-title" className="text-lg leading-snug wrap-anywhere outline-none sm:text-xl">{run.title}</DialogTitle>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <DialogDescription>{run.sample ? "Sample run" : run.recoveredCodexRevision ? "Recovered Codex handoff" : agentName}</DialogDescription>
              <RunStatusBadge status={status} draftOnly={draftOnly} codex={badge} />
            </div>
          </DialogHeader>
          {role || recoveredActivity ? (
            <Tabs defaultValue={showPlanFirst ? "plan" : role ? "work" : "activity"} className="min-h-0 gap-0">
              <TabsList
                variant="line"
                aria-label="Run details"
                data-testid="run-tabs"
                className="h-11 w-full shrink-0 justify-start gap-1 border-b px-2 sm:gap-2 sm:px-5 [&_[role=tab]]:flex-none [&_[role=tab]]:px-2"
              >
                {role && <TabsTrigger value="work" data-testid="run-tab-work">Current work</TabsTrigger>}
                {currentPlan && <TabsTrigger value="plan" data-testid="run-tab-plan">Plan</TabsTrigger>}
                {recoveredActivity && <TabsTrigger value="activity" data-testid="run-tab-activity">Activity</TabsTrigger>}
                <TabsTrigger value="details" data-testid="run-tab-details">Details</TabsTrigger>
                {hasHistory && <TabsTrigger value="history" data-testid="run-tab-history">History</TabsTrigger>}
              </TabsList>
              {role && (
                <TabsContent value="work" keepMounted render={<DialogBody />} data-testid="run-panel-work">
                  {caseReview ? <CaseReview run={run} /> : <QaAssignment run={run} role={role} owner={agentName} previousRun={previousRun} liveStatus={result?.status} />}
                </TabsContent>
              )}
              {currentPlan && (
                <TabsContent value="plan" render={<DialogBody />} data-testid="run-panel-plan">
                  <Plan revision={currentPlan} />
                </TabsContent>
              )}
              {recoveredActivity && (
                <TabsContent value="activity" render={<DialogBody />} data-testid="run-panel-activity">
                  <CodexActivity result={recoveredActivity} limit={40} />
                </TabsContent>
              )}
              <TabsContent value="details" render={<DialogBody />} data-testid="run-panel-details">{details}</TabsContent>
              {hasHistory && (
                <TabsContent value="history" render={<DialogBody />} data-testid="run-panel-history">
                  <ul className="space-y-3">
                    {run.caseReviewHistory?.map((previous) => (
                      <li key={`case-${previous.number}`}>
                        <Disclosure testId={`case-review-history-${previous.number}`} label={`Draft revision ${previous.number} · Changes requested`}>
                          <DraftReviewRecord review={previous} />
                        </Disclosure>
                      </li>
                    ))}
                    {history?.map((previous) => (
                      <li key={previous.number}>
                        <Disclosure testId={`run-history-plan-${previous.number}`} label={`Plan ${previous.number} · ${previous.review?.decision ?? "not reviewed"} · superseded`}>
                          <Plan revision={previous} />
                        </Disclosure>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              )}
            </Tabs>
          ) : (
            <DialogBody tabIndex={0} role="region" aria-label="Run details" data-testid="run-panel-details">{details}</DialogBody>
          )}
          <DialogFooter data-testid="run-dialog-footer">
            {!run.sample && <ButtonLink data-testid="run-to-playwright" variant="outline" href={`/playwright?run=${encodeURIComponent(run.id)}`}>
              Prepare Playwright handoff
            </ButtonLink>}
            <DialogClose data-testid="run-dismiss" render={<Button variant="outline" />}>Close</DialogClose>
            {run.status === "queued" && (
              <Button data-testid="run-cancel" variant="destructive" onClick={handleCancelRun} disabled={cancelling}>
                Cancel run
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}

function RunList({
  runs,
  agents,
  history = runs,
  activity = {},
  showNextAction = false,
  emptyMessage = "Saved assignments will appear here.",
}: {
  runs: Run[];
  agents: Agent[];
  history?: Run[];
  activity?: LiveCodexRuns;
  showNextAction?: boolean;
  emptyMessage?: string;
}) {
  if (runs.length === 0) {
    return (
      <div data-testid="run-list-empty" className="flex items-center gap-3 p-5 text-sm text-muted-foreground">
        <ActivityIcon aria-hidden="true" className="size-4 shrink-0" />
        {emptyMessage}
      </div>
    );
  }

  const agentsById = new Map(agents.map((agent) => [agent.id, agent]));
  const runsById = new Map(history.map((run) => [run.id, run]));
  return (
    <ul data-testid="run-list" className="divide-y">
      {runs.map((run) => (
        <RunRow
          key={run.id}
          run={run}
          agent={agentsById.get(run.agentId)}
          previousRun={runsById.get(run.sourceRunId)}
          activity={activity}
          showNextAction={showNextAction}
        />
      ))}
    </ul>
  );
}

export function RunHistory({ title, actions, showCount, testId, ...list }: ComponentProps<typeof RunList> & {
  title: string;
  actions?: ReactNode;
  showCount?: boolean;
  testId: string;
}) {
  const headingId = useId();

  return (
    <Card className="gap-0 py-0">
      <section data-testid={testId} aria-labelledby={headingId}>
        <header className="flex flex-wrap items-center justify-between gap-3 border-b p-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 id={headingId} className="font-semibold tracking-tight">{title}</h2>
            {showCount && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground" aria-live="polite">
                {list.runs.length} {list.runs.length === 1 ? "run" : "runs"}
              </span>
            )}
          </div>
          {actions}
        </header>
        <RunList {...list} />
      </section>
    </Card>
  );
}
