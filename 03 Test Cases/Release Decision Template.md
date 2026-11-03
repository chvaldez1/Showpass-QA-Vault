---
title: Release Decision Template
tags:
  - qa/template
  - qa/release
---

# Release coverage: [Change or release]

Use these sections in the existing feature/run note. Create a feature-specific note only when none exists; leave this reusable template unchanged. Follow [[00 Start Here/World-Class Software Quality Standard]] for scope, evidence and applicable release gates.

## What is changing?

- **Change and business risk:** [What the customer/employee does, what changed and what could go wrong.]
- **Build and environment:** [Actual tested build/version, environment and date; say Unknown when deployment is unverified.]
- **Affected workflows and clients:** [Relevant customer/employee entry points, permissions, flags, existing records and configuration.]
- **Scope limits:** [What this review excludes and why.]

## What test coverage do we have?

Use one row for a distinct behavior or outcome, such as successful purchase, rejected payment, saved settings or released inventory. Split clients/configurations when their behavior differs. Keep successful flows separate from failure/recovery. Link the relevant existing cases and exact assertions; a matching title is not enough.

| Behavior / scenario | Overall coverage | Qase test | Playwright automation | Browser test | Latest results / evidence | Missing checks |
| --- | --- | --- | --- | --- | --- | --- |
| [Specific behavior, client and relevant setup] | [Full / Partial / None / Unknown] | [Coverage extent + real saved SPT IDs/links, None or Unknown] | [Coverage extent + test/assertion link, None or Unknown] | [Planned walkthrough/spec or executed report + link, None or Unknown] | [Result for each relevant check, build/date and exact evidence; use Not run when unexecuted] | [Exact missing behavior, assertion, setup or execution] |

### How to fill this in

- **Overall coverage:** Full means suitable checks account for all meaningful outcomes in that row's declared scope. Partial means a named outcome is missing or only partly checked. None means no suitable check was found after review. Unknown means the relevant coverage has not been reviewed. Explain excluded combinations rather than silently counting them as covered.
- **Qase test:** Does a saved case exist, and does it fully or partly cover this behavior? Link the actual case and describe any gap. A local draft is not a saved Qase case. If Qase was not read, say Unknown. Record execution separately; publication does not mean Passed.
- **Playwright automation:** Does an existing test actually assert this outcome? State Full or Partial and link the exact test/helper assertion. Keep proposed, implemented-but-unrun, skipped and quarantined work explicit. A filename or a completed checkout alone does not prove every payment, ticket, inventory or reporting result.
- **Browser test:** Is there a repeatable browser walkthrough/spec or an executed browser report? Label a planned walkthrough Not run; link the actual report/steps for an executed check. State any partial coverage. This can be the same journey as the Playwright test; reuse evidence rather than requiring a duplicate manual run.
- **Latest results / evidence:** Use Passed, Failed, Blocked, Not run or Not applicable for each relevant method/check. Include tested build/configuration and date. Link actual results, not just test definitions. Older results need a reason they still apply. Coverage can be Full while its current execution is Not run.
- **Missing checks:** Say exactly what is absent: no Qase case, incomplete expected results, missing automation assertion, no browser walkthrough, unrun test, unavailable device or missing final saved result. An absent test in one tool does not automatically make overall coverage Partial if another suitable method fully proves the outcome.

Use Not applicable with a reason where a method does not fit. Add backend/component tests, Appium, physical devices, exports or other evidence when they prove an affected outcome. Do not force everything into Playwright or require every behavior to have all three test types.

## What still needs testing for this release?

| Check still needed | Why existing coverage is insufficient | How to test / starting point | Expected result |
| --- | --- | --- | --- |
| [Focused manual, browser, automated or device check] | [Exact gap or changed behavior] | [Existing case/run or concrete setup and visible actions] | [Observable result that closes the gap] |

Include relevant clean success, rejection, recovery, saved changes, downstream results and cleanup. Reuse applicable automated results and focus manual work on what they do not prove. Do not convert a missing definition into an execution pass.

## Bugs, blockers and cleanup

- **Confirmed failures:** [Actual behavior, business impact and linked bug/evidence. Keep reported symptoms and hypotheses distinct.]
- **Blocked or unrun checks:** [Missing setup/access/device/evidence and the effect on confidence.]
- **Data changes and cleanup:** [What changed, what was restored or safely retained, and what remains unverified; Not applicable with a reason when no data changed.]

## Release recommendation

**Recommendation:** [Go / Go with known non-blocking issues / No-Go / Decision blocked by named missing evidence.]

**Why:** [Which important outcomes have applicable passing evidence, which remain unproven, and whether a confirmed failure blocks release. Link any explicit acceptance of remaining risk when relevant.]

Full test definitions, a large pass count or an accepted risk do not turn an unrun/failed financial, inventory or access check into Passed. Keep current results separate from coverage completeness. Put source revisions and detailed technical evidence in supporting notes when useful; no owner or sign-off fields are required by this template.
