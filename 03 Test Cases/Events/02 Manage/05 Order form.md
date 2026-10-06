---
title: Event — Order form
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Order form

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Page coverage and source notes

SPT-3247/3249/3251–3253/3261–3264/3268–3270 retain messaging, guest collection, question CRUD, package-child scope and downstream answer display. SPT-3248 now belongs under Basic info (Purchase button text); SPT-4878 belongs under Legal & important info. SPT-5129 is an overlapping weak draft in Qase, not additional proof of builder coverage. SPT-5130/5145/5291/5299 cover downstream deferred and package-child questions; use their specialist suites rather than duplicate purchases here.

Current controls: Collection type; Enhanced information (First name, Last name, Email, Phone number, Company, Job title, Student number, Home address, Birthday, License plate); per-ticket collection; Box Office/POS enforcement; conditional profile sync; custom questions, choices, required/conditional rules and ticket scope; package-child information control; post-purchase collection when enabled; post-purchase message; Save and Discard. Questions are saved by this page's Save, not by a later Basic info save.

Sources: [question validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [page fields](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/hooks/useEventOrderFormFields.ts>), [sync gate and page-owned fields](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/utils/event-order-form-utils.ts>), [legacy embedding and separate-save warning](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form.html>).

### TC-20: Dashboard - Order Form - Show profile sync only for supported collection settings

**Description:** Profile sync is offered only when the organization allows it and the collected information can belong to the purchaser rather than separate ticket holders.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event created for testing.
* The organization has allow_info_upload_from_basket_to_vu enabled, and enable_nextjs_order_form is enabled for the organization.
* The event has no custom questions. Record the original collection type, per-ticket requirement and sync choice.

**Postconditions:** Restore the recorded collection and sync settings; remove only the question added by this case; save and reopen Order form.

**Tags:** dashboard, custom-questions, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Order form. | | Checkout collection settings are available. |
| Select Enhanced Info and turn off the requirement to collect information for each ticket. | | Sync custom questions and info to customer profile is available. |
| Enable profile sync and select Save. | | The configuration saves successfully. |
| Leave and reopen Order form. | | Enhanced Info and profile sync remain selected, with per-ticket collection off. |
| Enable the requirement to collect information for each ticket. | | Profile sync is no longer offered. |
| Save, leave and reopen Order form. | | Per-ticket collection remains enabled without an active purchaser-profile sync setting. |
| Select Standard Info and turn off per-ticket collection. | **Custom questions:** None | Profile sync is unavailable when there are no custom questions. |
| Add one text question. | **Question:** Arrival preference | Profile sync becomes available for Standard Info with a custom question. |
| Enable profile sync, save, leave and reopen Order form. | **Question:** Arrival preference | Standard Info, the question and the sync choice remain saved. |

Actual customer-profile writes require a controlled purchase in the custom-question integration suite; this case proves the control's availability and saved configuration only.

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-3269: Dashboard - Reports - Verify custom-question answers display as readable labels in Will Call

**Description:**

Verifies that custom-question answers from checkout appear as readable labels in the Will Call report instead of raw objects, IDs, or delimited values.

**Preconditions:**

Event has required select and checkbox custom questions. At least one order is completed with answers to both questions.

**Postconditions:**

Confirm the Will Call report shows the same readable answers submitted during checkout.

**Tags:** dashboard, reports, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete a checkout with select and checkbox custom-question answers. | Select one option and at least one checkbox label. | The order completes successfully. |
| Open the event Will Call report. | Completed order. | The report opens and includes custom-question columns or fields. |
| Review the select answer. | Completed order. | The selected option label is shown as readable text. |
| Review the checkbox answer. | Completed order. | Selected checkbox labels are shown as readable text, not raw JSON, IDs, or pipe-delimited numbers. |

### SPT-3270: Dashboard - Check In - Verify custom-question answers display as readable labels in ticket details

**Description:**

Verifies that custom-question answers from checkout appear as readable labels in check-in ticket details instead of raw objects, IDs, or delimited values.

**Preconditions:**

Event has required select and checkbox custom questions. At least one order is completed with answers to both questions.

**Postconditions:**

Confirm check-in ticket details show the same readable answers submitted during checkout.

**Tags:** dashboard, check-in, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete a checkout with select and checkbox custom-question answers. | Select one option and at least one checkbox label. | The order completes successfully. |
| Open the event check-in page and find the purchased ticket. | Completed order. | The ticket is listed and can be opened. |
| Open the ticket details. | Completed ticket. | The custom-question section is visible. |
| Review the select answer. | Completed ticket. | The selected option label is shown as readable text. |
| Review the checkbox answer. | Completed ticket. | Selected checkbox labels are shown as readable text, not raw JSON, IDs, or pipe-delimited numbers. |


## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-3247](https://app.qase.io/case/SPT-3247) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3249](https://app.qase.io/case/SPT-3249) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3251](https://app.qase.io/case/SPT-3251) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3252](https://app.qase.io/case/SPT-3252) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3253](https://app.qase.io/case/SPT-3253) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3261](https://app.qase.io/case/SPT-3261) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3262](https://app.qase.io/case/SPT-3262) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3263](https://app.qase.io/case/SPT-3263) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3264](https://app.qase.io/case/SPT-3264) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |
| [SPT-3268](https://app.qase.io/case/SPT-3268) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |

### SPT-3247: Dashboard - Order Form - Show the saved Display & Email Message

**Description:** Validates the saved post-purchase message after checkout and in the standard confirmation email. Source states that a custom confirmation email replaces this message in email, so the test setup must use the standard email.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future public event uses the standard confirmation email and has a purchasable ticket; the organizer can edit Order Form.

**Postconditions:** Restore the prior message; retain or clean the test order according to policy.

**Tags:** dashboard, post-purchase, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event's **Order Form** and enter **Display & Email Message**. | `QA arrival instructions <unique suffix>` | The message and character count are shown. |
| Save once, leave the page, and reopen **Order Form**. | Same event | The exact message persists. |
| Complete one buyer checkout. | One ticket; unique buyer email | The success page displays the exact saved message. |
| Open the standard confirmation email. | Same order | The exact message appears because no custom confirmation email overrides it. |

### SPT-3249: Dashboard - Order Form - Collect guest information for every ticket

**Description:** Validates that **Require guest information for each ticket** changes a two-ticket checkout from one shared guest form to separate ticket-level guest forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future event has a ticket type allowing quantity `2`; Order Form uses Standard Info.

**Postconditions:** Restore the original toggle and release the basket.

**Tags:** dashboard, custom-questions, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Enable **Require guest information for each ticket** in **Order Form**. | Toggle on | The help text explains that each ticket and purchaser require information. |
| Save once and reopen **Order Form**. | Same event | The toggle remains on. |
| Add two tickets in public checkout. | Quantity `2` | Checkout displays separate guest-information fields for Ticket 1 and Ticket 2 plus purchaser data as applicable. |
| Enter information for only one ticket and attempt to continue. | Leave Ticket 2 required fields empty | Checkout is blocked at the incomplete ticket. |
| Complete both ticket forms. | Two distinct guest names/emails | Checkout can continue past guest information. |

### SPT-3251: Dashboard - Order Form - Require guest information in staff sales

**Description:** Validates the saved staff-sales requirement on each client that provides it.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| MobileBoxOffice | Mobile |

**Preconditions:** The organizer can edit Order Form; the event has required guest fields; tester can start a staff sale on `Platform`.

**Postconditions:** Restore the toggle and cancel the unpaid sale.

**Tags:** dashboard, custom-questions, box-office

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Enable **Require guest information for staff box office and POS sales**. | Same event | The setting can be enabled. |
| Save once and reopen **Order Form**. | Same event | The staff-sales requirement persists. |
| In Web Box Office, start a sale for one event ticket. | Quantity `1` | Guest-information entry is required before completion. |
| Leave required guest data empty and try to continue. | No guest data | The staff sale cannot complete and identifies the missing information. |
| Enter valid guest data, then cancel before payment. | Unique test guest | The requirement is satisfied and the Web Box Office sale can proceed to the next stage. |
| Repeat the sale attempt in Mobile Box Office. | Quantity `1`; leave required data empty, then enter it | Mobile Box Office enforces the same required guest information before the sale can proceed. |

### SPT-3252: Dashboard - Order Form - Save Standard Info collection

**Description:** Validates Standard Info selection, its visible controls, persistence, and basic checkout collection.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** An editable event currently uses Enhanced Info and has a purchasable ticket.

**Postconditions:** Restore the original collection method and release the basket.

**Tags:** dashboard, custom-questions, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select **Standard Info** under **Collection Method**. | None | Ticket Button Verbiage and Add Question remain available; Enhanced Info field toggles are not shown as the active method. |
| Save once and reopen **Order Form**. | Same event | Standard Info remains selected. |
| Start buyer checkout for one ticket. | Quantity `1` | The standard name, email, and phone information is collected according to the event setup. |

### SPT-3253: Dashboard - Order Form - Add a custom question by type

**Description:**

Validates one custom-question type per run. Use `QA <QuestionType> <unique suffix>` as the question. SelectBox uses options `Red` and `Blue`; Checkboxes uses `Email` and `SMS`; numeric and date types use their matching input controls.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** Standard Info is selected; the event has General Admission and VIP ticket types.

**Postconditions:** Delete the test question and confirm its removal.

**Tags:** dashboard, custom-questions, checkout

**Parameters:**

QuestionType: TextInput, Textarea, SelectBox, Decimal, Integer, LongInteger, DatePicker, Checkboxes

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Order Form**, select **Add Question** and choose `QuestionType`. | Selected type | The editor displays controls appropriate to that type. |
| Enter the unique question, help text, and type-specific options. | Description data; required on; General Admission only | All values are accepted and the ticket scope names only General Admission. |
| Save once and reopen **Order Form**. | Same event | Type, question, help text, required status, options, and ticket scope all persist. |
| Start checkout with General Admission. | One ticket | The required question appears with the correct input control and options. |
| Start checkout with VIP instead. | One ticket | The General-Admission-only question does not appear for VIP. |

### SPT-3261: Dashboard - Order Form - Edit a custom question

**Description:** Validates that editing one existing question persists and reaches checkout without creating a duplicate.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** Standard Info has one test Text Input question scoped to General Admission.

**Postconditions:** Restore or delete the test question.

**Tags:** dashboard, custom-questions, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Edit the test question. | Original title recorded | The existing question editor opens. |
| Change its title, help text, required state, and ticket scope. | `QA Updated Question <suffix>`; Required on; VIP only | The edited values are accepted. |
| Save once and reopen **Order Form**. | Same event | One updated question appears; the original wording is absent. |
| Start VIP checkout. | One VIP ticket | The updated required question and help text appear. |
| Start General Admission checkout. | One GA ticket | The VIP-only question does not appear. |

### SPT-3262: Dashboard - Order Form - Delete a custom question

**Description:** Validates confirmed deletion in Dashboard and absence from a fresh read and checkout.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** Standard Info has one uniquely named test question shown in checkout.

**Postconditions:** The test question remains deleted.

**Tags:** dashboard, custom-questions, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select Delete for the uniquely named question. | Exact question title | A confirmation appears when required. |
| Confirm deletion and save once. | None | Only the selected question is removed. |
| Leave and reopen **Order Form**. | Same event | The deleted question is absent; unrelated questions remain. |
| Start checkout for its former ticket scope. | One ticket | The deleted question is no longer requested. |

### SPT-3263: Dashboard - Order Form - Save Enhanced Info collection

**Description:** Validates Enhanced Info selection and its field controls after a fresh read.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** An editable event currently uses Standard Info.

**Postconditions:** Restore the original collection method.

**Tags:** dashboard, custom-questions, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select **Enhanced Info** under **Collection Method**. | None | Standard enhanced fields and Add Question are shown. |
| Enable **Require guest information for each ticket**. | Toggle on | Enhanced field toggles become editable. |
| Save once and reopen **Order Form**. | Same event | Enhanced Info and the per-ticket toggle persist; the enhanced fields remain available. |

### SPT-3264: Dashboard - Order Form - Configure one Enhanced Info field

**Description:** Validates one enhanced field per run, including the prerequisite that per-ticket guest collection is enabled before field toggles become editable.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** Enhanced Info is selected; **Require guest information for each ticket** is on; the event has a purchasable ticket.

**Postconditions:** Restore recorded Enhanced Info fields and release the basket.

**Tags:** dashboard, custom-questions, checkout

**Parameters:**

EnhancedField: FirstName, Email, PhoneNumber, Birthday

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Enable and require `EnhancedField`; leave one recorded comparison field off. | Selected field | The selected field is on/required and the comparison field remains off. |
| Save once and reopen **Order Form**. | Same event | Both on/off states persist. |
| Start checkout for one ticket. | Quantity `1` | The selected field appears and is required; the disabled comparison field is absent. |
| Leave `EnhancedField` empty and continue. | No value | Checkout identifies the required field and does not continue. |
| Enter a valid value. | Type-appropriate data | The enhanced-information stage can continue. |

### SPT-3268: Dashboard - Package Event - Keep a custom question on one child

**Description:** Validates that a child-specific question persists only on the selected package child and does not leak to the parent or sibling.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A package has a parent plus two identifiable child events/ticket types; the selected child permits Order Form editing.

**Postconditions:** Delete the test child question and confirm isolation remains.

**Tags:** dashboard, custom-questions, packages

| Step Action | Data | Expected Result |
| --- | --- | --- |
| From the package setup, open **Order Form** for Child A. | Recorded parent, Child A, Child B | The page identifies Child A. |
| Add a required Select Box question. | `Meal Choice <suffix>`; Vegetarian, Standard; Child A ticket only | The child-specific configuration is accepted. |
| Save once and reopen Child A. | Same child | The question, options, and scope persist. |
| Open the package parent and Child B Order Forms. | Parent and sibling | Neither contains Child A's question. |
| Start checkout for Child A and then Child B where supported. | Matching child tickets | Meal Choice appears only for Child A. |
