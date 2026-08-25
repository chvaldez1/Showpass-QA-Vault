---
title: Event Management Qase Suite Reorganization
date: 2026-08-24
tags:
  - qa/coverage-map
  - qase
  - events
aliases:
  - Event Management Qase Folder Moves
---

# Event Management Qase Suite Reorganization

> [!success] Reorganization applied
> Qase was read again on 2026-08-24 after the approved changes. Three event-level suites were created under suite 80 and 22 cases were moved. Every case destination passed readback verification; no case content changed.

Related coverage:

- [[03 Test Cases/Events/event-management-qase-test-cases|Event Management Qase Test Cases and Gap Analysis]]
- [[03 Test Cases/Events/event-management-qase-test-cases|Event Management Qase Test Cases]]
- [[03 Test Cases/Events/event-management-csv-to-qase-test-case-map|Event Management CSV to Qase Map]]

## Current Live Tree

```text
Events (79)
├── Event Overview (1053)
│   └── SPT-5071
├── Create Events (80)
│   ├── Map Editor (82)
│   ├── Create / Edit Events (84)
│   │   ├── Google Events - Event Categories (81)
│   │   ├── Ticket Types (83)
│   │   │   └── Delivery Settings (448)
│   │   ├── Order Form & Custom Questions (446)
│   │   ├── Edge Cases (820)
│   │   └── Advanced Options (1049)
│   ├── Attraction Configuration (674)
│   │   ├── Special Events (480)
│   │   └── Event & Ticket Display (999)
│   ├── Email Guests (1035)
│   ├── Branding (1050)
│   ├── Email Customization (1051)
│   └── Tracking Links (1052)
└── Manage Events List (85)
```

Suite 80 contains five direct cases: SPT-5072, SPT-5079, SPT-5080, SPT-4288, and SPT-4902. The user later created Event Overview (1053) and moved SPT-5071 into it. Suite 85 `Manage Events List` remains a sibling under Events (79), which is correct.

## Reviewed Structure Decision

- Keep suite 85 `Manage Events List` at the same level as suite 80.
- Keep suite 84 named `Create / Edit Events`.
- Use suite 84 as the umbrella for the Create Event and Edit Event forms.
- Keep small Edit sections directly in suite 84; create a child suite only when a section has several cases or will continue to grow.
- Do not create separate top-level `Edit`, `Manage`, `Promote`, `Reports`, or `Overview & Navigation` folders under suite 80.
- For cross-scope features, keep the broad suite in place and create an event-level folder under suite 80 only when event-owned cases can move into it. Use the folder description to reference the broad venue/shared suite.

## Completed Folder Changes

### Event-Level Folders

| Folder Under Create Events (80) | Qase Suite | Moved Cases | Folder Description Reference |
| --- | ---: | --- | --- |
| Branding | 1050 | SPT-4126, SPT-4128 | Event-level Branding coverage. See suite 744 for venue-level and shared Branding coverage. |
| Email Customization | 1051 | SPT-3618, SPT-4150, SPT-4151 | Event-level Email Customization coverage. See suite 749 for venue-level, shared, and unsplit hybrid coverage. |
| Tracking Links | 1052 | SPT-4239, SPT-4242, SPT-5010, SPT-5011 | Event-owned Tracking Links coverage. See suite 183 for global list, export, and attribution coverage. |

### Optional Name Cleanup

| Current Suite | Optional Change |
| --- | --- |
| 81 `Google Events - Event Categories` | Rename to `Google Event Categories` for consistency with the shorter sibling titles |

No other folders need to be created under suite 80 based on the current case volume.

## Existing Suites That Should Stay Where They Are

| Suite or Cases | Decision |
| --- | --- |
| Suite 85 Manage Events List | Keep as a sibling of Create Events under Events (79) |
| Suite 744 Branding | Keep at Dashboard level because it covers both venue branding and event branding |
| Suite 749 Email Customization | Keep outside suite 80 because it contains venue-level, event-level, and hybrid coverage |
| Suite 183 Tracking Links | Keep at Dashboard level because it contains global and event-owned coverage |
| Suite 1034 Hard Copy | Event-related but not part of the event-management sidebar structure |
| Suite 949 Workflow Approval - V1 | Leave unchanged because workflow approval is outside this feature-parity move |

## Verified Placement for SPT-5071–SPT-5080

These placements were verified after the approved move.

| Qase Case | Verified Suite |
| --- | --- |
| SPT-5071 Event Overview | Event Overview (1053), moved later by the user |
| SPT-5072 Pages by event type | Keep directly in Create Events (80) |
| SPT-5073 Draft lifecycle | Create / Edit Events (84) |
| SPT-5074 Edit entry points | Create / Edit Events (84) |
| SPT-5075 Restricted access | Create / Edit Events (84) |
| SPT-5076 Protected event states | Edge Cases (820) |
| SPT-5077 Custom Display Fields | Create / Edit Events (84) |
| SPT-5078 Advanced Options | Advanced Options (1049) |
| SPT-5079 Edit Sellers | Keep directly in Create Events (80) |
| SPT-5080 Stats & Info | Keep directly in Create Events (80) |

## Execution Ledger

| Operation Group | Status | Evidence |
| --- | --- | --- |
| Live suite read | Complete | 234 suites read on 2026-08-24 after Map Editor, Email Guests, and Advanced Options were updated |
| Proposed structure review | Complete | Preserves suites 84 and 85, leaves Workflow Approval alone, and separates event-owned cases from cross-scope suites |
| Qase suite creation | Complete | Branding (1050), Email Customization (1051), and Tracking Links (1052) created under suite 80 and read back |
| Qase case moves | Complete | 22 approved `suite_id` updates returned HTTP 200 and passed per-case readback verification |
| Case-content preservation | Complete | Titles, tags, parameters, and step counts were unchanged by the suite-only batch |
| Final suite-tree read | Complete | The post-reorganization read found six direct cases in suite 80; the later user change moved SPT-5071 to Event Overview (1053), leaving five direct cases in suite 80 |
