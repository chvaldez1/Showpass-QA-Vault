import "server-only";

import { randomUUID } from "node:crypto";
import { CodexError } from "../codex/app-server";
import { advanceCaseReview, prepareCaseReview } from "../codex/case-review";
import { caseReviewSourceInput, caseTesterRole, nextCaseReviewStage, type CaseReview, type CaseReviewInput } from "./case-review";
import type { Run, Workspace } from "./schema";
import { readSharedWorkspace, writeSharedWorkspace } from "./shared-server";

const runtime = globalThis as typeof globalThis & { qaCityCaseReviewWorkers?: Map<string, AbortController> };
const workers = runtime.qaCityCaseReviewWorkers ??= new Map();

export class CaseReviewConflict extends Error {}

function leaseUntil() {
  // Draft preparation can take two Codex calls, each with a three-minute timeout.
  return new Date(Date.now() + 7 * 60_000).toISOString();
}

async function updateRun(id: string, update: (run: Run, workspace: Workspace) => Run | undefined) {
  let snapshot = await readSharedWorkspace();
  for (let attempt = 0; attempt < 4; attempt++) {
    const { version, workspace } = snapshot;
    const current = workspace.runs.find((run) => run.id === id);
    if (!current || current.sample || current.reviewMode !== "case-review") throw new CaseReviewConflict("Open a saved test case review assignment.");
    const next = update(current, workspace);
    if (!next) return;
    const saved = await writeSharedWorkspace({
      action: "replace", version,
      workspace: { ...workspace, runs: workspace.runs.map((run) => run.id === id ? next : run) },
    });
    if (!saved.conflict) return next;
    snapshot = saved.snapshot;
  }
  throw new CaseReviewConflict("The workspace changed while saving. Open the latest draft and retry.");
}

function workerOwnsRun(run: Run, workerId: string) {
  return run.status === "running" && run.caseReviewWorker?.id === workerId;
}

function revisionInput(run: Run): CaseReviewInput {
  return run.caseReviewWorker?.input ?? {
    existingDraft: "",
    backend: caseReviewSourceInput(run.caseReview, "backend"),
    frontend: caseReviewSourceInput(run.caseReview, "frontend"),
    clarification: run.caseReview?.clarification,
  };
}

export async function startCaseReview(runId: string, number: number, input?: CaseReviewInput) {
  const workerId = randomUUID();
  await updateRun(runId, (run, { agents }) => {
    const stage = nextCaseReviewStage(run.caseReview);
    if (!stage || !["queued", "needs-input", "running"].includes(run.status) || (run.caseReview?.number ?? 0) !== number) {
      throw new CaseReviewConflict("Open the current draft revision before starting review.");
    }
    if (run.status === "running" && Date.parse(run.caseReviewWorker?.leaseUntil ?? "") > Date.now()) {
      throw new CaseReviewConflict("City is already reviewing this assignment.");
    }
    if (!caseTesterRole.safeParse(agents.find(({ id }) => id === run.agentId)?.role).success) {
      throw new CaseReviewConflict("Choose a tester to own the test case draft.");
    }
    if (input && stage !== "draft") throw new CaseReviewConflict("Continue reviewing the saved revision before changing its cases or evidence.");
    return {
      ...run, status: "running", caseReviewWorker: {
        id: workerId, leaseUntil: leaseUntil(), input: stage === "draft" ? input ?? revisionInput(run) : undefined,
      },
    };
  });
  workers.get(runId)?.abort();
  const controller = new AbortController();
  workers.set(runId, controller);
  return () => runCaseReview(runId, workerId, controller);
}

export async function pauseCaseReview(runId: string, workerId: string) {
  const controller = workers.get(runId);
  await updateRun(runId, (run) => {
    if (!workerOwnsRun(run, workerId)) throw new CaseReviewConflict("Review has already moved on. Open its latest status.");
    return {
      ...run, status: "needs-input", caseReviewWorker: {
        ...run.caseReviewWorker!, leaseUntil: undefined, problem: "Review paused. Continue from the last saved stage.",
      },
    };
  });
  controller?.abort();
}

function reviewProblem(run: Run, review: CaseReview) {
  if (review.lead?.requiredInput?.length) return "The QA Lead needs more information before the tester can revise the draft.";
  if (review.lead?.stalled && run.caseReviewHistory?.length) return "The latest revision did not resolve the outstanding findings. Add guidance or new evidence to continue.";
}

async function runCaseReview(runId: string, workerId: string, controller: AbortController) {
  try {
    while (!controller.signal.aborted) {
      const { workspace } = await readSharedWorkspace();
      const run = workspace.runs.find(({ id }) => id === runId);
      if (!run || !workerOwnsRun(run, workerId)) return;
      const stage = nextCaseReviewStage(run.caseReview);
      if (!stage) return;
      const owner = caseTesterRole.parse(workspace.agents.find(({ id }) => id === run.agentId)?.role);
      const execute = () => stage === "draft"
        ? prepareCaseReview(run, owner, revisionInput(run), controller.signal)
        : advanceCaseReview(run, run.caseReview!, stage, controller.signal);
      const review = await execute().catch(async (cause: unknown) => {
        const retryable = cause instanceof CodexError && /took too long|didn’t return a finished response|returned an incomplete review/.test(cause.message);
        if (!retryable || controller.signal.aborted) throw cause;
        const current = await updateRun(runId, (saved) => workerOwnsRun(saved, workerId) ? {
          ...saved, caseReviewWorker: { ...saved.caseReviewWorker!, leaseUntil: leaseUntil() },
        } : undefined);
        if (!current || controller.signal.aborted) throw cause;
        return execute();
      });
      const problem = reviewProblem(run, review);
      const next = await updateRun(runId, (current) => {
        if (!workerOwnsRun(current, workerId) || controller.signal.aborted) return;
        const status = review.lead?.decision === "ready" ? "completed" : problem ? "needs-input" : "running";
        return {
          ...current, status, caseReview: review,
          caseReviewHistory: stage === "draft" && current.caseReview
            ? [...(current.caseReviewHistory ?? []), current.caseReview] : current.caseReviewHistory,
          caseReviewWorker: status === "completed" ? undefined : { id: workerId, problem, leaseUntil: status === "running" ? leaseUntil() : undefined },
        };
      });
      if (next?.status !== "running") return;
    }
  } catch (cause) {
    if (controller.signal.aborted) return;
    const problem = cause instanceof CodexError || cause instanceof CaseReviewConflict ? cause.message
      : "City couldn’t finish this review stage. Continue from the last saved result.";
    await updateRun(runId, (run) => workerOwnsRun(run, workerId) ? {
      ...run, status: "needs-input", caseReviewWorker: { ...run.caseReviewWorker!, leaseUntil: undefined, problem },
    } : undefined);
  } finally {
    if (workers.get(runId) === controller) workers.delete(runId);
  }
}
