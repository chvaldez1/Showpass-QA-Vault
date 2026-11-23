import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AgentProfile } from "@/components/workspace/agent-profile";
import { locations } from "@/lib/workspace/city";
import { agentRoles, type AgentRole } from "@/lib/workspace/schema";

type ProfileProps = { params: Promise<{ role: string }> };

function getRole(role: string): AgentRole {
  const match = agentRoles.find((candidate) => candidate === role);
  if (!match) notFound();
  return match;
}

export function generateStaticParams() {
  return agentRoles.map((role) => ({ role }));
}

export async function generateMetadata({ params }: ProfileProps): Promise<Metadata> {
  const role = getRole((await params).role);
  return { title: locations[role].agentName, description: locations[role].description };
}

async function AgentProfileContent({ params }: ProfileProps) {
  return <AgentProfile role={getRole((await params).role)} />;
}

export default function AgentProfilePage({ params }: ProfileProps) {
  return (
    <Suspense fallback={<p role="status" className="text-sm text-muted-foreground">Loading agent profile…</p>}>
      <AgentProfileContent params={params} />
    </Suspense>
  );
}
