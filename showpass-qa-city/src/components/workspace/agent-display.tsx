import { ArrowRightIcon, BotIcon, ClipboardCheckIcon, MonitorIcon, ScanSearchIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { locations } from "@/lib/workspace/city";
import type { AgentKind, AgentRole } from "@/lib/workspace/schema";

export const agentDisplay = {
  browser: {
    label: "Browser testing",
    icon: MonitorIcon,
    tone: "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  },
  coverage: {
    label: "Coverage review",
    icon: ClipboardCheckIcon,
    tone: "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
  },
  triage: {
    label: "Issue triage",
    icon: ScanSearchIcon,
    tone: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300",
  },
  custom: {
    label: "Custom",
    icon: BotIcon,
    tone: "bg-muted text-muted-foreground",
  },
} satisfies Record<AgentKind, { label: string; icon: typeof BotIcon; tone: string }>;

export function AgentMark({ kind, className }: { kind: AgentKind; className?: string }) {
  const { icon: Icon, tone } = agentDisplay[kind];
  return (
    <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", tone, className)}>
      <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.8} />
    </span>
  );
}

export function AgentProfileLink({ role, size }: { role: AgentRole; size?: "lg" }) {
  return (
    <ButtonLink data-testid={`agent-profile-${role}`} aria-label={`View profile for ${locations[role].agentName}`} href={`/agents/${role}`} variant="outline" size={size}>
      View profile <ArrowRightIcon aria-hidden="true" />
    </ButtonLink>
  );
}
