import { cityOutputGuidance } from "./output-guidance";
import { agentRoles, type Agent, type AgentRole } from "./schema";

type Location = {
  name: string;
  agentName: string;
  description: string;
  responsibilities: string[];
  example: string;
  kind?: Agent["kind"];
  codexPrompt?: string;
  color: string;
  position: [x: number, z: number];
  size: [width: number, height: number, depth: number];
};

export const locations: Record<AgentRole, Location> = {
  "public-tester": {
    name: "Welcome Centre",
    agentName: "Guest Tester",
    description: "Own signed-out public page, widget, or guest checkout tests. Verify assigned Event Previews as read-only handoffs.",
    responsibilities: [
      "Plan and test the assigned public page or widget while signed out.",
      "Verify guest checkout on the public website or widget named in the plan.",
      "Check an assigned Event Preview with its approved access.",
    ],
    example: "Open Calgary discovery while signed out and verify the requested filters.",
    color: "#72d8f3",
    position: [-8.8, -4.3],
    size: [4.1, 2.4, 2.8],
  },
  "customer-tester": {
    name: "Ticket Shop",
    agentName: "Customer Tester",
    description: "Own signed-in public page, widget, checkout, Account, and transfer tests.",
    responsibilities: [
      "Plan and test the assigned public page or widget in the signed-in session.",
      "Verify checkout on the assigned public website or widget through the saved order and issued items.",
      "Verify one Account action, sender action, or recipient action as its own assignment.",
    ],
    example: "Buy one test ticket and verify the charged total and the corresponding order in My Orders.",
    color: "#bda1ff",
    position: [8.8, -4.3],
    size: [3.9, 2.1, 3.25],
  },
  "organizer-tester": {
    name: "Organizer Studio",
    agentName: "Organizer Tester",
    description: "Test permitted Organizer Dashboard pages for behavior, usability, and recovery.",
    responsibilities: [
      "Exercise the scoped Dashboard as an Organizer or authorized Venue Employee.",
      "Check discoverability, permissions, validation, and saved outcomes when the plan calls for an edit.",
      "Record confirmed bugs, usability issues, and blockers with evidence.",
    ],
    example: "Test Organization settings as an Organizer and check whether errors explain how to fix the inputs.",
    color: "#ff99c9",
    position: [-8.8, 4.3],
    size: [3.8, 3.25, 3.5],
  },
  "organizer-builder": {
    name: "Organizer Workshop",
    agentName: "Organizer Builder",
    description: "Prepare realistic test data and configurations across the permitted Organizer Dashboard.",
    responsibilities: [
      "Set up the requested scenario on its owning Dashboard page.",
      "Configure the relevant Events, offerings, or other Organizer settings within the approved scope.",
      "Reopen the saved setup and hand verified records to the receiving tester.",
    ],
    example: "Set up a promotion for an existing offering and verify the saved eligibility and dates.",
    color: "#f5bf78",
    position: [0, 4.3],
    size: [4, 2.25, 3.3],
  },
  "box-office-tester": {
    name: "Box Office",
    agentName: "Box Office Tester",
    description: "Verify one assigned staff operation as a Venue Employee.",
    responsibilities: [
      "Find the saved order and identify the matching tickets.",
      "Check authorized staff-side sales or Check In workflows.",
      "Report the outcome against the same order used in the handoff.",
    ],
    example: "Find the Customer Tester’s order in Box Office and verify that its ticket is available for Check In.",
    color: "#ffc775",
    position: [8.8, 4.3],
    size: [4.6, 1.75, 3.2],
  },
  "qase-grammar-police": {
    name: "Qase Review",
    agentName: "Qase Police",
    description: "Review whether another QA can run a manual Qase case using its fields alone.",
    responsibilities: [
      "Describe how to find suitable test data and what to record before the run.",
      "Make expected results checkable against requirements or saved setup.",
      "Keep Showpass actions and results specific. Group variants when they share the same steps.",
    ],
    example: "Review a Product Categories case so another QA can use any suitable Organizer and verify the Products in each category.",
    kind: "coverage",
    codexPrompt: [
      "Use $qase-police from .agents/skills/qase-police/SKILL.md to review the Showpass Qase case draft. Ask for the draft or its vault path if it was not supplied.",
      cityOutputGuidance,
    ].join("\n\n"),
    color: "#8bdfb9",
    position: [0, -4.3],
    size: [4.1, 2.4, 3.2],
  },
};

export const cityAgents: Agent[] = agentRoles.map((role) => ({
  id: role,
  name: locations[role].agentName,
  description: locations[role].description,
  kind: locations[role].kind ?? "browser",
  role,
}));

export const cityDimensions = { width: 28, depth: 16 };
