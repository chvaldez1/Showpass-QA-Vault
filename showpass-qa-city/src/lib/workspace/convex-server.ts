import "server-only";

import { z } from "zod";
import { savedCodexHandoffToken } from "../codex/handoff";
import { savedDraftExecutionToken } from "../execution/authorization";
import { convexReadSchema, type WorkspaceEntry } from "./convex-schema";
import type { Revision } from "./qa-workflow";
import { workspaceVersionSchema, type WorkspaceVersion } from "./shared-schema";
import type { Workspace } from "./schema";

function endpoint() {
  const address = process.env.QA_CITY_CONVEX_SITE_URL;
  const secret = process.env.QA_CITY_CONVEX_SECRET;
  if (!address && !secret) return;
  if (!address || !secret || secret.length < 32) throw new Error("Complete the QA City Convex configuration.");
  const url = new URL(address);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if ((url.protocol !== "https:" && !(local && url.protocol === "http:")) || url.username || url.password) {
    throw new Error("Use an HTTPS or loopback Convex site URL.");
  }
  return { url: new URL("/qa-city/workspace", url.origin), secret };
}

export function usesConvex() {
  return Boolean(endpoint());
}

async function request(payload: object) {
  const config = endpoint();
  if (!config) throw new Error("Configure QA City Convex storage.");
  return fetch(config.url, {
    method: "POST", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(10_000),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.secret}` },
    body: JSON.stringify(payload),
  });
}

let saved: WorkspaceVersion | undefined;

export async function loadConvexWorkspace() {
  const previous = saved;
  const response = await request({ action: "read", since: previous?.version });
  if (!response.ok) throw new Error("Convex could not load the QA City workspace.");
  const data = convexReadSchema.parse(await response.json());
  if (data.status === "empty") {
    saved = undefined;
    return undefined;
  }
  if (data.status === "unchanged" && previous) return previous;
  if (data.status !== "ready") throw new Error("Convex returned an unexpected workspace response.");

  const { agents, runs, releases } = splitEntries(data.entries);
  const snapshot = workspaceVersionSchema.parse({
    version: data.version, recoveredHandoffs: true,
    workspace: { agents, runs, releases, qaVenue: data.qaVenue, qaAccounts: data.qaAccounts },
  });
  snapshot.workspace.runs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  saved = snapshot;
  return snapshot;
}

function splitEntries(entries: WorkspaceEntry[]) {
  const agents: unknown[] = [];
  const runs: unknown[] = [];
  const releases: unknown[] = [];
  for (const { kind, payload } of entries) {
    const value: unknown = JSON.parse(payload);
    if (kind === "agent") agents.push(value);
    if (kind === "run") runs.push(value);
    if (kind === "release") releases.push(value);
  }
  return { agents, runs, releases: releases.reverse() };
}

function removeExecutionTokens(revision: Revision): Revision {
  const { executionToken, codexHandoffToken, ...rest } = revision;
  return {
    ...rest,
    executionKind: codexHandoffToken ? "codex" : executionToken ? "playwright" : rest.executionKind,
  };
}

function entriesFor(workspace: Workspace): WorkspaceEntry[] {
  const { agents, runs, releases } = workspace;
  return [
    ...agents.map((agent): WorkspaceEntry => ({ kind: "agent", key: agent.id, payload: JSON.stringify(agent) })),
    ...runs.map((run): WorkspaceEntry => ({
      kind: "run", key: run.id,
      payload: JSON.stringify({
        ...run,
        revision: run.revision && removeExecutionTokens(run.revision),
        revisionHistory: run.revisionHistory?.map(removeExecutionTokens),
      }),
    })),
    ...[...releases].reverse().map((release): WorkspaceEntry => ({
      kind: "release", key: release.id, payload: JSON.stringify(release),
    })),
  ];
}

const entryId = ({ kind, key }: Pick<WorkspaceEntry, "kind" | "key">) => `${kind}:${key}`;

export async function commitConvexWorkspace(next: WorkspaceVersion, previous?: WorkspaceVersion) {
  const before = new Map(previous ? entriesFor(previous.workspace).map((entry) => [entryId(entry), entry]) : []);
  const upserts = entriesFor(next.workspace).filter((entry) => {
    const id = entryId(entry);
    const old = before.get(id);
    before.delete(id);
    return old?.payload !== entry.payload;
  });
  const response = await request({
    action: "commit", expectedVersion: previous?.version ?? null, version: next.version,
    qaVenue: next.workspace.qaVenue, qaAccounts: next.workspace.qaAccounts,
    upserts, removed: [...before.values()].map(({ kind, key }) => ({ kind, key })),
  });
  if (response.status === 409) return false;
  if (response.status !== 204) throw new Error("Convex could not save the QA City workspace.");
  return true;
}

export async function withLocalExecutionTokens(snapshot: WorkspaceVersion): Promise<WorkspaceVersion> {
  const runs = await Promise.all(snapshot.workspace.runs.map(async (run) => {
    const { revision } = run;
    if (!revision?.executionKind || revision.review?.decision !== "approved" || run.changeRequest ||
      !z.uuid().safeParse(run.id).success) return run;
    const token = revision.executionKind === "codex"
      ? { codexHandoffToken: await savedCodexHandoffToken(run.id, revision.number) }
      : { executionToken: await savedDraftExecutionToken(run.id, revision.number) };
    return { ...run, revision: { ...revision, ...token } };
  }));
  return { ...snapshot, workspace: { ...snapshot.workspace, runs } };
}
