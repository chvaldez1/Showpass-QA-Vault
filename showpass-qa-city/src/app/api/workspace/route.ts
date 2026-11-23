import { z } from "zod";
import { isLocalCityRequest } from "@/lib/local-request";
import { workspaceSchema } from "@/lib/workspace/schema";
import { readSharedWorkspace, workspaceSince, writeSharedWorkspace } from "@/lib/workspace/shared-server";

const writeSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("import"), workspace: workspaceSchema }),
  z.object({ action: z.literal("replace"), version: z.number().int().nonnegative(), workspace: workspaceSchema }),
]);

const headers = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  if (!isLocalCityRequest(request)) return Response.json({ error: "Open the local QA City app." }, { status: 403 });
  try {
    const snapshot = await readSharedWorkspace();
    return workspaceSince(request) === snapshot.version
      ? new Response(null, { status: 204, headers })
      : Response.json(snapshot, { headers });
  } catch {
    return Response.json({ error: "City couldn’t load the shared workspace." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isLocalCityRequest(request)) return Response.json({ error: "Open the local QA City app." }, { status: 403 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The workspace update is invalid." }, { status: 400 });
  }
  const input = writeSchema.safeParse(body);
  if (!input.success) return Response.json({ error: "The workspace update is invalid." }, { status: 400 });

  try {
    const { snapshot, conflict } = await writeSharedWorkspace(input.data);
    return Response.json(snapshot, { status: conflict ? 409 : 200, headers });
  } catch {
    return Response.json({ error: "City couldn’t save the shared workspace." }, { status: 503 });
  }
}
