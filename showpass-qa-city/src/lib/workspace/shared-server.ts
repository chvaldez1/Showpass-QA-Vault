import "server-only";

import { readLocalState, writeLocalState } from "../execution/authorization";
import { recoverCodexRuns } from "../codex/handoff";
import { demoWorkspace } from "./demo";
import { commitConvexWorkspace, loadConvexWorkspace, usesConvex, withLocalExecutionTokens } from "./convex-server";
import { normalizeWorkspace } from "./normalize";
import { codexRevision, workspaceVersionSchema, type WorkspaceVersion } from "./shared-schema";
import type { Workspace } from "./schema";
import { z } from "zod";

const stateFile = "workspace.json";
const runtime = globalThis as typeof globalThis & { qaCityWorkspaceWrite?: Promise<unknown> };

function normalize(workspace: Workspace): Workspace {
  const normalized = normalizeWorkspace(workspace);
  normalized.runs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return normalized;
}

async function exclusive<T>(work: () => Promise<T>) {
  const next = (runtime.qaCityWorkspaceWrite ?? Promise.resolve()).then(work);
  runtime.qaCityWorkspaceWrite = next.catch(() => undefined);
  return next;
}

async function loadSavedWorkspace() {
  const saved = await readLocalState(stateFile);
  return saved === undefined ? undefined : workspaceVersionSchema.parse(saved);
}

function upgraded(snapshot: WorkspaceVersion | undefined) {
  return snapshot?.recoveredHandoffs &&
    snapshot.workspace.agents.some(({ id }) => id === "organizer-builder") &&
    !snapshot.workspace.runs.some(({ agentId, workflow }) => agentId === "organizer-tester" && !workflow);
}

async function readFileWorkspace() {
  const saved = await loadSavedWorkspace();
  if (saved && upgraded(saved)) return saved;

  return exclusive(async () => {
    const current = await loadSavedWorkspace();
    if (current && upgraded(current)) return current;

    const workspace = current?.workspace ?? demoWorkspace;
    const runs = new Map(workspace.runs.map((run) => [run.id, run]));
    for (const recovered of current?.recoveredHandoffs ? [] : await recoverCodexRuns()) {
      const existing = runs.get(recovered.id);
      if (!existing) {
        runs.set(recovered.id, recovered);
      } else if (!existing.revision && !codexRevision(existing)) {
        runs.set(existing.id, { ...existing, recoveredCodexRevision: recovered.recoveredCodexRevision });
      }
    }
    const snapshot: WorkspaceVersion = {
      version: current ? current.version + 1 : 0,
      workspace: normalize({ ...workspace, runs: [...runs.values()] }),
      recoveredHandoffs: true,
    };
    await writeLocalState(stateFile, snapshot);
    return snapshot;
  });
}

async function readConvexOrMigrate() {
  const saved = await loadConvexWorkspace();
  if (saved) return saved;

  const local = await readFileWorkspace();
  await commitConvexWorkspace(local);
  const migrated = await loadConvexWorkspace();
  if (!migrated) throw new Error("Convex could not initialize the QA City workspace.");
  return migrated;
}

export async function readSharedWorkspace() {
  return usesConvex() ? withLocalExecutionTokens(await readConvexOrMigrate()) : readFileWorkspace();
}

function mergeBrowserWorkspace(current: Workspace, browser: Workspace) {
  const agents = new Map(current.agents.map((agent) => [agent.id, agent]));
  const runs = new Map(current.runs.map((run) => [run.id, run]));
  const releases = new Map(current.releases.map((release) => [release.id, release]));
  let changed = false;

  for (const agent of browser.agents) {
    if (agents.has(agent.id)) continue;
    agents.set(agent.id, agent);
    changed = true;
  }
  for (const run of browser.runs) {
    const saved = runs.get(run.id);
    if (run.sample || (saved && !saved.recoveredCodexRevision)) continue;
    if (saved?.recoveredCodexRevision && (run.revision?.number ?? 0) < saved.recoveredCodexRevision) continue;
    runs.set(run.id, run);
    changed = true;
  }
  for (const release of browser.releases) {
    if (releases.has(release.id)) continue;
    releases.set(release.id, release);
    changed = true;
  }
  if (!changed) return current;

  return { ...current, agents: [...agents.values()], runs: [...runs.values()], releases: [...releases.values()] };
}

export async function writeSharedWorkspace(input: {
  action: "import" | "replace";
  version?: number;
  workspace: Workspace;
}) {
  await readSharedWorkspace();
  return exclusive(async () => {
    const convex = usesConvex();
    const current = convex
      ? await loadConvexWorkspace()
      : workspaceVersionSchema.parse(await readLocalState(stateFile));
    if (!current) throw new Error("The workspace could not be loaded before saving.");
    if (input.action === "replace" && input.version !== current.version) {
      return { snapshot: convex ? await withLocalExecutionTokens(current) : current, conflict: true };
    }
    const workspace = input.action === "import" ? mergeBrowserWorkspace(current.workspace, input.workspace) : input.workspace;
    if (workspace === current.workspace) {
      return { snapshot: convex ? await withLocalExecutionTokens(current) : current, conflict: false };
    }

    const snapshot = { ...current, version: current.version + 1, workspace: normalize(workspace) };
    if (convex) {
      const committed = await commitConvexWorkspace(snapshot, current);
      const saved = await loadConvexWorkspace();
      if (!saved) throw new Error("The workspace could not be loaded after saving.");
      return { snapshot: await withLocalExecutionTokens(saved), conflict: !committed };
    }
    await writeLocalState(stateFile, snapshot);
    return { snapshot, conflict: false };
  });
}

const versionQuery = z.string().regex(/^\d{1,15}$/);

export function workspaceSince(request: Request) {
  const value = versionQuery.safeParse(new URL(request.url).searchParams.get("since"));
  return value.success ? Number(value.data) : undefined;
}
