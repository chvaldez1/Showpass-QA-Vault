"use client";

import type { CSSProperties } from "react";
import { LocationIcon } from "@/components/city/location-icon";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWorkspace } from "@/hooks/use-workspace";
import { locations } from "@/lib/workspace/city";
import { agentRoles } from "@/lib/workspace/schema";
import { AddAgentDialog } from "./add-agent-dialog";
import { AgentAction } from "./agent-action";
import { AgentMark, AgentProfileLink, agentDisplay } from "./agent-display";
import { NewRunDialog } from "./new-run-dialog";
import { PageHeader } from "./page-header";

export function AgentDirectory() {
  const { agents, runs } = useWorkspace();
  const otherAgents = agents.filter(({ role }) => !role);

  return (
    <>
      <PageHeader
        testId="agents-page"
        title="Agents"
        description="Choose a Showpass agent or create an additional profile."
        actions={<AddAgentDialog />}
      />
      <Card data-testid="playwright-team" className="flex flex-row flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <h2 className="font-semibold">Playwright team</h2>
          <p className="text-sm text-muted-foreground">Automation Lead coordinates the SDET, Playwright Police, the QA Tester and QA Lead.</p>
        </div>
        <ButtonLink data-testid="agents-open-playwright" href="/playwright" variant="outline">Open Playwright</ButtonLink>
      </Card>
      <Card data-testid="release-team" className="flex flex-row flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <h2 className="font-semibold">Release team</h2>
          <p className="text-sm text-muted-foreground">Backend Master, Frontend Master, Release Engineer, and QA Lead.</p>
        </div>
        <ButtonLink data-testid="agents-open-releases" href="/releases" variant="outline">Open Releases</ButtonLink>
      </Card>

      <ul data-testid="city-agents" aria-label="City agents" className="grid gap-4 md:grid-cols-2">
        {agentRoles.map((role) => {
          const location = locations[role];

          return (
            <li data-testid={`agent-card-${role}`} key={role} className="min-w-0">
              <Card
                className="h-full gap-3 border border-transparent bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--location-color)_17%,transparent),transparent_60%)] p-5"
                style={{ "--location-color": location.color } as CSSProperties}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--location-color),transparent_78%)]">
                    <LocationIcon role={role} className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{location.name}</p>
                    <h2 className="font-semibold tracking-tight">{location.agentName}</h2>
                  </div>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{location.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <AgentProfileLink role={role} />
                  <AgentAction agents={agents} runs={runs} role={role} variant="outline" />
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      {otherAgents.length > 0 && (
        <section data-testid="additional-agents" aria-labelledby="additional-agents" className="space-y-4">
          <h2 id="additional-agents" className="text-lg font-semibold tracking-tight">Additional profiles</h2>
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherAgents.map((agent) => (
              <li data-testid={`agent-card-${agent.id}`} key={agent.id} className="min-w-0">
                <Card className="h-full gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <AgentMark kind={agent.kind} />
                    <div className="min-w-0">
                      <h3 className="font-semibold wrap-anywhere">{agent.name}</h3>
                      <p className="text-xs text-muted-foreground">{agentDisplay[agent.kind].label}</p>
                    </div>
                  </div>
                  {agent.description && (
                    <p className="text-sm leading-6 text-muted-foreground wrap-anywhere">{agent.description}</p>
                  )}
                  <div className="mt-auto">
                    <NewRunDialog agents={agents} runs={runs} agentId={agent.id} variant="outline" />
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
