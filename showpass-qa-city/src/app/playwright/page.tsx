import { Suspense } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/workspace/page-header";
import { PlaywrightIntake } from "@/components/workspace/playwright-intake";
import { isLocalCityRequest } from "@/lib/local-request";
import { handoffPath, repoChatUrl } from "@/lib/workspace/playwright-handoff";
import { listHandoffs, playwrightCheckout, readHandoff } from "@/lib/workspace/playwright-repository";
import { readSharedWorkspace } from "@/lib/workspace/shared-server";
import { playwrightSource } from "@/lib/workspace/playwright-source";

export const metadata: Metadata = { title: "Playwright" };

type Query = { item?: string; run?: string; build?: string };
type PageProps = { searchParams: Promise<Query> };

export default function PlaywrightPage(props: PageProps) {
  return <>
    <PageHeader title="Playwright" testId="playwright-page" description="Start or resume an automation item in the showpass-playwright checkout." />
    <Suspense fallback={<p role="status">Loading repository handoffs…</p>}><RepositoryHandoffs {...props} /></Suspense>
  </>;
}

async function RepositoryHandoffs({ searchParams }: PageProps) {
  if (!isLocalCityRequest(new Request("http://localhost", { headers: await headers() }))) {
    return <p role="alert">Open Playwright from your local QA City dashboard.</p>;
  }
  const { item, run, build } = await searchParams;
  let root: string;
  let items: Awaited<ReturnType<typeof listHandoffs>>;
  let selected: string | undefined;
  let source = "";
  try {
    root = await playwrightCheckout();
    items = await listHandoffs(root);
    if (item) selected = await readHandoff(root, item);
    else if (run) {
      const { workspace } = await readSharedWorkspace();
      source = playwrightSource(workspace.runs.find((entry) => entry.id === run), build);
    }
  } catch (cause) {
    const code = (cause as NodeJS.ErrnoException).code;
    const message = code === "ENOENT" ? "This handoff is no longer in the checkout." :
      cause instanceof Error && !code && cause.name !== "ZodError" ? cause.message : "Could not read this repository handoff.";
    return <><p role="alert" data-testid="playwright-unavailable">{message}</p>
      {(item || run) && <ButtonLink href="/playwright" variant="outline">Back to Playwright</ButtonLink>}</>;
  }
  return <>
      <Card className="gap-4 p-5">
        {item && selected !== undefined ? <>
          <h2 className="text-lg font-semibold wrap-anywhere">{item}</h2>
          <p className="text-xs text-muted-foreground wrap-anywhere">{handoffPath(item)}</p>
          <div className="flex flex-wrap gap-2">
            <ButtonLink data-testid="playwright-open-codex" href={repoChatUrl(root, item)} prefetch={false}>Open in Codex</ButtonLink>
            <a data-testid="playwright-refresh" className="self-center text-sm underline" href={`?item=${encodeURIComponent(item)}`}>Reload handoff</a>
            <ButtonLink href="/playwright" variant="outline">New handoff</ButtonLink>
          </div>
          <pre data-testid="playwright-handoff-note" tabIndex={0} aria-label="Current repository handoff" className="rounded-md bg-muted p-4 text-sm whitespace-pre-wrap wrap-anywhere">{selected}</pre>
        </> : <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">New handoff</h2>
            {!run && <ButtonLink data-testid="playwright-open-repo" href={repoChatUrl(root)} prefetch={false} variant="outline">Open repo in Codex</ButtonLink>}
          </div>
          <PlaywrightIntake key={run ? `${run}-${build ?? ""}` : "new"} source={source} />
        </>}
      </Card>
      {items.length > 0 && <Card className="gap-2 p-5" data-testid="playwright-handoff-list">
        <h2 className="font-semibold">Repository handoffs</h2>
        <ul className="space-y-1">{items.map(({ name }) => <li key={name}>
          <Link className="text-sm underline wrap-anywhere" href={`/playwright?item=${encodeURIComponent(name)}`} prefetch={false}>{name}</Link>
        </li>)}</ul>
      </Card>}
  </>;
}
