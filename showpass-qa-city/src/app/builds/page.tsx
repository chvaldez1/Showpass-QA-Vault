import type { Metadata } from "next";
import { BuildLibrary } from "@/components/workspace/build-library";
import { PageHeader } from "@/components/workspace/page-header";

export const metadata: Metadata = { title: "Builds" };

export default function BuildsPage() {
  return (
    <>
      <PageHeader testId="builds-page" title="Builds" description="Find verified Showpass records and reuse them in an assignment." />
      <BuildLibrary />
    </>
  );
}
