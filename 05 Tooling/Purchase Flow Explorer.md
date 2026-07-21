---
title: Purchase Flow Explorer
tags:
  - qa
  - purchase-flow
  - tooling
---

# Purchase Flow Explorer

Open [the explorer](purchase-flow-explorer/index.html) to browse and visualize [[02 Feature QA/End-to-End Purchase Coverage Matrix]].

The Markdown note remains the source of truth. These generated files are derived from it:

- `02 Feature QA/End-to-End Purchase Coverage Matrix.json` - portable structured data
- `02 Feature QA/End-to-End Purchase Coverage Matrix.browser-data.js` - browser-readable copy for direct file opening

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
