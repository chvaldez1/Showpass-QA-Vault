import { asBuilderWorkflow, workflowSkills, type Revision } from "./qa-workflow";
import { buildPresets, buildThemes } from "./build-presets";
import { locations } from "./city";
import { jobLabels, jobSession, jobStops } from "./job";
import { cityOutputGuidance } from "./output-guidance";
import type { Run } from "./schema";

export function pilotScope(run: Pick<Run, "job" | "pilot" | "pilotInput">) {
  if (!run.pilot) return;
  const instruction = {
    setup: "Prepare one Event and an eligible Ticket Type with enough inventory for four tickets. Reopen the saved configuration and return both IDs. Record sale readiness and any blocker for the buyer. Publication has its own authorization.",
    purchase: "Verify the assigned buyer's checkout for four eligible tickets. Stop at one saved order with four issued tickets. Confirm sale readiness and the approved test payment setup before payment. Route any required Event change back to the Builder under its own approval.",
    "send-transfer": `Use the original purchasing account and saved order ${run.pilotInput?.orderReference}. Send three tickets to the designated recipient ${run.pilot.recipientEmail}. Reopen the sender order and record three pending and one retained.`,
    "accept-transfer": `Use the designated recipient account for transfer ${run.pilotInput?.transferReference} from order ${run.pilotInput?.orderReference}. Confirm the secure claim is for that run, then accept it and verify three issued tickets in the recipient account. Ask the user to open the claim in the authorized session if it is unavailable.`,
  };
  return run.job && instruction[run.job as keyof typeof instruction];
}

export function handoffText(
  run: Pick<Run, "id" | "agentId" | "title" | "instructions" | "mode" | "target" | "qaVenue" | "qaAccountEmail" | "job" | "pilot" | "pilotInput" |
    "buildPreset" | "buildTheme" | "publishSupportingEvents">,
  revision: Revision,
  records?: NonNullable<Run["browserResult"]>["records"],
) {
  const { plan, review, number, workflow, change } = revision;
  const skill = workflowSkills[workflow];
  const builder = asBuilderWorkflow(workflow);
  const engineeringHandoff = revision.engineering?.engineer;
  const shortReview = revision.shortReview;
  const steps = plan.steps.map(({ action, proof }, index) => `${index + 1}. ${action} Expected proof: ${proof}`);
  return [
    `$${skill} — ${run.title}`,
    `Use the QA Vault skill at .agents/skills/${skill}/SKILL.md.`,
    run.agentId in locations && `You are the ${locations[run.agentId as keyof typeof locations].agentName}, the plan owner. Carry the approved revision through execution and evidence. Start with a brief progress update naming the plan and the first check.`,
    `QA City handoff for assignment ${run.id}, Plan ${number}. The City's independent QA Lead approved this version: ${review?.rationale}`,
    engineeringHandoff && `Release Engineer handoff informed by both source reviews: ${engineeringHandoff.impact}\n${[...engineeringHandoff.checks, ...engineeringHandoff.concerns].map((item) => "- " + item).join("\n")}`,
    !engineeringHandoff && shortReview && `Release Engineer short review: ${shortReview.impact}\n${[...shortReview.checks, ...shortReview.concerns].map((item) => "- " + item).join("\n")}\nReview stop point: ${shortReview.stop}`,
    `Mode: ${run.mode === "drive" ? "drive in the Codex in-app browser" : "guide me through the approved checks"}`,
    run.target && `Target: ${run.target}`,
    run.qaVenue && `Saved QA venue: ${run.qaVenue.environment} · ${run.qaVenue.organization}${run.qaVenue.location ? ` · Event location ${run.qaVenue.location}` : ""}. Reuse this setup and verify it in the authorized session before dependent work. Resolve any disagreement with the assignment target before proceeding.`,
    run.qaAccountEmail && `Showpass test account when this plan needs sign-in: ${run.qaAccountEmail}. Reuse the matching signed-in Codex browser session. Follow the approved signed-out scope where applicable. If an authorized session or secure browser autofill is unavailable, request sign-in without asking for a password in chat.`,
    run.instructions && `Assignment details: ${run.instructions}`,
    builder && run.buildPreset && `Build preset: ${buildPresets[run.buildPreset].label}.`,
    builder && run.buildTheme && `Scenario theme: ${buildThemes[run.buildTheme].label}.`,
    builder && run.publishSupportingEvents && "Supporting Event publication on beta is authorized only within the stated approved plan. Verify the exact Event, discovery settings and sale window before publishing.",
    run.job && `Assigned job: ${jobLabels[run.job]}. ${jobStops[run.job]} Pause and hand off any work owned by a different role.`,
    jobSession(run.agentId, run.job),
    pilotScope(run),
    records && `Saved Showpass records from the previous run:\n${JSON.stringify(records, null, 2)}`,
    change && `Revision request: ${change}`,
    `Approach: ${plan.approach}`,
    `Start: ${plan.startingPoint}`,
    ...(plan.prerequisites.length ? ["Confirm before starting dependent work:", ...plan.prerequisites.map((item) => "- " + item)] : []),
    ...steps,
    `Data changes: ${plan.changes}`,
    `Cleanup: ${plan.cleanup}`,
    `Stop: ${plan.stop}`,
    "Apply the QA Vault permission rules and confirm the user's authorized scope. Treat the City decision as approval of the quoted plan only. If its approval cannot be established in this chat or the plan must change, get independent QA Lead approval before acting.",
    "Apply the UX and UI checks in the shared Interactive Browser Release Testing note. Report each suspected bug, confirmed bug, usability issue, observation, or blocker as a separate finding. Give the title, what happened, expected behavior, impact, and evidence you have. Name missing proof or a follow-up check for unconfirmed findings. Use the Showpass bug drafter for confirmed bugs.",
    builder && "Use the approved plan's bounded reuse or creation branch. Batch fields by form, commit picker selections and save each logical group once. Reopen the agreed settings and exact linked records before dependent work. If a branch changes, get approval on the revised plan. Report what saved, which checks failed or were blocked, and what the next tester can exercise. Report passed only when the agreed setup is verified.",
    workflow === "event-builder" && !run.pilot && "Return the saved Draft details and Event Preview URL for an independent Guest Tester assignment. Leave the artwork for the user to add.",
    builder && 'Return verified QA City records as one JSON array of { "kind": "event" | "product" | "membership_group" | "membership_benefit", "record": { ... } }. Include the primary build and any verified supporting records used. Give prices as two-decimal strings and ISO 8601 timestamps with offsets. Use the serializer field names and omit unverified values.',
    builder && 'Event fields include id, name, slug, status, venue, description, starts_on, ends_on, opens_at, timezone, location_name, inventory, is_recurring, assigned_space, tickettype_set. Ticket Type fields include id, name, description, price, inventory, purchase_limit, sale_starts_on, sale_ends_on, scan_starts_on, scan_ends_on, custom_ticket_event_starts_on, custom_ticket_event_ends_on, custom_ticket_event_opens_at, visibility. Include Event ID, name, slug and verified status (such as sp_event_draft) and each checked ticket name and ID.',
    builder && 'Product uses id, name, description, venue, is_active, product_attributes. Membership Group uses id, name, venue, description, slug, status, renewal_frequency, renewals_enabled, custom_expiry_date, membership_levels. Variants and Levels use id, name, price, inventory, purchase_limit, plus sku for variants and description for Levels. Membership Benefit uses id, name, membership_group, membership_level, benefit_type, ticket_type, scans_allowed, discount_uses_allowed, venue. Include other verified settings, such as Product eligibility or Member question scope, in the result summary.',
    workflow === "organizer-builder" && "Report the owning Dashboard page, saved record IDs or URLs where available, the exact verified settings, and enough setup context for the next tester.",
    "Return the verified outcome and evidence so it can be recorded in QA City.",
    cityOutputGuidance,
  ].filter(Boolean).join("\n");
}
