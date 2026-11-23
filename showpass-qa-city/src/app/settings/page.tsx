import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/workspace/page-header";
import { ThemeSettings } from "@/components/workspace/theme-settings";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader testId="settings-page" title="Settings" description="Manage preferences for this workspace." />
      <div className="grid max-w-2xl gap-4">
        <ThemeSettings />
        <Card className="gap-2 p-5 sm:p-6">
          <h2 className="text-base font-semibold tracking-tight">Workspace data</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            The city starts with four tester profiles and sample runs. Assignments and handoffs stay in this browser.
            Executing an assignment requires a runner integration.
          </p>
        </Card>
      </div>
    </>
  );
}
