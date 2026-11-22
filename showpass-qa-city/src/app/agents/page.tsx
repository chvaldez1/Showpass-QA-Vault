import type { Metadata } from "next";
import { AgentDirectory } from "@/components/workspace/agent-directory";

export const metadata: Metadata = { title: "Agents" };

export default function AgentsPage() {
  return <AgentDirectory />;
}
