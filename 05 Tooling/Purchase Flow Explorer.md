---
title: Purchase Flow Explorer
tags:
  - qa
  - purchase-flow
  - tooling
---

# Purchase Flow Explorer

Open [the explorer](purchase-flow-explorer/index.html). It starts with a collapsed, clickable purchase-flow canvas. The other tabs retain the detailed [[02 Feature QA/Purchase Coverage/End-to-End Purchase Coverage Matrix]].

## Current canvas

Reviewed **November 16, 2026** against the local backend and frontend. This is a selective source map, not proof that a live purchase passed or that every combination is supported.

| Repository | Local branch | Reviewed revision |
| --- | --- | --- |
| Backend `web-app` | `master` | `59c396159a28bd3db74b407c28a8f36ae1921eb9` |
| Frontend `showpass-frontend` | `develop` | `e5716f9136cf144faa818ea801a52ef0bfc0d226` |

Both source working trees were clean at review. Their different branches do not establish a compatible deployed pair. Saved Venue settings, flags, Employee permissions and gateway/device availability were not inspected.

The canvas has **8 main stages and 70 nodes**: 63 have selected current source reviewed; 7 are explicitly partial or older reference mapping. These are mapping counts, not passing tests. Its 45 source references include implementation files and repository guides, with line numbers and revisions.

- Select a stage in the left menu to bring it into view. Select **+** to open its branches; select the card title to read the detail panel.
- Search by an item, payment method, outcome or source path. Selecting a result opens its ancestors.
- Choose a guided example for a clean ticket purchase, no external payment, Waitlist enrollment, terminal payment or confirmed-payment recovery. These highlight representative paths; they do not generate arbitrary supported combinations.
- Drag the background or use arrow keys in the canvas to pan. Use **+ / −**, **Fit**, **Collapse all** and **Reset** to control the view. Ctrl/Command + scroll also zooms.
- Read **When this applies**, **What happens**, **Continue / return** and the source references in the detail panel. Copy a source's absolute path and line number when needed.

Solid arrows show the ordinary sale sequence. Dotted branches show conditions or alternatives; they are not steps that every purchaser follows. Waitlist enrollment can end before an invoice/payment. Provider confirmation, saved financial lines, primary issuance, later Membership/benefit creation and delivery remain separate milestones.

The processor is configured context, rather than a universal first action by the Customer. Backend direct Stripe charging is distinguished from the current online PaymentIntent route. Pay What You Can, in-basket upgrades, payment plans and terminal tips have their own branches and explicit limits. Refund, Void, Exchange, Transfer, Resale, admission and settlement appear as later lifecycles; this overview does not re-audit every policy/client combination.

### Canvas files and maintenance

- `05 Tooling/purchase-flow-explorer/index.html` — default canvas plus retained reference tabs.
- `05 Tooling/purchase-flow-explorer/canvas-data.js` — curated nodes, conditions, outcomes, connections, source locations and revision metadata.
- `05 Tooling/purchase-flow-explorer/canvas.js` — rendering, search, guided examples, pan/zoom and view links.
- `05 Tooling/purchase-flow-explorer/canvas.css` — canvas layout and responsive styles.

No framework, CDN, API connection, build or account is required. Open the saved HTML with its sibling files in place. View links preserve the selected node, expanded branches, example and audience lens; they do not store business data. Source links assume the repositories remain siblings of this vault. Over an HTTP preview, the page shows copyable source paths instead of broken links outside the preview root.

After a source change, trace the affected branches again and update their text, sources and revision metadata in `canvas-data.js`. Do not change a partial mapping to reviewed merely because a matching filename exists. Regenerating the older reference dataset does not update or re-verify the curated canvas.

### Page verification — November 16, 2026

These checks tested the local explorer, not Showpass purchases.

| Check | Result |
| --- | --- |
| JavaScript syntax; unique node IDs; parent chains; jump/example destinations; all 45 source files and line bounds | Passed |
| Collapsed start, expand/collapse, nested branches and selected card staying visible | Passed in Codex in-app HTTP preview |
| Search, no-results message, result selection and restoring a selected branch after reload | Passed in preview |
| All six example choices; audience highlighting; zoom; keyboard and pointer-drag pan | Passed in preview |
| About dialog; copying a source path; keyboard tab navigation | Passed in preview |
| Retained reference search and trace selection | Passed in preview |
| Browser console warnings/errors during checked interactions | None observed |
| Direct `file:` opening | Not browser-verified: the Codex in-app browser only permits HTTP(S) navigation. Static inspection confirms relative classic scripts/styles and no fetch/build requirement. |
| Narrow Codex panel layout | Checked in the current in-app browser; map uses the full available width and the detail panel follows below |
| Physical mobile-device interaction | Not run |
| Live checkout, provider/device, worker, Inventory, delivery, fees, reports and saved configuration | Not run; this request produced a source map |

Preview evidence: local screenshot below. It documents the page's interaction and wording, not an executed Showpass purchase.

<img src="../99 Archive/QA Evidence/purchase-flow-explorer/2026-11-16-canvas/purchase-flow-canvas.jpg" alt="Purchase flow canvas with the Event tickets branches open" width="600">

## Older reference dataset

The Markdown matrix remains the source of truth for the older reference records. Its entire catalog was **not** re-certified against the canvas revisions. These generated files are derived from it:

- `02 Feature QA/Purchase Coverage/End-to-End Purchase Coverage Matrix.json` - portable structured data
- `02 Feature QA/Purchase Coverage/End-to-End Purchase Coverage Matrix.browser-data.js` - browser-readable copy for direct file opening

The JSON uses a human-facing schema:

- `document` - title, purpose, source note, and generation details
- `summary` - total records and category counts
- `readingGuide` - a short explanation of how to navigate the data
- `purchaseJourney` - the ten plain-English stages shared by purchase flows
- `glossary` - category, trace-prefix, common-term, and status definitions
- `sections` - readable document sections and their supporting narrative
- `records` - named purchase facts with a summary, status, details, evidence, and source location
- `records[].trace` - numbered plain-English steps, expected outcome, and verification state for purchase traces

The generator deliberately omits parser-only table cells and search text. The explorer creates its search index in the browser.

Regenerate both derived files after changing the Markdown:

```sh
node "05 Tooling/scripts/build-purchase-flow-data.mjs"
```

The explorer opens directly from the filesystem and does not require a local server.
