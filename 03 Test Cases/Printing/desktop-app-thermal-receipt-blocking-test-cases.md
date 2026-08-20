---
title: Desktop App Thermal Receipt Blocking Test Cases
date: 2026-08-19
tags:
  - qa/test-cases
  - qa/qase
  - printing
  - box-office
---

# Desktop App Thermal Receipt Blocking Test Cases

Related standards: [[00 Start Here/World-Class Software Quality Standard]], [[05 Tooling/Qase Test Case Writing Rules]], and [[05 Tooling/qasectl]].

## Testing Intent

We are testing whether a Box Office employee can use browser thermal receipt printing only in Web Box Office while Electron blocks that mode and preserves supported receipt workflows; this matters because Electron can otherwise invoke an unsupported browser print path, and we will prove it through visible control availability, successful supported printing, and completed transaction evidence.

| Field | Answer |
| --- | --- |
| Criticality bucket | Live sales completion; lower-risk product quality for reprints |
| Business invariant | Browser thermal receipt printing is available only in Web Box Office and cannot be selected or invoked in Electron; ordinary supported receipt delivery and printing remain usable. |
| User or business impact | A Box Office employee could encounter an unsupported print dialog, fail to produce the intended receipt, or be blocked during a live sale. |
| Failure mode | Electron displays or invokes **Thermal Receipt**, or the restriction also removes supported web or Electron receipt behavior. |
| Observable proof | Electron does not show **Thermal Receipt** or **Print thermal receipt**; Web Box Office shows them for an enabled venue; the selected supported flow completes with one transaction and the expected receipt output. |
| Source of truth | Frontend runtime platform check, Box Office receipt-selection code, Transactions action code, frontend unit coverage, user-provided UI screenshot, and related Qase cases. |
| Primary surfaces | Electron Box Office Checkout, Electron Printer Settings, Electron Transactions, Web Box Office Checkout, and Web Box Office Transactions. |
| In scope | A venue with thermal receipt printing enabled; checkout selection; saved/stale selection recovery; transaction receipt action; ordinary supported receipt printing as a control. |
| Out of scope | Thermal ticket layouts, BOCA ticket printing, Star Micronics receipt printing, Mobile Box Office/POS, email receipts, PDF content localization, and printer-failure recovery except where needed to prove the restriction does not block checkout. |
| Confidence | High for source-backed availability rules; Medium for live beta presentation because the supplied screenshot was reviewed but the beta page could not be opened in an available browser session. |

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| Electron cannot select browser thermal receipt mode | Prevents an unsupported browser print path during a live sale | TC-1, TC-2 |
| Electron cannot invoke browser thermal receipt from Transactions | Prevents the same unsupported path after purchase | TC-3 |
| Supported Electron receipt output still works | Ensures the restriction does not block ordinary receipt delivery | TC-2, TC-3 |
| Web Box Office retains thermal receipt checkout and reprint behavior | Prevents an Electron-specific restriction from regressing the supported web feature | TC-4, TC-5 |

## Declared Scope and Coverage Decisions

- **Desktop app** means the Electron Showpass desktop application detected by the frontend runtime.
- **Thermal Receipt** means the checkbox shown in the supplied Receipt Delivery screenshot. It opens the browser print dialog using the invoice receipt text; it is distinct from a thermal ticket layout or a configured Star Micronics receipt printer.
- The Electron restriction and web control are separate proof targets because availability and expected results differ by platform.
- Printer Settings, Checkout, and Transactions are separate entry points because each can expose or invoke receipt output from different starting state.
- One low-value cash sale is sufficient for the checkout proof. Payment-processor permutations do not change the platform availability rule.
- Existing unit tests are source evidence, not proof that a packaged desktop build or beta environment passed.

## Summary of Expected Behavior

- When the venue enables thermal receipts, Web Box Office can show the **Thermal Receipt** checkbox while **Print** is selected under Receipt Delivery.
- Selecting **Thermal Receipt** uses the browser print dialog and hides the normal receipt-printer configuration for that selection.
- Electron must not offer that checkbox, even when the venue enables thermal receipts.
- If an unsupported browser thermal receipt selection is already stored, Electron replaces it with **Save as PDF** after venue data resolves.
- Transactions can show **Print thermal receipt** in a compatible web browser for an enabled venue, but not in Electron.
- The restriction does not remove Electron's supported receipt printer or PDF workflows.

## Sources Reviewed

### Product and workflow guidance

- [[00 Start Here/World-Class Software Quality Standard]]
- [[06 Prompts/Showpass QA Test Case Generator]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- [[05 Tooling/qasectl]]
- User-provided screenshot of Web Box Office **Receipt Delivery**, showing **Print**, **Email**, **None**, the checked **Thermal Receipt** control, and browser print-dialog guidance.
- User-provided beta route: [Web Box Office staff](https://beta.showpass.com/dashboard/events/box-office/staff/). Live navigation was not executed because no browser session was available.
- Relevant frontend thermal-receipt source and unit coverage were re-reviewed on 2026-08-19 after the user reported a fresh pull from `develop`; the platform boundary and entry points remained consistent with this note. No git diff or branch comparison was performed.

### Frontend source

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/utils/get-platform.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/printing/utils/thermal-receipt-availability.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/printing/utils/thermal-receipt-availability.test.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/printing/hooks/useThermalReceiptSelection.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/checkout/components/Checkout.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/checkout/components/Checkout.ReceiptDelivery.test.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/printing/components/PrinterSettings/PrinterSettings.test.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/printing/components/PrinterSelect/PrinterSelect.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/printing/components/PrinterSelect/PrinterSelect.test.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionActions/TransactionActions.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionActions/TransactionActions.test.tsx`

### Automation patterns

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/SellPage.ts` currently configures receipt delivery as email and has no browser thermal receipt coverage.

### Existing Qase coverage

Read-only scan performed on 2026-08-19:

- Query method: all 1,617 project cases read once, then filtered locally by printing, receipt, thermal receipt, Box Office, and Electron terms/tags.
- Exact title match for `thermal receipt`: 0 cases.
- Qase case 1115, `WebBoxOffice - Printing - Print tickets and receipts during checkout by output selection`, covers web checkout output but does not name or assert the **Thermal Receipt** checkbox or Electron restriction.
- Qase case 4099, `Electron - Printing + Checkout - Print tickets and receipts by output selection`, covers supported Electron printers and PDFs but does not assert that browser thermal receipt mode is absent.
- Qase case 4402, `Core - Box Office - Reprint Ticket Items and Receipts`, covers Web Box Office and Electron reprints but does not define the platform-specific **Print thermal receipt** availability.
- The initial gap analysis was read-only. After dry-run approval, Qase case 5061 was created and cases 1115, 4099, and 4402 were enhanced as recorded in [[#Qase Dry Run and Apply Verification]].

## Assumptions and Unknowns

- Assumption: “all thermal receipt printing” refers to the screenshot's browser thermal receipt mode, not physical Star Micronics receipt printing or thermal ticket layouts. This matches the source restriction and the “only available on the web” requirement.
- Assumption: the test venue exposes `enable_printing_thermal_receipts` as enabled; venue setup for this setting may require admin or developer support.
- Unknown: whether the packaged desktop build under test can be seeded with a stale browser thermal receipt selection through a supported user path. Source unit tests prove reset logic, but manual migration proof may require an older build or developer-provided fixture.
- Unknown: whether beta pop-up permissions are already allowed. TC-4 requires permission to observe the browser print dialog.
- Unknown: exact Qase update strategy. TC-2 and TC-3 can enhance cases 4099 and 4402; TC-4 can enhance cases 1115 and 4402. No update should be applied without a separate approved dry run.

## Source-Backed Behavior

- Electron is detected at runtime through `window.ElectronView.isElectron`; runtime detection overrides the build-time platform.
- `isThermalReceiptAvailable` returns false in Electron before considering the venue setting.
- The shared thermal receipt selection hook is used by checkout and printer-selection surfaces.
- The checkbox is shown only when **Print** is the selected receipt delivery method and browser thermal receipts are available.
- A stored browser thermal receipt selection remains untouched only while venue data is loading; after venue resolution, unsupported state is reset to **Save as PDF**.
- The Transactions receipt action uses the same availability function. A compatible web browser can show **Print thermal receipt**, while Electron follows the ordinary receipt action instead.
- Browser thermal receipt printing depends on an invoice receipt string and invokes the browser-specific print route; it is not the desktop native receipt-printer route.

## Product-Surface and Complex-Control Inventory

| Surface / Control | Relevant states | Decision |
| --- | --- | --- |
| Electron Printer Settings | Venue enabled; physical receipt printer configured; stale browser selection | Covered by TC-1; stale internal selection is automation-backed and manual-only without a fixture |
| Electron Checkout → Receipt Delivery | Print selected; Email/None control; browser thermal unavailable | Covered by TC-2 |
| Electron Transactions action menu | Receipt exists; venue enabled; ordinary receipt action | Covered by TC-3 |
| Web Box Office Checkout → Receipt Delivery | Print selected; checkbox off/on; pop-up permission | Covered by TC-4 |
| Web Box Office Transactions action menu | Receipt exists; venue enabled | Covered by TC-5 |
| Star WebPRNT and iPad | Browser thermal explicitly incompatible in source | Not applicable to the requested desktop-vs-web scope; defer separate compatibility coverage |
| Mobile Box Office/POS | Separate native receipt-printer implementation | Not applicable |

## Entry-Point Coverage

| Entry Point | Actor Path | Starting State | Supported Surface | Required Outcome |
| --- | --- | --- | --- | --- |
| DesktopPrinterSettings | Electron → Settings → Printer Settings | Venue enabled and Desktop Agent connected | Electron | No **Thermal Receipt** choice; supported receipt printer selection remains |
| DesktopCheckout | Electron → Sell → basket → Checkout → Receipt Delivery | Printable item in basket; **Print** selected | Electron | No **Thermal Receipt** checkbox; purchase and supported receipt output complete |
| DesktopTransaction | Electron → Transactions → completed transaction actions | Completed transaction has a receipt | Electron | No **Print thermal receipt** action; ordinary receipt action remains |
| WebCheckout | Browser → Web Box Office → Sell → basket → Checkout → Receipt Delivery | Enabled venue; **Print** selected | WebBoxOffice | Checkbox is available and opens the browser print dialog when used |
| WebTransaction | Browser → Web Box Office → Transactions → completed transaction actions | Enabled venue and receipt string | WebBoxOffice | **Print thermal receipt** is available and invokes browser printing |

## Risk Areas

- A venue-enabled flag could bypass the platform restriction and expose the control in Electron.
- A selection saved before the restriction could remain active even though its control is hidden, causing post-purchase printing to take the unsupported path.
- Checkout and Transactions could diverge because they are separate callers of the shared eligibility rule.
- Hiding the browser thermal mode could accidentally remove the normal Electron receipt printer or PDF selection.
- A broad restriction could accidentally hide the supported control in Web Box Office.
- Browser pop-up blocking can look like a product failure; execution must distinguish control availability from local browser permission.

## State-Space / Setup Matrix

| Platform | Venue thermal setting | Starting receipt mode | Entry point | Expected browser thermal behavior | Coverage |
| --- | --- | --- | --- | --- | --- |
| Electron | Enabled | Supported printer/PDF | Printer Settings | Control absent; supported selection available | TC-1 |
| Electron | Enabled | Supported printer/PDF | Checkout | Checkbox absent; purchase completes | TC-2 |
| Electron | Enabled | Existing transaction | Transactions | **Print thermal receipt** absent; ordinary action available | TC-3 |
| Electron | Enabled | Stale browser thermal selection | Printer Settings or Checkout | Selection resets to **Save as PDF** after venue loads | Manual-only without fixture; existing unit coverage |
| WebBoxOffice | Enabled | Browser thermal off | Checkout | Checkbox visible and selectable | TC-4 |
| WebBoxOffice | Enabled | Browser thermal on | Checkout | Browser guidance visible; checkout invokes browser print | TC-4 |
| WebBoxOffice | Enabled | Existing transaction | Transactions | **Print thermal receipt** visible and invokes browser print | TC-5 |
| WebBoxOffice | Disabled | Any | Checkout/Transactions | Browser thermal actions absent | Existing unit coverage; excluded from minimum manual set because it does not prove the platform restriction |

## Coverage Ledger

| Item | Type | Risk | Coverage | Evidence | Gap / Decision |
| --- | --- | --- | --- | --- | --- |
| Electron eligibility rejection | Platform gate | Unsupported print route | Automated: validation/error; planned manual | Frontend utility test; TC-1 to TC-3 | Packaged app not executed |
| Checkout checkbox in Electron | Conditional control | Unsupported selection | Planned manual | Source caller and checkout component; TC-2 | Execution pending |
| Receipt printer selection in Electron | Conditional control | Supported output removed | Planned manual | Printer selection source; TC-1 | Execution pending |
| Stale selection reset | Persistence/recovery | Hidden unsupported state remains active | Automated: persistence; Manual-only | PrinterSettings and PrinterSelect unit tests | Requires old-build or seeded packaged-app fixture for manual proof |
| Transactions action in Electron | Conditional action | Unsupported post-purchase print | Planned manual | TransactionActions source; TC-3 | Execution pending |
| Web checkout browser thermal mode | Clean success | Supported feature removed | Planned manual | Source plus supplied screenshot; TC-4 | Live browser execution unavailable |
| Web transaction thermal reprint | Post-purchase action | Supported reprint removed | Planned manual | TransactionActions source; TC-5 | Live browser execution unavailable |
| Ordinary Electron receipt printing | Regression control | Receipt output blocked | Existing Qase plus planned manual | Qase 4099/4402; TC-2/TC-3 | Keep focused; do not rerun every printer permutation |
| Star WebPRNT/iPad incompatibility | User-agent gate | Conflicting print behavior | Deferred | Frontend utility source/tests | Separate scope and fixtures |

## Recommended Test Data

- One test venue with thermal receipts enabled and access to both Web Box Office and the latest Electron desktop app.
- One Box Office employee with permission to use Box Office and administer Transactions.
- One low-value, general-admission event ticket that can be sold with cash and safely voided or refunded.
- One configured Electron receipt output, preferably **Save as PDF** for a low-risk run; use a physical Star Micronics receipt printer only when hardware verification is required.
- One completed transaction with an available receipt and receipt text for Transactions checks.
- Browser pop-ups allowed for beta Showpass during the web thermal receipt execution.
- Optional developer-provided desktop fixture with the browser thermal receipt option already stored, used only to prove stale-state reset.

## Qase-Ready Manual Test Cases

### TC-1: Electron - Printing - Verify browser thermal receipt is hidden from Printer Settings

**Qase status:** Created as Qase case 5061 in suite 159.

**Description:** Validates that an Electron Box Office employee cannot select the web-only **Thermal Receipt** mode from Printer Settings while supported desktop receipt outputs remain available. This protects against an unsupported browser print selection being stored in the desktop app.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:**

* The latest Showpass desktop app is installed and the Box Office employee is signed in to the test venue.
* Thermal receipts are enabled for the venue.
* The Desktop Agent is connected and at least one supported receipt output is available.

**Postconditions:**

* No venue or transaction data is changed.
* Leave the original supported receipt printer selected.

**Tags:** box-office, printing

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Showpass desktop app and select the test venue. | Thermal-receipt-enabled venue | The Electron Box Office opens for the correct venue. |
| Open **Settings**, then **Printer Settings**. | — | Printer Settings loads and shows the connected desktop printer state. |
| Inspect the receipt printer choices. | — | No checkbox or option named **Thermal Receipt** is shown. |
| Select the configured supported receipt output. | **Save as PDF** or the named receipt printer | The supported receipt output can be selected and remains visible. |
| Leave Printer Settings and reopen it. | — | The supported receipt output remains selected and **Thermal Receipt** is still absent. |

### TC-2: Electron - Printing - Verify browser thermal receipt is blocked during checkout

**Qase status:** Merged into Qase case 4099, followed by an approved wording-only cleanup. Its physical-printer, PDF, seating, payment, and seven-row grouped-parameter matrix remain unchanged.

**Description:** Validates that Electron checkout does not expose the web-only **Thermal Receipt** checkbox for a venue that enables it, while a Box Office employee can still complete a sale using a supported receipt output. This protects live sales from invoking an unsupported browser print dialog without removing desktop receipt delivery.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:**

* The latest Showpass desktop app is signed in to the thermal-receipt-enabled test venue.
* A low-value general-admission ticket is available.
* **Save as PDF** or a supported receipt printer is configured.
* The employee can complete a cash sale and clean up the resulting transaction.

**Postconditions:**

* One test transaction exists only for the duration needed to verify receipt output.
* Void or refund only the named test transaction according to the environment's approved cleanup process.

**Tags:** box-office, printing, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the Showpass desktop app, open **Sell** for the test venue. | Test venue | The Sell page opens for the correct venue. |
| Add one low-value general-admission ticket to the basket and proceed to checkout. | 1 ticket | Checkout shows one ticket and the expected total. |
| In **Receipt Delivery**, select **Print**. | — | **Print** is selected and supported receipt-printer settings are available. |
| Inspect the **Receipt Delivery** heading and print settings. | — | No checkbox or option named **Thermal Receipt** is shown. |
| Select the configured supported receipt output. | **Save as PDF** or named receipt printer | The supported output is selected without exposing browser thermal receipt mode. |
| Complete the purchase with cash. | Exact cash amount | The purchase completes once and creates one transaction and one order. |
| Open or collect the receipt output. | — | One receipt is produced through the selected supported Electron output and no browser thermal print dialog opens. |
| Open **Transactions** and locate the completed sale. | Transaction from this run | The transaction total and payment type match the sale. |
| Apply the approved cleanup to the named test transaction. | Transaction from this run | The transaction is left in the agreed test-data state. |

### TC-3: Electron - Transactions - Verify thermal receipt reprint is unavailable

**Qase status:** Merged into the Electron receipt coverage in Qase case 4402 while preserving item reprints and all existing parameters.

**Description:** Validates that a Box Office employee cannot invoke the web-only **Print thermal receipt** action from an Electron transaction while the supported receipt action remains available. This protects post-purchase receipt handling from the unsupported browser thermal route.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:**

* The Showpass desktop app is signed in to the thermal-receipt-enabled test venue.
* A completed test transaction has an available receipt.
* A supported receipt output is configured.

**Postconditions:**

* Printed or downloaded test artifacts may be discarded.
* The completed transaction is not changed.

**Tags:** box-office, printing, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the Showpass desktop app, open **Transactions** for the test venue. | — | The Transactions page loads. |
| Search for and open the completed test transaction. | Transaction ID or purchaser email | The correct transaction details and receipt action menu are available. |
| Open the transaction action menu. | — | No action named **Print thermal receipt** is shown. |
| Select the supported receipt print or download action. | Visible **Print receipt** or **Download receipt** action | The ordinary receipt workflow opens or runs without offering browser thermal receipt mode. |
| Complete the supported receipt action. | Configured receipt output | The receipt matches the transaction and no browser thermal print dialog opens. |

### TC-4: Web Box Office - Printing - Verify browser thermal receipt remains available during checkout

**Qase status:** Merged into Qase case 1115 while preserving its existing output-selection group parameters.

**Description:** Validates that a Box Office employee can select **Thermal Receipt** in Web Box Office checkout and produce the completed transaction's receipt through the browser print dialog. This protects the supported web checkout behavior from being removed by the Electron restriction.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* The Box Office employee is signed in to the thermal-receipt-enabled test venue in a supported desktop browser.
* Browser pop-ups are allowed for Showpass.
* One low-value general-admission ticket is available for a cash sale.
* The employee can access Transactions and clean up the resulting sale.

**Postconditions:**

* Close browser print dialogs without sending output to an unintended physical printer.
* Void or refund only the named test transaction according to the environment's approved cleanup process.

**Tags:** box-office, printing, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Web Box Office **Sell** for the test venue in the browser. | Thermal-receipt-enabled venue | The Sell page opens for the correct venue. |
| Add one low-value general-admission ticket to the basket and proceed to checkout. | 1 ticket | Checkout shows one ticket and the expected total. |
| Under **Receipt Delivery**, select **Print**. | — | A checkbox named **Thermal Receipt** is visible. |
| Select **Thermal Receipt**. | — | The checkbox is checked and guidance states that the browser print dialog will open. |
| Complete the purchase with cash. | Exact cash amount | The purchase completes once and the browser print dialog opens for the receipt. |
| Inspect the receipt preview, then close the print dialog safely. | — | The receipt identifies the completed transaction and shows the expected total and payment type. |
| Open **Transactions** and select the transaction created in this run. | Transaction from this run | The completed transaction opens with the same total and payment type. |
| Apply the approved transaction cleanup. | Transaction from this run | The transaction is left in the agreed test-data state. |

### TC-5: Web Box Office - Transactions - Verify thermal receipt reprint remains available

**Qase status:** Merged into the WebBoxOffice receipt coverage in Qase case 4402 while preserving Electron, item-reprint, language, template, and Platform/View coverage.

**Description:** Validates that a Box Office employee can invoke **Print thermal receipt** from a completed Web Box Office transaction for a venue with browser thermal receipts enabled. This protects the supported web post-purchase print behavior from being removed by the Electron restriction.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* The Box Office employee is signed in to the thermal-receipt-enabled test venue in a supported desktop browser.
* Browser pop-ups are allowed for Showpass.
* A completed test transaction has an available receipt.

**Postconditions:**

* Close the browser print dialog without sending output to an unintended physical printer.
* The completed transaction is not changed.

**Tags:** box-office, printing, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Web Box Office, open **Transactions** for the test venue. | — | The Transactions page loads. |
| Search for and open the completed test transaction. | Transaction ID or purchaser email | The correct transaction details and receipt action menu are available. |
| Open the transaction action menu. | — | **Print thermal receipt** is visible. |
| Select **Print thermal receipt**. | — | The browser print dialog opens directly for the selected transaction's receipt. |
| Inspect the receipt preview, then close the print dialog safely. | — | The receipt matches the selected transaction and no unintended physical print is sent. |

## Minimum Execution Set

Run in this order:

- **TC-2** — primary restriction and live-sale regression in Electron.
- **TC-4** — web checkout control proving the feature remains available where supported.
- **TC-3** — post-purchase Electron entry point.
- **TC-5** — post-purchase web control.
- **TC-1** — persistent Printer Settings entry point.

If only a smoke pair is possible, run TC-2 and TC-4. This proves both sides of the platform boundary but leaves Printer Settings and post-purchase reprint behavior unexecuted.

## Suggested Automated Coverage

- Preserve the current unit test that rejects thermal receipts when `window.ElectronView.isElectron` is true.
- Preserve PrinterSettings and PrinterSelect tests that hide **Thermal Receipt** and reset an existing browser thermal selection to **Save as PDF** in Electron.
- Add or preserve a checkout component test using real platform detection rather than only mocking the thermal-selection hook, so the Electron restriction is proven at the visible Receipt Delivery control.
- Add a TransactionActions Electron test asserting **Print thermal receipt** is absent while the ordinary receipt action remains.
- Add Web Box Office Playwright coverage that enables the safe test venue, selects **Thermal Receipt**, completes a low-risk sale with browser printing stubbed at the window boundary, and verifies one completed transaction.
- Add an Electron end-to-end smoke that opens Printer Settings, Checkout, and Transactions and asserts the browser thermal labels are absent while supported receipt output remains available.
- Keep hardware printing outside the browser thermal automation unless a controlled printer lab and cleanup protocol are available.

## Qase Dry Run and Apply Verification

Dry run and approved apply completed on 2026-08-19. Apply-time verification and a separate final read confirmed the stored results.

| Local Scope | Action | Qase Case | Suite | Tags | Protected Parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| TC-1 | Created | 5061 | 159 | box-office, printing | None | 5 |
| TC-4 merged enhancement | Update | 1115 | 131 | box-office, printing | Group preserved: PrintOutput, VenueSetup, PaymentType; 5 aligned rows | 7 → 8 |
| TC-2 merged enhancement | Update | 4099 | 159 | printing, hardware, box-office, electron | Group preserved: PrintOutput, TicketPrinter, TicketLayout, ReceiptPrinter, SeatingType, PaymentType; 7 aligned rows | 8 → 8 |
| TC-3 and TC-5 merged enhancement | Update | 4402 | 711 | printing, box-office | Singles preserved: Language, Reprint, HasThermalTemplate; group preserved: Platform/View; 2 aligned rows | 6 → 6 |

Update safeguards:

- Updates are classified as **Enhance**; existing printer, output, seating, payment, language, template, platform, item-reprint, receipt-reprint, and transaction assertions remain represented.
- Update payload fields are limited to `title`, `description`, `preconditions`, `postconditions`, `tags`, and `steps`.
- `params`, `parameters`, `suite_id`, `priority`, `type`, `behavior`, and `layer` are excluded from every update payload.
- Live grouped and single parameter structures were read before the dry run and are not reconstructed from Markdown.
- Existing tags remain unchanged on cases 1115, 4099, and 4402.
- TC-1 is a new case with no parameters.
- Manual parameter edits required: none.
- Qase returned HTTP 200 for all four operations.
- Final independent verification confirmed case 5061 and the updated cases 1115, 4099, and 4402.
- No additional Qase action is pending.

### Qase 4099 Wording Cleanup

An approved wording-only refactor was applied and independently verified on 2026-08-19:

- Final title: `Electron - Printing + Checkout - Verify ticket and receipt outputs`.
- The description now states plainly that Star Micronics receipt printing and the **Thermal** ticket layout remain supported in Electron, while the browser-only **Thermal Receipt** checkbox remains hidden.
- Preconditions were reduced from detailed parameter mapping to the required actor, venue, inventory, printer/PDF, and payment setup.
- All eight steps remain, with shorter actions and one observable expected result per row.
- Only `title`, `description`, `preconditions`, `postconditions`, and `steps` were updated.
- The grouped parameters, tags, suite, priority, type, behavior, and layer were excluded from the update and matched the pre-update state on final readback.

## Open Questions

1. Can the test venue's thermal receipt setting be enabled through an existing safe admin workflow, or is a developer-provided venue fixture required?
2. Should manual coverage prove stale-state migration from an older desktop version? If yes, provide the supported old build and upgrade path or a packaged-app fixture with browser thermal receipt already selected.
3. Confirm that physical Star Micronics receipt printing and thermal ticket layouts remain supported in Electron. Source behavior indicates they are intentionally outside this browser-only restriction.
