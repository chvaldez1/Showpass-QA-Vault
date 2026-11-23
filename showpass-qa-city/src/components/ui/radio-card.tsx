import type { ComponentProps, ReactNode } from "react";

export function RadioCard({ children, ...props }: Pick<ComponentProps<"input">,
  "name" | "value" | "checked" | "onChange"
> & { "data-testid": string; children: ReactNode }) {
  return (
    <label className="min-w-0 cursor-pointer has-disabled:cursor-not-allowed">
      <input {...props} type="radio" className="peer sr-only" />
      <span className="flex items-center gap-3 rounded-lg border p-3 text-sm font-medium wrap-anywhere hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/8 peer-checked:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-disabled:opacity-60">
        {children}
      </span>
    </label>
  );
}
