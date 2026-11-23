"use client";

import { ArrowRightIcon, BoxIcon, Layers2Icon, MousePointer2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useState, type CSSProperties } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { AgentAction } from "@/components/workspace/agent-action";
import { AgentProfileLink } from "@/components/workspace/agent-display";
import { PageHeader } from "@/components/workspace/page-header";
import { RunHistory, RunStatusBadge } from "@/components/workspace/run-list";
import { useWorkspace } from "@/hooks/use-workspace";
import { locations } from "@/lib/workspace/city";
import { agentRoles, type AgentRole, type Workspace } from "@/lib/workspace/schema";
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
  const location = locations[selected];
  const latestRun = runs.find(({ agentId }) => agentId === selected);

  return (
    <div className="city-workspace-grid">
      <CityMap selected={selected} onSelect={setSelected} />
      <section data-testid="city-selected-agent" aria-labelledby="selected-agent" className="city-location-panel" style={{ "--location-color": location.color } as CSSProperties}>
        <div className="flex size-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--location-color),transparent_78%)] text-[color-mix(in_srgb,var(--location-color),var(--foreground)_60%)]">
          <LocationIcon role={selected} className="size-5.5" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{location.name}</p>
          <h2 id="selected-agent" className="mt-1 text-2xl font-semibold tracking-tight">{location.agentName}</h2>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{location.description}</p>
        <div className="rounded-xl border bg-background/70 p-3.5">
          <p className="text-xs font-medium text-muted-foreground">Example assignment</p>
          <p className="mt-1.5 text-sm leading-5">{location.example}</p>
        </div>
        {!location.codexPrompt && <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">{latestRun?.sample ? "Latest sample run" : "Latest run"}</span>
          {latestRun ? <RunStatusBadge status={latestRun.status} draftOnly={latestRun.reviewMode === "draft"} /> : <span className="text-xs">No runs yet</span>}
        </div>}
        <div className="mt-auto grid w-full gap-2 sm:grid-cols-2 xl:grid-cols-1">
          <AgentAction key={selected} agents={agents} runs={runs} role={selected} className="h-9 w-full px-3" />
          <AgentProfileLink role={selected} size="lg" />
        </div>
      </section>
    </div>
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
      <PageHeader testId="city-map-page" title="City map" description="Choose an agent, save an assignment, or follow a handoff." />
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
