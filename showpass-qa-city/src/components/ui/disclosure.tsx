import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Disclosure({ label, children, className, testId, ...props }: ComponentProps<"details"> & { label: ReactNode; testId: string }) {
  return (
    <details {...props} data-testid={testId} className={cn("rounded-md text-sm", className)}>
      <summary data-testid={`${testId}-toggle`} className="min-h-9 cursor-pointer rounded-md py-2 font-medium wrap-anywhere focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        {label}
      </summary>
      <div className="min-w-0 space-y-3 pt-1 pb-2">{children}</div>
    </details>
  );
}
