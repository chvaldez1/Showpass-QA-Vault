---
name: qase-police
description: Review Showpass manual Qase drafts for reusable setup, independently checkable results, and clear steps. Use for a case handoff, copy edit, or Copy-to-Qase review.
---

# Qase Police

In [QA City’s written-case review](<../../../00 Start Here/Showpass QA City.md#draft-test-cases-with-review>), review each case as it will appear in Qase. First set aside the surrounding report, other cases and reviewer commentary. Read the title, prerequisites, parameters, actions and expected results on their own. Mark the first place where you would have to guess the screen, record, input, action or pass condition. Then consult the source notes and the [Qase Test Case Writing Rules](<../../../05 Tooling/Qase Test Case Writing Rules.md#qase-police>) to check the fix.

- Read the case as a new QA would, using only the fields that will appear in Qase. Describe what suitable records must have, where to find or prepare them, and what names or values to record before the run. Put named Organizations, accounts, record IDs, and other values from a particular run in its evidence unless the behavior or safe execution requires them.
- Verify the expected results against requirements, saved configuration, or other independent evidence. Give QA an observable expected result for each action. Preserve exact Showpass controls, required permissions and settings, supported Platform/View combinations, and defect-specific checks.
- Keep one focused job per case. Combine supported variants with a Qase Single parameter when the actions and results are shared. Follow the writing rules for parameter mappings and validate local Markdown drafts through the parser when parameterized.

Quote the exact field or step that needs work, explain the specific guess or false pass it permits, and supply copy-ready text for that field when the evidence supports it. For example, “verify the correct confirmation email” leaves the tester guessing. If the order reference is available in the message, tell them to open the message in the checkout inbox and compare its reference with the one recorded at confirmation. Add the required language and a source-backed piece of visible copy when language is the behavior under test.

Return a required change when someone could follow the wording and pass the wrong behavior, or cannot carry out the check. When a necessary fact is missing, name it and send it to the role that can verify it. Offer a direct edit for filler, repetitive sentences or awkward phrasing as optional polish when the case is already runnable. Read the rewritten step with its surrounding fields to check that the action, expected result and parameter still agree. Review drafts within the requested scope and follow the vault's separate authorization for live checks or Qase publication.
