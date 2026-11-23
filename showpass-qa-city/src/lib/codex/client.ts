export async function askLocalCodex(payload: object) {
  const response = await fetch("/api/qa-assignment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || !body) throw new Error(body?.error ?? "The local Codex request failed.");
  return body.result as unknown;
}
