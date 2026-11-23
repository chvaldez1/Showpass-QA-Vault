import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { z } from "zod";
import { approvedDraftSchema, type ApprovedDraft } from "../workspace/event-draft";

export function runtimeDirectory() {
  return process.env.QA_CITY_DATA_DIRECTORY ??
    join(homedir(), "Library", "Application Support", "Showpass QA City");
}

export async function writeLocalState(name: string, value: unknown) {
  const directory = runtimeDirectory();
  await mkdir(/* turbopackIgnore: true */ directory, { recursive: true, mode: 0o700 });
  const path = join(directory, name);
  const temporary = `${path}.${randomUUID()}`;
  await writeFile(/* turbopackIgnore: true */ temporary, JSON.stringify(value), { flag: "wx", mode: 0o600 });
  await rename(/* turbopackIgnore: true */ temporary, /* turbopackIgnore: true */ path);
}

export async function readLocalState(name: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(/* turbopackIgnore: true */ join(runtimeDirectory(), name), "utf8"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return undefined;
    throw error;
  }
}

export async function saveApprovedDraft(value: ApprovedDraft) {
  const draft = approvedDraftSchema.parse(value);
  const executionToken = randomUUID();
  await writeLocalState(`approval-${draft.runId}.json`, { ...draft, executionToken });
  return executionToken;
}

export async function revokeApprovedDraft(runId: string, revision: number) {
  const value = approvedDraftSchema.safeParse(await readLocalState(`approval-${runId}.json`));
  if (value.success && value.data.revision === revision) await writeLocalState(`approval-${runId}.json`, null);
}

export async function verifyApprovedDraft(runId: string, revision: number, executionToken: string) {
  const value = await readLocalState(`approval-${runId}.json`);
  const approved = approvedDraftSchema.safeParse(value);
  if (approved.success && approved.data.revision === revision &&
    (value as { executionToken: string }).executionToken === executionToken) return approved.data;
}

export async function savedDraftExecutionToken(runId: string, revision: number) {
  const value = await readLocalState(`approval-${runId}.json`);
  const approved = approvedDraftSchema.extend({ executionToken: z.uuid() }).safeParse(value);
  return approved.success && approved.data.revision === revision ? approved.data.executionToken : undefined;
}
