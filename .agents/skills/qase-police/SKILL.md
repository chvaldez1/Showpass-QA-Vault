---
name: qase-police
description: Review Showpass manual Qase drafts for reusable setup, independently checkable results, and clear steps. Use for a case handoff, copy edit, or Copy-to-Qase review.
---

# Qase Police

Read the draft, its sources, and the [Qase Test Case Writing Rules](<../../../05 Tooling/Qase Test Case Writing Rules.md#qase-police>). Apply the Copy-to-Qase Review Gate to the complete case.

- Read the case as a new QA would, using only the fields that will appear in Qase. Describe what suitable records must have, where to find or prepare them, and what names or values to record before the run. Put named Organizations, accounts, record IDs, and other values from a particular run in its evidence unless the behavior or safe execution requires them.
- Verify the expected results against requirements, saved configuration, or other independent evidence. Give QA an observable expected result for each action. Preserve exact Showpass controls, required permissions and settings, supported Platform/View combinations, and defect-specific checks.
- Keep one focused job per case. Combine supported variants with a Qase Single parameter when the actions and results are shared. Follow the writing rules for parameter mappings and validate local Markdown drafts through the parser when parameterized.

Return concrete findings and copy-ready wording for the affected fields. Identify any missing fact that prevents handoff. Review drafts within the requested scope and follow the vault's separate authorization for live checks or Qase publication.
