import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
  testId,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  testId: string;
}) {
  return (
    <header data-testid={testId} className="flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 data-testid={`${testId}-title`} className="text-3xl font-semibold tracking-tight wrap-anywhere sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-prose text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {actions}
    </header>
  );
}
