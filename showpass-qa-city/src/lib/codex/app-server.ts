import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { z } from "zod";

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

export async function askCodex({
  cwd, prompt, context, outputSchema, signal,
}: {
  cwd: string;
  prompt: string;
  context: string;
  outputSchema: object;
  signal: AbortSignal;
}) {
  const env = { ...process.env };
  delete env.OPENAI_API_KEY;
  delete env.CODEX_API_KEY;
  const child = spawn("codex", [
    "-c", 'model_provider="openai"',
    "-c", 'web_search="disabled"',
    "-c", "mcp_servers={}",
    "--disable", "apps",
    "--disable", "plugins",
    "--disable", "shell_tool",
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
  const timeout = setTimeout(() => stop("Codex took too long to respond. You can retry from this assignment."), 180_000);
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

    if (!accountSchema.safeParse(await request("account/read")).success) {
      throw new CodexError("Sign in to the local Codex CLI with ChatGPT to plan or review an assignment.");
    }

    const usage = usageSchema.safeParse(await request("account/rateLimits/read"));
    const bucket = usage.data?.rateLimitsByLimitId?.codex ?? usage.data?.rateLimits;
    if (!usage.success || !bucketSchema.safeParse(bucket).success) {
      throw new CodexError("Codex couldn’t confirm included usage with workspace credits unavailable. Planning is paused.");
    }

    const { thread } = z.object({ thread: sessionSchema }).parse(await request("thread/start", {
      cwd, approvalPolicy: "never", sandbox: "read-only", ephemeral: true, environments: [],
      serviceTier: "default", developerInstructions: context,
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
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener("abort", abort);
    child.stdin.end();
    reader.close();
    child.kill();
  }
}
