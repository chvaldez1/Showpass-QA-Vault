---
title: Branding QA Library
tags:
  - qa/test-cases
---

# Branding QA Library

Organization branding is the shared default. An Event can provide an override for supported fields and consumers. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Prepare one Organization with distinct default assets and an Event with one override. Reopen the saved setting, then use the applicable public page, preview email or ticket output to check the effective choice. Match what was saved to the actual delivery surface.

## Connected features

- [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Branding → Identity]]
- [[03 Test Cases/Events/05 Settings/01 Branding]]
- [[03 Test Cases/Orders/customer-email-language-test-cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-4125](https://app.qase.io/case/SPT-4125) · Dashboard - Branding - Apply organization branding to event emails
- [SPT-4126](https://app.qase.io/case/SPT-4126) · Dashboard - Branding - Verify single event email branding overrides venue branding
- [SPT-4742](https://app.qase.io/case/SPT-4742) · Dashboard - Branding - Digital Wallet Branding Management Flow

### TC-1: Restore the Organization logo on a public Event after clearing its override

**Title:** Dashboard - Event Branding - Show the Organization logo after removing the Event logo

**Description:** An Organizer removes one saved Event logo. The direct public Event page then shows the Organization’s saved logo in its navigation header. The Event’s other saved branding stays in place.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Use an isolated test Organization with **Manage Events** and **Manage Organization Info** for the Organizer. Have the setup owner confirm `branding_hub` and `enable_branded_pages` are enabled for the Organization.
* Use one future published single Event owned by the Organization. Prepare a signed-out browser context for its direct Showpass Event page and record the Event name and URL.
* The Organization has a saved recognizable logo. The Event has a visibly different saved logo and a saved **Primary color**. Record both logos and the exact Event **Primary color**. Have the original Event logo file ready to restore. Use a 600 × 200 px PNG under 3 MB.

**Postconditions:** In the same Event’s **Settings → Branding**, choose the original file under **Brand assets → Logo**, select **Finish Cropping**, and select **Save**. Reopen **Branding** and reload the public Event page in the guest session. Verify the original Event logo returns and the saved **Primary color** is still the recorded value.

**Tags:** dashboard, appearance, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the guest, open the direct public Showpass Event page. | Recorded Event URL | The expected Event opens and its navigation header shows the recorded Event logo. |
| As the Organizer, go to **Build → Events → All events**. Open the recorded Event and choose **Settings → Branding**. | Recorded Event name | **Brand assets → Logo** displays the Event’s saved logo. The **Primary color** matches the recorded value. |
| Select the **×** on the saved **Logo** thumbnail and select **Save**. | Existing Event logo under **Brand assets** | **Branding configuration saved** appears. |
| Open another Event settings page, then reopen **Branding**. | Same Event | **Logo** has no Event image selected. **Organization value** shows the recognizable Organization logo and **Primary color** retains its exact recorded value. |
| As the guest, reload the direct public Showpass Event page. | Same Event URL | The navigation header shows the recorded Organization logo where the Event logo previously appeared. |

## Proof and sources

**Execution:** Not run. The SPT project snapshot contained 2,492 definitions. [SPT-4126](https://app.qase.io/case/SPT-4126) checks an Event override and unset fields in delivered email. [SPT-5465](https://app.qase.io/case/SPT-5465) clears a saved Organization Identity field and checks its Dashboard preview. [SPT-5842](https://app.qase.io/case/SPT-5842) checks published website branding during navigation. The reviewed definitions leave the change from an existing Event logo to the inherited logo on the direct public Event page unverified.

Backend `b8dcfa8726db12b759e7960f07455c2e7b8fa8b7` resolves Event branding from the Event and owning Organization. Frontend `5867dd39dcde15e7424625faee03d583860ab437` mounts the Event Branding form from the actual Next.js route. It sends a cleared field on save, maps the resolved logo into the page theme, and renders it in the public navigation header. [Branding hierarchy](<../../../web-app/apps/core/branding_customization/resolver.py#L243>) · [Public resolver](<../../../web-app/apps/venues/services/branding/public_branding_resolution.py#L18>) · [Event Branding route](<../../../showpass-frontend/packages/next-app/pages/manage/events/[slug]/branding.tsx#L10>) · [Save cleared field](<../../../showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/ui/components/BrandingConfigForm/BrandingConfigForm.web.tsx#L90>) · [Public page logo](<../../../showpass-frontend/packages/next-app/templates/PublicPage/PublicPage.web.tsx#L144>)
