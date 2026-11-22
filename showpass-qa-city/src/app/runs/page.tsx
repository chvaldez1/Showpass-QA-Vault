import type { Metadata } from "next";
import { Runs } from "@/components/workspace/runs";

export const metadata: Metadata = { title: "Runs" };

export default function RunsPage() {
  return <Runs />;
}
