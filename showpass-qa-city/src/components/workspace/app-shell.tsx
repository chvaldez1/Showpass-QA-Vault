import { Building2Icon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CurrentPage, WorkspaceNavigation } from "./navigation";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-background p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <aside className="flex flex-col border-b border-sidebar-border bg-sidebar text-white md:sticky md:top-0 md:h-dvh md:border-r md:border-b-0">
        <Link
          href="/"
          className="mx-4 my-3 flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-sidebar-ring md:mx-6 md:my-6"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-sidebar-primary text-sidebar-primary-foreground">
            <Building2Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight">QA City</span>
            <span className="block text-xs text-sidebar-foreground">Showpass</span>
          </span>
        </Link>
        <WorkspaceNavigation />
      </aside>
      <div className="min-w-0">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-card px-4 sm:px-7 md:h-16 lg:px-10">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span>Workspace</span>
            <ChevronRightIcon aria-hidden="true" className="size-3.5 opacity-65" />
            <CurrentPage />
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#9777f3]" />
            Local prototype
          </div>
        </header>
        <main id="main" tabIndex={-1} className="mx-auto max-w-350 space-y-7 px-4 py-6 outline-none sm:px-7 sm:py-8 lg:px-10 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}
