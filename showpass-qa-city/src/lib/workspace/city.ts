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
    agentName: "Public Tester",
    description: "Explore Showpass as a visitor or signed-in customer, up to the point of purchase.",
    responsibilities: [
      "Find events and Organizer profiles through public navigation.",
      "Check public event details, ticket availability, and prices.",
      "Review existing orders and tickets in Account.",
    ],
    example: "Find a General Admission event and check what a signed-out visitor can see.",
    color: "#72d8f3",
    position: [-8.8, -4.3],
    size: [4.1, 2.4, 2.8],
  },
  "customer-tester": {
    name: "Ticket Shop",
    agentName: "Customer Tester",
    description: "Follow an approved test purchase from selection to the saved order and issued items.",
    responsibilities: [
      "Check ticket selection, basket contents, and checkout totals.",
      "Exercise the approved payment outcome in the test environment.",
      "Verify the saved order and issued tickets, Products, or Memberships.",
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
    description: "Exercise order lookup, sales, ticket delivery, and Check In as a Venue Employee.",
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
    agentName: "Qase Grammar Police",
    description: "Review a manual Qase case for clear wording, necessary setup, and useful parameters.",
    responsibilities: [
      "Keep the prerequisites a person needs to run the case.",
      "Use exact Showpass labels and expected results the person can observe.",
      "Group supported variants into one Qase parameter when they share the same steps.",
    ],
    example: "Review a ticket transfer case for unnecessary prerequisites and check whether order and guest questions can share one case.",
    kind: "coverage",
    codexPrompt: "Use $qase-grammar-police to review a Showpass Qase case draft. Ask me for the draft or its vault path and any source notes.",
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
