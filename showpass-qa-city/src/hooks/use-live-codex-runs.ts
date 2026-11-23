"use client";

import { useEffect, useState } from "react";
import { liveCodexRunsSchema, type LiveCodexRuns } from "@/lib/codex/handoff-schema";

export function useLiveCodexRuns(enabled: boolean) {
  const [activity, setActivity] = useState<LiveCodexRuns>({});
  const [disconnected, setDisconnected] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let etag: string | undefined;

    async function refresh() {
      try {
        const response = await fetch("/api/run-activity", {
          cache: "no-store", signal: controller.signal,
          headers: etag ? { "If-None-Match": etag } : undefined,
        });
        if (controller.signal.aborted) return;
        if (response.status !== 304) {
          if (!response.ok) throw new Error("Couldn’t refresh Codex activity.");
          const next = liveCodexRunsSchema.parse(await response.json());
          if (controller.signal.aborted) return;
          setActivity(next);
          etag = response.headers.get("etag") ?? undefined;
        }
        setDisconnected(false);
      } catch {
        if (!controller.signal.aborted) setDisconnected(true);
      } finally {
        if (!controller.signal.aborted) timer = setTimeout(refresh, 3500);
      }
    }

    void refresh();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [enabled]);

  return { activity, disconnected };
}
