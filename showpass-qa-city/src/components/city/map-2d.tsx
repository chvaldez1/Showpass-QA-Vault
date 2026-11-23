import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { locations } from "@/lib/workspace/city";
import { agentRoles, type AgentRole } from "@/lib/workspace/schema";
import { LocationIcon } from "./location-icon";

export function Map2D({
  selected,
  onSelect,
}: {
  selected: AgentRole;
  onSelect: (role: AgentRole) => void;
}) {
  return (
    <div className="city-plan" role="group" aria-label="2D city map">
      <div aria-hidden="true" className="city-plan-road city-plan-road-horizontal" />
      <div aria-hidden="true" className="city-plan-road city-plan-road-vertical" style={{ left: "33.333%" }} />
      <div aria-hidden="true" className="city-plan-road city-plan-road-vertical" style={{ left: "66.667%" }} />
      {agentRoles.map((role) => {
        const { color, position: [x, z], name } = locations[role];

        return (
          <Button
            key={role}
            type="button"
            variant="ghost"
            aria-pressed={selected === role}
            className="city-plot h-auto whitespace-normal"
            style={{ "--location-color": color, gridColumn: x < 0 ? 1 : x === 0 ? 2 : 3, gridRow: z < 0 ? 1 : 2 } as CSSProperties}
            onClick={() => onSelect(role)}
          >
            <span aria-hidden="true" className="city-plot-footprint">
              <LocationIcon role={role} className="size-5 sm:size-6" />
            </span>
            <span className="city-plot-label">{name}</span>
          </Button>
        );
      })}
    </div>
  );
}
