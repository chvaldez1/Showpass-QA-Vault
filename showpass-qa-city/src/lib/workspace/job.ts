import { z } from "zod";

export const jobSchema = z.enum([
  "setup", "test-organizer", "inspect-public", "test-public", "discover", "purchase", "customer-account",
  "box-office-lookup", "box-office-sale", "check-in", "box-office-post-sale",
  "send-transfer", "accept-transfer",
]);
export type QaJob = z.infer<typeof jobSchema>;

export const roleJobs = {
  "organizer-builder": ["setup"],
  "organizer-tester": ["test-organizer"],
  "public-tester": ["test-public", "discover", "purchase", "inspect-public"],
  "customer-tester": ["test-public", "discover", "purchase", "customer-account", "send-transfer", "accept-transfer"],
  "box-office-tester": ["box-office-lookup", "box-office-sale", "check-in", "box-office-post-sale"],
} satisfies Record<string, QaJob[]>;

export const jobLabels: Record<QaJob, string> = {
  setup: "Configure test setup",
  "test-organizer": "Test Organizer behavior",
  "inspect-public": "Verify an Event Preview or listing",
  "test-public": "Test a public page or widget",
  discover: "Test event discovery",
  purchase: "Verify a public purchase",
  "customer-account": "Test a Customer Account workflow",
  "box-office-lookup": "Find an existing order",
  "box-office-sale": "Verify a staff sale",
  "check-in": "Verify Check In",
  "box-office-post-sale": "Verify a staff post-sale action",
  "send-transfer": "Send a ticket transfer",
  "accept-transfer": "Accept a ticket transfer",
};

export const jobStops: Record<QaJob, string> = {
  setup: "Save and reopen the requested Organizer configuration. Hand off the verified record. Buyer checks belong to a separate assignment.",
  "test-organizer": "Prove one Organizer behavior. Save only when saving is part of that proof. Route standalone setup to the Organizer Builder.",
  "inspect-public": "Verify the exact Event Preview or public Event listing. Stop before changing the basket, the Event, or any order.",
  "test-public": "Verify the requested public page or widget behavior in the assigned session, such as opening and using an Organization profile dialog. Stop at the agreed proof and keep purchases and account changes in their own assignments.",
  discover: "Verify the assigned public discovery journey from its actual entry point in the requested signed-in or signed-out session. Stop before changing the basket or creating an order.",
  purchase: "Verify checkout from the approved public website or widget, then verify the saved order and issued items. Stop at the verified order and hand off any later action.",
  "customer-account": "Verify one Customer Account workflow using the assigned session. Route checkout and transfer actions to their own jobs.",
  "box-office-lookup": "Confirm the exact existing order in the assigned staff client and stop at lookup.",
  "box-office-sale": "Verify the approved staff sale and the issued items on the saved order. Stop before Check In or post-sale actions.",
  "check-in": "Verify the approved admission on the assigned client, using an existing issued ticket.",
  "box-office-post-sale": "Verify one specified staff-side action on the existing order, then stop at its saved outcome.",
  "send-transfer": "Stay in the sender account. Send the approved quantity once, reopen the source order, and verify what is pending and what the sender retains.",
  "accept-transfer": "Stay in the designated recipient account. Accept the existing transfer and verify issued items on the recipient's account.",
};

export function jobsFor(role: string | undefined): readonly QaJob[] {
  return roleJobs[role as keyof typeof roleJobs] ?? [];
}

export function jobSession(role: string, job: QaJob | undefined) {
  if (role === "public-tester" && job && job !== "inspect-public") {
    return job === "purchase"
      ? "Use a verified signed-out session. Keep checkout in guest mode and prove issuance through the approved guest-visible channel."
      : "Use a verified signed-out session. If the requested session is signed in, route the plan to the Customer Tester.";
  }
  if (role === "customer-tester" && job) {
    if (job === "test-public") {
      return "Use the assigned signed-in Customer account. If the requested session is signed out, route the plan to the Guest Tester.";
    }
    return "Use the assigned signed-in Customer account. Keep the same account for this job. Switch to the separate recipient account only on the acceptance assignment.";
  }
}

const highRiskJobs = new Set<QaJob>([
  "purchase", "box-office-sale", "check-in", "box-office-post-sale", "send-transfer", "accept-transfer",
]);

export function jobNeedsFullReview(job: QaJob | undefined) {
  return job !== undefined && highRiskJobs.has(job);
}

