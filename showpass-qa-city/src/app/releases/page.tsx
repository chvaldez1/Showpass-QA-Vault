import type { Metadata } from "next";
import { Releases } from "@/components/workspace/releases";

export const metadata: Metadata = { title: "Releases" };

export default function ReleasesPage() {
  return <Releases />;
}
