import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Disclosure({ label, children, className, ...props }: ComponentProps<"details"> & { label: ReactNode }) {
  return (
    <details {...props} className={cn("space-y-2 text-sm", className)}>
      <summary className="cursor-pointer rounded-sm font-medium wrap-anywhere focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        {label}
      </summary>
      {children}
    </details>
  );
}
