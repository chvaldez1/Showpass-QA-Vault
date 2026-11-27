---
title: AI Chat QA Library
tags:
  - qa/test-cases
---

# AI Chat QA Library

The Website editor's AI Chat and the shared AI Chat component are separate from a public website's checkout. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Start with an owned test site and a disposable draft page. Check where the assistant is available, what editor state a suggested change acts on, and which changes are actually saved to the draft. Compare the published page only when the test has its own approved publication step.

## Connected features

- [[03 Test Cases/Websites/Websites QA Library]]
- [[03 Test Cases/Events/05 Settings/01 Branding]]

## Existing cases

Use the linked vault notes as starting points. Check the exact feature behavior and existing coverage before adding a new definition.

## Draft cases

### TC-1: A Website checkout label changes only after its AI settings proposal is approved

**Title:** Dashboard - Website AI Assistant - Apply only the approved checkout label change

**Description:** A Website AI Assistant proposal shows the settings it would change. Declining a matched proposal keeps the current Website settings. Approving a matched proposal saves its exact checkout label and preserves the destination.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Use an owned disposable Website and an Organizer with **Manage Organization Info**. Have the setup owner confirm `enable_custom_websites` is on and the Website editor's **AI Assistant** can propose a Website setting on this test site.
* From **Websites**, open the Website’s **Settings → Checkout**. Use a Website that already points to a named **Website checkout page**. Record both the current page and **Checkout button label** before setting the distinctive baseline label `QA original checkout`. Save and reopen this setting.

**Tags:** dashboard, checkout, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the same Website editor, select the **AI** tab to open **AI Assistant** and ask for the checkout button label change. | `Set this website's checkout button label to QA review order. Keep the checkout destination unchanged.` | **Save website settings?** shows the correct Website and only the proposed **Checkout button label: "QA review order"**. If the assistant produces no matching proposal, stop and record the result as inconclusive. |
| Choose **Cancel**, then reload **Settings → Checkout** for the same Website. |  | The existing label remains `QA original checkout` and the destination is unchanged. |
| Reopen **AI Assistant** and ask for the same change. | Same request | A matching proposal shows the same Website, label and unchanged destination scope. If the proposal does not match, stop and record the result as inconclusive. |
| Select **Save settings** on the matched proposal, then reload **Settings → Checkout**. | Same Website | **Checkout button label** is `QA review order`. **Website checkout page** remains the recorded value. |

**Postconditions:** Restore the label recorded before setup in **Settings → Checkout** and verify it after reopening. Leave the recorded checkout destination unchanged.

## Proof and sources

**Status:** Local Organizer Tester draft. **Not run.** The Qase scan found website checkout settings and published route behavior in SPT-5135/5842. No matching AI Assistant approval and cancel comparison was identified in the reviewed saved definitions.

Frontend `AIChatPanel.web.tsx:118` shows the proposed setting and approval actions. `settings-tools.ts` limits accepted inputs. Backend `apps/websites/models.py:43` stores the label and `apps/websites/tests/test_dynamic_event_settings.py:82` covers saved checkout settings.
