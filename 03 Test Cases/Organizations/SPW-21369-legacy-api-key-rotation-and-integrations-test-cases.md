---
title: SPW-21369 Legacy API Key Rotation and Integrations Navigation
date: 2026-11-24
updated: 2026-11-24
tags:
  - qa/test-cases
  - dashboard
  - api-testing
---

# SPW-21369 Legacy API Key Rotation and Integrations Navigation

**Qase · Seven published cases verified.** TC-1, TC-2, TC-5, TC-6, TC-7, TC-10, and TC-11 are linked below. The November 24 Beta sidebar run verified selected routes and dialog steps. See the [[#Beta sidebar walkthrough|walkthrough]] for the observed session and remaining checks. Full case execution is pending.

## Qase publication

On November 24, 2026, Qase saved six new cases and the update to SPT-1709. Readback matched the approved titles, descriptions, prerequisites, postconditions, step text, tags, and Single parameters.

| Vault case | Qase case | Suite | Steps |
| --- | --- | --- | ---: |
| TC-1 | [SPT-6031 · Replace and retire the old API key](https://app.qase.io/case/SPT-6031) | [Integrations → API (1262)](https://app.qase.io/project/SPT?suite=1262) | 8 |
| TC-2 | [SPT-6032 · Cancel retirement](https://app.qase.io/case/SPT-6032) | API (1262) | 5 |
| TC-5 | [SPT-6033 · Open API keys, Request logs, and API allowlist](https://app.qase.io/case/SPT-6033) | API (1262) | 4 |
| TC-6 | [SPT-6034 · Check access by employee permissions](https://app.qase.io/case/SPT-6034) | API (1262) | 2 |
| TC-7 | [SPT-1709 · Validate, create, and edit an endpoint](https://app.qase.io/case/SPT-1709), updated in place | [Webhooks → Endpoints (1259)](https://app.qase.io/project/SPT?suite=1259) | 10 |
| TC-10 | [SPT-6035 · Open Analytics from both old bookmarks](https://app.qase.io/case/SPT-6035) | [Analytics (1173)](https://app.qase.io/project/SPT?suite=1173) | 3 |
| TC-11 | [SPT-6036 · Open the old Webhooks bookmark](https://app.qase.io/case/SPT-6036) | Webhooks → Endpoints (1259) | 3 |

The SPT-1709 update keeps the required-field and invalid-URL checks, adds edit and cancel checks, and preserves the existing suite, tags and case settings. Publishing the definitions did not run them.

**SPT-6031 wording update verified.** Qase saved the revised title, description, prerequisites, cleanup and eight steps on November 24, 2026. Every step names **Postman** or **Beta Dashboard**. Suite 1262 and the original tags and parameter settings were verified on readback. The wording update added no execution evidence.

## Intent and scope

An employee should be able to replace a legacy Organization API key without interrupting the integration, then retire only the verified old credential. Prove the handoff with the same read through the test integration before and after rotation. The navigation changes should preserve access from both Dashboard shells, with the correct employee permissions and layout. Prove that with the actual menu paths, destination URLs, saved endpoint, and selected sidebar items.

| Visible entry and owning page | Candidate destination | Drafts |
| --- | --- | --- |
| Organization → Integrations → API → API keys | `/manage/organization/integrations/api/keys/` | TC-1–TC-4 |
| Organization → Integrations → API → Request logs and API allowlist | `/manage/organization/integrations/api/logs/` and `/manage/organization/integrations/api/allowlist/` | TC-5–TC-6 |
| Organization → Integrations → Webhooks → Endpoints, Events, Delivery logs | `/manage/organization/integrations/webhooks/endpoints/`, `events/`, and `logs/` | TC-7–TC-8 |
| Organization → Settings → Analytics and Organization → Integrations → Hive or Domains | `/manage/organization/integrations/analytics/`, `hive/`, and `domains/` | TC-9 |
| Legacy Organization Settings and Webhooks | `/dashboard/venues/edit/` and `/dashboard/webhooks/` | TC-10–TC-11 |
| Removed bookmarks and unknown integration paths | Standard 404 | TC-12 |

**Beta build observation.** Marketplace was an active link and Partner API was disabled. TC-5 covers the stable API navigation and uses Partner API for the disabled-control check. The supplied PR and newer frontend differ on Marketplace. [Integrations navigation at the supplied merge](https://github.com/showpass/showpass-frontend/blob/c04dbec0663f7c5ad40fafc01911ada17339c69f/packages/core/src/app-contexts/dashboard/features/organization/integrations/constants/integrations-navigation.ts)

## Organization → Integrations → API keys

### TC-1: Replace and retire a verified legacy API key

**Title:** Dashboard - API keys - Replace and retire an old Organization API key

**Description:** The **legacy credential** is the old API key that belongs to the Organization. Use the Dashboard to create a replacement key linked to your employee account. Send the same Events request in Postman with each key. Both should work before retirement. After retirement, the old key should be rejected and the replacement should still work.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Open the [Beta Dashboard](https://beta.showpass.com/manage/) and select an Organization reserved for testing. Sign in with **All Access**. Ask the person who prepared it to confirm the Developer Tools flag (`enable_developer_tools`) is ON.
- Get the **Organization ID**, the **full old API key**, and the **ID of a test Event on the first page of the Events response**. Use the approved test secret store or ask the person who prepared the key. The old key must be approved for retirement, and no external integration should use it. If all you have is the **Retire legacy credential** button, record the case as **Blocked** until you have the full key.
- On **Organization → Integrations → API**, record the old key row's **Created** date under **Legacy credentials**. Use a Postman test session without saved Showpass cookies or other credentials.

**Postconditions:**

- If you created a key for this test, click **Revoke key** on its card. Refresh **API keys** and confirm the card says **Revoked**.
- Clear the keys from Postman and the clipboard. Use another approved old key if you repeat the case after retirement.

**Tags:** dashboard, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| **Postman — Check the old key.** Choose **GET**, paste the URL, add the header under **Headers**, and click **Send**. | URL `https://beta.showpass.com/api/venue/{organizationId}/events/`. Replace `{organizationId}` with your Organization ID. Header name `Authorization`. Header value `Token ` followed by the full old key. | **200 OK** and the test Event ID appears in **Body**. If either is missing, stop and record what you got. |
| **Beta Dashboard — Find the old key.** Click **Organization → Integrations → API**. Find the row under **Legacy credentials** by its **Created** date. | Use the same Organization as in Postman. | The row shows **Retire legacy credential**. The page offers **Create replacement key** and says to verify it first. The old key's full value is hidden. |
| **Beta Dashboard — Create the replacement.** Click **Create replacement key**, fill out the form, and click **Create API key**. | **Key name** `QA API rotation` plus your initials. **Scopes** **Read events**. **Expiry** **90 days**. | **Save your API key** opens and shows the full new key. |
| **Beta Dashboard — Save the new key.** Put it in the approved test secret store, click **I have saved the key**, then refresh **API keys**. | Find the new card by the name you entered. | The new card shows **Employee scoped key**, your employee account, and **Read events**. Its full value is hidden. The old row is still there. |
| **Postman — Check both keys.** Click **Send** in the old-key tab. Open a second GET tab with the same URL. In that tab, put the full **new** key after `Token ` in the **Authorization** header and click **Send**. | Keep one tab for each key and the same Events URL in both. | Both return **200 OK** with the same test Event ID. If either fails, stop before retirement and record both results. |
| **Beta Dashboard — Retire the old key.** On its **Created** row, click **Retire legacy credential**. Read the warning, check **I updated the integration to a new key and verified that it works.**, and click **Retire legacy credential** inside the dialog. | Use the old key approved for retirement. | The warning says retirement is immediate and cannot be undone. On confirmation, the dialog closes and the old row disappears. |
| **Beta Dashboard — Refresh API keys.** Find the new card by its name. | Check the old row's **Created** date again. | You stay signed in. The old row is gone and the new card shows **Active**. |
| **Postman — Send both requests again.** Click **Send** once in each tab. | Keep the original URL and the key already in each tab. | The old key returns **401**. The new key returns **200 OK** and the same test Event ID. |

### TC-2: Cancel retirement in French on a narrow screen

**Title:** Dashboard - API keys - Keep the legacy credential active when retirement is cancelled

**Description:** On a phone-sized French Dashboard, try to retire an old API key with the confirmation box unchecked, then cancel. Use Postman to confirm the key still works.

| Platform | View |
| --- | --- |
| Dashboard | Mobile |

**Preconditions:**

- Open the Beta Dashboard in French at a phone-sized width. Sign in with **All Access** to an Organization reserved for testing with the Developer Tools flag (`enable_developer_tools`) ON.
- Get the test Organization ID, an active old API key approved for this test, its **Created** date and the ID of a test Event on the first page of the Events response. Use Postman without saved Showpass cookies or other credentials.

**Postconditions:**

- Leave the old key active. Clear the test key from Postman and the clipboard.

**Tags:** dashboard, api-testing, mobile-view

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Postman**, choose **GET**, enter the Events URL and the header, then click **Send**. | `https://beta.showpass.com/api/venue/{organizationId}/events/`. Replace `{organizationId}` with the test Organization ID. In **Headers**, enter `Authorization` with the value `Token ` followed by the old key. | Postman shows **200 OK** and the test Event ID is in the response. If the request fails, stop and report the status. |
| In the **Beta Dashboard**, click **Organisation**. Under **Intégrations**, click **API**. In **Identifiants hérités**, click **Révoquer l’identifiant hérité** on the row with the recorded date. | Find the row by the date recorded before the test. | The French warning, checkbox, and **Annuler** are readable and reachable on the narrow screen. The warning explains that retirement is immediate and irreversible. |
| Leave **J’ai configuré l’intégration avec une nouvelle clé et vérifié son fonctionnement.** unchecked. Click **Révoquer l’identifiant hérité** in the dialog. | Leave the checkbox empty. | The dialog stays open and the French message asks you to check that the replacement works before retiring the old key. |
| Click **Annuler** and refresh **Clés API**. | Look for the original row under **Identifiants hérités**. | The dialog closes and the row still shows the recorded date. |
| In **Postman**, click **Send** on the same request again with the old key. | Same URL, header and key as the first request. | Postman still shows **200 OK** and the same test Event ID. |

### TC-3: Recover after a failed retirement

**Title:** Dashboard - API keys - Keep retirement unconfirmed after a failed request

**Description:** Interrupt a confirmed retirement request before it reaches Showpass. Verify the error remains visible, the action is available again, and the original credential still works.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Sign in with **All Access** in a disposable Organization with `enable_developer_tools` ON. Have one retireable legacy credential and an employee replacement with **Read events**.
- Configure the disposable integration to use the replacement. Verify that each credential returns `200` and the expected event from `GET /api/venue/{organizationId}/events/`. Use a browser that can block a single request URL while keeping the connection online.

**Postconditions:**

- Remove the request block, confirm the legacy credential still works, and revoke the disposable replacement when the fixture is no longer needed.

**Tags:** dashboard, api-testing, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Organization → Integrations → API → Retire legacy credential** and select the verification checkbox. | Choose the known legacy row by its creation date. | The selected credential's confirmation is ready to submit. |
| Block the retirement URL in the browser, then submit **Retire legacy credential**. | Block only `/api/venue/{organizationId}/developer/keys/legacy/retire/` on the selected environment. | The dialog stays open and says the credential's status has not been confirmed. The legacy row is still visible behind the dialog and the submit control becomes available again. |
| Remove the block, select **Cancel**, and reload the list before opening the same row again. | Repeat the legacy API read using the test client. | The same row remains available for retirement, the newly opened confirmation starts unchecked, and the legacy read returns `200` with the expected event. Cancel the reopened dialog. |

### TC-4: Keep credentials scoped to the selected Organization and account

**Title:** Dashboard - API keys - Clear credential dialogs and lists when changing account or Organization

**Description:** Leave API keys with a pending retirement, open another Organization, and sign in with a different employee. Verify the displayed credentials follow the active context.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Use two disposable Organizations with `enable_developer_tools` ON. Have one **All Access** employee employed in both and a second employee with **Scan Tickets** only in the first Organization.
- Each Organization has a different known legacy creation date and a distinctly named employee scoped key. Record the expected date and key name for each. Have the first Organization's legacy credential ready to repeat its known successful event read.

**Postconditions:**

- Confirm the first Organization's legacy read still succeeds and leave its keys and permissions as found.

**Tags:** dashboard, api-testing, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the **All Access** employee, open **Organization → Integrations → API** in the first Organization and open retirement. | Leave the dialog without submitting. | The first Organization's date and key are loaded and the retirement confirmation is open. |
| Use a second tab in the same browser session to select the second Organization. Return to the original tab and reopen API keys in the second Organization. | Confirm the selected Organization before reading the list. | The old confirmation is closed. Only the second Organization's expected credentials are shown. |
| Open retirement for the second Organization's credential and leave it unsubmitted. In a second tab, sign out, sign in as the **Scan Tickets** employee, and open **Organization → Integrations → API** in the first Organization. | Repeat the first Organization's legacy event read from the disposable client. | API keys is available for the employee's own eligible scopes. The previous employee's keys, legacy rows and retirement controls are absent. The legacy credential still succeeds. |

## Organization → Integrations → API

### TC-5: Reach the API pages through the Integration navigation

**Title:** Dashboard - Integrations - Open API keys, Request logs and API allowlist

**Description:** Open API keys from the main Dashboard menu. Use the second menu that appears on the Integrations page to open Request logs and API allowlist.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Open `https://beta.showpass.com/manage/` as an **All Access** employee. Use a test Organization with the Developer Tools flag (`enable_developer_tools`) ON.

**Postconditions:** No settings are saved.

**Tags:** dashboard, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Click **Organization** in the main left menu. In the menu that opens, find **Integrations** and click **API**. | Read the page heading and address bar. | The heading says **API keys** and the address ends in `/manage/organization/integrations/api/keys/`. In the new Integrations page menu, **API keys** is highlighted. |
| In the Integrations page menu, under **API**, click **Request logs**. | Read the page heading and address bar. | The heading says **Request logs**, the address ends in `/manage/organization/integrations/api/logs/`, and **Request logs** is highlighted. |
| In the same menu, click **API allowlist**. | Read the page heading and address bar. | The heading says **API allowlist**, the address ends in `/manage/organization/integrations/api/allowlist/`, and **API allowlist** is highlighted. |
| Look for **Partner API** under **API** on the current page. Then click **Organization** again and find **Partner API** under **Integrations** there. | Stay on **API allowlist** while checking both menus. | **Partner API** is greyed out and cannot be selected in either menu. In the Organization menu, **API** is highlighted as the current section. |

### TC-6: Preserve role and feature flag boundaries

**Title:** Dashboard - Integrations - Preserve API and Webhook access by employee permissions

**Description:** Sign in as three test employees to check which API and Webhook pages Showpass lets each one open. Check both the menu and pasted addresses for restricted pages.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Ask the person who prepared the test Organizations for one employee sign-in per row. Confirm the employee's permissions and the Organization's Developer Tools flag (`enable_developer_tools`) match the table.
- Start each run at `https://beta.showpass.com/manage/` with the test Organization selected. Use a separate sign-in for each row. Keep the permissions and flag at their prepared values.

| AccessProfile | Who to sign in as | What to open and look for | Addresses to paste in step 2 |
| --- | --- | --- | --- |
| ApiToolsOff | An employee with **Manage Integrations** and **Developer** in an Organization where Developer Tools is OFF. | Click **Webhooks** to open **Endpoints**. The page menu has a greyed-out **Partner API** under **API**. API keys, Request logs and API allowlist are absent. | `/manage/organization/integrations/api/keys/`, `/manage/organization/integrations/api/logs/`, `/manage/organization/integrations/api/allowlist/` |
| WithoutOrganizationInfo | An employee with **Developer** and without **Manage Organization Info**, with Developer Tools ON. | Click **API** to open **API keys**. **API allowlist** is absent from the page menu. Open **Organization** again and click **Webhooks**. **Endpoints** opens. | `/manage/organization/integrations/api/allowlist/` |
| ScanOnly | An employee whose only permission is **Scan Tickets**, with Developer Tools ON. | Click **API** to open **API keys**. In **Create API key → Scopes**, look for **Read scanning** and **Record scans**. Click **Close modal**. **API allowlist**, **Organization settings**, and **Webhooks** are absent from the menus. | `/manage/organization/integrations/api/allowlist/`, `/manage/organization/settings/`, `/manage/organization/integrations/webhooks/endpoints/` |

**Postconditions:** Leave the assigned roles and flags as found.

**Tags:** dashboard, employee-permissions, api-testing

**Parameters:**
AccessProfile: ApiToolsOff, WithoutOrganizationInfo, ScanOnly

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Click **Organization** in the main menu and look under **Integrations**. Follow the clicks under **What to open and look for** for this employee. | Use only the row for this employee. | The allowed pages open. The menu items and any key scopes match the selected row. |
| In the same signed-in browser, open a new tab and paste each address listed for this employee. | Put `https://beta.showpass.com` before each path. Try only the addresses in the selected row. | The restricted pages do not display their settings, lists, or action buttons for this employee. |

## Organization → Integrations → Webhooks

### TC-7: Validate, create and edit a webhook endpoint

**Title:** Dashboard - Webhooks - Validate, create and edit an endpoint

**Description:** Check that the form blocks an incomplete endpoint or an invalid URL. Add a URL where Showpass can send test Purchase webhooks. Change the endpoint name once and cancel, then change it to a different name and save. Check which name the list keeps each time.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Open `https://beta.showpass.com/manage/` as an employee with **Developer** in an Organization reserved for testing.
- Get the approved HTTPS test receiver URL from the person who prepared the Organization. This is the address where Showpass sends the test Purchase webhook. Use three names that do not already exist, such as `QA webhook original 01`, `QA webhook cancel 01`, and `QA webhook saved 01`.

**Postconditions:**

- Return to **Endpoints**. On the row created for this test, click **Delete Webhook Endpoint**, then **Delete Endpoint**, and refresh to confirm the row is gone. If the row needs to be kept for evidence, set its **Webhook Status** to **Paused**, save, and reopen it to confirm **Paused**.

**Tags:** dashboard, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Click **Organization** in the main left menu. Under **Integrations**, click **Webhooks**. | Read the heading and address bar. | **Endpoints** opens at `/manage/organization/integrations/webhooks/endpoints/` with **Add endpoint** above the list. |
| Click **Add endpoint** above the list. | Leave the form blank at first. | The page says **Add New Endpoint** at `/manage/organization/integrations/webhooks/endpoints/create/`. The form's **Add endpoint** button is disabled. |
| Click **Endpoint Name** and press **Tab** without typing. In **Endpoint URL**, type `not-a-url` and press **Tab**. | Keep the name blank. | **Name is required** appears under **Endpoint Name**. **Make sure the url is valid** appears under **Endpoint URL**. **Add endpoint** stays disabled. |
| Replace the invalid address with the approved HTTPS receiver and enter the original name in **Endpoint Name**. | Use the first name, such as `QA webhook original 01`. Leave **Select Events** empty. | The name and URL errors clear. **Add endpoint** stays disabled until an event is selected. |
| Check **Purchase** under **Select Events** and click **Add endpoint**. | Create one endpoint for the approved receiver. | Showpass returns to **Endpoints**. The original name is in the list. |
| On that row, click the pencil icon labelled **Edit Webhook Endpoint**. | Read the heading and note the endpoint ID at the end of the address. | The page says **Edit Endpoint** and opens under `/manage/organization/integrations/webhooks/endpoints/{endpointId}/`. |
| Check the saved fields before editing. | Compare the name, receiver URL and event selection with the values entered at creation. | The original name and URL are saved, **Purchase** is checked, and **Secret Key** is present. Keep the secret out of the evidence. |
| In **Endpoint Name**, enter the second name and click **Cancel**. | For example, use `QA webhook cancel 01`. | The list reopens. The original name is still in the list and the name you cancelled is absent. |
| Open the same row with the pencil icon, enter the third name in **Endpoint Name**, and click **Save**. | For example, use `QA webhook saved 01`. | The list reopens and shows the third name on the same endpoint. |
| Click the pencil icon for the renamed row. | Compare the form with the values you entered earlier. | **Endpoint Name** shows the third name. **Endpoint URL** still shows the approved receiver and **Purchase** is still checked. |

### TC-8: Open webhook event details and delivery logs

**Title:** Dashboard - Webhooks - Open event details and delivery logs from Integrations

**Description:** Use Webhooks navigation to find an existing event and its delivery history from the native Dashboard.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Sign in as an employee with **Developer** and start at the native Dashboard landing page. Use a test Organization with a recent captured webhook and a matching delivery attempt.
- Record the event UUID, event type and attempt status from the existing test delivery. Use a recent delivery visible in the Webhooks lists.

**Postconditions:** Leave the event and delivery unchanged.

**Tags:** dashboard, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Organization → Integrations → Webhooks**, then select **Events** in the sidebar. | `/manage/organization/integrations/webhooks/events/` | The Events list loads with the correct sidebar item selected and shows the recorded event UUID. |
| Open the matching event and use the page's back control. | Detail ends in `/events/{eventUuid}/`. | The detail shows the recorded UUID and event type. The back control returns to **Events** under the same Webhooks section. |
| Select **Delivery logs** in the Integrations sidebar. | `/manage/organization/integrations/webhooks/logs/` | Delivery logs opens, its sidebar item is selected, and the recorded attempt is available with its expected status. |

## Organization → Analytics, Hive and Domains

### TC-9: Open Analytics, Hive and Domains in the native Dashboard

**Title:** Dashboard - Integrations - Reach Analytics, Hive and Domains with the correct navigation

**Description:** Open the native overview pages through the Dashboard and check that the Domain detail keeps its own navigation.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Start from the native Dashboard landing page as an employee with **All Access**. Use a test Organization with `enable_hive_integration` and `enable_custom_domains` ON and an existing test domain. Record its name.

**Postconditions:**

- Restore the employee's starting language if you changed it. Leave integration settings and domain records as found.

**Tags:** dashboard, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Organization → Settings → Analytics**. | `/manage/organization/integrations/analytics/` | Analytics opens within the native Integrations sidebar with **Analytics** selected. |
| Open **Hive** and then **Domains** from the Integrations sidebar. | `/manage/organization/integrations/hive/` and `/manage/organization/integrations/domains/` | Each overview loads with the matching integration selected. The Domains overview lists the recorded test domain. |
| Open the recorded domain. | `/manage/organization/integrations/domains/{domainId}/` | The selected domain opens with its domain-specific navigation and the recorded name. |
| Open **Organization settings** from the Organization drawer. | Inspect its inner sidebar and the drawer's **Settings** group. | The native Organization Settings sidebar omits the former Integrations group. The drawer still groups **Widgets** under **Settings** when the Organization has Widgets enabled. |
| Search the Dashboard for **Hive** in English, then in French. Open the result in each language. | Search text `Hive` in both languages. | Both searches show the Hive result and open the canonical Hive page. |

### TC-10: Keep legacy Organization Settings tabs on the Analytics page

**Title:** Dashboard - Organization settings - Open Analytics from both legacy settings tabs

**Description:** Paste each old Organization Settings link into the browser. Both links should open **Analytics**. Check once in an Organization that starts in the old Dashboard and once in an Organization that starts in the new Dashboard.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Ask the person who prepared Beta for **All Access** sign-ins in the two Dashboard setups below. Both Organizations need Hive and Domains enabled (`enable_hive_integration` and `enable_custom_domains`).
- Use the Dashboard that opens by default when you sign in. If the top bar says **Switch back to the old dashboard**, stop and ask for a sign-in with the required default. That button means someone manually switched this session to the new Dashboard.
- Try both **LegacyTab** links in each Dashboard setup, for four runs.

| LegacyTab | Beta address to paste |
| --- | --- |
| Analytics | `https://beta.showpass.com/dashboard/venues/edit/?tab=analyticsTab&filter=a&filter=b` |
| Integrations | `https://beta.showpass.com/dashboard/venues/edit/?tab=integrationsTab&filter=a&filter=b` |

| DashboardShell | Which Dashboard opens at sign-in | What you should see |
| --- | --- | --- |
| Legacy | The old Dashboard opens. The setup owner has turned on the embedded Organization Settings page (`enable_organization_settings_nextjs_embed`). | The old Dashboard stays open and shows **Analytics** inside Organization Settings. The Organization Settings heading and menu stay visible. The embedded page does not add a second main Dashboard menu. |
| NativeDefault | The new Dashboard opens by default. | **Analytics** opens with the **Integrations** page menu. The browser address ends in `/manage/organization/integrations/analytics/?filter=a&filter=b`. |

**Postconditions:** Leave Organization settings as found.

**Tags:** dashboard, organizer

**Parameters:**
LegacyTab: Analytics, Integrations
DashboardShell: Legacy, NativeDefault

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Paste the Beta address for the selected old tab into the browser. | Use either the **Analytics** or **Integrations** address above. Stay signed in to the prepared Organization. | The page says **Analytics** and matches the Dashboard row above. In the new Dashboard, the address bar shows both `filter=a` and `filter=b`. |
| For the old Dashboard run, check the address of the Analytics page loaded inside Organization Settings. | In browser **Developer Tools → Elements**, search for `/manage/organization/integrations/analytics/`. Read the Analytics iframe's `src`, which is the address of the page inside Organization Settings. | The address path is `/manage/organization/integrations/analytics/` and contains `isLegacy=true`, `showHeader=true`, `showSidebar=true`, `filter=a` and `filter=b`. |
| In the menu beside **Analytics**, click **Hive**, then click **Domains**. | Keep the same Organization. | Both pages open. The old Dashboard keeps its Organization Settings menu. The new Dashboard keeps its Integrations page menu. |

### TC-11: Keep the legacy Webhooks bookmark working in both shells

**Title:** Dashboard - Webhooks - Open the old Webhooks bookmark in both Dashboard versions

**Description:** Paste the old Webhooks address into the browser and check that it opens Endpoints in both the old and new Dashboard.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Ask for an employee sign-in with **Developer** and a test Organization with an existing webhook endpoint. Record the name of an endpoint on the first page of the list so you can recognize it.
- Run once with each default Dashboard setup below. If the top bar says **Switch back to the old dashboard**, stop and ask for a sign-in with the required default. That button means someone manually switched this session to the new Dashboard.

| DashboardShell | Which Dashboard opens at sign-in | What you should see |
| --- | --- | --- |
| Legacy | The old Dashboard opens by default. | The old Dashboard stays open and shows **Endpoints** inside it, with the Integrations page menu. |
| NativeDefault | The new Dashboard opens by default. | **Endpoints** opens and the browser address ends in `/manage/organization/integrations/webhooks/endpoints/?filter=a&filter=b`. |

**Postconditions:** Leave the endpoint unchanged.

**Tags:** dashboard, api-testing

**Parameters:**
DashboardShell: Legacy, NativeDefault

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Paste the old Webhooks address into the browser. | `https://beta.showpass.com/dashboard/webhooks/?filter=a&filter=b` | The page says **Endpoints**, shows the recorded endpoint name, and matches the Dashboard row above. In the new Dashboard, the address bar shows both `filter=a` and `filter=b`. |
| For the old Dashboard run, check the address of the Endpoints page loaded inside the old Dashboard. | In browser **Developer Tools → Elements**, search for `/manage/organization/integrations/webhooks/endpoints/`. Read the Endpoints iframe's `src`, which is the address of the page inside the old Dashboard. | The embedded address ends in `/manage/organization/integrations/webhooks/endpoints/?isLegacy=true`. |
| In the menu beside the list, click **Events**. Then click **Endpoints**. | Keep the same Organization. | **Events** opens and is highlighted. **Endpoints** then opens and is highlighted. The Dashboard stays in the same version. |

## Removed Integration URLs

### TC-12: Show the normal 404 for retired and unknown routes

**Title:** Dashboard - Integrations - Show the standard 404 for retired bookmarks and unknown paths

**Description:** Check retired native Dashboard bookmarks and an unknown integration slug after the migration.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Use an **All Access** employee in the native Dashboard with `enable_developer_tools` ON. Confirm the new API keys and Webhooks Endpoints pages load from **Organization → Integrations**.

**Postconditions:** No settings are saved.

**Tags:** dashboard, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open each retired bookmark in a fresh tab. | `/manage/organization/developer/`, `/manage/organization/developer/request-logs/`, `/manage/organization/developer/api-allowlist/`, `/manage/organization/developer/webhooks/`, `/manage/organization/settings/analytics/`, `/manage/organization/integrations/webhooks/` | Each shows the standard 404 and keeps the requested URL in the address bar. |
| Open an unregistered integration slug. | `/manage/organization/integrations/qa-unregistered-route/` | The standard 404 appears at that URL. |

## Minimum execution and backend evidence

- **Rotation:** Run TC-1 first on a fresh disposable legacy credential. Run TC-2 and TC-3 on another active fixture. The legacy fixture helper is `setup_legacy_organization_api_key` for a fresh local Organization. The targeted retirement suite confirms which fixture is eligible. Fresh Organizations do not automatically receive a legacy token. Keep all known credentials out of screenshots, request exports, and notes. Record status, Organization ID, expected test event ID, and safe key metadata.
- **Navigation:** For a short migration smoke, run TC-5, TC-7, TC-10 **Analytics + NativeDefault**, and TC-11 **NativeDefault**. Run Legacy with its own prepared session. TC-12 samples retired routes in the browser. The route definition tests enumerate the rest of the removed Developer/Webhooks adapters.
- **Qase placement:** API (1262) contains the four API cases. Analytics (1173) contains the old settings bookmarks case. Webhooks → Endpoints (1259) contains the updated endpoint case and the Webhooks bookmark case. See [[#Qase publication|the verified case links]].
- **Backend and component checks:** The manual rotation uses two keys in one Organization. The backend retirement regression separately checks that retirement leaves the other Organization's legacy token in place. Use backend results for that isolation check, safe metadata, authorization, repeat submission, stale targets, ineligible or shared machine identities, audit rollback, and employment or scope changes. Check that scoped machine cards show **Machine account scoped key**, employee-owned cards show **Employee scoped key**, and an ineligible legacy row shows the support message with retirement disabled. Use focused frontend results for the mounted account and Organization remount, scoped-key revocation, one-time secret cache handling, error paths, and retry protection. TC-4 verifies normal tab and sign-in navigation. The component case must exercise a changed context while the confirmation is still mounted.
- **Documentation dependency:** The Private Organizer API guide and both documentation header layouts should link to `/manage/organization/integrations/api/keys/`. The documentation PR was still a draft when reviewed. Check after it ships with the route removal. [Docs PR 28](https://github.com/showpass/api-docs-guide/pull/28)

## Sources and revisions

- Backend PR 12538 reviewed from merge `33e04f0f53c76f9678d3caeaa5eb78ed7dbb11f3` against `df79ce2b7ab68118a6de4c4ad0ed951f5a6da362` on `develop`. It changes the legacy Webhooks iframe, native destination from the legacy bookmark, and destinations for both old Organization Settings tabs. [Backend PR 12538](https://bitbucket.org/showpass/web-app/pull-requests/12538)
- Frontend PR 7995 merged into `develop` as `c04dbec0663f7c5ad40fafc01911ada17339c69f` against first parent `1dfd654017b8942016411a9b9fbf4088807258e2`. Its merge includes the stacked PR 8012 navigation work. The PR 8012 connector patch compares `bfecf9b58ec291343b32303e43a18e6c6575f312` with `6305e1f81275a91f265e70d6991621ba9d65b488` on `SPW-21369-legacy-key-rotation`. [Frontend PR 7995](https://github.com/showpass/showpass-frontend/pull/7995) · [Frontend PR 8012](https://github.com/showpass/showpass-frontend/pull/8012)
- The required backend credential contract comes from PR 12513 at merge `473966b5203c1ae3062555a726508a1b367d7510`. In `web-app`, use `venues.tests.developer.test_legacy_credentials`, `venues.tests.developer.test_legacy_credentials_concurrency`, `venues.tests.developer.test_keys`, and `users.tests.test_dashboard_feature_root_routing`. The existing tests define expected behavior. Suite results were unverified in this draft. [SPW-21369](https://showpass.atlassian.net/browse/SPW-21369) · [SPW-21368](https://showpass.atlassian.net/browse/SPW-21368) · [Backend PR 12513](https://bitbucket.org/showpass/web-app/pull-requests/12513)
- In the frontend, the case expectations come from the Developer Keys screen, Create API Key and legacy retirement dialogs, Integrations navigation, and the Webhooks page adapters. Focused test definitions include `DeveloperLegacyCredentials.web.test.tsx`, `DeveloperKeysScreen.web.test.tsx`, `useLegacyDeveloperCredentials.test.tsx`, `useCreateDeveloperKey.test.tsx`, `organization-developer-tools.test.ts`, `integrations-sidebar-routes.test.tsx`, `webhook-paths.test.ts`, `page-search.test.ts`, and `next.config.test.js`. See [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup]] and [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations]] for fixture and external-integration proof.

## Beta sidebar walkthrough

**November 24, 2026.** Started at [Beta Dashboard](https://beta.showpass.com/manage/) in the signed-in Codex in-app desktop tab. The Organization selector showed **1859-qa-cad**. The toolbar offered **Switch back to the old dashboard**, confirming the personal switch path in the reviewed source. The exact assigned employee role, flag configuration, and deployed SHA were unverified. The session demonstrated access to API keys, Request logs, API allowlist, and Webhooks.

**City review.** The Release Engineer performed a short review, and an independent QA Lead approved **SPW-21369 Sidebar / Plan 1** before the run. The local QA City server was unavailable, so the review ran in this chat using City roles. The run was read-only and finished back at `/manage/`. No test records were created, saved, retired, or sent. Jira and Qase were unchanged.

### TC-01 API menu and key dialogs

**What this tests:** The entry point, available key actions, replacement form and safe cancellation.

**Start here:** Open `/manage/` in the new Dashboard as an employee who can view and manage legacy credentials.

1. Select **Organization → Integrations → API**. From the API keys page, open **Retire legacy credential** and select **Cancel** with the checkbox clear. Open **Create replacement key** and close it with **Close modal**.

   **Expected:** API keys opens. The retirement dialog warns of immediate, irreversible retirement. Cancelling closes it and leaves the legacy row visible. The replacement form includes **Key name**, **Scopes**, and **Expiry**.

   **Actual — Passed for visible controls and cancellation:** API keys opened at `/manage/organization/integrations/api/keys/`. The warning and unchecked acknowledgement appeared. The dialog closed and **Retire legacy credential** remained available on the row. The replacement form opened with the named fields and **90 days** selected, then closed without issuing a key. The browser output contains a cropped screenshot of the retirement dialog. No local screenshot file was available to embed.

2. Select **Request logs**, then **API allowlist**, from the page sidebar. Inspect **Partner API** in the sidebar and the Organization drawer.

   **Expected:** The two screens open at their canonical routes and **Partner API** is disabled.

   **Actual — Passed for destinations and disabled controls:** The headings and URLs were **Request logs** at `/manage/organization/integrations/api/logs/` and **API allowlist** at `/manage/organization/integrations/api/allowlist/`. **Partner API** was disabled in both locations. **Marketplace** was an active link. Selected-item styling was not recorded.

### TC-02 Endpoints create and edit navigation

**What this tests:** Where the Webhooks entry opens and where each form's **Cancel** returns.

**Start here:** From the same Dashboard, open the Organization drawer.

1. Select **Integrations → Webhooks → Add endpoint** and then **Cancel** with the form blank.

   **Expected:** Endpoints opens. The create page shows **Add New Endpoint** and the blank form's **Add endpoint** button is disabled. Cancel returns to Endpoints.

   **Actual — Passed:** The page heading was **Add New Endpoint** at `/manage/organization/integrations/webhooks/endpoints/create/`. **Endpoint URL**, **Endpoint Name**, and **Select Events → Purchase** were visible. The empty form's **Add endpoint** button was disabled. **Cancel** returned to the list. The browser output contains a cropped screenshot of the heading. The browser tab title was **Edit Endpoint** even on the create route.

2. Open an existing row with **Edit Webhook Endpoint** and select **Cancel** without typing.

   **Expected:** The row opens its editor. **Cancel** returns to Endpoints.

   **Actual — Passed:** The heading was **Edit Endpoint** and the form showed **Save** disabled while unchanged. **Cancel** returned to Endpoints. The editor was omitted from screenshots to keep the endpoint details out of evidence.

### TC-03 Analytics bookmarks in the personal-switch session

**What this tests:** The two existing links' final destination under the active personal Dashboard preference.

**Start here:** Keep the same Beta login where the toolbar offers **Switch back to the old dashboard**.

1. Open `/dashboard/venues/edit/?tab=analyticsTab&filter=a&filter=b` and `/dashboard/venues/edit/?tab=integrationsTab&filter=a&filter=b` in turn. Read the final URL and heading.

   **Expected for this session:** The personal-switch middleware sends Organization Settings to the root destination, **General**, using its plain route.

   **Actual — Observed twice:** Both opened **General** at `/manage/organization/settings/basic-info/`. No Analytics iframe appeared. The default Dashboard routing branch has a different tab-aware expectation that still needs execution. [Personal-switch routing](../../../web-app/apps/users/dashboard/middleware.py) · [Switch-back visibility condition](../../../web-app/apps/users/dashboard/switch_preference.py)

### TC-04 Webhooks bookmark in the personal-switch session

**What this tests:** Whether the old link reaches Endpoints and carries the repeated routing markers in this session.

**Start here:** Keep the same Beta login with the personal switch active.

1. Open `/dashboard/webhooks/?filter=a&filter=b` and read the final URL.

   **Expected for this session:** The personal-switch middleware sends Webhooks to the Endpoints route carried by the feature root.

   **Actual — Observed twice:** **Endpoints** opened at `/manage/organization/integrations/webhooks/endpoints/` with no query string. The browser output contains a cropped screenshot of the heading. Query preservation in a NativeDefault session and the Legacy embed still need execution.

## Sidebar results

| Candidate | Status | Verified or still needed |
| --- | --- | --- |
| TC-1 · Replacement and retirement | Not run end to end | [Page and dialogs](#tc-01-api-menu-and-key-dialogs) verified. Key issuance, the Events API reads with either key, and retirement are unrun. |
| TC-2 · French mobile cancellation | Partial | [English desktop cancellation](#tc-01-api-menu-and-key-dialogs) closed the dialog and kept the row visible. French mobile, the unchecked submit result, and the credential read need execution. |
| TC-5 · API navigation | Partial | [Three destinations and disabled Partner API](#tc-01-api-menu-and-key-dialogs) verified. Selected-item styling was not recorded. |
| TC-6 · Role and flag boundaries | Not run | The current employee could open all three API pages and Webhooks. The three restricted setups need separate fixtures. |
| TC-7 · Endpoint lifecycle | Partial | [Open and cancel](#tc-02-endpoints-create-and-edit-navigation) verified on both forms. Create, discard of an entered name, saved edit, and cleanup need execution with an approved disposable endpoint. |
| TC-10 · Analytics bookmarks | Not run in the required shells | [Personal-switch behavior](#tc-03-analytics-bookmarks-in-the-personal-switch-session) matched the separate source path. Run in Legacy with the settings embed enabled and in NativeDefault. |
| TC-11 · Webhooks bookmark | Not run in the required shells | [Personal-switch Endpoints destination](#tc-04-webhooks-bookmark-in-the-personal-switch-session) verified. The native-default query and old Dashboard iframe still need proof. |
