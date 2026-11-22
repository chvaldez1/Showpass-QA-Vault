"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useClientReady } from "@/hooks/use-client-ready";
import { Card } from "@/components/ui/card";

const options = [
  { value: "system", label: "System", icon: MonitorIcon },
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
];

export function ThemeSettings() {
  const ready = useClientReady();
  const { theme, setTheme } = useTheme();

  return (
    <Card className="p-5 sm:p-6">
      <fieldset disabled={!ready}>
        <legend className="text-base font-semibold tracking-tight">Appearance</legend>
        <p className="mt-1 text-sm text-muted-foreground">Choose how QA City looks on this device.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {options.map(({ value, label, icon: Icon }) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="workspace-theme"
                value={value}
                checked={(ready ? theme : "system") === value}
                onChange={() => setTheme(value)}
                className="peer sr-only"
              />
              <span className="flex items-center gap-3 rounded-lg border p-3 text-sm font-medium peer-checked:border-primary peer-checked:bg-primary/8 peer-checked:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-disabled:opacity-60 hover:bg-muted">
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </Card>
  );
}
