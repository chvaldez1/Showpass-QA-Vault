import type { Metadata } from "next";
import { PageHeader } from "@/components/workspace/page-header";
import { ThemeSettings } from "@/components/workspace/theme-settings";
import { QaSettings } from "@/components/workspace/qa-settings";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader testId="settings-page" title="Settings" description="Manage preferences for this workspace." />
      <div className="grid max-w-2xl gap-4">
        <QaSettings />
        <ThemeSettings />
      </div>
    </>
  );
}
