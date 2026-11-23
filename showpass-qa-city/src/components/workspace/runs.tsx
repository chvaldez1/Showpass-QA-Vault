"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";
import { useLiveCodexRuns } from "@/hooks/use-live-codex-runs";
import { codexRevision } from "@/lib/workspace/shared-schema";
import { useWorkspace } from "@/hooks/use-workspace";
import { runStatuses, type RunStatus } from "@/lib/workspace/schema";
import { LiveCodexActivity, runFilterStatus } from "./codex-activity";
import { NewRunDialog } from "./new-run-dialog";
import { PageHeader } from "./page-header";
import { RunHistory, statusDisplay } from "./run-list";

const statusOptions = [
  { value: "all" as const, label: "All statuses" },
  ...runStatuses.map((value) => ({ value, label: statusDisplay[value].label })),
];

export function Runs() {
  const { runs, agents } = useWorkspace();
  const [filter, setFilter] = useState<RunStatus | "all">("all");
  const { activity, disconnected } = useLiveCodexRuns(runs.some((run) => Boolean(codexRevision(run))));
  const visibleRuns = filter === "all" ? runs : runs.filter((run) => runFilterStatus(run, activity) === filter);

  return (
    <>
      <PageHeader
        testId="runs-page"
        title="Runs"
        description="Follow live Codex activity and review saved assignments."
        actions={<NewRunDialog agents={agents} runs={runs} className="h-10 px-4" />}
      />
      <LiveCodexActivity runs={runs} activity={activity} disconnected={disconnected} />
      <RunHistory
        testId="runs-history"
        title="Run history"
        showCount
        runs={visibleRuns}
        agents={agents}
        history={runs}
        activity={activity}
        emptyMessage={filter === "all" ? undefined : "No runs match this status."}
        actions={(
          <Select
            data-testid="runs-status-filter"
            aria-label="Filter runs by status"
            value={filter}
            onValueChange={setFilter}
            options={statusOptions}
            className="h-9 w-full sm:w-44"
          />
        )}
      />
    </>
  );
}
