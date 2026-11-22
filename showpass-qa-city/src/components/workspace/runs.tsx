"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { useWorkspace } from "@/hooks/use-workspace";
import { runStatuses, type RunStatus } from "@/lib/workspace/schema";
import { NewRunDialog } from "./new-run-dialog";
import { PageHeader } from "./page-header";
import { RunList, statusDisplay } from "./run-list";

export function Runs() {
  const { runs, agents } = useWorkspace();
  const [filter, setFilter] = useState<RunStatus | "all">("all");
  const visibleRuns = filter === "all" ? runs : runs.filter(({ status }) => status === filter);

  return (
    <>
      <PageHeader
        title="Runs"
        description="Review saved assignments, sample results, and tester handoffs."
        actions={<NewRunDialog agents={agents} runs={runs} className="h-10 px-4" />}
      />
      <Card className="gap-0 py-0">
        <section aria-labelledby="run-history">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 id="run-history" className="text-base font-semibold tracking-tight">Run history</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground" aria-live="polite">
                {visibleRuns.length} {visibleRuns.length === 1 ? "run" : "runs"}
              </span>
            </div>
            <Select
              aria-label="Filter runs by status"
              value={filter}
              onChange={(event) => setFilter(event.target.value as RunStatus | "all")}
              className="h-9"
            >
              <option value="all">All statuses</option>
              {runStatuses.map((status) => (
                <option key={status} value={status}>{statusDisplay[status].label}</option>
              ))}
            </Select>
          </div>
          <RunList
            runs={visibleRuns}
            agents={agents}
            history={runs}
            emptyMessage={filter === "all" ? undefined : "No runs match this status."}
          />
        </section>
      </Card>
    </>
  );
}
