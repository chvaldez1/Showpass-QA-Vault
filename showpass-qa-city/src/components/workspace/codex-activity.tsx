import { ActivityIcon, AppWindowIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Disclosure } from "@/components/ui/disclosure";
import { codexStatusLabels, isCodexPending, type CodexHandoffStatus, type LiveCodexRuns } from "@/lib/codex/handoff-schema";
import type { Run, RunStatus } from "@/lib/workspace/schema";
import { codexRevision } from "@/lib/workspace/shared-schema";

export function liveStatus(run: Run, activity: LiveCodexRuns) {
  const status = activity[run.id];
  return status?.revision === codexRevision(run) ? status : undefined;
}

export function runFilterStatus(run: Run, activity: LiveCodexRuns): RunStatus {
  const status = liveStatus(run, activity)?.status;
  if (status === "running") return "running";
  if (status === "queued" || status === "unknown") return "queued";
  return run.status;
}

export function CodexActivity({ result, limit = 10 }: {
  result: CodexHandoffStatus;
  limit?: number;
}) {
  const steps = result.activity?.slice(-limit) ?? [];
  return (
    <div className="grid gap-3">
      {steps.length > 0 && (
        <ol aria-label="Codex activity" className="grid gap-2 border-l pl-3">
          {steps.map((item) => (
            <li key={item.id} className="flex min-w-0 items-start gap-2 text-sm">
              {item.kind === "browser"
                ? <AppWindowIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                : <ActivityIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />}
              <span className="min-w-0 wrap-anywhere whitespace-pre-wrap">
                {item.text}
                {item.state === "failed" && <span className="ml-1 text-xs text-destructive">Failed</span>}
                {item.state === "running" && <span className="ml-1 text-xs text-muted-foreground">In progress</span>}
              </span>
            </li>
          ))}
        </ol>
      )}
      {steps.length === 0 && isCodexPending(result.status) && (
        <p className="text-sm text-muted-foreground">
          {result.status === "running" ? "Waiting for the first activity from Codex." : "Waiting for Codex to start this assignment."}
        </p>
      )}
      {result.text && !isCodexPending(result.status) && (
        <Disclosure label="Read Codex reply" className="rounded-lg border bg-background p-3">
          <pre className="max-h-84 overflow-auto font-sans text-sm wrap-anywhere whitespace-pre-wrap">{result.text}</pre>
        </Disclosure>
      )}
    </div>
  );
}

export function LiveCodexActivity({ runs, activity, disconnected }: {
  runs: Run[];
  activity: LiveCodexRuns;
  disconnected: boolean;
}) {
  const entries = runs.flatMap((run) => {
    const result = liveStatus(run, activity);
    return result ? [{ run, result }] : [];
  });
  const active = entries.filter(({ result }) => isCodexPending(result.status));
  const recent = entries.filter(({ result }) => !isCodexPending(result.status)).slice(0, 2);
  const visible = [...active, ...recent];
  if (!visible.length && !disconnected) return null;

  return (
    <Card className="gap-0 py-0">
      <section aria-labelledby="live-codex-activity">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b p-4 sm:px-5">
          <h2 id="live-codex-activity" className="flex items-center gap-2 font-semibold tracking-tight">
            <ActivityIcon aria-hidden="true" className="size-4 text-primary" />
            Codex activity
          </h2>
          {active.length > 0 && <span className="text-xs font-medium text-muted-foreground">{active.length} active</span>}
        </header>
        {disconnected && <p role="status" className="p-4 text-sm text-muted-foreground">Reconnecting to Codex activity…</p>}
        <ul className="divide-y">
          {visible.map(({ run, result }) => (
            <li key={run.id} className="grid gap-3 p-4 sm:px-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-medium wrap-anywhere">{run.title}</h3>
                <Badge variant={isCodexPending(result.status) ? "default" : "secondary"}>
                  {codexStatusLabels[result.status]}
                </Badge>
              </div>
              <CodexActivity result={result} limit={isCodexPending(result.status) ? 8 : 3} />
            </li>
          ))}
        </ul>
      </section>
    </Card>
  );
}
