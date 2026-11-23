"use client";

import { CheckIcon, ChevronLeftIcon } from "lucide-react";
import { LocationIcon } from "@/components/city/location-icon";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWorkspace } from "@/hooks/use-workspace";
import { locations } from "@/lib/workspace/city";
import type { AgentRole } from "@/lib/workspace/schema";
import { NewRunDialog } from "./new-run-dialog";
import { PageHeader } from "./page-header";
import { RunHistory } from "./run-list";

export function AgentProfile({ role }: { role: AgentRole }) {
  const { agents, runs } = useWorkspace();
  const location = locations[role];

  return (
    <>
      <div className="space-y-4">
        <ButtonLink href="/agents" variant="ghost" size="sm" className="-ml-2 text-primary">
          <ChevronLeftIcon aria-hidden="true" /> All agents
        </ButtonLink>
        <div className="flex flex-wrap items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground" style={{ borderBottom: `2px solid ${location.color}` }}>
            <LocationIcon role={role} className="size-5.5" />
          </span>
          <div className="min-w-0 flex-1 basis-48">
            <p className="mb-1 text-xs font-medium text-muted-foreground">{location.name}</p>
            <PageHeader
              title={location.agentName}
              description={location.description}
              actions={<NewRunDialog agents={agents} runs={runs} agentId={role} className="h-10 px-4" />}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <h2 className="text-base font-semibold tracking-tight">Responsibilities</h2>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            {location.responsibilities.map((responsibility) => (
              <li key={responsibility} className="flex items-start gap-2">
                <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                {responsibility}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="gap-2 p-5">
          <h2 className="text-base font-semibold tracking-tight">Example assignment</h2>
          <p className="text-sm leading-6 text-muted-foreground">{location.example}</p>
        </Card>
      </div>

      <RunHistory
        title="Recent assignments"
        agents={agents}
        runs={runs.filter(({ agentId }) => agentId === role).slice(0, 8)}
        history={runs}
      />
    </>
  );
}
