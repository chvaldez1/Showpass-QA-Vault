import { CheckIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function Checkbox({ children, ...props }: Pick<ComponentProps<"input">,
  "name" | "checked" | "onChange" | "disabled"
> & { "data-testid": string; children: ReactNode }) {
  return (
    <label className="flex min-h-8 cursor-pointer items-start gap-2 py-1 has-disabled:cursor-not-allowed has-disabled:opacity-60">
      <span className="relative mt-0.5 grid size-4 shrink-0 place-items-center">
        <input
          {...props}
          type="checkbox"
          className="peer col-start-1 row-start-1 size-4 appearance-none rounded border border-input bg-background checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <CheckIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 size-3 text-primary-foreground opacity-0 peer-checked:opacity-100" />
      </span>
      <span className="min-w-0 wrap-anywhere">{children}</span>
    </label>
  );
}
