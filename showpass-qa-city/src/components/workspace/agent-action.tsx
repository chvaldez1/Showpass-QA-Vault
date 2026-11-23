"use client";

import type { ComponentProps } from "react";
import { ButtonLink } from "@/components/ui/button";
import { locations } from "@/lib/workspace/city";
import type { AgentRole } from "@/lib/workspace/schema";
import { NewRunDialog } from "./new-run-dialog";

type AgentActionProps = Omit<ComponentProps<typeof NewRunDialog>, "agentId"> & { role: AgentRole };

export function AgentAction({ role, ...props }: AgentActionProps) {
  const prompt = locations[role].codexPrompt;
  if (!prompt) return <NewRunDialog {...props} agentId={role} />;

  const params = new URLSearchParams({ prompt });
  const vaultPath = process.env.NEXT_PUBLIC_QA_CITY_VAULT_PATH;
  if (vaultPath) params.set("path", vaultPath);

  return (
    <ButtonLink
      data-testid={`agent-review-in-codex-${role}`}
      href={`codex://new?${params}`}
      prefetch={false}
      variant={props.variant}
      className={props.className}
    >
      Review in Codex
    </ButtonLink>
  );
}
