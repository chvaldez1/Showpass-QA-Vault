"use client";

import { ActivityIcon, ChevronRightIcon } from "lucide-react";
import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { runModeLabels, type Agent, type Run, type RunStatus } from "@/lib/workspace/schema";
import { codexStatusLabels, type CodexHandoffStatus, type LiveCodexRuns } from "@/lib/codex/handoff-schema";
import { CodexActivity, liveStatus, runFilterStatus } from "./codex-activity";
import { cancelRun } from "@/lib/workspace/store";
import { QaAssignment } from "./qa-assignment";

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
    <Badge variant="secondary" className={className}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {codex ? codexStatusLabels[codex] : draftOnly && status === "completed" ? "Draft ready" : label}
    </Badge>
  );
}

function RunRow({ run, agent, previousRun, activity }: {
  run: Run; agent?: Agent; previousRun?: Run; activity: LiveCodexRuns;
}) {
  const [cancelling, setCancelling] = useState(false);
  const date = new Date(run.createdAt);
  const agentName = agent?.name ?? "Unknown agent";
  const draftOnly = run.reviewMode === "draft";
  const result = liveStatus(run, activity);
  const status = runFilterStatus(run, activity);
  const badge = result && run.status !== "completed" && run.status !== "failed" ? result.status : undefined;

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
    <li>
      <Dialog>
        <DialogTrigger
          render={<Button variant="ghost" />}
          className="group h-auto w-full justify-start gap-3 rounded-none px-4 py-3.5 text-left font-normal whitespace-normal hover:bg-muted/70 focus-visible:-outline-offset-2 sm:gap-4 sm:px-5"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{run.title}</span>
            <span className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              <span className="max-w-full truncate">{agentName}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={run.createdAt}>{shortDate.format(date)}</time>
              {run.sample && <span>· Sample</span>}
            </span>
          </span>
          <RunStatusBadge status={status} draftOnly={draftOnly} codex={badge} />
          <ChevronRightIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="leading-snug wrap-anywhere">{run.title}</DialogTitle>
            <DialogDescription>{run.sample ? "Sample run" : run.recoveredCodexRevision ? "Recovered Codex handoff" : "Shared City assignment"}</DialogDescription>
          </DialogHeader>
          <dl className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-lg border bg-background p-3">
            <dt className="text-muted-foreground">Agent</dt>
            <dd className="wrap-anywhere">{agentName}</dd>
            <dt className="text-muted-foreground">Status</dt>
            <dd><RunStatusBadge status={status} draftOnly={draftOnly} codex={badge} /></dd>
            <dt className="text-muted-foreground">Mode</dt>
            <dd>{draftOnly ? "Draft plan only" : runModeLabels[run.mode]}</dd>
            {run.target && (
              <>
                <dt className="text-muted-foreground">Test target</dt>
                <dd className="wrap-anywhere">{run.target}</dd>
              </>
            )}
            {run.sourceRunId && (
              <>
                <dt className="text-muted-foreground">Handoff from</dt>
                <dd className="wrap-anywhere">{previousRun?.title ?? "Previous run unavailable"}</dd>
              </>
            )}
            <dt className="text-muted-foreground">Created</dt>
            <dd><time dateTime={run.createdAt}>{fullDate.format(date)} UTC</time></dd>
          </dl>
          {run.instructions && (
            <div className="grid gap-1">
              <h3 className="text-sm font-medium">Instructions</h3>
              <p className="text-muted-foreground wrap-anywhere whitespace-pre-wrap">{run.instructions}</p>
            </div>
          )}
          {run.recoveredCodexRevision && result && <CodexActivity result={result} limit={40} />}
          {!run.recoveredCodexRevision && !run.sample && agent?.role && <QaAssignment run={run} role={agent.role} previousRun={previousRun} />}
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
            {run.status === "queued" && (
              <Button variant="destructive" onClick={handleCancelRun} disabled={cancelling}>
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
  emptyMessage = "Saved assignments will appear here.",
}: {
  runs: Run[];
  agents: Agent[];
  history?: Run[];
  activity?: LiveCodexRuns;
  emptyMessage?: string;
}) {
  if (runs.length === 0) {
    return (
      <div className="flex items-center gap-3 p-5 text-sm text-muted-foreground">
        <ActivityIcon aria-hidden="true" className="size-4 shrink-0" />
        {emptyMessage}
      </div>
    );
  }

  const agentsById = new Map(agents.map((agent) => [agent.id, agent]));
  const runsById = new Map(history.map((run) => [run.id, run]));
  return (
    <ul className="divide-y">
      {runs.map((run) => (
        <RunRow
          key={run.id}
          run={run}
          agent={agentsById.get(run.agentId)}
          previousRun={runsById.get(run.sourceRunId)}
          activity={activity}
        />
      ))}
    </ul>
  );
}

export function RunHistory({ title, actions, showCount, ...list }: ComponentProps<typeof RunList> & {
  title: string;
  actions?: ReactNode;
  showCount?: boolean;
}) {
  const headingId = useId();

  return (
    <Card className="gap-0 py-0">
      <section aria-labelledby={headingId}>
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
