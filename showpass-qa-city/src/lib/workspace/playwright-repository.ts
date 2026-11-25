import "server-only";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { constants } from "node:fs";
import { link, lstat, mkdir, open, readdir, realpath, unlink, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join, resolve } from "node:path";
import type { z } from "zod";
import { handoffFolder, handoffInput, itemName, teamGuide } from "./playwright-handoff";

const missing = (error: unknown) => (error as NodeJS.ErrnoException)?.code === "ENOENT";

export async function playwrightCheckout() {
  const configured = process.env.QA_CITY_PLAYWRIGHT_PATH || resolve(process.cwd(), "../..", "showpass-playwright");
  try {
    const root = await realpath(/* turbopackIgnore: true */ configured);
    for (const file of ["AGENTS.md", teamGuide]) {
      if (!(await lstat(/* turbopackIgnore: true */ join(/* turbopackIgnore: true */ root, file))).isFile()) throw new Error();
    }
    return root;
  } catch {
    throw new Error(`Open the showpass-playwright checkout containing ${teamGuide}, or set QA_CITY_PLAYWRIGHT_PATH to that checkout and restart City.`);
  }
}

// Only descend through real directories inside the selected checkout.
async function workDirectory(root: string, item?: string, create = false) {
  let path = root;
  const parts = handoffFolder.split("/");
  if (item !== undefined) parts.push(itemName.parse(item));
  for (const part of parts) {
    path = join(path, part);
    if (create) await mkdir(/* turbopackIgnore: true */ path, { mode: 0o700 }).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "EEXIST") throw error;
    });
    if (!(await lstat(/* turbopackIgnore: true */ path)).isDirectory()) throw new Error("Open a handoff stored inside the Playwright checkout.");
  }
  return path;
}

export async function listHandoffs(root: string) {
  try {
    const directory = await workDirectory(root);
    const entries = await readdir(/* turbopackIgnore: true */ directory, { withFileTypes: true });
    const items = await Promise.all(entries.filter((entry) => entry.isDirectory() && itemName.safeParse(entry.name).success)
      .map(async ({ name }) => {
        const note = await lstat(/* turbopackIgnore: true */ join(directory, name, "handoff.md")).catch((error) => {
          if (!missing(error)) throw error;
        });
        return note?.isFile() ? { name, modified: note.mtimeMs } : undefined;
      }));
    return items.filter((item) => item !== undefined).sort((a, b) => b.modified - a.modified);
  } catch (error) {
    if (missing(error)) return [];
    throw error;
  }
}

export async function readHandoff(root: string, item: string) {
  const dir = await workDirectory(root, item);
  const file = await open(/* turbopackIgnore: true */ join(dir, "handoff.md"), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const stat = await file.stat();
    if (!stat.isFile() || stat.size > 512 * 1024) throw new Error("Open this handoff in the repository to read it.");
    return await file.readFile("utf8");
  } finally {
    await file.close();
  }
}

export async function createHandoff(input: z.infer<typeof handoffInput>) {
  const root = await playwrightCheckout();
  const directory = await workDirectory(root, input.item, true);
  const revision = await promisify(execFile)("git", [
    "-C", root, "show", "-s", "--no-show-signature", "--color=never", "--decorate=short", "--format=%H%d", "HEAD",
  ], { timeout: 3000 }).then(({ stdout }) => stdout.trim()).catch(() => "");
  const body = [
    `# ${input.item}`, "## Next action", "Automation Lead — inspect the current branch, scope and evidence, then assign the next action. Blockers have not been assessed.",
    "## Goal and authority", input.request, "## Evidence", input.evidence || "No evidence supplied yet.",
    "## Revision and owner", `${revision ? "Checkout at intake: " + revision : "Checkout revision pending inspection."} Pending edits need inspection. SDET unassigned.`,
    "## Review and execution", "Independent review pending. Focused run not run.",
  ].join("\n\n") + "\n";
  const temporary = join(directory, `.${randomUUID()}.tmp`);
  await writeFile(/* turbopackIgnore: true */ temporary, body, { flag: "wx", mode: 0o600 });
  try {
    // Publish a complete note exactly once, even when two City requests race.
    await link(/* turbopackIgnore: true */ temporary, /* turbopackIgnore: true */ join(directory, "handoff.md"));
  } finally {
    await unlink(/* turbopackIgnore: true */ temporary);
  }
}
