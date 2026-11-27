---
title: Access PIN QA Library
tags:
  - qa/test-cases
---

# Access PIN QA Library

A permitted employee creates an Access PIN. Box Office can use that PIN to temporarily apply the PIN owner's authorized permissions. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Start with a controlled supervisor and a seller with limited base permissions in the same Venue. Verify the exact authorized action before, during and after the PIN session. Record the result and permission, never the PIN itself.

## Connected features

- [[03 Test Cases/Box Office/Box Office Test Cases]]
- [[03 Test Cases/Employees/employees-qa-test-cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-3406](https://app.qase.io/case/SPT-3406) · Manage - Access Pin - Generate Access PIN
- [SPT-1313](https://app.qase.io/case/SPT-1313) · Box Office - Access Pin - Verify access pin application on employee side

## Draft cases

### TC-1: A replaced Access PIN cannot be used for a new Box Office session

**Title:** Web Box Office - Access PIN - Accept only the replacement PIN after regeneration

**Description:** Replacing an Access PIN in an authorized supervisor's account affects the next authorization attempt on the same Venue's Web Box Office. The replacement must unlock the permitted session while the previous PIN stays invalid.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:**

* Use a test Venue with Access PIN enabled. Have the setup owner confirm `show_access_pin` is on. Use a dedicated test supervisor with **Manage Access PIN** and a separate employee who can open **Operations → Box Office → Sell**. Use an existing active PIN for that dedicated supervisor and start with the seller's Access PIN session locked.
* Use separate controlled sessions. The supervisor enters or relays the test values through the approved secure channel. Keep the values out of screenshots and records.

**Tags:** box-office, employee-permissions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the test supervisor, open **Account → Access PIN** and select **Regenerate pin**. | Dedicated Venue supervisor | The displayed active PIN is replaced with a different value. |
| As the seller, open **Operations → Box Office → Sell** and select the **Access pin** lock icon. | Same Venue | The Access PIN entry opens in the locked session. |
| Enter the supervisor's previous test PIN once and click **Enter**. | Previous value, provided securely | **Incorrect pin. Please try again** appears and the session remains locked. |
| Replace all four masked digits with the replacement PIN and click **Enter**. | New value, provided securely | The Access PIN control shows the authorized session is unlocked. |
| Select the unlocked **Access pin** control to end the temporary session. |  | The control returns to its locked state. |

**Postconditions:** Leave the seller out of the temporary session. Keep the replacement only on the dedicated supervisor account and record the approval/rejection result without any PIN values.

## Proof and sources

**Status:** Local draft. **Not run.** The Organizer Tester owns regeneration, with the Box Office Tester verifying the seller session. SPT-3406 checks initial generation. SPT-1313 checks use and exit of an active PIN. The draft pairs rejection of the replaced value with the accepted replacement from the same Venue.

Backend `apps/venues/services/access_pin/generate/generate.py:27` replaces the current value and retries if an attempted replacement is identical. Frontend `AccessPinCard.web.tsx:154` renders the regeneration action. The **Sell** entry in `Inventory.web.tsx:696` shows the Access pin control and handles the outcome.
