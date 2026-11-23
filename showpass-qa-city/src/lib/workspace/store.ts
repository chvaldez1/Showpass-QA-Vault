import { workspaceVersionSchema, type WorkspaceVersion } from "./shared-schema";
import { demoWorkspace } from "./demo";
import { normalizeWorkspace } from "./normalize";
import {
  agentFormSchema,
  runFormSchema,
  workspaceSchema,
  type AgentFormValues,
  type RunFormValues,
  type Run,
  type Workspace,
} from "./schema";
import { isMatchingBetaPreview } from "./builder-result";
import type { DraftExecutionResult } from "./event-draft";
import {
  browserResultSchema, getPlanReviewMode, getQaWorkflow, isPlanReviewReady, planStageSchemas, shortReviewSchema,
  type LeadDecision, type Revision,
} from "./qa-workflow";
import {
  canRunEngineeringStage, canRunReleaseStage, releaseDecisionMatchesEvidence,
  releaseDecisionSchema, releaseInputSchema, stageSchemas, type EngineeringStage, type ReleaseInput, type ReleaseStage,
} from "./release";

const storageKey = "showpass-qa-city:workspace:v1";
const workspaceListeners = new Set<() => void>();
let activeSnapshot: WorkspaceVersion | undefined;
let snapshotText: string | undefined;
let initialized = false;
let initialLoad: Promise<WorkspaceVersion> | undefined;
let pollTimer: ReturnType<typeof setTimeout> | undefined;
let watchGeneration = 0;

function readBrowserWorkspace() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

export function readWorkspaceSnapshot() {
  return snapshotText ?? readBrowserWorkspace();
}

export function decodeWorkspace(snapshot: string | null): Workspace {
  if (snapshot === null) return demoWorkspace;

  try {
    const result = workspaceSchema.safeParse(JSON.parse(snapshot));
    if (!result.success) return demoWorkspace;
    return normalizeWorkspace({
      ...result.data,
      runs: result.data.runs.map((run) =>
        /^demo-10[1-4]$/.test(run.id) ? { ...run, sample: true } : run,
      ),
    });
  } catch {
    return demoWorkspace;
  }
}

function publish(snapshot: WorkspaceVersion) {
  if (activeSnapshot && activeSnapshot.version > snapshot.version) return;
  if (activeSnapshot?.version === snapshot.version) return;

  activeSnapshot = snapshot;
  snapshotText = JSON.stringify(snapshot.workspace);
  for (const listener of workspaceListeners) listener();
}

async function loadWorkspace() {
  const suffix = activeSnapshot ? `?since=${activeSnapshot.version}` : "";
  const response = await fetch(`/api/workspace${suffix}`, { cache: "no-store" });
  if (response.status === 204 && activeSnapshot) return activeSnapshot;
  if (!response.ok) throw new Error("City couldn’t load the shared workspace.");

  const snapshot = workspaceVersionSchema.parse(await response.json());
  publish(snapshot);
  return activeSnapshot ?? snapshot;
}

async function sendWorkspace(payload: object) {
  const response = await fetch("/api/workspace", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok && response.status !== 409) throw new Error("City couldn’t save the shared workspace.");
  const snapshot = workspaceVersionSchema.parse(await response.json());
  publish(snapshot);
  return { conflict: response.status === 409, snapshot: activeSnapshot ?? snapshot };
}

function initializeWorkspace() {
  if (initialized) return loadWorkspace();
  initialLoad ??= (async () => {
    const stored = readBrowserWorkspace();
    const snapshot = stored
      ? (await sendWorkspace({ action: "import", workspace: decodeWorkspace(stored) })).snapshot
      : await loadWorkspace();
    initialized = true;
    return snapshot;
  })().finally(() => { initialLoad = undefined; });
  return initialLoad;
}

async function watchWorkspace(generation: number) {
  try {
    await initializeWorkspace();
  } catch {
    // Existing data stays visible while a subsequent attempt reconnects.
  } finally {
    if (generation === watchGeneration) pollTimer = setTimeout(() => void watchWorkspace(generation), 2500);
  }
}

export function subscribeToWorkspace(listener: () => void) {
  workspaceListeners.add(listener);
  if (workspaceListeners.size === 1) void watchWorkspace(++watchGeneration);
  return () => {
    workspaceListeners.delete(listener);
    if (workspaceListeners.size === 0) {
      watchGeneration++;
      clearTimeout(pollTimer);
    }
  };
}

async function updateWorkspace(update: (workspace: Workspace) => Workspace) {
  let current = await initializeWorkspace();
  for (let attempt = 0; attempt < 4; attempt++) {
    const saved = await sendWorkspace({
      action: "replace", version: current.version, workspace: update(current.workspace),
    });
    if (!saved.conflict) return;
    current = saved.snapshot;
  }
  throw new Error("The shared workspace changed during this save. Retry the action.");
}

export function addAgent(input: AgentFormValues) {
  const agent = agentFormSchema.parse(input);
  return updateWorkspace((workspace) => {
    const name = agent.name.toLowerCase();
    if (workspace.agents.some((existing) => existing.name.toLowerCase() === name)) {
      throw new Error("An agent with this name already exists.");
    }

    return {
      ...workspace,
      agents: [...workspace.agents, { ...agent, id: crypto.randomUUID() }],
    };
  });
}

export function queueRun(input: RunFormValues) {
  const run = runFormSchema.parse(input);
  return updateWorkspace((workspace) => {
    const agent = workspace.agents.find(({ id }) => id === run.agentId);
    if (!agent) {
      throw new Error("Choose an agent from the current workspace.");
    }

    const previousRun = workspace.runs.find(({ id }) => id === run.sourceRunId);
    if (run.sourceRunId && !previousRun) {
      throw new Error("The handoff run is no longer in the workspace.");
    }

    return {
      ...workspace,
      runs: [
        {
          ...run,
          builderWorkflow: agent.role === "organizer-builder" ? run.builderWorkflow : undefined,
          workflow: getQaWorkflow(agent.role ?? agent.id, run.title, run.builderWorkflow),
          target: run.target || previousRun?.target || "",
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          status: "queued",
          sample: false,
        },
        ...workspace.runs,
      ],
    };
  });
}

export function cancelRun(id: string) {
  return updateWorkspace((workspace) => {
    const run = workspace.runs.find((entry) => entry.id === id);
    if (run?.status !== "queued") throw new Error("This run can no longer be cancelled.");

    return {
      ...workspace,
      runs: workspace.runs.map((entry) =>
        entry.id === id ? { ...entry, status: "cancelled" } : entry,
      ),
    };
  });
}

export function saveRelease(input: ReleaseInput, previous?: { id: string; number: number }) {
  const data = releaseInputSchema.parse(input);
  return updateWorkspace((workspace) => {
    if (!previous) {
      const release = { id: crypto.randomUUID(), current: { number: 1, input: data }, history: [] };
      return { ...workspace, releases: [release, ...workspace.releases] };
    }
    const release = workspace.releases.find(({ id }) => id === previous.id);
    if (!release || release.current.number !== previous.number) throw new Error("Open the latest revision before editing.");
    const next = {
      ...release,
      current: { number: previous.number + 1, input: data },
      history: [...release.history, release.current],
    };
    return { ...workspace, releases: workspace.releases.map((entry) => entry.id === previous.id ? next : entry) };
  });
}

export function saveReleaseStage(id: string, number: number, stage: ReleaseStage, value: unknown) {
  const result = stageSchemas[stage].parse(value);
  return updateWorkspace((workspace) => {
    const release = workspace.releases.find((entry) => entry.id === id);
    const current = release?.current;
    if (!current || current.number !== number || !canRunReleaseStage(stage, current)) {
      throw new Error("This stage is no longer open for the current revision.");
    }
    if (stage === "lead" && !releaseDecisionMatchesEvidence(current, releaseDecisionSchema.parse(result))) {
      throw new Error("The release recommendation conflicts with the required test evidence.");
    }
    const next = { ...release, current: { ...current, [stage]: result } };
    return { ...workspace, releases: workspace.releases.map((entry) => entry.id === id ? next : entry) };
  });
}

function updateRun(id: string, revise: (run: Run) => Run) {
  return updateWorkspace((workspace) => {
    const run = workspace.runs.find((entry) => entry.id === id);
    const editableDraft = run?.reviewMode === "draft" && run.status === "completed";
    if (!run || run.sample || (!editableDraft && !["queued", "needs-input"].includes(run.status))) {
      throw new Error("This assignment is no longer open.");
    }
    const next = revise(run);
    return { ...workspace, runs: workspace.runs.map((entry) => entry.id === id ? next : entry) };
  });
}

function assertCurrentRevision(run: Run, number: number) {
  if ((run.revision?.number ?? 0) !== number) {
    throw new Error("The assignment changed in another tab. Open its current revision.");
  }
}

export function requestRevision(id: string, number: number, change: string, requireFullReview = false) {
  return updateRun(id, (run) => {
    assertCurrentRevision(run, number);
    return {
      ...run, status: "queued", changeRequest: change,
      reviewMode: requireFullReview && run.reviewMode === "short" ? "full" : run.reviewMode,
    };
  });
}

export function saveProposal(id: string, revision: Revision) {
  return updateRun(id, (run) => {
    assertCurrentRevision(run, revision.number - 1);
    if (revision.change !== (run.changeRequest ?? "") ||
      revision.workflow !== (run.workflow ?? getQaWorkflow(run.agentId, run.title, run.builderWorkflow))) {
      throw new Error("The assignment scope changed. Reload the assignment and try again.");
    }
    return {
      ...run,
      revision,
      revisionHistory: run.revision ? [...(run.revisionHistory ?? []), run.revision] : undefined,
      changeRequest: undefined,
      status: run.reviewMode === "draft" ? "completed" : "queued",
    };
  });
}

export function saveReview(id: string, number: number, review: LeadDecision, executionToken?: string, codexHandoffToken?: string) {
  return updateRun(id, (run) => {
    assertCurrentRevision(run, number);
    if (!run.revision || !isPlanReviewReady(run.reviewMode, run.revision) || run.changeRequest || run.revision.review) {
      throw new Error("Complete the required review on the current live plan first.");
    }
    return {
      ...run,
      revision: { ...run.revision, review, executionToken, codexHandoffToken },
      status: review.decision === "approved" ? "needs-input" : "queued",
    };
  });
}

export function saveDraftExecution(id: string, number: number, result: DraftExecutionResult) {
  return updateRun(id, (run) => {
    assertCurrentRevision(run, number);
    if (!run.revision?.executionToken || run.revision.review?.decision !== "approved" || run.changeRequest) {
      throw new Error("Record results against the current approved plan.");
    }
    return {
      ...run,
      status: result.outcome === "passed" ? "completed" : "needs-input",
      revision: { ...run.revision, draftExecution: result },
      browserResult: result.outcome === "passed"
        ? { outcome: result.outcome, summary: result.summary, preview: "", records: result.records }
        : undefined,
    };
  });
}

export function saveShortReview(id: string, number: number, value: unknown) {
  const shortReview = shortReviewSchema.parse(value);
  return updateRun(id, (run) => {
    assertCurrentRevision(run, number);
    const { revision } = run;
    if (!revision || run.changeRequest || revision.review || revision.shortReview ||
      getPlanReviewMode(run.reviewMode, revision) !== "short") {
      throw new Error("This plan is no longer waiting for short review.");
    }
    return { ...run, revision: { ...revision, shortReview } };
  });
}

export function savePlanStage(id: string, number: number, stage: EngineeringStage, value: unknown) {
  const result = planStageSchemas[stage].parse(value);
  return updateRun(id, (run) => {
    assertCurrentRevision(run, number);
    if (!run.revision || run.revision.review || run.changeRequest ||
      getPlanReviewMode(run.reviewMode, run.revision) !== "full" || !canRunEngineeringStage(stage, run.revision.engineering)) {
      throw new Error("This review stage is no longer open for the current plan.");
    }
    return { ...run, revision: { ...run.revision, engineering: { ...run.revision.engineering, [stage]: result } } };
  });
}

export function saveBrowserResult(id: string, number: number, values: Run["browserResult"]) {
  const browserResult = browserResultSchema.parse(values);
  return updateWorkspace((workspace) => {
    const run = workspace.runs.find((entry) => entry.id === id);
    if (run?.status !== "needs-input" || run.changeRequest || run.revision?.number !== number ||
      !isPlanReviewReady(run.reviewMode, run.revision) || run.revision.review?.decision !== "approved") {
      throw new Error("Record results against the current approved plan.");
    }

    const eventBuild = run.revision.workflow === "event-builder";
    const offeringBuild = run.revision.workflow === "offering-builder";
    const completed = browserResult.outcome === "passed";
    if (completed && (eventBuild || offeringBuild) && !browserResult.records?.length) {
      throw new Error("Add the verified Showpass records before marking the build passed.");
    }

    if (completed && eventBuild) {
      const records = browserResult.records?.filter((entry) => entry.kind === "event");
      if (records?.length !== 1 || !records[0].record.tickettype_set?.length) {
        throw new Error("Add one saved Event with its ticket types for the Public Tester.");
      }
      if (!isMatchingBetaPreview(browserResult.preview, records[0].record.slug)) {
        throw new Error("Enter the beta Preview URL for the saved Event’s slug.");
      }
    }
    if (completed && offeringBuild && !browserResult.records?.some(({ kind }) => kind === "product" || kind === "membership_group")) {
      throw new Error("Add the saved Product or Membership Group for this assignment.");
    }

    const status = {
      passed: "completed", failed: "failed", blocked: "needs-input", "not-run": "needs-input",
    } as const;
    const runs = workspace.runs.map((entry): Run => entry.id === id
      ? { ...entry, browserResult, status: status[browserResult.outcome] } : entry);

    if (eventBuild && completed) {
      runs.unshift({
        id: crypto.randomUUID(),
        agentId: "public-tester",
        title: `Check Event Preview: ${run.title}`.slice(0, 100),
        instructions: "Use the authorized Draft Preview session. Review the page as a buyer and compare the visible Event and ticket details with the builder’s saved records. Stop at Preview with zero tickets selected.",
        target: browserResult.preview,
        sourceRunId: run.id,
        mode: run.mode,
        reviewMode: "short",
        createdAt: new Date().toISOString(),
        status: "queued",
        sample: false,
      });
    }
    return { ...workspace, runs };
  });
}
