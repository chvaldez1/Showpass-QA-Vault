# Custom Questions Qase Drafts

## Qase-Ready Cases

TC-1: Core - Checkout - Custom Questions + Edge Case - Verify optional questions can be left blank

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify optional questions can be left blank

**Description:** Verifies that a customer can leave optional custom questions unanswered during checkout without blocking purchase completion or saving a stale answer.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one optional custom question for the selected QuestionType. Use a fresh basket for each run.

**Postconditions:** Confirm the completed order does not show an answer for the skipped optional question.

**Tags:** public, checkout, edge-case

**Parameters:**
QuestionType: TextInput, TextArea, SelectBox, DecimalInput, IntegerInput, LongIntegerInput, DatePicker, CheckboxGroup

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open the public event page and add one ticket to the basket. | Event with selected optional QuestionType. | Checkout opens with the optional custom question. |
| Leave the custom question unanswered and continue. |  | Checkout allows the customer to continue without an error for the optional question. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order. | Completed order. | No answer is shown or saved for the skipped optional question. |

TC-2: Core - Checkout - Custom Questions + Edge Case - Verify text input length boundaries

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify text input length boundaries

**Description:** Verifies that a customer can submit a text custom-question answer at the supported boundary and cannot submit an answer outside configured text limits.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required text input custom question for a single ticket. Use default max length unless custom min or max length configuration is available.

**Postconditions:** Confirm the completed order stores the accepted text exactly.

**Tags:** public, checkout, edge-case

**Parameters:**
TextLimit: DefaultMaxLength, CustomMinLength, CustomMaxLength

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Text input custom question. | The text input is visible. |
| Enter text that violates the selected TextLimit. | Below minimum or above maximum, depending on TextLimit. | Checkout prevents continuation or shows a validation error. |
| Replace the answer with text exactly at the selected boundary. | 300 characters for default max, or configured boundary. | The answer is accepted. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order. | Completed order. | The saved answer matches the accepted boundary-length text. |

TC-3: Core - Checkout - Custom Questions + Edge Case - Verify textarea preserves long multiline answers

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify textarea preserves long multiline answers

**Description:** Verifies that a customer can submit a long multiline textarea answer and that the saved answer is not truncated or flattened.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required textarea custom question for a single ticket.

**Postconditions:** Confirm the completed order stores the submitted textarea answer.

**Tags:** public, checkout, edge-case

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Textarea custom question. | The textarea is visible. |
| Enter a 1000-character answer that includes multiple lines. | Multiline boundary answer. | The full answer is accepted without visible truncation. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order or report surface. | Completed order. | The saved answer is readable and matches the submitted multiline content. |

TC-4: Core - Checkout - Custom Questions + Edge Case - Verify required select with one option saves correctly

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify required select with one option saves correctly

**Description:** Verifies that a required select custom question with only one real option does not trap the customer on a blank value and saves the available option.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required select custom question with exactly one real option.

**Postconditions:** Confirm the completed order stores the single select option.

**Tags:** public, checkout, edge-case

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Required select with one option. | The select question is visible. |
| Review the select field before making any manual selection. | One available option. | The available option is selected or checkout can continue without a blank placeholder blocking the customer. |
| Continue checkout and complete purchase. | Valid customer and payment details. | The purchase completes successfully. |
| Review the completed order. | Completed order. | The single available option is saved as the answer. |

TC-5: Core - Checkout - Custom Questions + Edge Case - Verify required select rejects placeholder for multiple options

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify required select rejects placeholder for multiple options

**Description:** Verifies that a required select custom question with multiple options does not accept a placeholder or blank value as a valid answer.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required select custom question with at least two real options and a placeholder.

**Postconditions:** Confirm the completed order stores the selected real option.

**Tags:** public, checkout, edge-case

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Required select with multiple options. | The select question is visible. |
| Leave the select on the placeholder and try to continue. | Placeholder or no selection. | Checkout blocks continuation with a required-field error. |
| Select a real option and continue. | Any valid option. | The error clears and checkout allows the customer to continue. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order. | Completed order. | The selected option is saved, not the placeholder. |

TC-6: Core - Checkout - Custom Questions + Edge Case - Verify optional select can remain blank

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify optional select can remain blank

**Description:** Verifies that an optional select custom question with multiple options can be left blank without saving the placeholder as an answer.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one optional select custom question with at least two real options and a placeholder.

**Postconditions:** Confirm no placeholder answer is stored for the optional select question.

**Tags:** public, checkout, edge-case

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Optional select with multiple options. | The select question is visible. |
| Leave the select blank and continue. | Placeholder or no selection. | Checkout allows the customer to continue. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order. | Completed order. | No custom question answer is saved for the optional blank select. |

TC-7: Core - Checkout - Custom Questions + Edge Case - Verify decimal precision boundaries

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify decimal precision boundaries

**Description:** Verifies that decimal custom-question answers save valid precision and reject values with unsupported precision or digit count.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required decimal custom question for a single ticket.

**Postconditions:** Confirm the completed order stores the accepted decimal exactly.

**Tags:** public, checkout, edge-case

**Parameters:**
DecimalValue: FiveDecimalPlaces, TooManyDecimalPlaces, NegativeDecimal, TooManyDigits

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Decimal custom question. | The decimal field is visible. |
| Enter a decimal value for the selected DecimalValue. | Selected DecimalValue. | Valid values are accepted; invalid precision or digit count is blocked or rejected. |
| If the value was invalid, replace it with a valid decimal. | Valid decimal with up to five decimal places. | Checkout allows the customer to continue. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order. | Completed order. | The accepted decimal is saved without incorrect rounding or truncation. |

TC-8: Core - Checkout - Custom Questions + Edge Case - Verify integer boundaries reject decimal values

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify integer boundaries reject decimal values

**Description:** Verifies that integer custom-question answers accept supported boundary values and reject decimal or out-of-range values.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required integer custom question for a single ticket.

**Postconditions:** Confirm the completed order stores the accepted integer exactly.

**Tags:** public, checkout, edge-case

**Parameters:**
IntegerValue: PositiveBoundary, NegativeBoundary, DecimalValue, TenDigitValue

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Integer custom question. | The integer field is visible. |
| Enter the selected IntegerValue. | Selected IntegerValue. | `999999999` and `-999999999` are accepted; decimal and 10-digit values are blocked or rejected. |
| If the value was invalid, replace it with a valid boundary integer. | Valid boundary integer. | Checkout allows the customer to continue. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order. | Completed order. | The accepted integer is saved exactly. |

TC-9: Core - Checkout - Custom Questions + Edge Case - Verify long integer saves exact 16-digit values

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify long integer saves exact 16-digit values

**Description:** Verifies that long integer custom-question answers save a 16-digit numeric string exactly and reject unsupported non-digit or over-length values.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required long integer custom question for a single ticket.

**Postconditions:** Confirm the completed order stores the accepted long integer exactly.

**Tags:** public, checkout, edge-case

**Parameters:**
LongIntegerValue: SixteenDigits, LeadingZeros, NonDigitValue, SeventeenDigits

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Long integer custom question. | The long integer field is visible. |
| Enter the selected LongIntegerValue. | Selected LongIntegerValue. | 16-digit values are accepted; non-digit or 17-digit values are blocked or rejected. |
| If the value was invalid, replace it with a valid 16-digit value. | Valid 16-digit value. | Checkout allows the customer to continue. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order. | Completed order. | The accepted value is saved exactly without truncation or scientific notation. |

TC-10: Core - Checkout - Custom Questions + Edge Case - Verify required date clearing blocks checkout

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify required date clearing blocks checkout

**Description:** Verifies that clearing a required date custom-question answer invalidates checkout and that a selected date saves in the expected date format.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required date custom question for a single ticket.

**Postconditions:** Confirm the completed order stores the selected date.

**Tags:** public, checkout, edge-case

**Parameters:**
DateValue: PastBoundary, FutureBoundary, ClearedDate

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Date custom question. | The date picker is visible. |
| Select a date for the selected DateValue. | PastBoundary or FutureBoundary where applicable. | The selected date appears in the date field. |
| Clear the required date and try to continue. | ClearedDate. | Checkout blocks continuation with a required-field error. |
| Select a valid date again and complete checkout. | Valid date and payment details. | The purchase completes successfully. |
| Review the completed order. | Completed order. | The saved answer matches the selected date in `YYYY-MM-DD` format. |

TC-11: Core - Checkout - Custom Questions + Edge Case - Verify checkbox deselection and label handling

**Title:** Core - Checkout - Custom Questions + Edge Case - Verify checkbox deselection and label handling

**Description:** Verifies that required checkbox group answers require at least one selected option and save selected labels correctly when multiple options or punctuation are used.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Event has one required checkbox group custom question for a single ticket.

**Postconditions:** Confirm the completed order stores only selected checkbox options.

**Tags:** public, checkout, edge-case

**Parameters:**
CheckboxConfig: SingleOption, MultipleOptions, PunctuationLabels

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open checkout for the event. | Selected CheckboxConfig. | The checkbox group is visible. |
| Select one or more options, then deselect all options and try to continue. | Selected CheckboxConfig. | Checkout blocks continuation when no option remains selected. |
| Select the intended option set and continue. | One or more selected labels. | Checkout allows the customer to continue. |
| Complete checkout with valid customer and payment details. |  | The purchase completes successfully. |
| Review the completed order. | Completed order. | Only selected checkbox labels are saved and displayed correctly. |

TC-12: Dashboard - Custom Questions - Verify ticket-type scoped questions stay scoped after event clone

**Title:** Dashboard - Custom Questions - Verify ticket-type scoped questions stay scoped after event clone

**Description:** Verifies that an organizer can configure a custom question for selected ticket types only, clone or generate an event from that setup, and customers are only asked the question for the matching ticket types.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** Organizer has an event or template with at least two ticket types. One required custom question is assigned to only one ticket type.

**Postconditions:** Confirm the cloned or generated event keeps the same custom-question ticket-type assignment.

**Tags:** dashboard, checkout, events

**Parameters:**
SetupPath: EventClone, TemplateGeneratedEvent

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open the dashboard event settings for the selected SetupPath. | Event with at least two ticket types. | The custom question is assigned only to the selected ticket type. |
| Clone or generate the event from the configured setup. | Selected SetupPath. | The new event keeps the custom question assigned only to the intended ticket type. |
| Open public checkout and add only a ticket type that should not receive the question. | Unassigned ticket type. | Checkout does not show the custom question. |
| Start a new checkout and add the assigned ticket type. | Assigned ticket type. | Checkout shows the required custom question. |
| Answer the question and complete checkout. | Valid customer and payment details. | The purchase completes and the answer is saved only for the assigned ticket type. |

TC-13: Core - Checkout - Packages - Verify package parent tickets are not over-asked custom questions

**Title:** Core - Checkout - Packages - Verify package parent tickets are not over-asked custom questions

**Description:** Verifies that package checkout asks custom questions for the intended child tickets or purchaser event only, without adding extra questions for a non-redeemable package parent ticket.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:** Package event has a parent package item and child tickets. Child tickets have required custom questions; the parent package item should not collect guest custom questions.

**Postconditions:** Confirm saved answers are attached to the intended child ticket or purchaser event.

**Tags:** public, checkout, packages

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open the package purchase flow and select the package. | Package with child ticket custom questions. | Checkout opens with the package contents selected. |
| Review the custom-question step before answering. |  | Questions appear only for the child tickets or purchaser event that should collect them. |
| Answer each shown custom question. | Valid answers. | Checkout accepts the answers without asking an extra parent-package question. |
| Complete checkout. | Valid customer and payment details. | The purchase completes successfully. |
| Review order or ticket details. | Completed package order. | Saved answers are attached to the intended child ticket or purchaser record, not the package parent. |

TC-14: Dashboard - Reports - Verify custom-question answers display as readable labels in Will Call

**Title:** Dashboard - Reports - Verify custom-question answers display as readable labels in Will Call

**Description:** Verifies that custom-question answers from checkout appear as readable labels in the Will Call report instead of raw objects, IDs, or delimited values.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:** Event has required select and checkbox custom questions. At least one order is completed with answers to both questions.

**Postconditions:** Confirm the Will Call report shows the same readable answers submitted during checkout.

**Tags:** dashboard, reports, checkout

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Complete a checkout with select and checkbox custom-question answers. | Select one option and at least one checkbox label. | The order completes successfully. |
| Open the event Will Call report. | Completed order. | The report opens and includes custom-question columns or fields. |
| Review the select answer. | Completed order. | The selected option label is shown as readable text. |
| Review the checkbox answer. | Completed order. | Selected checkbox labels are shown as readable text, not raw JSON, IDs, or pipe-delimited numbers. |

TC-15: Dashboard - Check In - Verify custom-question answers display as readable labels in ticket details

**Title:** Dashboard - Check In - Verify custom-question answers display as readable labels in ticket details

**Description:** Verifies that custom-question answers from checkout appear as readable labels in check-in ticket details instead of raw objects, IDs, or delimited values.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:** Event has required select and checkbox custom questions. At least one order is completed with answers to both questions.

**Postconditions:** Confirm check-in ticket details show the same readable answers submitted during checkout.

**Tags:** dashboard, check-in, checkout

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Complete a checkout with select and checkbox custom-question answers. | Select one option and at least one checkbox label. | The order completes successfully. |
| Open the event check-in page and find the purchased ticket. | Completed order. | The ticket is listed and can be opened. |
| Open the ticket details. | Completed ticket. | The custom-question section is visible. |
| Review the select answer. | Completed ticket. | The selected option label is shown as readable text. |
| Review the checkbox answer. | Completed ticket. | Selected checkbox labels are shown as readable text, not raw JSON, IDs, or pipe-delimited numbers. |

TC-16: Dashboard - Transactions - Verify custom-question answers display as readable labels in transaction details

**Title:** Dashboard - Transactions - Verify custom-question answers display as readable labels in transaction details

**Description:** Verifies that custom-question answers from checkout appear as readable labels in transaction details instead of raw objects, IDs, or delimited values.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:** Event has required select and checkbox custom questions. At least one order is completed with answers to both questions.

**Postconditions:** Confirm transaction details show the same readable answers submitted during checkout.

**Tags:** dashboard, transactions, checkout

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Complete a checkout with select and checkbox custom-question answers. | Select one option and at least one checkbox label. | The order completes successfully. |
| Open the dashboard transaction details for the completed order. | Completed order. | The transaction details page opens. |
| Open or review the ticket or attendee information section. | Completed order. | The custom-question section is visible. |
| Review the select answer. | Completed order. | The selected option label is shown as readable text. |
| Review the checkbox answer. | Completed order. | Selected checkbox labels are shown as readable text, not raw JSON, IDs, or pipe-delimited numbers. |

TC-17: Core - Memberships - Verify membership custom-question answers appear in member reports

**Title:** Core - Memberships - Verify membership custom-question answers appear in member reports

**Description:** Verifies that custom questions collected during membership checkout are saved and available to organizers in member reporting.

| Platform | View |
|----------|------|
| WebPublic | Desktop |
| Widget | Desktop |

**Preconditions:** Membership level has at least one required custom question. Organizer has access to member reports.

**Postconditions:** Confirm the member report includes the completed checkout answer.

**Tags:** memberships, checkout, reports

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open the membership purchase flow and select the membership level. | Membership with required custom question. | Checkout shows the custom question. |
| Answer the custom question and complete membership checkout. | Valid customer and payment details. | The membership purchase completes successfully. |
| Open the organizer member report for the membership. | Completed membership order. | The member appears in the report. |
| Review the custom-question answer. | Member report row or export. | The answer is present and readable for the purchased membership. |

TC-18: Box Office - Custom Questions - Verify desktop employees can answer long or select questions

**Title:** Box Office - Custom Questions - Verify desktop employees can answer long or select questions

**Description:** Verifies that a Box Office employee can see and answer custom-question controls during desktop sales without the field being clipped or unusable.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Preconditions:** Event has required custom questions that include a select question and a long label or help text.

**Postconditions:** Confirm the transaction stores the selected answer.

**Tags:** box-office, checkout, edge-case

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Sign in as a Box Office employee and open the event sale flow. | Event with required custom questions. | The employee can add tickets to the cart. |
| Continue to the customer or guest information step. | Required select question with long label or help text. | The full question control is visible and usable. |
| Open the select question and choose an option. | Any valid option. | The option can be selected without clipping or blocked interaction. |
| Complete the sale. | Valid customer and payment details. | The transaction completes successfully. |
| Review the transaction details. | Completed Box Office transaction. | The selected custom-question answer is saved. |
