import { z } from "zod";
import { cityOutputGuidance } from "./output-guidance";

export const teamGuide = "docs/agent-workflows/playwright-team.md";
export const handoffFolder = ".artifacts/agent-work";
export const itemName = z.string().trim().min(1).max(120).regex(/^[\p{L}\p{N}][\p{L}\p{N} ._-]*$/u,
  "Use a ticket or task name with letters, numbers, spaces, dots, underscores or hyphens.");
export const handoffInput = z.object({
  item: itemName,
  request: z.string().trim().min(1, "Describe the requested outcome and scope.").max(16000),
  evidence: z.string().trim().max(64000),
});

export function handoffPath(item: string) {
  return `${handoffFolder}/${item}/handoff.md`;
}

export function repoChatUrl(repository: string, item?: string) {
  const prompt = [
    `Start with AGENTS.md and ${teamGuide} in this checkout. Act as Automation Lead.`,
    item ? `Resume the one work item in ${JSON.stringify(handoffPath(item))}. Update that note at each handoff.` :
      "Start from the user’s prompt, existing plan, or work already on the branch.",
    "Match the requested branch and scope to the checkout. Carry forward existing evidence, the next owner and any blocker.",
    "Treat previous City plans and results as evidence. Follow the shared review policy for the current action.",
    cityOutputGuidance,
  ].join("\n");
  return `codex://new?${new URLSearchParams({ path: repository, prompt })}`;
}
