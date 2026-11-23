import { cityAgents } from "./city";
import type { Workspace } from "./schema";

const sample = {
  target: "Beta · Opening Night",
  mode: "drive",
  sample: true,
} as const;

export const demoWorkspace: Workspace = {
  agents: cityAgents,
  releases: [],
  runs: [
    {
      ...sample,
      id: "demo-box-office",
      agentId: "box-office-tester",
      title: "Find the order in Box Office",
      instructions: "Use the Customer Tester’s order to verify staff can find the exact ticket.",
      status: "queued",
      sourceRunId: "demo-customer",
      createdAt: "2026-11-22T16:40:00.000Z",
    },
    {
      ...sample,
      id: "demo-customer",
      agentId: "customer-tester",
      title: "Purchase a General Admission ticket",
      instructions: "Verify the total, the saved order, and the issued ticket.",
      status: "completed",
      sourceRunId: "demo-public",
      createdAt: "2026-11-22T16:05:00.000Z",
    },
    {
      ...sample,
      id: "demo-public",
      agentId: "public-tester",
      title: "Find Opening Night in public listings",
      instructions: "Check what a signed-out visitor can see about the event and ticket price.",
      status: "completed",
      sourceRunId: "demo-organizer",
      createdAt: "2026-11-22T15:45:00.000Z",
    },
    {
      ...sample,
      id: "demo-organizer",
      agentId: "organizer-builder",
      workflow: "event-builder",
      title: "Set up the Opening Night event",
      instructions: "Create the test event with one General Admission ticket type.",
      status: "completed",
      sourceRunId: "",
      createdAt: "2026-11-22T15:00:00.000Z",
    },
  ],
};
