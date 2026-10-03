---
title: Test Organizer and Venue Employee Permissions
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Test Organizer and Venue Employee Permissions

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

An Organizer or Venue Employee can do exactly the work allowed for their active Venue, role, enabled module, and required authentication. A Customer can access only their own account and orders. Being signed in is not permission to act for another Venue or Customer.

The Organization selector chooses the active Venue. A role is a bundle of Employee permissions; “Organizer” is not a universal all-access role.

## Prepare a small permission scenario

Use two controlled Venues and test accounts with known employment. Prepare one Employee with the exact required permission, one without it, and one with a relevant narrower permission. Record enabled modules and any additional verification requirement. Avoid the unrestricted Employee override for the restricted-role tests.

For example, Manage Events permits Event administration; Use Box Office and its Card/Other permissions affect sale paths; Manage Transactions and particular Refund/Void permissions are separate. Do not grant Manage Network as a workaround without verifying that authority is genuinely required.

## Set up the role, then prove the real work

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As an authorized Organizer, choose the controlled Venue and open Roles Manager. Select Add role, enter Role name, select the intended permissions, and select Save role. | Minimum permission set for the workflow | The role saves with exactly those permissions, not unrelated financial or cross-Venue authority. |
| 2 | In the Employee management screen, assign the role to the controlled Venue Employee and save. Reopen Employee details. | Existing controlled Employee | The saved assignment is correct. Use Add employees only when creating approved test employment is part of setup. |
| 3 | Sign in as that Employee and choose the intended Organization. Complete the allowed workflow, such as creating and reopening a Draft Event. | Owned test Event | The actual work succeeds; seeing a menu alone is not the proof. |
| 4 | Sign in as the Employee without that permission and try the same visible action. | Equivalent owned test record | The action is unavailable or clearly refused, and no record changes. |
| 5 | Choose the other controlled Organization and repeat the relevant access check. | Venue A record, Venue B employment | Venue A data and actions do not become available through Venue B authority. |
| 6 | For a sensitive action, complete or cancel its required additional verification in separate runs. | Approved test authentication | The action occurs only after successful verification; cancellation leaves data unchanged. |

## Exercise the handoffs that commonly hide permission defects

- Create an Event as one Employee; have a second correctly authorized Employee edit it and an unauthorized Employee attempt the same.
- Complete a Box Office sale with the exact Card/Other permission for its payment method; prove restricted methods are actually refused.
- Find a paid Transaction with read authority, then separately prove each allowed Refund/Void action. Read access must not imply mutation authority.
- Redeem Ticket Credit with the intended Box Office role. Verify Customer lookup and actual redemption, not merely a credit panel.
- Assign or remove a role during an isolated test session, then reopen and attempt the action. Compare immediate and reauthenticated behavior with the documented revocation policy.
- Check module-disabled versus permission-missing separately. A role cannot by itself prove that a disabled Memberships module is usable.

## Customer ownership and security checks

With two owned Customer accounts, confirm that each sees only their own orders, saved methods, credits, Memberships, transfers, and account details. Test the recipient after transfer rather than assuming purchaser identity stays the owner. For record-ID substitution, server-side denied requests, concurrent revocation, or cache invalidation, use scoped API/backend tests and authorized security tooling; a hidden button alone is weak protection.

Do not probe unrelated real Customer records. Never include tokens, full payment details, passwords, or Customer personal information in evidence.

## Senior-QA variation

Compare an Employee with multiple roles, multiple employments, a role removed during an open form, stale browser tabs, enabled/disabled modules, and different clients using the same backend permission. Confirm allowed and denied results with fresh reads. Preserve the exact permission set in the execution note so the test can be repeated without broad administrator access.

**Source route:** B17 and the current backend employment permission catalog. Visible labels verified in the frontend Roles Manager and Employee management components; bind navigation to the active client's menus.

## Source-backed cautions and automation reference

**Business risk:** staff cannot perform their allowed job, or users see/change another business's customers, money, tickets, or settings. Anchor: SPD-2390 involved a broader-permission workaround for Box Office credit lookup.

**Automation:** Playwright positive/negative roles and context switching; backend object ownership, direct API authorization, employment/module gates, and malicious identifier substitution. Hiding a button is not security proof. Source route: B17; frontend auth and affected feature callers.
