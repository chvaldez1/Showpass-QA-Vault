import { spawn } from "node:child_process";
import { constants } from "node:fs";
import { access, realpath } from "node:fs/promises";
import { delimiter, resolve } from "node:path";
import { createInterface } from "node:readline";
import { z } from "zod";
import { cityOutputGuidance } from "../workspace/output-guidance";
import type { CodexActivityItem } from "./handoff-schema";

const messageSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  method: z.string().optional(),
  params: z.unknown().optional(),
  result: z.unknown().optional(),
  error: z.unknown().optional(),
});

const accountSchema = z.object({ account: z.object({ type: z.literal("chatgpt") }) });
const bucketSchema = z.object({
  credits: z.object({ hasCredits: z.literal(false), unlimited: z.literal(false) }),
  rateLimitReachedType: z.null().optional(),
});
const usageSchema = z.object({
  ordinaryUsageAllowed: z.literal(true),
  rateLimitsByLimitId: z.record(z.string(), z.unknown()).nullish(),
  rateLimits: z.unknown(),
});
const sessionSchema = z.object({ id: z.string() });
const agentMessageSchema = z.object({
  threadId: z.string(), turnId: z.string(),
  item: z.object({ type: z.literal("agentMessage"), text: z.string() }),
});
const turnCompletedSchema = z.object({
  threadId: z.string(),
  turn: sessionSchema.extend({ status: z.string() }),
});

export class CodexError extends Error {}

export function outputSchema(schema: z.ZodType) {
  return z.toJSONSchema(schema, {
    override: ({ jsonSchema }) => {
      delete jsonSchema.$schema;
      delete jsonSchema.minLength;
      delete jsonSchema.maxLength;
      delete jsonSchema.minItems;
      delete jsonSchema.maxItems;
    },
  });
}

type RpcMessage = z.infer<typeof messageSchema>;
type RpcRequest = (method: string, params?: object, onNotification?: (message: RpcMessage) => void) => Promise<unknown>;

async function isolatedCodexCommand(sourceDirectory: string) {
  for (const directory of (process.env.PATH ?? "").split(delimiter)) {
    const candidate = resolve(directory, "codex");
    const executable = await access(candidate, constants.X_OK).then(() => realpath(candidate)).catch(() => undefined);
    if (executable) {
      const profile = `(version 1)
        (allow default)
        (deny process-exec (require-not (literal (param "CODEX_BIN"))))
        (deny file-read-data (subpath (param "SOURCE_DIRECTORY")))`;
      return ["/usr/bin/sandbox-exec", "-p", profile, "-D", `CODEX_BIN=${executable}`, "-D",
        `SOURCE_DIRECTORY=${await realpath(sourceDirectory)}`, executable];
    }
  }
  throw new CodexError("Couldn’t find the local Codex executable for isolated source review.");
}

async function withAppServer<T>(
  { cwd, signal, timeoutMs, restrictedSourceDirectory }: { cwd?: string; signal: AbortSignal; timeoutMs: number; restrictedSourceDirectory?: string },
  run: (connection: { request: RpcRequest; nextMessage: () => Promise<RpcMessage> }) => Promise<T>,
) {
  const env = { ...process.env };
  delete env.OPENAI_API_KEY;
  delete env.CODEX_API_KEY;
  const [command, ...sandboxArgs] = restrictedSourceDirectory && process.platform === "darwin"
    ? await isolatedCodexCommand(restrictedSourceDirectory) : ["codex"];
  const child = spawn(command, [
    ...sandboxArgs,
    "-c", 'model_provider="openai"',
    "-c", 'web_search="disabled"',
    "-c", "mcp_servers={}",
    "--disable", "apps",
    "--disable", "plugins",
    "--disable", "shell_tool",
    ...(restrictedSourceDirectory ? ["--disable", "unified_exec"] : []),
    "--disable", "multi_agent_v2",
    "app-server", "--listen", "stdio://",
  ], { cwd, env, stdio: ["pipe", "pipe", "ignore"] });

  const reader = createInterface({ input: child.stdout });
  const messages = reader[Symbol.asyncIterator]();
  let stopped: string | undefined;
  let requestId = 0;

  function stop(reason: string) {
    stopped = reason;
    child.kill();
    reader.close();
  }

  const abort = () => stop("The Codex request was interrupted. You can retry from this assignment.");
  const timeout = setTimeout(() => stop("Codex took too long to respond. You can retry from this assignment."), timeoutMs);
  signal.addEventListener("abort", abort, { once: true });
  child.on("error", () => stop("Couldn’t start local Codex. Check that the codex command is installed and on PATH."));
  child.stdin.on("error", () => reader.close());

  function send(message: object) {
    child.stdin.write(JSON.stringify(message) + "\n");
  }

  async function nextMessage() {
    if (stopped) throw new CodexError(stopped);
    const line = await messages.next();
    if (line.done) throw new CodexError(stopped ?? "The local Codex process closed before it returned a result.");
    return messageSchema.parse(JSON.parse(line.value));
  }

  async function request(method: string, params: object = {}, onNotification?: (message: z.infer<typeof messageSchema>) => void) {
    const id = ++requestId;
    send({ id, method, params });
    for (;;) {
      const message = await nextMessage();
      if (message.id !== undefined && message.method) {
        send({ id: message.id, error: { code: -32601, message: "Tool requests are unavailable in City planning." } });
      } else if (message.id === id) {
        if (message.error) throw new CodexError(`Local Codex couldn’t complete ${method}.`);
        return message.result;
      } else {
        onNotification?.(message);
      }
    }
  }

  try {
    if (signal.aborted) abort();
    await request("initialize", {
      clientInfo: { name: "showpass_qa_city", title: "Showpass QA City", version: "0.1.0" },
      capabilities: { experimentalApi: true },
    });
    send({ method: "initialized" });

    return await run({ request, nextMessage });
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener("abort", abort);
    child.stdin.end();
    reader.close();
    child.kill();
  }
}

async function verifyIncludedUsage(request: RpcRequest) {
  if (!accountSchema.safeParse(await request("account/read")).success) {
    throw new CodexError("Sign in to the local Codex CLI with ChatGPT to plan or review an assignment.");
  }

  const usage = usageSchema.safeParse(await request("account/rateLimits/read"));
  const bucket = usage.data?.rateLimitsByLimitId?.codex ?? usage.data?.rateLimits;
  if (!usage.success || !bucketSchema.safeParse(bucket).success) {
    throw new CodexError("Codex couldn’t confirm included usage with workspace credits unavailable. Planning is paused.");
  }
}

export async function checkCodexDispatchUsage(signal: AbortSignal) {
  return withAppServer({ signal, timeoutMs: 15_000 }, ({ request }) => verifyIncludedUsage(request));
}

export async function askCodex({
  cwd, prompt, context, outputSchema, signal, restrictedSourceDirectory,
}: {
  cwd: string;
  prompt: string;
  context: string;
  outputSchema: object;
  signal: AbortSignal;
  restrictedSourceDirectory?: string;
}) {
  return withAppServer({ cwd, signal, timeoutMs: 180_000, restrictedSourceDirectory }, async ({ request, nextMessage }) => {
    await verifyIncludedUsage(request);
    const { thread } = z.object({ thread: sessionSchema }).parse(await request("thread/start", {
      cwd, approvalPolicy: "never", sandbox: "read-only", ephemeral: true, environments: [],
      serviceTier: "default", developerInstructions: `${context}\n\n${cityOutputGuidance}`,
    }));

    const agentMessages = new Map<string, string>();
    let completed: z.infer<typeof turnCompletedSchema>["turn"] | undefined;
    function collect(message: z.infer<typeof messageSchema>) {
      if (message.method === "item/completed") {
        const item = agentMessageSchema.safeParse(message.params);
        if (item.success && item.data.threadId === thread.id) {
          agentMessages.set(item.data.turnId, item.data.item.text);
        }
      } else if (message.method === "turn/completed") {
        const outcome = turnCompletedSchema.parse(message.params);
        if (outcome.threadId === thread.id) completed = outcome.turn;
      }
    }

    const { turn } = z.object({ turn: sessionSchema }).parse(await request("turn/start", {
      threadId: thread.id,
      input: [{ type: "text", text: prompt }],
      outputSchema,
      effort: "medium",
      environments: [],
    }, collect));

    while (completed?.id !== turn.id) collect(await nextMessage());
    const output = agentMessages.get(turn.id);
    if (completed.status !== "completed" || !output) {
      throw new CodexError("Codex didn’t return a finished response. You can retry from this assignment.");
    }
    return JSON.parse(output) as unknown;
  });
}

const turnHistorySchema = z.object({
  nextCursor: z.string().nullish(),
  data: z.array(z.object({
    id: z.string(),
    status: z.string(),
    startedAt: z.number().nullish(),
    completedAt: z.number().nullish(),
    items: z.array(z.object({
      type: z.string(), id: z.string().optional(), phase: z.string().nullish(), text: z.string().optional(),
      content: z.array(z.object({ type: z.string(), text: z.string().optional() })).optional(),
      server: z.string().nullish(),
      status: z.string().nullish(),
      arguments: z.unknown().optional(),
      startedAtMs: z.number().nullish(),
      completedAtMs: z.number().nullish(),
    })),
  })),
});

function readActivity(items: z.infer<typeof turnHistorySchema>["data"][number]["items"]) {
  const activity: CodexActivityItem[] = [];
  for (const [index, item] of items.entries()) {
    const id = item.id ?? `item-${index}`;
    const at = item.startedAtMs ?? item.completedAtMs ?? undefined;
    if (item.type === "agentMessage" && item.phase === "commentary" && item.text?.trim()) {
      activity.push({ id, at, kind: "commentary", text: item.text.trim().slice(0, 2_000) });
    }
    if (item.type === "mcpToolCall" && item.server === "cua_repl") {
      const title = z.object({ title: z.string() }).safeParse(item.arguments).data?.title.trim();
      const state = item.status === "completed" ? "completed" : item.status === "failed" ? "failed" : item.status === "inProgress" ? "running" : undefined;
      activity.push({ id, at, state, kind: "browser", text: title?.slice(0, 180) || "Using the in-app browser" });
    }
  }
  return activity.slice(-40);
}

export function readCodexDispatch(
  threadId: string, marker: string, queuedAt: string, signal: AbortSignal,
) {
  return withAppServer({ signal, timeoutMs: 10_000 }, async ({ request }) => {
    let cursor: string | undefined;
    const cutoff = Math.floor(Date.parse(queuedAt) / 1000) - 2;
    for (let page = 0; page < 5; page++) {
      const history = turnHistorySchema.parse(await request("thread/turns/list", {
        threadId, limit: 12, itemsView: "full", ...(cursor ? { cursor } : {}),
      }));
      for (const turn of history.data) {
        const matched = turn.items.some((item) => item.type === "userMessage" &&
          item.content?.some((input) => input.type === "text" && input.text?.startsWith(marker + "\n")));
        if (matched) {
          const messages = turn.items.filter((item) => item.type === "agentMessage" && item.phase !== "commentary");
          return {
            turnId: turn.id,
            // Another App Server can reconstruct a still-active desktop turn as interrupted.
            status: turn.status === "interrupted" && turn.completedAt == null ? "inProgress" : turn.status,
            activity: readActivity(turn.items),
            text: (messages.findLast((item) => item.phase === "final_answer") ?? messages.at(-1))?.text?.slice(0, 36_000),
          };
        }
        if (turn.startedAt != null && turn.startedAt < cutoff) return undefined;
      }
      if (!history.nextCursor) break;
      cursor = history.nextCursor;
    }
    return undefined;
  });
}
