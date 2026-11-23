"use client";

import {
  ActivityIcon,
  BotIcon,
  ClipboardCheckIcon,
  MapIcon,
  Settings2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const destinations = [
  { href: "/", label: "City map", icon: MapIcon },
  { href: "/agents", label: "Agents", icon: BotIcon },
  { href: "/runs", label: "Runs", icon: ActivityIcon },
  { href: "/releases", label: "Releases", icon: ClipboardCheckIcon },
  { href: "/settings", label: "Settings", icon: Settings2Icon },
];

export function WorkspaceNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Workspace"
      className="grid grid-cols-3 gap-1 px-2 pb-2 sm:grid-cols-5 md:flex md:flex-1 md:flex-col md:gap-1.5 md:px-4 md:pb-5"
    >
      {destinations.map(({ href, label, icon: Icon }) => {
        const active = href === pathname || (href !== "/" && pathname.startsWith(`${href}/`));
        return (
          <Link
            key={href}
            href={href}
            aria-current={href === pathname ? "page" : undefined}
            className={cn(
              "flex min-h-10 items-center justify-center gap-1 rounded-lg px-1.5 text-xs font-medium text-sidebar-foreground transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-sidebar-ring sm:gap-2 sm:text-sm md:justify-start md:gap-3 md:px-3",
              active && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/85",
              href === "/settings" && "md:mt-auto",
            )}
          >
            <Icon aria-hidden="true" className="size-3.5 shrink-0 sm:size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function CurrentPage() {
  const pathname = usePathname();
  const page = destinations.find(({ href }) => href === pathname || (href !== "/" && pathname.startsWith(`${href}/`)));
  return page && <span aria-current="page" className="text-foreground">{page.label}</span>;
}
