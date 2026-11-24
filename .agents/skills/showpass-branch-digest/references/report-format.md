# Grouped digest format

Use the reference’s teal/coral/ink styling and concrete headlines. Use the repository terminology check in SKILL.md before drafting: visible product words in instructions, precise record/lifecycle names in evidence. Do not blur game-ticket transfers with Membership transfers, or a Member lookup with successful admission. Name Refund and Void explicitly when credit restoration differs; avoid an ambiguous “voucher returns” headline. Optimize the main report for scanning, with full traceability available on demand. No fixed page limit.

## Reading order

1. **Short opening:** use **Release <user-provided version> — Upcoming changes** as the document title/H1 and include the version in the dated output filenames and evidence. Keep the date and source snapshot separately visible. Never substitute the repository’s package version or infer that the label proves deployment. Then show what matters, compared branches and snapshot time. Preserve the saved snapshot when revising presentation. Mention material refresh or evidence limitations once, distinguishing fresh remote refs from a checkout whose pull was skipped.
2. **Workflow groups with compact change entries:** keep related changes together, usually five to eight groups when the scope warrants it. Each meaningful change is a short expandable entry, not a full expanded card or a separate entry per commit. Inside it, answer these questions in order:

   - **What changed:** one concrete explanation of the behavior plus material setup/limits.
   - **Where it came from:** Jira, PR and verified commit links for this change. Keep long commit lists expandable. Preserve commit-derived/blocked labels and the saved source snapshot.
   - **Does it have a Qase case?:** show actual saved IDs, match status/limitations and title-only proposals. Show Engineering/Unknown honestly when applicable. A saved definition is not a passing execution.
   - **What to test and why:** place only the checks this change motivates here. Explain what changed, the existing result it could affect, and what the test proves. Show priority and Qase for each check, then expandable exact prerequisites, numbered actions, expected-result bullets and stopping limits. Keep supported clients and required physical-device/financial/Inventory/access proof. Split an old area-wide pack when its checks protect different changes. Mark optional preparation/comparison baselines explicitly rather than presenting them as directly required by the diff.

   Keep one full copy of each checklist under its primary change. Other relevant changes explain why it also applies and link to the same checklist, with Qase limits visible. Do not repeat entire packs in several groups or send readers to a separate area-wide regression list. Keep shared result IDs and prerequisite dependencies in evidence. HTML links must reveal hidden parent entries; preserve useful old anchors when revising an existing report.

   Use only relevant saved starting cases for an individual check and keep Partial/Needs review limits. If the saved review only established a broad journey match, do not call each subcheck fully covered; leave the exact match Unknown/Needs review when necessary. Keep the complete read timestamp/count and mapping evidence in the existing sidecar. Avoid full Qase drafts. Never manufacture regression for every small change merely to fill a section: state when no extra shared-QA check is selected, with owning-team acceptance/Qase separate.
3. **Brief scope and evidence:** after the groups, link the existing evidence sidecar containing individual change records, sources, revisions, all commits/files and historical/shared-base classifications. Do not paste full paths, SHAs, raw inventories or the original long change cards into the main reading flow. Preserve these records when regrouping.

## Testing responsibilities

Do not add a separate Feature teams / Whole QA team responsibility banner. Keep ownership in brief shared regression guidance near the opening.

Owning teams validate each new or changed feature and its detailed acceptance/configuration/rollout rules. The whole QA team shares cross-feature regression protecting established business journeys around changed shared code. Divide the pack across testers/clients; do not imply every tester repeats every check. A new feature’s entire acceptance matrix is not automatically central-QA regression.

Select regression from source impact. Preserve a clean successful control and actual money/fee, Inventory, fulfillment, ownership and access outcomes. Include unchanged clients that call the changed behavior, and separate physical-device proof from browser proof. Do not impose unsupported controls across all platforms. A short summary is not a substitute for required financial proof during actual execution.

## Required setup beside each check

Use the vault’s Handbook and test-writing setup rules, then verify the relevant backend eligibility and frontend visibility at the report’s saved revisions. Keep only execution-critical prerequisites: exact visible label and required value, owning record and location, necessary role/permission, starting order/ticket state, relevant time window and supported completion evidence. Explain any inheritance or hidden-control gate. Separate preparation access from the role performing the test, and give one restoration instruction for changed test settings. If an action or required setup cannot be established, name that gap; do not invent a screen or silently replace the workflow.

For example, Customer **Return free tickets** requires the Venue’s **Allow free return** setting ON, permitted Event/Ticket Type settings and eligible free tickets. That setting is distinct from Customer Self Refund Settings, a voucher-fix switch and the staff Refund action. State where to find and save the required values, how to reveal any hidden Ticket Type control, and which ticket/payment conditions allow the action. Explain the exact before/after result. Trace the chosen path to the changed behavior before treating it as evidence for a specific fix. Recheck the full local checklist and all repeated instances when a prerequisite changes.

## HTML and Markdown

Use `assets/report-shell.html` for HTML. One article per reading group, not per ticket. Replace every template slot, escape inserted text/attributes and use real anchors. Match the Markdown’s groups, caveats, tracking and regression. Each compact change entry contains its own source links, Qase assessment and tests with their selection reasons. Shared tests have one full copy and working local links from other related changes. Shared setup and result-recording guidance can appear near the opening; a brief evidence section follows the groups. Do not restore a separate final regression pack.

Maintain natural page height, readable mobile/print styles and the teal/coral visual identity. Optional details may be empty. Detailed evidence can stay in the linked JSON sidecar; the main report must remain useful without opening it. Use Martian Grotesk/Lato when installed, with system fallbacks and no external asset dependency.

For a tiny or no-change diff, shorten the structure rather than inventing groups or regression scope. Counts describe the inventory, not readiness or test coverage.
