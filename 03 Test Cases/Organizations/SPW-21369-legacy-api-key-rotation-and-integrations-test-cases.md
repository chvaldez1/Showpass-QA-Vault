---
title: SPW-21369 Legacy API Key Rotation and Integrations Navigation
date: 2026-11-24
updated: 2026-11-25
tags:
  - qa/test-cases
  - dashboard
  - api-testing
---

# SPW-21369 Legacy API Key Rotation and Integrations Navigation

**Qase · Seven simplified cases saved and verified on November 25, 2026.** Start with TC-5, the API keys page check. The November 24 Beta sidebar run verified selected routes and dialog steps. See the [[#Beta sidebar walkthrough|walkthrough]] for the observed session and remaining checks. Full case execution is pending.

## Qase publication

On November 24, 2026, Qase saved six new cases and the update to SPT-1709. On November 25, Qase saved the simplified instructions in all seven existing cases. Readback matched the approved edits and verified the suites, tags, Single parameters, and step counts below.

| Vault case | Qase case | Suite | Steps |
| --- | --- | --- | ---: |
| TC-1 | [SPT-6031 · Replace and retire the old API key](https://app.qase.io/case/SPT-6031) | [Integrations → API (1262)](https://app.qase.io/project/SPT?suite=1262) | 7 |
| TC-2 | [SPT-6032 · Cancel retirement](https://app.qase.io/case/SPT-6032) | API (1262) | 5 |
| TC-5 | [SPT-6033 · Check the key list, create form and API menu](https://app.qase.io/case/SPT-6033) | API (1262) | 5 |
| TC-6 | [SPT-6034 · Check access by employee permissions](https://app.qase.io/case/SPT-6034) | API (1262) | 2 |
| TC-7 | [SPT-1709 · Validate, create, and edit an endpoint](https://app.qase.io/case/SPT-1709), updated in place | [Webhooks → Endpoints (1259)](https://app.qase.io/project/SPT?suite=1259) | 10 |
| TC-10 | [SPT-6035 · Open Analytics from both old bookmarks](https://app.qase.io/case/SPT-6035) | [Analytics (1173)](https://app.qase.io/project/SPT?suite=1173) | 3 |
| TC-11 | [SPT-6036 · Open the old Webhooks bookmark](https://app.qase.io/case/SPT-6036) | Webhooks → Endpoints (1259) | 3 |

The SPT-1709 update keeps the required-field and invalid-URL checks, adds edit and cancel checks, and preserves the existing suite, tags and case settings. Publishing the definitions did not run them.

**SPT-6031 wording update verified.** Qase saved the revised title, description, prerequisites, cleanup and eight steps on November 24, 2026. Every step names **Postman** or **Beta Dashboard**. Suite 1262 and the original tags and parameter settings were verified on readback. The wording update added no execution evidence.

**TC-5 API keys page check.** Use the Beta Dashboard to check the key list, open and close the blank create form, and confirm the API menu opens the right pages. Execution of the revised check is pending. TC-1 is the separate Postman and Dashboard case for replacing and retiring an old key.

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

**Description:** Replace an old Organization API key in the Dashboard. In Postman, use the same Events request to check that both keys work before retirement and only the replacement works afterward.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Sign in to [Beta Dashboard](https://beta.showpass.com/manage/) with **All Access**. Select an Organization reserved for testing with Developer Tools (`enable_developer_tools`) ON.
- Ask the test setup owner for the **Organization ID**, the **full old API key**, the old key's **Created** date, and a **test Event ID on the first page of the Events response**. Confirm the old key is approved for retirement and no active integration uses it.
- **Legacy credentials** is where the Dashboard lists old keys. It shows the **Created** date but hides the key value. If the full old key is unavailable from the approved test secret store, record **Blocked**.
- Use Postman without Showpass cookies or other credentials. Use `https://beta.showpass.com/api/venue/{organizationId}/events/` and replace `{organizationId}` with the Organization ID from setup.

**Postconditions:**

- If you created a replacement, click **Revoke key** on its card. Refresh and expect **Revoked**. Clear both test keys from Postman and the clipboard. Use another old key approved for retirement for a repeat.

**Tags:** dashboard, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| **Postman.** Make a **GET** request to the Events URL from setup and click **Send**. | Under **Headers**, enter `Authorization` with the value `Token ` followed by the full **old** key. | **200 OK** and the recorded Event ID in **Body**. Stop if either is missing. |
| **Beta Dashboard.** Open **Organization → Integrations → API**. Under **Legacy credentials**, find the row with the **Created** date from setup. | `https://beta.showpass.com/manage/organization/integrations/api/keys/` | The row shows **Retire legacy credential** and hides the full key. The page offers **Create replacement key** and says to verify the replacement before retirement. Stop if the approved row is missing. |
| **Beta Dashboard.** Click **Create replacement key**, complete the form, and click **Create API key**. | **Key name** `QA API rotation` plus your initials. **Scopes** **Read events**. **Expiry** **90 days**. | **Save your API key** shows the full new key. |
| **Beta Dashboard.** Store the new key in the approved test secret store. Click **I have saved the key** and refresh. | Find the new card by its name. | The card shows **Employee scoped key**, your employee account, and **Read events**. The full new key is hidden and the old row still appears. |
| **Postman.** Send the old-key request again. Open a second GET tab with the same URL and send it with the **new** key. | Use `Authorization: Token <new key>` in the second tab. Keep both tabs open. | Both return **200 OK** and list the same Event ID. Stop before retirement if either fails. |
| **Beta Dashboard.** On the old row, click **Retire legacy credential**. Read the warning, check **I updated the integration to a new key and verified that it works.**, then click **Retire legacy credential** in the dialog. Refresh the page. | Match the **Created** date before confirming. | The warning says retirement is immediate and permanent. The dialog closes and the old row disappears. After refresh, you stay signed in, the row is still gone and the replacement shows **Active**. |
| **Postman.** Click **Send** in both open tabs again. | Keep the same URL and one key in each tab. | Old key **401**. New key **200 OK** with the same Event ID. |

### TC-2: Cancel retirement in French on a narrow screen

**Title:** Dashboard - API keys - Keep the legacy credential active when retirement is cancelled

**Description:** On a phone-sized French Dashboard, try to retire an old API key with the checkbox empty. Cancel the dialog and confirm the old key still works.

| Platform | View |
| --- | --- |
| Dashboard | Mobile |

**Preconditions:**

- Sign in to the Beta Dashboard in French at a phone-sized width. Use **All Access** and a test Organization with Developer Tools (`enable_developer_tools`) ON.
- Get the Organization ID, the full old key, its **Created** date, and a test Event ID on the first page of the Events response. Use a key approved for this test. If the full key is missing, record **Blocked**.
- Use Postman without Showpass cookies or other credentials.

**Postconditions:**

- Leave the old key active. Clear the test key from Postman and the clipboard.

**Tags:** dashboard, api-testing, mobile-view

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| **Postman.** Send a **GET** with the old key. | `https://beta.showpass.com/api/venue/{organizationId}/events/`. Use the test Organization ID. Under **Headers**, add `Authorization` with `Token ` followed by the old key. | **200 OK** with the test Event ID. Stop if either is missing. |
| **Beta Dashboard.** Open **Organisation → Intégrations → API**. Under **Identifiants hérités**, click **Révoquer l’identifiant hérité** on the recorded row. | Match the date from setup. | The French warning says retirement is immediate and permanent. The warning, checkbox and **Annuler** fit on the narrow screen and are easy to reach. |
| Leave the checkbox empty and click **Révoquer l’identifiant hérité** inside the dialog. | The checkbox says **J’ai configuré l’intégration avec une nouvelle clé et vérifié son fonctionnement.** | The dialog stays open and says in French to check the replacement before retirement. |
| Click **Annuler**, then refresh **Clés API**. | Look under **Identifiants hérités**. | The dialog closes and the original row still shows the same date. |
| **Postman.** Click **Send** on the original request again. | Keep the old key in the header. | **200 OK** with the same test Event ID. |

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

**Title:** Dashboard - API keys - Check the key list, create form and API menu

**Description:** Check that API keys loads and the create form opens and closes. Open Request logs and API allowlist from the same menu. This check needs no API key value or Postman.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Open [Beta Dashboard](https://beta.showpass.com/manage/) as an **All Access** employee. Select a test Organization with Developer Tools (`enable_developer_tools`) ON. An Organization with an empty key list works for this check.

**Postconditions:** No data change. Close the create form without submitting it.

**Tags:** dashboard, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Click **Organization → Integrations → API**. | `https://beta.showpass.com/manage/organization/integrations/api/keys/` | **API keys** opens and is highlighted in the page menu. The page shows key cards or **No API keys yet** without a load error. |
| Click **Create API key**. Then click the **X** labelled **Close modal**. | Leave the form blank. | The form shows **Key name**, **Scopes**, and **Expiry**. The **X** returns you to the same key list. |
| In the API menu beside the list, click **Request logs**. | `https://beta.showpass.com/manage/organization/integrations/api/logs/` | The address matches. **Request logs** is the heading and is highlighted in the menu. |
| In the same menu, click **API allowlist**. | `https://beta.showpass.com/manage/organization/integrations/api/allowlist/` | The address matches. **API allowlist** is the heading and is highlighted in the menu. |
| Find **Partner API** in the page menu. Open **Organization** again and look under **Integrations**. | Keep **API allowlist** open. | **Partner API** is greyed out and cannot be selected in either menu. The Organization menu highlights **API** as the current section. |

### TC-6: Preserve role and feature flag boundaries

**Title:** Dashboard - Integrations - Preserve API and Webhook access by employee permissions

**Description:** Check which API and Webhook pages each test employee can open from the menu or by pasting a link.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Ask for a separate test login for each row below. Each employee's permissions and the Organization's Developer Tools flag (`enable_developer_tools`) must match the row.
- Sign in at [Beta Dashboard](https://beta.showpass.com/manage/) with the prepared Organization selected. Run both steps for each login.

| AccessProfile | Who to sign in as | What to open and look for | Addresses to paste in step 2 |
| --- | --- | --- | --- |
| ApiToolsOff | **Manage Integrations** and **Developer**. Developer Tools **OFF**. | Open **Webhooks → Endpoints**. Under **API**, expect disabled **Partner API** and no links for **API keys**, **Request logs** or **API allowlist**. | `/manage/organization/integrations/api/keys/`, `/manage/organization/integrations/api/logs/`, `/manage/organization/integrations/api/allowlist/` |
| WithoutOrganizationInfo | **Developer** without **Manage Organization Info**. Developer Tools **ON**. | Open **API → API keys**. **API allowlist** is missing. Open **Organization → Integrations → Webhooks** and expect **Endpoints**. | `/manage/organization/integrations/api/allowlist/` |
| ScanOnly | **Scan Tickets** only. Developer Tools **ON**. | Open **API → API keys**. Click **Create API key → Scopes**. Expect **Read scanning** and **Record scans**. Click **Close modal**. The menus omit **API allowlist**, **Organization settings**, and **Webhooks**. | `/manage/organization/integrations/api/allowlist/`, `/manage/organization/settings/`, `/manage/organization/integrations/webhooks/endpoints/` |

**Postconditions:** Leave the assigned roles and flags as found.

**Tags:** dashboard, employee-permissions, api-testing

**Parameters:**
AccessProfile: ApiToolsOff, WithoutOrganizationInfo, ScanOnly

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Click **Organization → Integrations**. Follow **What to open and look for** in your login's row. | Use only that row. | The menu, allowed pages, and any key scopes match the row. |
| Open a new tab in the same browser. Paste each address listed for your login. | Add `https://beta.showpass.com` at the start of each path. | The employee cannot open the restricted page's settings, lists, or buttons. |

## Organization → Integrations → Webhooks

### TC-7: Validate, create and edit a webhook endpoint

**Title:** Dashboard - Webhooks - Validate, create and edit an endpoint

**Description:** Try an incomplete endpoint, create a valid one, then check that **Cancel** keeps the original name and **Save** keeps the new name.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Sign in to [Beta Dashboard](https://beta.showpass.com/manage/) with **Developer** in a test Organization.
- Get the approved HTTPS address where Showpass can send test Purchase webhooks. Use three unused endpoint names, such as `QA original 01`, `QA cancel 01`, and `QA saved 01`.

**Postconditions:**

- On **Endpoints**, delete the row you created using **Delete Webhook Endpoint → Delete Endpoint**. Refresh and check that it is gone. If the row is needed for evidence, set **Webhook Status** to **Paused**, save, and reopen to check **Paused**.

**Tags:** dashboard, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Click **Organization → Integrations → Webhooks**. | `/manage/organization/integrations/webhooks/endpoints/` | **Endpoints** opens with **Add endpoint** above the list. |
| Click **Add endpoint** and leave the form blank. | `/manage/organization/integrations/webhooks/endpoints/create/` | **Add New Endpoint** opens. The form's **Add endpoint** button is disabled. |
| Click **Endpoint Name** and press **Tab**. Type `not-a-url` in **Endpoint URL** and press **Tab**. | Leave the name empty. | **Name is required** and **Make sure the url is valid** appear. **Add endpoint** stays disabled. |
| Enter the approved **Endpoint URL** and the first **Endpoint Name**. | Leave **Select Events** empty. | The name and URL errors clear. **Add endpoint** stays disabled. |
| Select **Purchase** and click **Add endpoint**. | Create just this one endpoint. | **Endpoints** opens with the first name in the list. |
| Click the pencil labelled **Edit Webhook Endpoint** for the row you created. | The address ends in `/endpoints/{endpointId}/`. Record the endpoint ID. | The page says **Edit Endpoint**. |
| Read the saved fields. | Compare them with the values you entered. | The name and URL match. **Purchase** is checked and **Secret Key** is present. Leave the secret out of the evidence. |
| Enter the second **Endpoint Name** and click **Cancel**. | For example, `QA cancel 01`. | The list shows the original name. The second name is absent. |
| Open the same row, enter the third **Endpoint Name**, and click **Save**. | For example, `QA saved 01`. | The list shows the third name on the same endpoint. |
| Reopen the renamed row. | Check its name, URL and event choice. | The third name is saved. The URL still matches the approved receiver and **Purchase** is checked. |

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

**Description:** Both old Organization Settings links should open **Analytics** in whichever Dashboard opens automatically at sign-in.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Ask the Beta setup owner for **All Access** sign-ins for the old and new Dashboard. Both test Organizations need Hive and Domains enabled (`enable_hive_integration` and `enable_custom_domains`). For the old Dashboard, ask the owner to confirm embedded Organization Settings (`enable_organization_settings_nextjs_embed`) is on.
- Use the Dashboard that opens automatically at sign-in. If you see **Switch back to the old dashboard**, ask for a sign-in that opens the new Dashboard automatically.
- Paste both links in each Dashboard version. That gives you four runs.

| LegacyTab | Beta address to paste |
| --- | --- |
| Analytics | `https://beta.showpass.com/dashboard/venues/edit/?tab=analyticsTab&filter=a&filter=b` |
| Integrations | `https://beta.showpass.com/dashboard/venues/edit/?tab=integrationsTab&filter=a&filter=b` |

**DashboardShell** values: **Legacy** means the old Dashboard. **NativeDefault** means the new Dashboard opens automatically at sign-in.

**Postconditions:** Leave Organization settings as found.

**Tags:** dashboard, organizer

**Parameters:**
LegacyTab: Analytics, Integrations
DashboardShell: Legacy, NativeDefault

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Paste the selected old link into the browser. | Use the **Analytics** or **Integrations** link from setup. | **Old Dashboard:** **Analytics** opens inside **Organization Settings**. That heading and menu stay visible and there is one main Dashboard menu. **New Dashboard:** **Analytics** opens with the **Integrations** menu at `https://beta.showpass.com/manage/organization/integrations/analytics/?filter=a&filter=b`. |
| In the old Dashboard only, open browser **Developer Tools → Elements** and search for `/manage/organization/integrations/analytics/`. | Read the address in the `src` attribute of the matching `iframe` element. This is the Analytics page loaded inside Organization Settings. | The address contains `/manage/organization/integrations/analytics/`, `isLegacy=true`, `showHeader=true`, `showSidebar=true`, `filter=a` and `filter=b`. |
| In the menu beside **Analytics**, click **Hive**, then **Domains**. | Keep the same Organization. | **Hive** and **Domains** each open. The old Dashboard keeps its Organization Settings menu. The new Dashboard keeps its Integrations menu. |

### TC-11: Keep the legacy Webhooks bookmark working in both shells

**Title:** Dashboard - Webhooks - Open the old Webhooks bookmark in both Dashboard versions

**Description:** The old Webhooks bookmark should open **Endpoints** in both Dashboard versions.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

- Ask for a **Developer** sign-in that opens each Dashboard version automatically. In each test Organization, get the name of an endpoint on the first page of **Endpoints**.
- Run once in the old Dashboard (**Legacy**) and once in the new Dashboard (**NativeDefault**). If you see **Switch back to the old dashboard**, ask for a sign-in that opens the new Dashboard automatically.

**Postconditions:** Leave the endpoint unchanged.

**Tags:** dashboard, api-testing

**Parameters:**
DashboardShell: Legacy, NativeDefault

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Paste the old Webhooks bookmark into the browser. | `https://beta.showpass.com/dashboard/webhooks/?filter=a&filter=b` | **Endpoints** shows the endpoint name from setup. **Old Dashboard:** The list opens inside the old Dashboard with the **Integrations** menu. **New Dashboard:** The address is `https://beta.showpass.com/manage/organization/integrations/webhooks/endpoints/?filter=a&filter=b`. |
| In the old Dashboard only, open browser **Developer Tools → Elements** and search for `/manage/organization/integrations/webhooks/endpoints/`. | Read the address in the `src` attribute of the matching `iframe` element. This is the Endpoints page loaded inside the old Dashboard. | The address ends in `/manage/organization/integrations/webhooks/endpoints/?isLegacy=true`. |
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

- **Start with API keys:** Run TC-5 from the Beta Dashboard. It checks the page, the create form, and the API menu without saving anything or needing an old key.
- **Rotation:** Run TC-1 when you have the full value of a disposable old key approved for retirement. Run TC-2 and TC-3 on another active fixture. The legacy fixture helper is `setup_legacy_organization_api_key` for a fresh local Organization. The targeted retirement suite confirms which fixture is eligible. Fresh Organizations do not automatically receive a legacy token. Keep all known credentials out of screenshots, request exports, and notes. Record status, Organization ID, expected test Event ID, and safe key metadata.
- **Other navigation:** For a short migration smoke, follow TC-5 with TC-7, TC-10 **Analytics + NativeDefault**, and TC-11 **NativeDefault**. Run Legacy with its own prepared session. TC-12 samples retired routes in the browser. The route definition tests enumerate the rest of the removed Developer/Webhooks adapters.
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
