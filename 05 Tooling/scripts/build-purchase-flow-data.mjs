#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const vaultRoot = path.resolve(scriptDir, "../..");
const inputPath = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(vaultRoot, "02 Feature QA/End-to-End Purchase Coverage Matrix.md");
const outputPath = process.argv[3]
  ? path.resolve(process.cwd(), process.argv[3])
  : path.join(vaultRoot, "02 Feature QA/End-to-End Purchase Coverage Matrix.json");
const browserDataPath = process.argv[4]
  ? path.resolve(process.cwd(), process.argv[4])
  : path.join(vaultRoot, "02 Feature QA/End-to-End Purchase Coverage Matrix.browser-data.js");

function cleanInline(value) {
  return value
    .trim()
    .replace(/^`([^`]*)`$/, "$1")
    .replace(/\*\*/g, "")
    .replace(/\\\|/g, "|");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function splitTableRow(line) {
  const cells = [];
  let current = "";
  let inCode = false;
  let escaped = false;

  for (const char of line.trim().replace(/^\|/, "").replace(/\|$/, "")) {
    if (escaped) {
      current += char;
      escaped = false;
    } else if (char === "\\") {
      current += char;
      escaped = true;
    } else if (char === "`") {
      inCode = !inCode;
      current += char;
    } else if (char === "|" && !inCode) {
      cells.push(cleanInline(current));
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(cleanInline(current));
  return cells;
}

function isSeparatorRow(cells) {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function recordType(id) {
  if (/^E-/.test(id)) return "entry";
  if (/^T-\d/.test(id)) return "sequence";
  if (/^INV-/.test(id)) return "invalid";
  if (/^(TICKET|PRODUCT|MEMBER|TIER|BMUT|UPGRADE|POST)-/.test(id)) return "acceptance";
  if (/^(TCFG|PCFG|MCFG|GCFG|DCFG|PROTCFG|TIPCFG)-/.test(id)) return "configuration";
  if (/^(PAYPROV|PAY|MONEY|MIX|B-|C-|P-|G-|F-|A-|AUTH-|O-|X-|PP-)/.test(id)) return "branch";
  return id ? "reference" : "content";
}

const categoryDefinitions = {
  entry: ["Entry point", "Where a buyer or seller can begin or resume a purchase."],
  sequence: ["Purchase trace", "An end-to-end route through selection, checkout, payment, and outcome."],
  acceptance: ["Expected behavior", "A grouped contract describing what must work for a purchase family."],
  configuration: ["Configuration", "A setting or option that changes the purchase path or result."],
  invalid: ["Blocked combination", "A deliberately invalid, unreachable, deprecated, or unsupported path."],
  branch: ["Decision or rule", "A condition that changes access, basket state, payment, or finalization."],
  reference: ["Technical reference", "An API, platform, state, or source-backed implementation reference."],
};

const tracePrefixDefinitions = {
  E: "Entry surface",
  I: "Purchasable item",
  C: "Selection configuration or checkout step",
  A: "Access or identity context",
  AUTH: "Authentication interrupt",
  B: "Basket state or branch",
  P: "Payment method or tender",
  G: "Payment gateway or processor",
  F: "Purchase finalization",
  O: "Purchase outcome",
  X: "Post-purchase action",
  T: "End-to-end trace sequence",
};

const traceTermDefinitions = {
  WEB: "Public web",
  WIDGET: "Embedded widget",
  EVENT: "Event detail",
  SEATING: "Assigned seating",
  HOLD: "Hold link",
  DYNAMIC: "Dynamic",
  MEMBERSHIP: "Membership",
  GIFTCARD: "Gift card",
  PRODUCT: "Product",
  TICKET: "Ticket",
  LOGIN: "Login decision",
  GUEST: "Guest checkout",
  REVIEW: "Checkout review",
  QUESTIONS: "Customer or item questions",
  PAYMENT: "Payment step",
  CARD: "Card payment",
  MANUAL: "Manual entry",
  STRIPE: "Stripe",
  YUNO: "Yuno",
  AUTHNET: "Authorize.net",
  GA: "General admission",
  POS: "Point of sale",
  QPOS: "Quick point of sale",
};

function statusState(label) {
  const value = label.toLowerCase();
  if (/unreachable|invalid|unsupported|impossible|reject/.test(value)) return "blocked";
  if (/deprecated|legacy|dormant|historical/.test(value)) return "legacy";
  if (/pending|partial|candidate|unknown|gap|unproven/.test(value)) return "needs-proof";
  if (/verified|complete|current|source-mapped/.test(value)) return "verified";
  return "not-stated";
}

function describeTraceSegment(segment) {
  const parts = segment.trim().split("-").filter(Boolean);
  const prefix = parts[0]?.toUpperCase();
  if (!tracePrefixDefinitions[prefix]) return null;
  const detail = parts.slice(1)
    .map((part) => traceTermDefinitions[part.toUpperCase()])
    .filter((value, index, values) => value && values.indexOf(value) === index);
  return [tracePrefixDefinitions[prefix], ...detail].join(" - ");
}

function describeNaturalStep(step) {
  const value = step.toLowerCase();
  if (value.includes("webhook")) return "Provider callback finalizes the purchase";
  if (value.includes("invoice")) return "Invoice and purchased item records are created";
  if (value.includes("confirmation")) return "Buyer sees the purchase confirmation";
  if (value.includes("payment")) return "Payment is selected or processed";
  if (value.includes("checkout")) return "Buyer completes checkout requirements";
  if (value.includes("basket")) return "Basket is created, updated, or validated";
  return "Process step written in full";
}

function buildTrace(record) {
  const pathText = record.cells[1] || "";
  const steps = pathText.split(/\s+->\s+/).map((raw, index) => {
    const clean = raw.replaceAll("`", "").trim();
    const descriptions = clean.split("/").map(describeTraceSegment).filter(Boolean);
    return {
      number: index + 1,
      codeOrAction: clean,
      meaning: descriptions.length ? descriptions.join(" / ") : describeNaturalStep(clean),
    };
  }).filter((step) => step.codeOrAction);
  return {
    pathText,
    steps,
    expectedOutcome: record.cells[2] || "Not stated",
    verification: record.cells[3] || "Not stated",
  };
}

function preferredField(fields, patterns) {
  for (const pattern of patterns) {
    const match = fields.find((field) => pattern.test(field.label) && field.value);
    if (match) return match;
  }
  return undefined;
}

function makeFriendlyRecord(record) {
  const fields = Object.entries(record.values)
    .filter(([label]) => !/^id$/i.test(label))
    .map(([label, value]) => ({ label, value }));
  const statusField = preferredField(fields, [/status/i, /^state$/i, /verification/i]);
  const category = record.type;
  const titlePatterns = {
    entry: [/^surface$/i, /^entry/i],
    configuration: [/^dimension$/i, /^configuration$/i, /item family/i],
    invalid: [/invalid combination/i, /^condition$/i],
    acceptance: [/journey/i, /acceptance group/i, /^group$/i, /^behavior$/i],
    branch: [/^step/i, /^method$/i, /^gateway$/i, /^condition$/i, /^rule$/i, /branch/i],
    reference: [/^command\/action$/i, /item type/i, /^platform/i, /^state$/i, /^surface$/i],
  };
  const summaryPatterns = {
    entry: [/^starts with$/i, /concrete entry/i, /purchase capability/i],
    configuration: [/what changes/i, /sequence effect/i, /behavior/i, /values.*modes/i],
    invalid: [/backend behavior/i, /^result$/i, /expected/i],
    acceptance: [/coverage contract/i, /expected outcome/i, /^outcome$/i, /behavior/i],
    branch: [/sequence effect/i, /^result$/i, /finalization pattern/i, /eligibility/i, /rule/i],
    reference: [/access and special rules/i, /converges on/i, /description/i],
  };
  const titleField = preferredField(fields, titlePatterns[category] || []) || fields.find((field) => field.value);
  const summaryField = preferredField(fields, summaryPatterns[category] || [
    /expected outcome/i, /^outcome$/i, /^result$/i, /sequence effect/i, /behavior/i,
  ]) || fields.find((field) => field.value && field !== titleField && field !== statusField);
  const evidence = fields.filter((field) => /evidence|source|proof|anchor|converges on|implementation/i.test(field.label));
  let details = fields.filter((field) =>
    field !== statusField && field !== titleField && field !== summaryField && !evidence.includes(field)
  );
  const trace = category === "sequence" ? buildTrace(record) : undefined;
  if (trace) details = [];
  const title = category === "sequence"
    ? `Purchase trace ${record.id}`
    : titleField?.value || `${record.section}: ${record.id}`;
  const statusLabel = statusField?.value || (category === "invalid" ? "Expected rejection" : "Not stated");

  return {
    id: record.id,
    category,
    categoryLabel: categoryDefinitions[category]?.[0] || "Reference",
    title,
    summary: trace?.expectedOutcome || summaryField?.value || "No summary provided.",
    status: { label: statusLabel, state: statusState(statusLabel) },
    location: {
      sectionId: record.sectionId,
      sectionName: record.section,
      breadcrumb: record.sectionPath,
    },
    details,
    evidence,
    ...(trace ? { trace } : {}),
  };
}

function parseFrontmatter(lines) {
  if (lines[0] !== "---") return { metadata: {}, end: 0 };
  const metadata = {};
  let listKey = null;
  let index = 1;
  for (; index < lines.length && lines[index] !== "---"; index += 1) {
    const line = lines[index];
    const listMatch = line.match(/^\s+-\s+(.+)$/);
    if (listMatch && listKey) {
      metadata[listKey].push(listMatch[1]);
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (value) {
      metadata[key] = value;
      listKey = null;
    } else {
      metadata[key] = [];
      listKey = key;
    }
  }
  return { metadata, end: Math.min(index + 1, lines.length) };
}

function parseMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const { metadata, end } = parseFrontmatter(lines);
  const sections = [];
  const records = [];
  const headings = [];
  const stack = [];
  let currentSection = null;
  let tableIndex = 0;
  let index = end;

  const ensureSection = () => {
    if (currentSection) return currentSection;
    currentSection = {
      id: "document-introduction",
      title: "Document introduction",
      level: 1,
      path: [],
      blocks: [],
    };
    sections.push(currentSection);
    return currentSection;
  };

  while (index < lines.length) {
    const line = lines[index];
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const title = cleanInline(heading[2]);
      stack.splice(level - 1);
      stack[level - 1] = title;
      currentSection = {
        id: `${slugify(title)}-${sections.length + 1}`,
        title,
        level,
        path: stack.slice(0, level).filter(Boolean),
        blocks: [],
      };
      sections.push(currentSection);
      headings.push({ id: currentSection.id, title, level, path: currentSection.path });
      index += 1;
      continue;
    }

    if (line.startsWith("|")) {
      const rawRows = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        rawRows.push(splitTableRow(lines[index]));
        index += 1;
      }
      if (rawRows.length >= 2 && isSeparatorRow(rawRows[1])) {
        const headers = rawRows[0];
        const rows = rawRows.slice(2).map((cells, rowIndex) => {
          const values = {};
          headers.forEach((header, columnIndex) => {
            values[header || `column_${columnIndex + 1}`] = cells[columnIndex] ?? "";
          });
          const id = cleanInline(cells[0] ?? "");
          const record = {
            id: id || `${ensureSection().id}-table-${tableIndex + 1}-row-${rowIndex + 1}`,
            type: recordType(id),
            sectionId: ensureSection().id,
            section: ensureSection().title,
            sectionPath: ensureSection().path,
            values,
            cells,
            searchText: [id, ...cells, ...ensureSection().path].join(" ").toLowerCase(),
          };
          records.push(record);
          return record.id;
        });
        tableIndex += 1;
        ensureSection().blocks.push({
          type: "table",
          id: `table-${tableIndex}`,
          headers,
          recordIds: rows,
        });
      } else {
        ensureSection().blocks.push({ type: "text", text: rawRows.map((row) => row.join(" | ")).join("\n") });
      }
      continue;
    }

    if (/^```/.test(line)) {
      const language = line.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      ensureSection().blocks.push({ type: "code", language, text: code.join("\n") });
      continue;
    }

    const checklist = line.match(/^\s*-\s+\[([ xX])\]\s+(.+)$/);
    if (checklist) {
      ensureSection().blocks.push({
        type: "checklist",
        checked: checklist[1].toLowerCase() === "x",
        text: cleanInline(checklist[2]),
      });
      index += 1;
      continue;
    }

    const bullet = line.match(/^\s*(?:-|\d+\.)\s+(.+)$/);
    if (bullet) {
      ensureSection().blocks.push({ type: "listItem", text: cleanInline(bullet[1]) });
      index += 1;
      continue;
    }

    if (line.trim()) {
      const paragraph = [line.trim()];
      index += 1;
      while (
        index < lines.length &&
        lines[index].trim() &&
        !/^(#{1,6})\s+/.test(lines[index]) &&
        !lines[index].startsWith("|") &&
        !/^```/.test(lines[index]) &&
        !/^\s*(?:-|\d+\.)\s+/.test(lines[index])
      ) {
        paragraph.push(lines[index].trim());
        index += 1;
      }
      ensureSection().blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      continue;
    }

    index += 1;
  }

  const typeCounts = records.reduce((counts, record) => {
    counts[record.type] = (counts[record.type] ?? 0) + 1;
    return counts;
  }, {});
  const friendlyRecords = records.map(makeFriendlyRecord);
  const purposeSection = sections.find((section) => section.title === "Purpose");
  const friendlySections = sections.map((section) => ({
    id: section.id,
    name: section.title,
    depth: section.level,
    breadcrumb: section.path,
    recordCount: friendlyRecords.filter((record) => record.location.sectionId === section.id).length,
    content: section.blocks,
  }));

  return {
    schemaVersion: 2,
    document: {
      title: metadata.title || "End-to-End Purchase Coverage Matrix",
      description: purposeSection?.blocks.find((block) => block.type === "paragraph")?.text || "Human-readable map of purchase entry points, choices, rules, and outcomes.",
      sourceMarkdown: path.relative(vaultRoot, inputPath),
      generatedAt: new Date().toISOString(),
      metadata,
    },
    summary: {
      sourceLines: lines.length,
      totalSections: sections.length,
      totalTables: tableIndex,
      totalRecords: records.length,
      categoryCounts: typeCounts,
    },
    readingGuide: {
      startHere: "Use purchaseJourney for the overall flow, then filter records by category. Open a purchase trace to follow one complete route step by step.",
      howToReadARecord: [
        "title and summary explain the behavior in plain language",
        "status says how strongly the behavior is currently proven",
        "details contains additional conditions or effects",
        "evidence points to the source that supports the behavior",
        "location shows where the record came from in the Markdown source",
      ],
    },
    purchaseJourney: [
      { number: 1, name: "Entry", question: "Where did the buyer or seller begin or resume?" },
      { number: 2, name: "Item", question: "What is being purchased?" },
      { number: 3, name: "Configure", question: "Which quantity, seat, variant, package, or option applies?" },
      { number: 4, name: "Identity", question: "Is the customer a guest, logged in, or interrupted by authentication?" },
      { number: 5, name: "Basket", question: "How is inventory selected, held, and validated?" },
      { number: 6, name: "Checkout", question: "Which review, delivery, question, and agreement steps appear?" },
      { number: 7, name: "Payment", question: "Which tender and payment processor complete the charge?" },
      { number: 8, name: "Finalize", question: "How does the purchase command or provider callback create the sale?" },
      { number: 9, name: "Outcome", question: "Which invoice, ticket, membership, credit, or other artifact is issued?" },
      { number: 10, name: "Post-purchase", question: "What can happen after purchase, such as refund, transfer, resale, or settlement?" },
    ],
    glossary: {
      categories: Object.entries(categoryDefinitions).map(([id, [label, description]]) => ({ id, label, description })),
      tracePrefixes: Object.entries(tracePrefixDefinitions).map(([code, meaning]) => ({ code, meaning })),
      commonTerms: Object.entries(traceTermDefinitions).map(([code, meaning]) => ({ code, meaning })),
      statusStates: [
        { id: "verified", meaning: "Supported by the mapped source or marked current." },
        { id: "needs-proof", meaning: "Mapped partially or still requires environment-backed proof." },
        { id: "blocked", meaning: "Invalid, unreachable, unsupported, or expected to be rejected." },
        { id: "legacy", meaning: "Deprecated, dormant, historical, or retained for compatibility." },
        { id: "not-stated", meaning: "The source row does not provide an explicit status." },
      ],
    },
    sections: friendlySections,
    records: friendlyRecords,
  };
}

if (!fs.existsSync(inputPath)) {
  console.error(`Input Markdown not found: ${inputPath}`);
  process.exit(1);
}

const data = parseMarkdown(fs.readFileSync(inputPath, "utf8"));
fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(browserDataPath, `window.PURCHASE_FLOW_DATA=${JSON.stringify(data)};\n`);
console.log(JSON.stringify({ inputPath, outputPath, browserDataPath, summary: data.summary }, null, 2));
