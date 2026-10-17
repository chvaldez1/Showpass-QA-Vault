---
title: Organization Registration - Qase-Ready Cases
date: 2026-10-15
tags:
  - qa/gap-analysis
  - registration
  - organizer
status: 10 Qase definitions published and verified; 2 local drafts held; execution pending
---

# Organization Registration - Qase-Ready Cases

Qase comparison found one broad registration case plus three plan cases. The work is now split into **12 focused cases**: SPT-1657 updated and nine cases created in **Register, suite 182**; TC-7 and TC-10 remain local and unpublished. Each case below can be read independently. Publication was verified; end-to-end execution remains pending.

**Page selection:** no flag/switch selecting Angular versus Next.js was found. Demo serves Angular; the deployed Next.js entry still needs confirmation. `enable_new_suborg_registration_page` is for a different child-organization flow. Fields below are prepared for Qase; this is not an executed production-readiness sign-off.

## Registration Cases

### SPT-1657: Create an organization with the entered details

**Title:** Web Public - Organization Registration - Create an organization with the entered details

**Description:** Verify that registration creates one organization with the chosen settings and owner access. An Organization is the business owning Events and employees, separate from the person's Showpass login. Run with a signed-in account creating its first organization and with an existing organizer creating another. Also repeat on the test site with a Showpass super-admin; Salesforce Account ID and Client Type are optional outside production.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Have the selected account: no existing organizations, owner of an existing organization, or Showpass super-admin. Record the existing organization names before starting.
* Use an approved test backend because registration creates organization ownership and can notify sales/CRM. Have a controlled phone number and an unused organization name, at most 64 characters.
* For ordinary active registration, `enable_venue_upon_registration` is ON for the account. Use CAD with known matching IP region and a name checked against the enabled similar-name rule; record the effective fraud-check switches.
* An authorized administrator can search Admin → Venues → Venue and read the new organization and its owner employment without saving.

**Tags:** public, registration, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Register Organization. | Selected account and page version. | The first-time organizer sees details; an existing organizer sees the create-organization choice. |
| Select Create New Organization / Create a new organization if the organization-choice screen is shown. |  | The details form is available. |
| Enter the organization details. | Unused name; controlled phone; America/Edmonton; CAD; Google Search. | The entered details are shown. |
| Inspect the currency and referral choices. | Currencies: CAD, USD, EUR, GBP, AUD. Referral: Google Search, Platform Review Website, Showpass Marketing Email, Facebook, Instagram, LinkedIn, Referral, Showpass Sales Team, Trade Show, Other. | Both lists contain the stated choices. |
| Select Continue. |  | The plan page opens without creating the organization. |
| Submit Professional once. | Angular: Choose Plan under Professional. Next.js: Continue under Professional. | Registration completes in the new organization’s Create Event screen. |
| Have the administrator reopen the created organization record and owner employment. | Search the recorded new name. | Exactly one organization has the entered details, Professional plan and the registering account as owner. |
| Refresh the destination. |  | The new organization remains selected without another organization being created. |

**Postconditions:**

* Retain the created organization and its reference for the assigned cleanup owner; do not create an Event or delete existing organizations.
* Existing organization settings and access remain unchanged.

### SPT-5367: Return to registration after sign-in

**Title:** Web Public - Organization Registration - Return to registration after sign-in

**Description:** Verify that a signed-out person must sign in and returns to organization registration with referral and plan-link information retained. This does not test creating a new Showpass login.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Have an existing Showpass login and begin signed out.
* Have the confirmed registration link with `?pkg=vpt_basic&referrer=Registration%20review`; these query values are the behavior under test.

**Tags:** public, registration, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared registration link. | pkg=vpt_basic; referrer=Registration review. | The sign-in page opens. |
| Sign in. | Existing account. | The account returns to registration. |
| Open organization details, using Create New Organization / Create a new organization if shown. |  | The details form is available. |
| Inspect the referral fields. |  | Referral and Registration review are prefilled. |
| Inspect the returned registration address. | pkg=vpt_basic; referrer=Registration review. | The original query values remain in the registration address after sign-in. |

**Postconditions:**

* Clear the unsubmitted form and restore any temporary browser view or timezone settings.
* No organization is created and no existing organization is changed.

### SPT-5368: Keep existing dashboard access

**Title:** Web Public - Organization Registration - Keep existing dashboard access

**Description:** Verify that an existing organizer can use their dashboard or begin another registration without changing an organization they already own.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Sign in as an ordinary organizer who owns an organization; record its name, timezone, currency and plan.
* Have read access to that organization’s settings and the selected registration entry link.

**Tags:** public, registration, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Register Organization. |  | The page recognizes existing organizations and offers View Dashboard and Create New Organization. |
| Select View Dashboard / View dashboard. |  | The organizer can access an existing organization’s dashboard. |
| Reopen Register Organization. |  | The existing-organization choice is available again. |
| Select Create New Organization / Create a new organization. |  | A form for another organization opens; the existing organization is not being edited. |
| Reopen the original organization’s settings without saving. | Recorded name, timezone, currency and plan. | Its settings and access are unchanged. |

**Postconditions:**

* Clear the unsubmitted form and restore any temporary browser view or timezone settings.
* No organization is created and no existing organization is changed.

### SPT-5369: Require complete contact and referral details

**Title:** Web Public - Organization Registration - Require complete contact and referral details

**Description:** Verify that missing required details or an invalid phone number prevents progress to plan selection. Angular may disable Continue; Next.js may show validation after Continue.

Run each Check once with the other required details filled. For BlankCurrency or BlankSource, begin with that dropdown unselected. For referral checks choose the named referral option first.

| Check | Input |
| --- | --- |
| BlankName | Empty Organization Name |
| BlankPhone | Empty contact number |
| InvalidPhone | 123 |
| BlankCurrency | No currency selected |
| BlankSource | No referral source selected |
| BlankReferral | Referral selected; Who referred you? empty |
| BlankOther | Other selected; explanation empty |

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Sign in with an ordinary account and open a fresh registration form for each Check.
* Prepare an unused name, controlled accepted phone number, America/Edmonton, CAD and Google Search as the otherwise valid details.

**Tags:** public, registration, organizer

**Parameters:**
Check: BlankName, BlankPhone, InvalidPhone, BlankCurrency, BlankSource, BlankReferral, BlankOther

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Enter the prepared details except for the selected invalid input. | Selected Check. | The form has only the intended missing or invalid input. |
| Attempt to continue. | Select Continue if enabled. | The form prevents progression and identifies or marks the missing/invalid field. |
| Correct that input. | For referral text use Registration review; for Other use Community event planning; restore the prepared phone/name or select CAD / Google Search. | The corrected value is accepted. |
| Select Continue without submitting a plan. |  | The plan page opens. |

**Postconditions:**

* Clear the unsubmitted form and restore any temporary browser view or timezone settings.
* No organization is created and no existing organization is changed.

### SPT-5370: Enforce the organization name limit

**Title:** Web Public - Organization Registration - Enforce the organization name limit

**Description:** Verify the 64-character name limit. Next.js rejects an overlong name before submission; Angular may reach plan selection but its creation request must be rejected. The pages need not show the error at the same step.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Sign in as an ordinary account on an approved test backend; the Angular negative check deliberately submits invalid data that must be rejected.
* Prepare a controlled accepted phone, America/Edmonton, CAD and Google Search. No organization with the 65-character test name exists.
* An authorized administrator can search Admin → Venues → Venue and read the new organization and its owner employment without saving.

**Tags:** public, registration, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Fill the ordinary required details with a 64-character name. | Exactly 64 uppercase A characters. | The name is accepted. |
| Select Continue. |  | Plans open without creating an organization. |
| Select Back. |  | The details remain available. |
| Replace the name with 65 characters. | Exactly 65 uppercase A characters. | The overlong name is entered or rejected at the field. |
| Attempt Continue; on Angular only, submit Essential if plan selection opens. | Never resubmit an attempt with an uncertain result. | A name-length error prevents creation, either before submission or after Angular’s rejected request. |
| Have the administrator refresh the search for the 65-character name. |  | No organization or owner employment was created by the rejected attempt. |

**Postconditions:**

* Clear the unsubmitted form and restore any temporary browser view or timezone settings.
* No organization is created and no existing organization is changed.

### SPT-5371: Save the selected timezone

**Title:** Web Public - Organization Registration - Save the selected timezone

**Description:** Verify browser-timezone prefill, timezone search and a selected timezone that differs from the browser. This tests registration settings, not Event daylight-saving calculations.

Run each TimezoneChoice once. Browser timezone is not the account’s geographic location or currency; keep CAD and the known test region unchanged.

| TimezoneChoice | Browser timezone | Select in the form |
| --- | --- | --- |
| KeepDefault | America/Edmonton | Keep America/Edmonton |
| DifferentZone | America/Edmonton | America/St_Johns |
| HalfHourZone | Asia/Kolkata | Keep Asia/Kolkata |

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Sign in with an ordinary account; prepare the browser timezone for the selected TimezoneChoice without changing the server clock.
* Use an approved test backend because registration creates organization ownership and can notify sales/CRM. Have a controlled phone number and an unused organization name, at most 64 characters.
* For ordinary active registration, `enable_venue_upon_registration` is ON for the account. Use CAD with known matching IP region and a name checked against the enabled similar-name rule; record the effective fraud-check switches.
* An authorized administrator can search Admin → Venues → Venue and read the new organization and its owner employment without saving.

**Tags:** public, registration, organizer

**Parameters:**
TimezoneChoice: KeepDefault, DifferentZone, HalfHourZone

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open organization registration details. |  | The allowed browser timezone is prefilled. |
| Search the timezone choices for NoSuchTimezone. |  | No invented timezone is available to select. |
| Select the scenario’s allowed timezone. | TimezoneChoice mapping. | The selected canonical timezone name is shown. |
| Complete the remaining details and continue to plans. | Unused name; controlled phone; CAD; Google Search. | The form accepts the selected timezone. |
| Select Back. |  | The chosen timezone remains selected. |
| Continue to plans and submit Professional once. | Choose Plan on Angular; Continue under Professional on Next.js. | The new organization opens in Create Event. |
| Have the administrator reopen the saved organization. |  | Its timezone matches the selected value, including the half-hour zone. |

**Postconditions:**

* Retain the created organization and its reference for the assigned cleanup owner; do not create an Event or delete existing organizations.
* Existing organization settings and access remain unchanged.
* Restore the browser’s original timezone.

### SPT-5372: Keep the selected referral details

**Title:** Web Public - Organization Registration - Keep the selected referral details

**Description:** Verify that ordinary, Referral, Other and referral-link entries save the intended discovery method and text.

Run each ReferralChoice once. Use the selected registration entry link; only ReferralLink adds the query string because link prefill is the behavior under test.

| ReferralChoice | Initial link / source | Text |
| --- | --- | --- |
| GoogleSearch | Ordinary link; Google Search | No extra text required |
| Referral | Ordinary link; Referral | Registration review |
| Other | Ordinary link; Other | Community event planning |
| ReferralLink | Append ?referrer=Registration%20review; retain Referral | Registration review is prefilled |

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Sign in with an ordinary account and use a fresh registration form for the selected ReferralChoice.
* Use an approved test backend because registration creates organization ownership and can notify sales/CRM. Have a controlled phone number and an unused organization name, at most 64 characters.
* For ordinary active registration, `enable_venue_upon_registration` is ON for the account. Use CAD with known matching IP region and a name checked against the enabled similar-name rule; record the effective fraud-check switches.
* An authorized administrator can search Admin → Venues → Venue and read the new organization and its owner employment without saving.

**Tags:** public, registration, organizer

**Parameters:**
ReferralChoice: GoogleSearch, Referral, Other, ReferralLink

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected registration link. | ReferralChoice mapping. | Organization details are available; ReferralLink prefills Referral and the named referrer. |
| Select the mapped referral source. | Keep the prefilled selection for ReferralLink. | Referral or Other shows its text field; Google Search does not require extra text. |
| Complete the required referral text. | Mapped text, if required. | The intended referral details are shown. |
| Complete the remaining ordinary fields and select Continue. | Unused name; controlled phone; America/Edmonton; CAD. | Plans open. |
| Submit Professional once. | Choose Plan on Angular; Continue under Professional on Next.js. | Registration completes. |
| Have the administrator reopen the saved organization. |  | The saved discovery method and relevant text match the selected ReferralChoice. |

**Postconditions:**

* Retain the created organization and its reference for the assigned cleanup owner; do not create an Event or delete existing organizations.
* Existing organization settings and access remain unchanged.

### TC-7: Compare plans and return to details

**Title:** Web Public - Organization Registration - Compare plans and return to details

**Description:** Verify that all three plans and their submission controls are usable, their displayed prices agree with the approved pricing contract, and Back preserves entered details. Reviewed CAD defaults are Essential 1% + $0.59, Professional 2.5% + $1.69, and Premium custom pricing. A conflicting deployed price is an unresolved expectation, not an automatic pass.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Sign in with an ordinary account; have an unused name, controlled accepted phone, America/Edmonton, CAD and Google Search.
* Record the approved CAD plan prices for the deployed build before judging a pricing conflict. Do not copy the page’s own price as its expected value.

**Tags:** public, registration, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete organization details. | Prepared name, phone, timezone, CAD and Google Search. | The intended values are visible. |
| Select Continue. |  | The plan page opens without creating an organization. |
| Inspect each plan. | On narrow Angular views use Essential / Professional / Premium buttons; on narrow Next.js use Compare plans. | All three plans, their prices and their Choose Plan / Continue control can be reached. |
| Compare displayed plan prices with the approved values. | CAD prices recorded before the run. | The displayed prices agree with the approved contract. |
| Select Back without submitting a plan. |  | Name, phone, timezone, currency and referral details remain unchanged. |

**Postconditions:**

* Clear the unsubmitted form and restore any temporary browser view or timezone settings.
* No organization is created and no existing organization is changed.

### SPT-5373: Show verification when an organization is pending

**Title:** Web Public - Organization Registration - Show verification when an organization is pending

**Description:** Verify that registration can create an organization awaiting verification without granting active access. Use one selected policy setup: activation flag OFF with CAD, or an ordinary EUR/GBP/AUD registration outside local development. These setups have the same pending outcome; a super-admin is not a valid substitute.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Use an ordinary non-admin account on a non-development test backend; registration creates ownership and test sales notifications.
* The setup owner has prepared one policy: `enable_venue_upon_registration` OFF for the account with CAD, or a selected EUR/GBP/AUD currency. Record the chosen policy; do not change shared flags during execution.
* Have an unused name, controlled accepted phone and America/Edmonton.
* An authorized administrator can search Admin → Venues → Venue and read the new organization and its owner employment without saving.

**Tags:** public, registration, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open registration details. |  | The form is available. |
| Fill the prepared details and select Continue. | Chosen currency; Google Search. | Plans open. |
| Submit Professional once. | Choose Plan on Angular; Continue under Professional on Next.js. | A registration/verification message appears instead of active Create Event access. |
| Have the administrator reopen the new organization and ownership. |  | One organization exists with the entered settings and owner, and it is disabled pending verification. |
| Refresh the pending result. |  | The pending state remains and no second organization is created. |

**Postconditions:**

* Retain the new organization and its reference for review; do not activate it to make the case pass.
* Existing active organization access and settings remain unchanged.

### SPT-5374: Show internal fields only to Showpass administrators

**Title:** Web Public - Organization Registration - Show internal fields only to Showpass administrators

**Description:** Verify that Salesforce Account ID and Client Type are available only to a Showpass administrator. Compare an ordinary account with a Showpass super-admin; owning an organization alone does not make someone a Showpass administrator.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Have one ordinary Showpass account and one Showpass super-admin account.
* Use separate signed-in browser sessions for the two accounts. No Salesforce record or registration submission is needed for this visibility check.

**Tags:** public, registration, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open organization registration details in the ordinary account’s session. |  | Salesforce Account ID and Client Type are absent. |
| Open organization registration details in the super-admin session. |  | Salesforce Account ID and Client Type are available. |
| Inspect the admin fields without submitting. |  | The administrator can enter an Account ID and open Client Type choices. |

**Postconditions:**

* Clear the unsubmitted form and restore any temporary browser view or timezone settings.
* No organization is created and no existing organization is changed.

### TC-10: Resume setup without creating another organization

**Title:** Web Public - Organization Registration - Resume setup without creating another organization

**Description:** Verify that reopening a confirmed organization’s registration result can finish setup using Retry setup without another registration. This checks the supported resume link, not an injected server failure. Use desktop and mobile Next.js views.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Next.js only; legacy Angular does not expose this resume flow. Current route: `/organizations/register/`.

**Preconditions:**

* Sign in as an ordinary account that owns a newly registered, enabled organization with no Events or orders. Record its name, ID and the account’s organization count.
* Have the confirmed Next.js registration entry link with `created=<recorded organization ID>`; the query value is the resume behavior under test.
* An authorized administrator can search Admin → Venues → Venue and read the new organization and its owner employment without saving.

**Tags:** public, registration, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared resume link. | created identifies the organization owned by the signed-in account. | The page says the organization was created but setup could not be finished, and offers Retry setup. |
| Select Retry setup once. |  | Create Event opens for that same organization. |
| Refresh the destination. |  | The same organization remains selected. |
| Have the administrator compare organization count and ownership with the starting records. |  | No additional organization or owner employment was created. |

**Postconditions:**

* Retain the original organization and its reference; do not create an Event.
* No new organization is created by resuming setup.

### SPT-5375: Deliver the sales registration notification

**Title:** Web Public - Organization Registration - Deliver the sales registration notification

**Description:** Verify that a completed registration produces a sales notification identifying the correct organization, plan, currency and referral details. Registration success alone does not prove notification delivery.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

Run on the legacy Angular and Next.js registration pages, using the confirmed entry link for the selected version. Current route: `/organizations/register/`. Use desktop for one page version and mobile for the other, and record the selection. This samples both views; it does not cover every page/view pairing.

**Preconditions:**

* Have a recorded recent organization registration on an approved test backend, including its name, ID, creation time, plan, currency, referral text and enabled/pending state.
* Have read access to Admin → Venues → Venue and the test channel configured by `SLACK_BOT_SALES_ALERT_CHANNEL`. The channel name must come from that environment’s saved configuration.

**Tags:** public, registration, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Reopen the recorded organization without saving. |  | Its saved registration details and enabled/pending state are available for comparison. |
| Open the configured sales-notification channel. | Recorded creation time and organization reference. | The relevant registration message can be located. |
| Compare the message with the saved organization. | Name/reference, plan, currency and referral details. | The notification identifies this registration and matches the saved values. |
| For a pending organization, inspect the linked notification thread. | Recorded pending reason. | The verification/disabled explanation agrees with the saved state. |

**Postconditions:**

* Retain the registration reference and notification evidence.
* Do not post, edit or delete Slack messages as part of this check.

## Publication Record

Applied and verified **2026-10-15 13:28 PDT** in **SPT / Register, suite 182** after a clean batch dry run and the user’s approval. Nine creates were applied before the SPT-1657 update so its split coverage existed before replacement.

| Local draft / existing case | Published case | Steps | Parameters |
| --- | --- | --- | --- |
| TC-1 | [SPT-5367](https://app.qase.io/case/SPT-5367) | 5 | None |
| TC-2 | [SPT-5368](https://app.qase.io/case/SPT-5368) | 5 | None |
| TC-3 | [SPT-5369](https://app.qase.io/case/SPT-5369) | 4 | Check: BlankName, BlankPhone, InvalidPhone, BlankCurrency, BlankSource, BlankReferral, BlankOther |
| TC-4 | [SPT-5370](https://app.qase.io/case/SPT-5370) | 6 | None |
| TC-5 | [SPT-5371](https://app.qase.io/case/SPT-5371) | 7 | TimezoneChoice: KeepDefault, DifferentZone, HalfHourZone |
| TC-6 | [SPT-5372](https://app.qase.io/case/SPT-5372) | 6 | ReferralChoice: GoogleSearch, Referral, Other, ReferralLink |
| TC-8 | [SPT-5373](https://app.qase.io/case/SPT-5373) | 5 | None |
| TC-9 | [SPT-5374](https://app.qase.io/case/SPT-5374) | 3 | None |
| TC-11 | [SPT-5375](https://app.qase.io/case/SPT-5375) | 4 | None |
| SPT-1657 | [SPT-1657](https://app.qase.io/case/SPT-1657) | 8 | None |

Readback verified every case’s suite, exact title, tags, parameter values and step count. SPT-1657 additionally verified all selected text/step fields and retained its priority, type, behavior, layer and suite. Tags are public/registration/organizer except SPT-5374 uses employee-permissions and SPT-5375 uses notifications in place of organizer. No unrelated existing case was written.

**Held:** TC-7 pending the approved Professional pricing contract; TC-10 pending confirmed Next.js entry/resume access. Neither was published.

The earlier bulk Qase snapshot is historical and predates these writes; refresh relevant coverage before a later gap comparison. The verified apply output is `/private/tmp/qase-registration-approved-apply.json`.

## Coverage Decisions

The published definitions are not executed end to end. Existing SPT-1657 checks are preserved across the split. SPT-1657 was updated; SPT-5367–SPT-5375 were created. Only TC-7 and TC-10 remain uncreated local drafts. Existing SPT-1658/1659/1660 remain unchanged and retain deeper Essential/Professional/Premium feature and rate-card responsibilities. Suite placement remains Register, ID 182, parent ID 181.

| Proof / existing coverage | Proposed coverage | Decision / execution evidence |
| --- | --- | --- |
| Clean registration, core fields, currencies and saved result — SPT-1657 | SPT-1657 | Enhance; ordinary first/existing organizers added and super-admin run retained. No live creation executed. |
| Sign-in return and existing organization choice | SPT-5367, SPT-5368 | New focused checks. Existing admin choice observed in demo; login return not run. Footer-only coverage stays in SPT-4720. |
| Required fields / negative name boundary | SPT-5369, SPT-5370 | Split from broad draft; source-backed, not executed. Angular and Next can reject at different steps. |
| Timezone default, search, change and persistence | SPT-5371 | New; America/Edmonton default observed only. No saved-timezone proof. |
| Referral options, conditional text and query prefill — SPT-1657 | SPT-5372; choice list retained in SPT-1657 | Split; correct malformed `?=<email>` to `referrer`. Referral/Other fields observed, saved referral not run. |
| Plans, fees and Back | TC-7; SPT-1658–1660 retained | Preview and Back observed in demo; pricing conflict below remains unresolved. Selecting a plan does not prove every entitlement. |
| Active versus pending state | SPT-1657, SPT-5373 | Split; replaces unconditional “not disabled” with the actual policy. Not executed. |
| Admin-only fields / existing admin context | SPT-5374; admin registration retained in SPT-1657 | Split visibility from successful creation; ordinary-account visibility unexecuted. |
| Next resume and no duplicate creation | TC-10 | New supported `created` entry; not an injected-failure claim. Next deployment/access not yet verified. |
| Slack delivery — SPT-1657 | SPT-5375 | Split; actual environment channel replaces hard-coded channel assumptions. Manual-only delivery proof, not executed. |
| CAPTCHA/session load failure, uncertain creation, actual post-create failure, double submit | Blocked controlled-failure execution | Exact safe fault setup still needed; do not invent a runnable recipe. Retry setup in TC-10 does not close these gaps. |
| Angle brackets, referral length 256/257, IP/name fraud branches, `pkg` default variations, phone country, keyboard/landscape, feature-default switch ON/OFF | Deferred focused verification | Source behavior identified, but not all variations are exercised by these cases. Extend the relevant case when chosen, without multiplying every context axis. |
| Child registration, account signup, native hardware, Event DST arithmetic, purchases/payouts | Not applicable to this focused scope | Different workflows. Browser registration is not native/device or financial execution proof. |
| Cleanup | Browser-only cleanup verified | No organization was created. Future creation cases preserve their new references and existing records. |

## Supporting Evidence

> [!info]- Qase read, source revisions, setup gates and browser observations
> **Intent:** protect one saved organization, correct owner access and retained settings through first/another registration. Main risks are unauthorized access, duplicate creation, lost configuration and an incorrect active/pending outcome. Scope is public registration on both implementations and desktop/mobile browser views; confidence is high for source definitions and limited for live behavior.
>
> **Qase evidence:** complete read-only SPT snapshot retrieved 2026-10-15 around 13:34 MDT / 19:34 UTC: 1,830 reported, collected and unique cases across 19 pages. Cache: `/private/tmp/qase-cases-all.json`. Titles, descriptions, pre/postconditions, tags and nested steps were filtered for registration, organization and route aliases. Nine candidates reviewed; relevant cases were SPT-1657–1660 and SPT-4720. SPT-1657 and suite 182 were read back; case update time was 2026-10-15T19:23:17+00:00. Run history was not read. Definitions are not execution proof.
>
> **Baseline:** SPT-1657 had nine classic steps, no Description/Postconditions or parameters, tag organizer and suite 182. It covered admin registration, four currencies, referral branches/link, dashboard result and Slack delivery. The old single-case rewrite also bundled validation, timezones, pending and recovery. This user-requested split distributes those responsibilities above. The subsequent exact approved batch is recorded in Publication Record; the snapshot describes pre-publication coverage.
>
> **Source revisions:** backend `d148b18dc46bc62de9f4a46181207e64b3567f5c`; frontend `bce2f9f2b8f5941f4bf80f8f9473fa0fb1361fb4`; Playwright `3e09b9a786cf80820d7ff4428f4da697a7e3faa2`. Reviewed registration paths had no local changes. Revisions rechecked for this rewrite; they do not establish demo's deployed build. No branch diff used.
>
> **Backend anchors:** `web-app/apps/venues/front/views.py`; `apps/main/static/src/front/venues/registration.js`; templates `front/venues/venues/register.html` and `_partials/_organization-info-form.html`, `_already-organization.html`, `_pricing-table.html`; `apps/venues/api/user_based/{viewsets,serializers}.py`; `apps/venues/services/venue_registration/{standard,completion,follow_up}.py`; `apps/venues/models/venue_management/venue.py`; `apps/venues/permissions/request_context.py`; currencies, pricing and referral constants. Repo root: `/Users/christianvaldez/Documents/Showpass/repos/web-app`.
>
> **Frontend anchors:** `showpass-frontend/packages/next-app/pages/organizations/register/index.tsx`, `gssp-subroutines/withUser/withUser.ts`; `packages/core/src/app-contexts/public/features/organization-registration/` values, fields, hook, outcomes and plan/footer components. Both create through `POST /api/user/venues/`. Next locks an attempt, requires fresh owner/session reads, and distinguishes uncertain creation from setup retry. Repo root: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`.
>
> **Setup gates:** `enable_venue_upon_registration` is a request/user Waffle flag; OFF makes ordinary non-development registration pending. Regular EUR/GBP/AUD registrations are also pending. `disable_new_venues_with_currency_mismatch` and `disable_new_venues_with_similar_names` are global switches affecting review; geolocation failure fails closed. Local development/superuser bypasses are not ordinary-organizer proof. `enable_captcha` governs required creation CAPTCHA. Production admin creation with `salesforce_api_enabled_v2` requires a real valid Salesforce Account ID and permitted Client Type; Ghost Product is rejected. `enable_new_venue_feature_defaults` affects provisioned modules, not page selection. No shared flags were changed.
>
> **Routing gap:** local `conf/reverse-proxy/nginx/conf.d/projects.conf` excludes organizations from the frontend catch-all and falls back to Django. The main Next page exists without its own selection flag; deployed Next entry/routing needs the rollout owner's evidence. The sub-organization page flag is unrelated. Treat unavailable Next execution as Blocked, not unsupported or passed.
>
> **Browser evidence:** demo legacy page, existing account with admin fields visible. Organization choice, form fields, five currencies, Referral/Other conditional input, America/Edmonton default, mobile 390 × 844 scroll reachability, valid unsaved Continue → plans and Back preserving details were observed. No ordinary account, Next page, creation, persistence, owner access, pending outcome, notification or failure path was executed. Temporary viewport and unsaved entries were cleared; original Organization Check restored. Existing screenshots retained below. No credentials or organization list copied into the note.
>
> **References:** [[06 Prompts/Showpass Qase Gap Analysis]], [[00 Start Here/World-Class Software Quality Standard]], [[05 Tooling/Qase Test Case Writing Rules]], [[05 Tooling/qasectl]]. Selected handbook guidance: [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup]] for roles/configuration; [[00 Start Here/Showpass QA Handbook/06 Automation Strategy]] for right-layer proof. Existing Playwright `tests/web/discovery/homepage-footer.test.ts` and `pages/public/discovery/HomepageFooter.ts` cover footer/login navigation, not completed registration; no automation was run.

> [!info]- Retained legacy screenshots
> Desktop form:
> ![[03 Test Cases/Organizations/assets/organization-registration/legacy-desktop.png]]
>
> Mobile conditional referral field after scrolling:
> ![[03 Test Cases/Organizations/assets/organization-registration/legacy-mobile-referral.png]]

> [!warning]- Retained finding — Professional price display
> ### F1 — Legacy Professional Price Differs from Reviewed Defaults
>
> **Severity:** Medium, provisional. **Affected proof:** PT2, plan display. **Confidence:** Confirmed that demo displays `2.5% + $1.6`; Inconclusive as a deployed pricing defect because demo's backend revision/approved rate contract was not established. The reviewed backend defaults and Next display both use `2.5% + $1.69`. This is not evidence of an incorrect charge or saved rate card.
>
> **Starting state:** signed-in account on demo's legacy registration page; complete the ordinary fields with an unused name, controlled contact number, allowed timezone, CAD and Google Search. **Data safety:** no data change on the server; form values remain unsubmitted.
>
> | Step Action | Data | Expected Result |
> | --- | --- | --- |
> | Open Register Organization and choose Create New Organization if an organization-choice screen appears. | Demo; existing signed-in account. | Organization details are available. |
> | Complete the ordinary fields and select Continue. | Unused name, controlled phone, allowed timezone, CAD, Google Search. | The plans page opens without creating an organization. |
> | Read the Professional plan price; do not select Choose Plan. | Reviewed source default: 2.5% + $1.69. | Display agrees with the approved deployed plan-pricing contract. |
>
> **Actual:** at the final step, Professional displays `2.5% + $1.6`. **Impact:** an organizer could be shown a lower fixed fee than the reviewed creation default. **Cleanup:** Back retained the unsaved details; reloading cleared them and restored Organization Check. **Release classification:** resolve the deployed pricing contract and display agreement before treating plan pricing as passed; no end-to-end financial defect or automatic release blocker is claimed.
>
> ![[03 Test Cases/Organizations/assets/organization-registration/legacy-plan-pricing.png]]

## Execution Selection

Start with clean SPT-1657 on each implementation and first/existing ordinary account; then execute the focused cases for changed or risky behavior. For clean SPT-1657, run the first ordinary account on desktop and the existing organizer on mobile on each implementation, plus the retained super-admin test-site run. For other cases, use the page/view sampling described inside the case. Context choices are stated per case, not a forced full-product matrix. SPT-5369, SPT-5371 and SPT-5372 each have one small data parameter; the other cases have none. Plan creation/entitlement cases SPT-1658–1660 remain separate.

**Release decision: blocked by missing execution evidence**, especially Next routing, successful saved creation/ownership, pending behavior, actual notification delivery and controlled failures. Case formatting and local parsing do not establish a production pass. The approved publication created nine cases and updated SPT-1657; it did not move or delete cases/suites. No product registration was executed.
