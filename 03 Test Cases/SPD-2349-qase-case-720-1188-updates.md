---
title: SPD-2349 Qase case 720 and 1188 updates
tags:
  - qa
  - qase
  - memberships
---

# SPD-2349 Qase Case 720 and 1188 Updates

Use with [[05 Tooling/qasectl]] and [[05 Tooling/Qase Test Case Writing Rules]].

## Summary

- SPD-2349: New Box Office required a membership phone number when phone collection was disabled.
- Qase 720 remains membership-specific and verifies the numbered checkout steps when member information is required.
- Qase 1188 remains membership-specific and verifies the fields and custom questions shown for Standard and Enhanced Info.
- No new Qase case is proposed.

## Qase-Ready Updates

TC-1: Core - Memberships - Verify member information adds the correct checkout step count

**Description:** Validates that purchasing a membership with Standard or Enhanced Info adds one Questions step to the numbered checkout flow. It protects against missing, duplicated, or incorrectly counted membership-information steps.

| Platform            | View    |
| ------------------- | ------- |
| WebPublic           | Desktop |
| WebPublic           | Mobile  |
| Widget              | Desktop |
| Widget              | Mobile  |
| React Native Public | Mobile  |

**Preconditions:** A published membership without assigned seating or add-ons is available with the selected MembershipInfoType. Standard Info uses the fixed standard member fields. Enhanced Info has at least one member field configured for collection. The selected CustomerState can complete checkout on the selected Platform and View.

**Postconditions:** The completed order contains the membership and its submitted member information.

**Tags:** memberships, checkout

**Parameters:**
MembershipInfoType: StandardInfo, EnhancedInfo
CustomerState: Authenticated, Guest

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected membership purchase flow and add one membership to the basket. | MembershipInfoType and CustomerState | The selected membership is added and the checkout progress indicator registers one Questions step for its member information. |
| Review the complete numbered checkout flow after the basket update finishes. | No assigned seating or add-ons | Authenticated checkout shows 4 total steps. Guest checkout shows 5 total steps because Login is also included. Questions appears once for either StandardInfo or EnhancedInfo. |
| Continue through the steps before Questions. |  | Checkout follows the displayed order without skipping the Questions step or adding another membership-information step. |
| Complete the required member information and continue to Payment. | Valid information for the selected MembershipInfoType | The Questions step accepts the membership information and the displayed total step count remains unchanged. |
| Complete payment and review the purchased membership. | Supported payment method | Checkout completes and the submitted member information is saved to the purchased membership. |

TC-2: Core - Memberships - Verify Standard and Enhanced Info show the correct member questions

**Description:** Validates that membership checkout uses the fixed Standard Info fields and only the fields configured for Enhanced Info, including phone number, company name, and birthday. It also verifies membership custom questions, removal behavior, and saved answers, protecting against unconfigured Enhanced Info fields being shown or required.

| Platform            | View    |
| ------------------- | ------- |
| WebPublic           | Desktop |
| WebPublic           | Mobile  |
| Widget              | Desktop |
| Widget              | Mobile  |
| WebBoxOffice        | Desktop |
| Electron            | Desktop |
| React Native Public | Mobile  |

**Preconditions:** A published membership is configured for the selected MemberInfoSetup and is available on the selected Platform and View. It has one required and one optional custom question. Standard Info uses its fixed standard fields. Each Enhanced Info setup enables or disables the field named in MemberInfoSetup.

**Postconditions:** The completed purchase saves each membership's information and custom-question answer against the correct membership and order.

**Tags:** memberships, custom-questions

**Parameters:**
MemberInfoSetup: StandardInfo, EnhancedPhoneNumberEnabled, EnhancedPhoneNumberDisabled, EnhancedCompanyNameEnabled, EnhancedCompanyNameDisabled, EnhancedBirthdayEnabled, EnhancedBirthdayDisabled

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| On the selected Platform and View, add the membership configured for MemberInfoSetup and proceed to Questions. | MemberInfoSetup | A member-information section appears with one required and one optional custom question. |
| Review the member fields before entering information. | Selected MemberInfoSetup | StandardInfo shows fixed first name, last name, and email fields as required and phone as optional. An enabled Enhanced Info field is shown and required; a disabled Enhanced Info field is not shown or required. |
| Leave the required member fields and both custom questions unanswered and attempt to continue. |  | Required member fields and the required custom question show validation. The optional custom question and any disabled Enhanced Info field do not show required validation. |
| Complete the required member fields while leaving both custom questions unanswered, then attempt to continue again. | Valid values for fields required by MemberInfoSetup | Member-field validation clears, the required custom question still blocks checkout, and the optional custom question can remain unanswered. |
| Answer the required custom question, leave the optional custom question unanswered, and continue. | Valid required custom-question answer | The answer is accepted and checkout proceeds without requiring the optional custom question. |
| Return to the basket, remove the membership, and then re-add the same membership. |  | The membership fields and custom questions disappear and return with the same configured requirements when the membership is re-added. |
| Complete the required fields and custom question, finish checkout, and review the saved membership responses. | Supported payment method | The purchase completes and the information required by MemberInfoSetup and the required custom-question answer are saved to the correct membership. No disabled field or optional custom-question answer is required or saved. |
