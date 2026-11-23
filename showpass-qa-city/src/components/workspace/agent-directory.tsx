"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { LocationIcon } from "@/components/city/location-icon";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWorkspace } from "@/hooks/use-workspace";
import { locations } from "@/lib/workspace/city";
import { agentRoles } from "@/lib/workspace/schema";
import { AddAgentDialog } from "./add-agent-dialog";
import { AgentMark, agentDisplay } from "./agent-display";
import { NewRunDialog } from "./new-run-dialog";
import { PageHeader } from "./page-header";

export function AgentDirectory() {
  const { agents, runs } = useWorkspace();
  const otherAgents = agents.filter(({ role }) => !role);

  return (
    <>
      <PageHeader
        title="Agents"
        description="Choose a Showpass agent or create an additional profile."
        actions={<AddAgentDialog />}
      />
      <Card className="flex flex-row flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <h2 className="font-semibold">Release team</h2>
          <p className="text-sm text-muted-foreground">Backend Master, Frontend Master, Release Engineer, and QA Lead.</p>
        </div>
        <Link href="/releases" className={buttonVariants({ variant: "outline" })}>Open Releases</Link>
      </Card>

      <ul aria-label="City agents" className="grid gap-4 md:grid-cols-2">
        {agentRoles.map((role) => {
          const location = locations[role];

          return (
            <li key={role} className="min-w-0">
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
                  <Link href={`/agents/${role}`} className={buttonVariants({ variant: "outline" })}>
                    View profile <ArrowRightIcon aria-hidden="true" />
                  </Link>
                  <NewRunDialog agents={agents} runs={runs} agentId={role} variant="outline" />
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      {otherAgents.length > 0 && (
        <section aria-labelledby="additional-agents" className="space-y-4">
          <h2 id="additional-agents" className="text-lg font-semibold tracking-tight">Additional profiles</h2>
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherAgents.map((agent) => (
              <li key={agent.id} className="min-w-0">
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
