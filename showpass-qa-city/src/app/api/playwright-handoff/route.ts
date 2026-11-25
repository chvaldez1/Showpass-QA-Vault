import { isLocalCityRequest } from "@/lib/local-request";
import { handoffInput } from "@/lib/workspace/playwright-handoff";
import { createHandoff } from "@/lib/workspace/playwright-repository";

export async function POST(request: Request) {
  if (!isLocalCityRequest(request)) return Response.json({ error: "Open the local QA City app." }, { status: 403 });
  const input = handoffInput.safeParse(await request.json().catch(() => null));
  if (!input.success) return Response.json({ error: input.error.issues[0].message }, { status: 400 });
  try {
    await createHandoff(input.data);
    return Response.json({ item: input.data.item }, { status: 201 });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      return Response.json({ item: input.data.item, error: "This work item already exists." }, { status: 409 });
    }
    return Response.json({ error: "Could not save the handoff. Check the Playwright checkout and its .artifacts directory permissions." }, { status: 503 });
  }
}
