---
title: Custom Questions Jira Dev Support Gap Analysis
tags:
  - qase
  - gap-analysis
  - custom-questions
---

# Custom Questions Jira Dev Support Gap Analysis

## Scope

Read-only analysis of SPD dev-support Jira issues that mention custom questions, compared against current Qase coverage and source behavior. No Qase cases were created or updated.

Jira search used:

- Project: `SPD`
- Keywords: `custom question`, `custom questions`, `info_custom_question`, `collect_info_custom`
- Results scanned: 72
- Relevant custom-question issues after local filtering: 28
- Saved API output: `/private/tmp/jira-custom-questions-search-with-comments.json`

Qase reads used:

- Keyword searches: `custom questions`, `custom question`
- Known suite 675 case reads: SPT-3223 through SPT-3228, SPT-3237 through SPT-3244, SPT-4014
- Saved API output: `/private/tmp/qase-custom-questions-search.json`, `/private/tmp/qase-custom-question-search.json`, `/private/tmp/qase-custom-questions-known-details.jsonl`

## Existing Qase Coverage

Keep SPT-3225 untouched as the broad baseline for supported checkout question types.

Relevant existing coverage:

| Qase ID | Current Coverage |
|---------|------------------|
| SPT-3223 | Deleted custom question does not appear at checkout across public, widget, and Box Office surfaces. |
| SPT-3224 | Invalid input for a required custom question. |
| SPT-3225 | Supported custom question types for a single ticket, parameterized by QuestionType. |
| SPT-3226 | Valid custom question input with multiple tickets and purchaser-level info. |
| SPT-3227 | Valid custom question input with multiple tickets and per-ticket guest info. |
| SPT-3228 | Required custom question left unanswered shows an error. |
| SPT-3241 | Enhanced info with additional custom questions submits valid input. |
| SPT-3242 | Custom question and enhanced info data save correctly in the database. |
| SPT-3243 | Recurring grandparent custom questions do not appear in calendar checkout. |
| SPT-3244 | Package child-event custom questions are presented at checkout. |
| SPT-4014 | Box Office exchange completes with either Box Office guest-info requirement state. |
| SPT-3253 | Dashboard can add a custom question by question type. |
| SPT-3268 | Dashboard can configure custom questions on package child event or ticket type. |
| SPT-3269 | Will Call report shows custom question and enhanced info answers. |
| SPT-3270 | Check-in ticket details show custom question and enhanced info answers. |

The current local Qase-ready draft in [[custom-questions-qase-gap-analysis]] already covers type-level edge cases for optional blanks, text limits, textarea length, required select one-option behavior, select placeholder behavior, decimal/integer/long-integer boundaries, date clearing, and checkbox deselection. Those draft cases should not be duplicated.

## Jira Issue Themes

| Theme | Jira Issues | Coverage Read |
|-------|-------------|---------------|
| Select defaults and required answers not registering | SPD-2402, SPD-1931, SPD-2302, SPD-2370 | Existing Qase covers generic required validation, but not the exact first-option or preselected-select regression. Local draft TC-4 and TC-5 cover this as separate edge cases. |
| Ticket-type scoping, cloned events, templates, and bulk updates | SPD-2246, SPD-1401, SPD-420, SPD-473 | Existing Qase has package and recurring cases, but no strong dashboard-to-checkout case proving selected ticket types are the only tickets asked after clone/template/bulk update. |
| Package parent/child and purchaser-info ownership | SPD-1553, SPD-851 | Existing Qase covers child package questions, but does not explicitly guard against asking package parent questions or pulling purchaser questions from the wrong event. |
| Downstream answer display and reporting | SPD-126, SPD-721, SPD-1415, SPD-2137 | Existing Qase has Will Call and check-in cases, but should be tightened around checkbox/select formatting so answers are readable, not raw objects or delimited IDs. |
| Membership custom questions and member reports | SPD-1867 | Existing checkout step-management mentions memberships, but Qase does not clearly prove membership custom-question answers appear in the member report. |
| Box Office desktop usability | SPD-773 | Existing Box Office coverage does not directly cover custom-question dropdown visibility and answerability in desktop Box Office. |
| Date picker boundary | SPD-1630 | Local draft TC-10 covers date clearing and boundary behavior; existing Qase baseline is too broad to catch a fixed-year date picker bug. |
| Placeholder and input wording | SPD-1800, SPD-418 | Lower priority. Validate with type edge cases if touched, but do not create standalone Qase coverage unless product changes placeholders again. |
| Likely not custom-question-specific | SPD-2273, SPD-1661, SPD-1651, SPD-1662, SPD-1363, SPD-934, SPD-310 | Mention custom questions in context, but primary issue appears to be scripting, PWYC/options limits, payment/exchange failure, enhanced info/address/phone, data cleanup, or order-form config. Do not create custom-question Qase cases from these without a narrower source-backed change. |

## Source-Backed Behavior

Backend:

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/constants/dynamic_forms.py` defines supported question types and limits: text, select, paragraph, date, int, char_int, decimal, html, checkbox_group.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/models/validators.py` enforces select options, date format, text/paragraph length, integer range, 16-digit long integer, decimal precision, HTML sanitization, and checkbox object shape.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/models/fields.py` removes empty select placeholders from guest-info select questions and requires custom questions to target ticket types or membership levels.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py` filters custom questions by ticket type and cleans cloned event custom-question ticket-type IDs.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py` merges and disperses custom questions across basket/item groups.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_models.py` includes checkbox formatting coverage for object, stringified options, malformed options, and scalar responses.

Frontend:

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/checkout/components/guest-questions/GuestQuestion/GuestQuestion.web.tsx` renders each question type, validates required select/date/checkbox behavior, formats selected dates, and serializes checkbox selections as option-name boolean objects.
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/checkout/components/guest-questions/GuestQuestion/useGuestQuestion.ts` auto-selects a required select question when it has exactly one option.
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/checkout/components/guest-questions/GuestQuestionsForm/GuestQuestionsForm.web.tsx` maps form responses back onto the matching guest question by form index.
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/custom-questions/CustomQuestionsForm.web.tsx` switches between purchaser-level and per-ticket guest custom-question forms.
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/custom-questions/helper/CustomQuestionsHelper.ts` stringifies existing object responses for initial form values and logs invalid response objects.

Playwright:

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/custom-questions/custom-questions.test.ts` covers public, widget, and Box Office custom-question checkout matrices across customer states and payment processors.
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/CustomQuestions.ts` fills text, textarea, decimal, integer, long integer, and checkbox inputs.
- Current Playwright helper coverage does not clearly fill select or date custom-question fields, which are two of the Jira-supported regression areas.

## Coverage Gaps

1. Required select edge cases are not live in Qase beyond the broad SPT-3225 baseline. Local draft TC-4 and TC-5 should be treated as high priority because SPD-2402 and SPD-1931 are the same class of bug.
2. Ticket-type scoping needs one end-to-end dashboard-to-checkout case that proves a custom question remains attached only to selected ticket types after template, clone, or bulk-style setup.
3. Package coverage should explicitly verify package parent tickets are not asked child-ticket custom questions and purchaser custom questions come from the correct event.
4. Reporting/check-in coverage should be updated or supplemented so checkbox/select answers display as readable labels across Will Call, check-in ticket details, and transaction details.
5. Membership custom-question reporting is not clearly covered.
6. Desktop Box Office needs direct coverage that long/select custom-question controls are visible and answerable.
7. Automation coverage has a helper gap for select and date custom-question inputs.

## Suggested Qase Actions

The Qase-ready cases have been merged into [[custom-questions-qase-gap-analysis]] to avoid duplicate local push sources.

Merged case mapping:

| Jira-driven gap | Merged case |
|-----------------|-------------|
| Select defaults and required answers not registering | TC-4, TC-5 |
| Date picker boundary | TC-10 |
| Checkbox answer readability | TC-11, TC-14 |
| Ticket-type scoping after clone/template setup | TC-12 |
| Package parent/child over-asking | TC-13 |
| Will Call readable answer display | TC-14 |
| Check-in ticket details readable answer display | TC-15 |
| Transaction details readable answer display | TC-16 |
| Membership custom-question report visibility | TC-17 |
| Box Office desktop question usability | TC-18 |

Leave SPT-3225 unchanged as the broad baseline for supported checkout question types.

## Automation Candidates

- Add Playwright helper support for select custom questions in `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/CustomQuestions.ts`.
- Add Playwright helper support for date custom questions in the same helper.
- Extend the existing custom-question matrix in `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/custom-questions/custom-questions.test.ts` with one select-first-option fixture and one date-future fixture after stable fixture data exists.
- Add a focused dashboard/report assertion for readable checkbox answers if report exports are already supported in the Playwright repo.

## Open Questions

- Are membership custom questions still expected to appear in a member report, or has that workflow moved to a different report/export surface?
- Should SaleNotification be covered in Qase as part of reporting, or should it remain an email-notification regression outside the custom-question suite?
