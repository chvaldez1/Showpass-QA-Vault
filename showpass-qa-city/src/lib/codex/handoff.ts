import "server-only";

import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import { z } from "zod";
import { readLocalState, runtimeDirectory, writeLocalState } from "../execution/authorization";
import type { Run } from "../workspace/schema";
import { asBuilderWorkflow, inferBuilderWorkflow, qaWorkflows, type Revision } from "../workspace/qa-workflow";
import { checkCodexDispatchUsage, readCodexDispatch } from "./app-server";
import { codexHandoffStatusSchema, type CodexHandoffStatus } from "./handoff-schema";

const runCommand = promisify(execFile);

const approvalSchema = z.object({
  revision: z.number().int().positive(),
  token: z.uuid(),
  prompt: z.string().min(1),
  workflow: z.enum(qaWorkflows).optional(),
});
type Approval = z.infer<typeof approvalSchema>;

const receiptSchema = z.object({
  threadId: z.uuid(),
  marker: z.string(),
  queuedAt: z.iso.datetime(),
  acknowledged: z.boolean(),
  result: codexHandoffStatusSchema.optional(),
});

type Receipt = z.infer<typeof receiptSchema>;

export class HandoffError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

const approvalFile = (runId: string) => `codex-approval-${runId}.json`;
const receiptFile = (runId: string, revision: number) => `codex-dispatch-${runId}-${revision}.json`;

export async function saveApprovedCodexHandoff(runId: string, revision: number, workflow: Revision["workflow"], prompt: string) {
  const token = randomUUID();
  await writeLocalState(approvalFile(runId), { revision, token, prompt, workflow });
  return token;
}

async function readApproval(runId: string, revision: number) {
  const parsed = approvalSchema.safeParse(await readLocalState(approvalFile(runId)));
  return parsed.success && parsed.data.revision === revision ? parsed.data : undefined;
}

export async function savedCodexHandoffToken(runId: string, revision: number) {
  return (await readApproval(runId, revision))?.token;
}

async function readReceipt(runId: string, revision: number) {
  const value = await readLocalState(receiptFile(runId, revision));
  return value === undefined ? undefined : receiptSchema.parse(value);
}

async function reserveDispatch(runId: string, revision: number, receipt: Receipt) {
  const directory = runtimeDirectory();
  await mkdir(/* turbopackIgnore: true */ directory, { recursive: true, mode: 0o700 });
  try {
    await writeFile(/* turbopackIgnore: true */ join(directory, receiptFile(runId, revision)),
      JSON.stringify(receipt), { flag: "wx", mode: 0o600 });
    return true;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "EEXIST") return false;
    throw error;
  }
}

export function getOrganizerCodexThread(role: string) {
  if (role === "organizer-builder") return z.uuid().safeParse(process.env.QA_CITY_ORGANIZER_CODEX_THREAD_ID).data;
  if (role === "organizer-tester") return z.uuid().safeParse(process.env.QA_CITY_ORGANIZER_TESTER_CODEX_THREAD_ID).data;
}

function approvalWorkflow(approval: Approval, title = "") {
  if (approval.workflow) return approval.workflow;
  if (/^\$showpass-organizer-tester — /m.test(approval.prompt)) return "organizer-tester";
  return inferBuilderWorkflow(title);
}

async function getReceiptStatus(runId: string, revision: number, receipt: Receipt, signal: AbortSignal): Promise<CodexHandoffStatus> {
  if (receipt.result?.activity !== undefined) return receipt.result;
  const turn = await readCodexDispatch(receipt.threadId, receipt.marker, receipt.queuedAt, signal).catch((error: unknown) => {
    if (receipt.result) return undefined;
    throw error;
  });
  if (!turn) return receipt.result ?? { status: receipt.acknowledged ? "queued" : "unknown", threadId: receipt.threadId };

  const status = turn.status === "inProgress" ? "running"
    : turn.status === "completed" || turn.status === "interrupted" ? turn.status : "failed";
  const result = receipt.result ? { ...receipt.result, activity: turn.activity } : {
    status, threadId: receipt.threadId, turnId: turn.turnId,
    text: turn.text, activity: turn.activity,
  } as const;
  if (result.status !== "running") await writeLocalState(receiptFile(runId, revision), { ...receipt, result });
  return result;
}

export async function revokeApprovedCodexHandoff(runId: string, revision: number, signal: AbortSignal) {
  if (!await readApproval(runId, revision)) return;
  const receipt = await readReceipt(runId, revision);
  if (receipt) {
    const result = await getReceiptStatus(runId, revision, receipt, signal);
    if (["queued", "unknown", "running"].includes(result.status)) {
      throw new HandoffError("This revision still has a pending Codex handoff. Check the paired chat before revising the plan.", 409);
    }
  }
  await writeLocalState(approvalFile(runId), null);
}

export async function codexHandoff(
  { action, runId, revision, token }: { action: "launch" | "status"; runId: string; revision: number; token: string },
  signal: AbortSignal,
): Promise<CodexHandoffStatus> {
  const approval = await readApproval(runId, revision);
  if (approval?.token !== token) throw new HandoffError("The current revision needs QA Lead approval in this City.", 409);

  const existing = await readReceipt(runId, revision);
  if (existing) return cachedStatus(runId, revision, existing);
  const role = asBuilderWorkflow(approvalWorkflow(approval)) ? "organizer-builder" : "organizer-tester";
  const threadId = getOrganizerCodexThread(role);
  if (!threadId) throw new HandoffError("Pair this Organizer agent with its own local Codex chat or copy the approved handoff.", 409);
  if (action === "status") return { status: "ready", threadId };

  await checkCodexDispatchUsage(signal);
  if ((await readApproval(runId, revision))?.token !== token) {
    throw new HandoffError("The plan changed before dispatch. Reopen the current revision.", 409);
  }
  const receipt: Receipt = {
    threadId, marker: `QA City dispatch ${randomUUID()}`, queuedAt: new Date().toISOString(), acknowledged: false,
  };
  if (!await reserveDispatch(runId, revision, receipt)) {
    const previous = await readReceipt(runId, revision);
    if (previous) return cachedStatus(runId, revision, previous);
    throw new HandoffError("City is already dispatching this revision. Check its status shortly.", 409);
  }

  if ((await readApproval(runId, revision))?.token !== token) {
    await unlink(/* turbopackIgnore: true */ join(runtimeDirectory(), receiptFile(runId, revision)));
    throw new HandoffError("The plan changed before dispatch. Reopen the current revision.", 409);
  }

  const prompt = `${receipt.marker}\n${approval.prompt}`;
  try {
    const { stdout } = await runCommand("codex", ["queue", "--thread", threadId, "--message", prompt], {
      timeout: 12_000, maxBuffer: 32_000,
    });
    const acknowledged = /Queued message [\w-]+ for thread ([\w-]+)/.exec(stdout)?.[1] === threadId;
    if (acknowledged) {
      await writeLocalState(receiptFile(runId, revision), { ...receipt, acknowledged });
      return { status: "queued", threadId };
    }
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      // The executable never started. Retrying is safe after it is installed.
      await unlink(/* turbopackIgnore: true */ join(runtimeDirectory(), receiptFile(runId, revision)));
      throw new HandoffError("The local Codex command could not be found on PATH.", 503);
    }
    // Keep the receipt if the process may have accepted the message before failing.
  }
  return { status: "unknown", threadId };
}

const statusChecks = new Map<string, Promise<CodexHandoffStatus>>();

export async function readRunActivity(runId: string, revision: number) {
  if (!z.uuid().safeParse(runId).success) return undefined;
  const receipt = await readReceipt(runId, revision);
  if (receipt) return cachedStatus(runId, revision, receipt);
}

async function cachedStatus(runId: string, revision: number, receipt: Receipt) {
  if (receipt.result?.activity !== undefined) return receipt.result;

  const key = receipt.marker;
  const previous = statusChecks.get(key);
  if (previous) return previous;

  // Reuse one local history read across list views and dialogs, regardless of which viewer closes first.
  const current = getReceiptStatus(runId, revision, receipt, AbortSignal.timeout(12_000));
  statusChecks.set(key, current);
  void current.finally(() => {
    setTimeout(() => statusChecks.delete(key), 3500).unref();
  }).catch(() => {});
  return current;
}

export async function recoverCodexRuns(): Promise<Run[]> {
  const names = await readdir(/* turbopackIgnore: true */ runtimeDirectory()).catch((error: unknown) => {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    throw error;
  });
  const candidates = new Map<string, number>();
  for (const name of names) {
    const match = /^codex-dispatch-([a-f\d-]+)-(\d+)\.json$/i.exec(name);
    if (!match || !z.uuid().safeParse(match[1]).success) continue;
    const revision = Number(match[2]);
    candidates.set(match[1], Math.max(candidates.get(match[1]) ?? 0, revision));
  }

  const recovered: Run[] = [];
  for (const [id, revision] of candidates) {
    const [approval, receipt] = await Promise.all([
      readApproval(id, revision),
      readReceipt(id, revision).catch(() => undefined),
    ]);
    if (!approval || !receipt || !approval.prompt.includes(`QA City handoff for assignment ${id}, Plan ${revision}.`)) continue;

    const title = /^\$\S+ — (.+)$/m.exec(approval.prompt)?.[1]?.trim();
    if (!title) continue;
    const workflow = approvalWorkflow(approval, title);
    const builderWorkflow = asBuilderWorkflow(workflow);
    recovered.push({
      id, title: title.slice(0, 100), agentId: builderWorkflow ? "organizer-builder" : "organizer-tester",
      workflow, builderWorkflow, mode: "drive",
      instructions: "", target: /^Target: (.+)$/m.exec(approval.prompt)?.[1]?.slice(0, 180) ?? "",
      sourceRunId: "", sample: false, status: "needs-input", createdAt: receipt.queuedAt,
      recoveredCodexRevision: revision,
    });
  }
  return recovered;
}
