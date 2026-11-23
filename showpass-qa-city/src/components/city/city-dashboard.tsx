"use client";

import { ArrowRightIcon, BoxIcon, Layers2Icon, MousePointer2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useState, type CSSProperties } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { AgentAction } from "@/components/workspace/agent-action";
import { AgentProfileLink } from "@/components/workspace/agent-display";
import { PageHeader } from "@/components/workspace/page-header";
import { RunHistory, statusDisplay } from "@/components/workspace/run-list";
import { liveStatus } from "@/components/workspace/codex-activity";
import { NewRunDialog } from "@/components/workspace/new-run-dialog";
import { useLiveCodexRuns } from "@/hooks/use-live-codex-runs";
import { useWorkspace } from "@/hooks/use-workspace";
import { locations } from "@/lib/workspace/city";
import { jobLabels } from "@/lib/workspace/job";
import { agentRoles, type AgentRole, type Workspace } from "@/lib/workspace/schema";
import { codexRevision } from "@/lib/workspace/shared-schema";
import { nextRunAction, queueReviewers } from "@/lib/workspace/run-queue";
import { pilotStages } from "@/lib/workspace/transfer-pilot";
import { LocationIcon } from "./location-icon";
import { Map2D } from "./map-2d";
import "./city.css";

const Map3D = dynamic(() => import("./map-3d"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 grid place-items-center text-sm text-[#c8cee9]" role="status">Loading 3D map…</div>,
});

const views = [
  { id: "2d", label: "2D", icon: Layers2Icon },
  { id: "3d", label: "3D", icon: BoxIcon },
] as const;

type MapView = (typeof views)[number]["id"];

function CityMap({ selected, onSelect }: {
  selected: AgentRole;
  onSelect: (role: AgentRole) => void;
}) {
  const [requestedView, setRequestedView] = useState<MapView>("3d");
  const [unavailable3D, setUnavailable3D] = useState(false);
  const handleUnavailable = useCallback(() => setUnavailable3D(true), []);
  const view = unavailable3D ? "2d" : requestedView;

  return (
    <section data-testid="city-map" aria-labelledby="city-view" className="min-w-0 overflow-hidden rounded-2xl border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-3">
          <h2 id="city-view" className="font-semibold tracking-tight">Explore the city</h2>
          {unavailable3D && <p role="status" data-testid="city-map-fallback" className="text-xs text-muted-foreground">3D is unavailable on this device.</p>}
        </div>
        <div data-testid="city-map-views" role="group" aria-label="Map view" className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
          {views.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              data-testid={`city-map-view-${id}`}
              type="button"
              variant="ghost"
              aria-pressed={id === view}
              disabled={id === "3d" && unavailable3D}
              onClick={() => setRequestedView(id)}
              className="rounded-md text-xs font-semibold text-muted-foreground aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-sm"
            >
              <Icon aria-hidden="true" className="size-3.5" />
              {label}
            </Button>
          ))}
        </div>
      </header>
      <div data-testid="city-map-stage" className="city-map-stage">
        {view === "3d" ? (
          <Map3D selected={selected} onSelect={onSelect} onUnavailable={handleUnavailable} />
        ) : (
          <Map2D selected={selected} onSelect={onSelect} />
        )}
        {view === "3d" && (
          <p className="pointer-events-none absolute right-3 bottom-3 z-10 hidden sm:flex items-center gap-2 rounded-md bg-[#111527]/85 px-2.5 py-1.5 text-[11px] font-medium text-[#b8c2df]">
            <MousePointer2Icon aria-hidden="true" className="size-3" />
            Drag or use arrows to rotate · Scroll or use +/− to zoom
          </p>
        )}
      </div>
      {view === "3d" && <div data-testid="city-locations" aria-label="City locations" role="group" className="grid grid-cols-2 gap-1 p-2 sm:grid-cols-3 2xl:grid-cols-5">
        {agentRoles.map((role) => (
          <Button
            key={role}
            data-testid={`city-location-${role}`}
            type="button"
            variant="ghost"
            aria-pressed={role === selected}
            onClick={() => onSelect(role)}
            className="h-auto min-h-9 min-w-0 justify-start gap-2 px-2 text-left text-xs text-muted-foreground whitespace-normal aria-pressed:bg-accent aria-pressed:text-accent-foreground"
          >
            <span aria-hidden="true" className="size-2 shrink-0 rounded-sm border border-black/15" style={{ backgroundColor: locations[role].color }} />
            {locations[role].name}
          </Button>
        ))}
      </div>}
    </section>
  );
}

function CityWorkspace({ agents, runs }: Workspace) {
  const [selected, setSelected] = useState<AgentRole>("organizer-tester");
  const [reviewer, setReviewer] = useState<(typeof queueReviewers)[number]>();
  const location = locations[selected];
  const { activity, disconnected } = useLiveCodexRuns(runs.some((run) => Boolean(codexRevision(run))));
  const pending = runs.flatMap((run) => {
    const next = nextRunAction(run, liveStatus(run, activity));
    return next ? [{ run, next }] : [];
  });
  const roleQueue = pending.filter(({ run, next }) => reviewer ? next.reviewer === reviewer : run.agentId === selected);
  const blockers = roleQueue.filter(({ next }) => next.blocker).length;
  const latestPilot = runs.find(({ pilot }) => pilot)?.pilot;

  function selectRole(role: AgentRole) {
    setSelected(role);
    setReviewer(undefined);
  }

  return (
    <>
    <div className="city-workspace-grid">
      <CityMap selected={selected} onSelect={selectRole} />
      <section data-testid="city-selected-agent" aria-labelledby="selected-agent" className="city-location-panel" style={{ "--location-color": location.color } as CSSProperties}>
        <div className="flex size-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--location-color),transparent_78%)] text-[color-mix(in_srgb,var(--location-color),var(--foreground)_60%)]">
          <LocationIcon role={selected} className="size-5.5" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{location.name}</p>
          <h2 id="selected-agent" className="mt-1 text-2xl font-semibold tracking-tight">{location.agentName}</h2>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{location.description}</p>
        <a href="#city-role-queue" onClick={() => setReviewer(undefined)} className="text-sm font-medium underline underline-offset-4">
          {pending.filter(({ run }) => run.agentId === selected).length} open assignments · View queue
        </a>
        <div className="mt-auto grid w-full gap-2 sm:grid-cols-2 xl:grid-cols-1">
          <AgentAction key={selected} agents={agents} runs={runs} role={selected} className="h-9 w-full px-3" />
          {selected === "organizer-builder" &&
            <NewRunDialog agentId={selected} agents={agents} runs={runs} transferPilot variant="outline" className="h-9 w-full px-3" />}
          <AgentProfileLink role={selected} size="lg" />
        </div>
      </section>
    </div>
    {latestPilot && (
      <section data-testid="city-transfer-pilot" aria-label="Latest transfer pilot" className="grid gap-3 rounded-xl border bg-card p-4">
        <h2 className="font-semibold">Latest transfer pilot</h2>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {pilotStages.map(({ role, job }) => {
            const run = runs.find((entry) => entry.pilot?.id === latestPilot.id && entry.job === job);
            const next = run && nextRunAction(run, liveStatus(run, activity));
            const status = next?.blocker ? "Blocked" : next?.label ?? (run ? statusDisplay[run.status].label : "Waiting for prior step");
            return (
              <li key={job}>
                <Button type="button" variant="outline" data-testid={`city-pilot-${job}`} onClick={() => selectRole(role)}
                  className="h-auto w-full flex-col items-start gap-1 px-3 py-2 text-left whitespace-normal">
                  {jobLabels[job]}
                  <span className="text-xs font-normal text-muted-foreground">{status}</span>
                </Button>
              </li>
            );
          })}
        </ol>
      </section>
    )}
    <div id="city-role-queue" className="grid gap-2">
      <div className="flex flex-wrap gap-1" role="group" aria-label="Review queues">
        <Button type="button" variant={!reviewer ? "secondary" : "outline"} aria-pressed={!reviewer} onClick={() => setReviewer(undefined)}>Selected role</Button>
        {queueReviewers.map((name) => (
          <Button key={name} type="button" variant={reviewer === name ? "secondary" : "outline"} aria-pressed={reviewer === name} onClick={() => setReviewer(name)}>
            {name} · {pending.filter(({ next }) => next.reviewer === name).length}
          </Button>
        ))}
      </div>
      {disconnected && <p role="status" className="text-sm text-muted-foreground">Live Codex status is unavailable.</p>}
      <RunHistory testId="city-queue" title={`${reviewer ?? location.agentName} queue`} showCount
        runs={roleQueue.map(({ run }) => run)} agents={agents} history={runs} activity={activity} showNextAction
        emptyMessage="No open assignments in this queue."
        actions={<p className="text-sm text-muted-foreground">{blockers} blocked</p>} />
    </div>
    </>
  );
}

function CitySummary({ agents, runs }: Workspace) {
  const queued = runs.filter(({ status }) => status === "queued").length;
  const completed = runs.filter(({ status }) => status === "completed").length;

  return (
    <section data-testid="city-workspace-summary" aria-label="Workspace summary" className="grid grid-cols-3 divide-x rounded-xl border bg-card">
      {[
        { value: agents.length, label: "Agents" },
        { value: queued, label: "Queued" },
        { value: completed, label: "Completed" },
      ].map(({ value, label }) => (
        <div key={label} className="flex items-baseline justify-center gap-2 px-2 py-3.5 sm:gap-2.5">
          <span className="text-lg leading-none font-semibold tabular-nums sm:text-xl">{value}</span>
          <span className="text-xs font-medium text-muted-foreground sm:text-sm">{label}</span>
        </div>
      ))}
    </section>
  );
}

export function CityDashboard() {
  const workspace = useWorkspace();
  const { agents, runs } = workspace;

  return (
    <>
      <PageHeader testId="city-map-page" title="City map" description="Choose a building to see its queue and open the next action." />
      <CityWorkspace {...workspace} />
      <CitySummary {...workspace} />
      <RunHistory
        testId="city-recent-runs"
        title="Recent runs"
        runs={runs.slice(0, 4)}
        agents={agents}
        history={runs}
        actions={<ButtonLink data-testid="city-all-runs" href="/runs" variant="ghost" className="text-primary">All runs <ArrowRightIcon aria-hidden="true" /></ButtonLink>}
      />
    </>
  );
}
