"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useClientReady } from "@/hooks/use-client-ready";
import { Card } from "@/components/ui/card";
import { RadioCard } from "@/components/ui/radio-card";

const options = [
  { value: "system", label: "System", icon: MonitorIcon },
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
];

export function ThemeSettings() {
  const ready = useClientReady();
  const { theme, setTheme } = useTheme();

  return (
    <Card data-testid="appearance" className="p-5 sm:p-6">
      <fieldset disabled={!ready} aria-describedby="appearance-hint">
        <legend className="text-base font-semibold tracking-tight">Appearance</legend>
        <p id="appearance-hint" className="mt-1 text-sm text-muted-foreground">Choose how QA City looks on this device.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {options.map(({ value, label, icon: Icon }) => (
            <RadioCard
              key={value}
              data-testid={`theme-${value}`}
              name="workspace-theme"
              value={value}
              checked={(ready ? theme : "system") === value}
              onChange={() => setTheme(value)}
            >
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              {label}
            </RadioCard>
          ))}
        </div>
      </fieldset>
    </Card>
  );
}
