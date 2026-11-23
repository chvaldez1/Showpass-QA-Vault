"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { codexHandoffStatusSchema, codexStatusLabels, isCodexPending, type CodexHandoffStatus } from "@/lib/codex/handoff-schema";

import { CodexActivity } from "./codex-activity";

async function requestHandoff(payload: object, signal?: AbortSignal) {
  const response = await fetch("/api/codex-handoff", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal,
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || !body) throw new Error(body?.error ?? "City couldn’t check the paired Codex chat.");
  return codexHandoffStatusSchema.parse(body.result);
}

function errorMessage(cause: unknown) {
  return cause instanceof Error ? cause.message : "City couldn’t check the paired Codex chat.";
}

export function CodexHandoff({ runId, revision, token, disabled }: {
  runId: string;
  revision: number;
  token: string;
  disabled: boolean;
}) {
  const [authorized, setAuthorized] = useState(false);
  const [result, setResult] = useState<CodexHandoffStatus>();
  const [error, setError] = useState("");
  const [refreshError, setRefreshError] = useState("");
  const [launching, setLaunching] = useState(false);
  const [check, setCheck] = useState(0);

  useEffect(() => {
    if (launching) return;

    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function refresh() {
      try {
        const next = await requestHandoff({ action: "status", runId, revision, token }, controller.signal);
        if (controller.signal.aborted) return;
        setResult(next);
        setRefreshError("");
        if (isCodexPending(next.status)) timer = setTimeout(refresh, 4000);
      } catch (cause) {
        if (!controller.signal.aborted) {
          setRefreshError(errorMessage(cause));
          timer = setTimeout(refresh, 6000);
        }
      }
    }

    void refresh();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [runId, revision, token, check, launching]);

  async function launch() {
    if (!authorized || result?.status !== "ready") return;
    setLaunching(true);
    setError("");

    try {
      const send = () => requestHandoff({ action: "launch", runId, revision, token, authorized: true });
      const next = navigator.locks
        ? await navigator.locks.request(`qa-city-work:${runId}`, { ifAvailable: true }, (lock) => {
          if (!lock) throw new Error("This assignment is already running in another tab.");
          return send();
        })
        : await send();
      setResult(next);
      setAuthorized(false);
    } catch (cause) {
      setError(errorMessage(cause));
      setAuthorized(false);
    } finally {
      setLaunching(false);
    }
  }

  return (
    <div className="grid gap-2">
      {launching && <p role="status">Sending Plan {revision} to Codex…</p>}
      {!launching && result && <p role="status" className="font-medium">{codexStatusLabels[result.status]}</p>}
      {(error || refreshError) && <p role="alert" className="text-destructive">{error || refreshError}</p>}
      {result?.status === "ready" && (
        <>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-0.5 size-4 accent-primary"
              checked={authorized} onChange={(event) => setAuthorized(event.target.checked)} />
            I authorize the actions and data changes in Plan {revision} in the paired Codex chat.
          </label>
          <Button className="justify-self-start" disabled={disabled || launching || !authorized} onClick={launch}>
            Run in Codex
          </Button>
        </>
      )}
      {result?.status === "unknown" && (
        <p className="text-muted-foreground">Check the paired chat for this plan before sending another assignment.</p>
      )}
      {(result || refreshError) && (
        <div className="flex flex-wrap items-center gap-2">
          {result && <a href={`codex://threads/${result.threadId}`} className={buttonVariants({ variant: "outline" })}>View paired chat</a>}
          {(refreshError || isCodexPending(result?.status)) && <Button variant="outline" onClick={() => setCheck((value) => value + 1)}>Refresh Codex status</Button>}
        </div>
      )}
      {result && result.status !== "ready" && <CodexActivity result={result} limit={40} />}
      {result?.status === "completed" && <p className="text-xs text-muted-foreground">Review the evidence before recording a browser outcome.</p>}
    </div>
  );
}
