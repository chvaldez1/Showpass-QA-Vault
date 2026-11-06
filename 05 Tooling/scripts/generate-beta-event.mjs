#!/usr/bin/env node
import { readFile, writeFile, mkdir, open, unlink } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { previewPlan } from "./event-generator-plan.mjs";
import { generateEvent } from "./event-generator-api.mjs";

async function main() {
  const started = performance.now();
  let previewFinished, sessionStarted, sessionFinished;
  const timings = () => ({
    totalSeconds:Number(((performance.now()-started)/1000).toFixed(3)),
    previewSeconds:previewFinished===undefined?null:Number(((previewFinished-started)/1000).toFixed(3)),
    sessionSetupSeconds:sessionStarted===undefined?null:Number((((sessionFinished ?? performance.now())-sessionStarted)/1000).toFixed(3)),
    generationSeconds:sessionFinished===undefined?null:Number(((performance.now()-sessionFinished)/1000).toFixed(3)),
  });
  const args = process.argv.slice(2),
    options = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (key === "--apply") options.apply = true;
    else if (
      [
        "--plan",
        "--session-module",
        "--journal",
        "--run-key",
        "--environment",
      ].includes(key)
    ) {
      if (!args[i + 1] || args[i + 1].startsWith("--"))
        throw new Error(`Missing value for ${key}.`);
      options[key.slice(2)] = args[++i];
    } else
      throw new Error(
        `Unknown argument ${key}. Use --plan FILE [--apply --session-module FILE --journal NEW_FILE].`,
      );
  }
  if (!options.plan)
    throw new Error("Use --plan FILE. Default is an offline preview.");
  const plan = JSON.parse(await readFile(resolve(options.plan), "utf8"));
  if (options["run-key"]) plan.run_key = options["run-key"];
  if (options.environment) plan.destination.environment = options.environment;
  const preview = previewPlan(plan); // Validate before importing any session/auth code.
  previewFinished=performance.now();
  if (!options.apply) {
    console.log(JSON.stringify({...preview,timings:timings()}, null, 2));
    return;
  }
  if (!options["session-module"] || !options.journal || !options["run-key"])
    throw new Error(
      "Apply requires --run-key, --session-module and a new --journal path. The session module must reuse the existing Playwright API login/Access setup.",
    );
  const journalPath = resolve(options.journal);
  await mkdir(dirname(journalPath), { recursive: true });
  const lockPath = journalPath + ".lock";
  const lock = await open(lockPath, "wx", 0o600);
  let session,
    journalCreated = false;
  try {
    const file = await open(journalPath, "wx", 0o600);
    await file.close();
    journalCreated = true;
    const sessionModule = await import(
      pathToFileURL(resolve(options["session-module"])).href
    );
    if (typeof sessionModule.createSession !== "function")
      throw new Error(
        "Session module must export createSession({origin, environment}).",
      );
    sessionStarted=performance.now();
    session = await sessionModule.createSession({
      origin: preview.origin,
      environment: plan.destination.environment,
    });
    sessionFinished=performance.now();
    const result = await generateEvent({
      plan,
      api: session.api,
      csrfToken: session.csrfToken,
      onProgress: (journal) =>
        writeFile(journalPath, JSON.stringify({...journal,timings:timings(),sessionRequestCount:session.setupRequestCount ?? null}, null, 2) + "\n", {
          mode: 0o600,
        }),
    });
    console.log(JSON.stringify({...result,timings:timings(),sessionRequestCount:session.setupRequestCount ?? null}, null, 2));
  } catch (error) {
    if (journalCreated && !error.journal)
      await writeFile(
        journalPath,
        JSON.stringify(
          {
            state: "blocked",
            origin: preview.origin,
            runKey: plan.run_key,
            error: error.message,
            timings:timings(),
            sessionRequestCount:error.setupRequestCount ?? null,
          },
          null,
          2,
        ) + "\n",
        { mode: 0o600 },
      );
    error.timings=timings();
    throw error;
  } finally {
    try {
      await session?.dispose?.();
    } finally {
      await lock.close();
      await unlink(lockPath);
    }
  }
}
main().catch((error) => {
  console.error(
    JSON.stringify(
      { state: error.journal?.state ?? "blocked", error: error.message, timings:error.timings, sessionRequestCount:error.setupRequestCount ?? null, generationRequestCount:error.journal?.networkRequests ?? 0 },
      null,
      2,
    ),
  );
  process.exitCode = 1;
});
