---
title: Standards and best practices
updated: 2026-11-13
tags:
  - qa/playwright
  - standards
aliases:
  - Showpass Playwright baseline
---

# Standards and best practices

A practical baseline for writing, updating, reviewing, and selecting Showpass Playwright tests. The tagging section is the main reference; the other sections give the working rules around it.

> [!info] Where the detailed rules live
> The Playwright repository's `AGENTS.md`, workflow index, and topic guides own its implementation conventions. This note summarizes them rather than creating a second set of engineering rules. The vault's [[00 Start Here/World-Class Software Quality Standard]] remains the quality policy, and the [[00 Start Here/Showpass QA Handbook/00 Index|Showpass QA Master Handbook]] supplies the product testing guidance.
>
> Baseline checked against the local `showpass-playwright` checkout on **November 13, 2026**. Recheck current source before relying on a helper or command after a framework change.

Related notes: [[05 Tooling/Playwright CLI]], [[04 Automation/00 Index]], [[05 Tooling/Qase Test Case Writing Rules]], and [[05 Tooling/qasectl]].

## Standards

### Use Showpass terminology

Follow the actor definitions in [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]]. In code, keep established API fields and tag IDs intact; in descriptions, use the product term:

- **Customer** purchases or receives the order. **Attendee** uses admission and may be a different person. **Member** holds a Membership and its benefits.
- **Venue Employee** performs an authorized Dashboard or Box Office action. Signing in as an Employee does not make that Employee the order's Customer.
- **Organizer** is the business or its authorized representative. **Organization** is the Dashboard business context; **Venue** is the corresponding backend record. **Event Location** is where the Event takes place.
- **Customer Group** is the group-sale account. It is separate from an individual Customer and from the Organization selling the items.
- **Basket** holds the current selection. **Order** describes the Customer-facing purchase; **Invoice** and **Invoice item** identify financial records. Preserve exact UI wording when quoting a control or message.
- **Cash**, **Complimentary**, and **Other** are payment-method names. Use “Complimentary” in written descriptions rather than the shorthand “comp.” Keep **Refund**, **Void**, and **Exchange** distinct.

### Tests must describe the behavior they actually check

A test should make it clear who is acting, where they start, what they do, and what result is verified. For example, “Guest purchases a ticket through the Widget” is more useful than a title built only from helper names or record IDs.

- Use backend source for business rules, permissions, schemas, and validation; use frontend source for the user path and controls.
- Keep expected results independent of the value being checked. Reading a displayed total and asserting that same total proves nothing about its correctness.
- Match assertions to the claim: a visible confirmation is different from a saved order, one charge, restored inventory, or a delivered email.
- Account for unsupported, manual-only, deferred, blocked, skipped, and unrun paths. A test file existing does not prove the behavior passed.

### Keep responsibilities in the right place

| Location                            | What belongs there                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `test-data/`                        | Reusable records, accounts, item selections, and expected values                                        |
| Suite `*.config.ts` / `*-config.ts` | Case metadata, supported platforms/views, scenario inputs, customer states, priority, and smoke choices |
| `*.test.ts`                         | Test registration, Qase linkage, and readable scenario intent                                           |
| Optional `*.runner.ts`              | Registration and reporting shared by several cases or files                                             |
| Optional `*.steps.ts`               | Substantial scenario sequencing that would obscure the test                                             |
| `pages/`                            | Locators, browser interactions, and page/component assertions                                           |
| `flows/`                            | Established tasks reused across tests, such as checkout journeys                                        |
| `fixtures/`                         | Playwright runtime setup, teardown, and injected dependencies                                           |
| `utils/` / `fixtures/helpers/`      | Reusable supporting mechanics at the appropriate owner                                                  |
| `shared/`                           | Stable types, constants, and generated API enums                                                        |

Start with a config and a readable test. Add runners, steps files, fixtures, or abstractions only when they remove meaningful repetition or clarify a real responsibility. Reusable **test data** and Playwright **fixtures** are different things.

### Tagging: Playwright and Qase have different jobs

| Metadata                  | What it does                                                                         | Where it is registered                                              |
| ------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Playwright tags           | Select tests through `--grep` and describe the registered scenario                   | Test details or inherited `test.describe` details                   |
| Qase case ID              | Links a result to the matching existing Qase case                                    | Prefer a registration-time `QaseID` annotation when the ID is known |
| Qase group parameters     | Distinguish executions of the same case, such as platform, method, or customer state | `qase.groupParameters(...)` before scenario actions                 |
| Ordinary Qase parameters  | Supply supporting case metadata such as priority and smoke                           | `qase.parameters(...)`                                              |
| Tags saved on a Qase case | Organize the case inside Qase                                                        | Maintained through the approved Qase workflow                       |

A title containing `SPT-1234` is not sufficient Qase linkage. A `Platform` group parameter is not a Playwright platform tag. Changing local Playwright tags does not itself update the tags saved on remote Qase cases.

### Which execution tags apply?

Apply every dimension relevant to the behavior. Do not fill a category with an invented value merely to make every test look identical.

| Dimension                          | Canonical tags                                                                                                                             | When to use it                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Platform                           | `@platform-WebPublic`, `@platform-Website`, `@platform-Widget`, `@platform-WebBoxOffice`, `@platform-WebDashboard`, `@platform-DesktopApp` | The configured product surface exercised by the UI scenario                                  |
| Gateway / processor                | `@payment-processor-<processor ID>`                                                                                                        | A configured payment path, including relevant zero-total checkout coverage                   |
| Payment method                     | `@payment-method-<method ID>`                                                                                                              | The configured payment method being exercised                                                |
| Public / Website / Widget customer | `@user-guest`, `@user-authenticated`, `@user-new-user`                                                                                     | The customer identity exercised by the scenario                                              |
| Individual Box Office customer     | `@bo-customer-existing`, `@bo-customer-new`                                                                                                | A sale or other Customer action involving an individual Customer, including desktop checkout |
| Box Office customer group          | `@bo-group-existing`, `@bo-group-new`                                                                                                      | A scenario involving an existing or newly created customer group                             |
| Priority                           | `@priority-critical`, `@priority-major`, `@priority-medium`                                                                                | Generated from case metadata                                                                 |
| Smoke                              | `@smoke`, `@all-customer-states-smoke`                                                                                                     | Generated from the case and matrix smoke policy                                              |
| Feature                            | Existing tags such as `@checkout`, `@assigned-seating`, `@gift-card`, `@analytics`                                                         | Useful feature selection; reuse established names                                            |

Names and casing matter: use **`WebPublic`**, not `Webpublic`. Browser projects and views are separate dimensions: `DesktopChrome` is a project, `Desktop` is a view, and `WebPublic` is a platform. Do not replace one with another.

#### Gateway / processor tags

The processor ID combines the payment provider with the gateway/API variant where applicable. Current examples are:

| Tag suffix                          | Meaning                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| `StripeSystemGatewayPaymentIntents` | Stripe system gateway using Payment Intents                                    |
| `StripeSystemGatewayChargeApi`      | Stripe system gateway using the Charge API                                     |
| `StripeCustomGatewayPaymentIntents` | Stripe custom gateway using Payment Intents                                    |
| `StripeCustomGatewayChargeApi`      | Stripe custom gateway using the Charge API                                     |
| `StripeCustomGatewayConnect`        | Stripe Connect integration                                                     |
| `Authorize.net`                     | Authorize.net payment processor                                                |
| `Yuno`                              | Yuno payment processor                                                         |
| `none`                              | Cash, Complimentary, or Other in-person payment methods in this tagging helper |

The full tag is, for example, `@payment-processor-StripeSystemGatewayPaymentIntents`.

Use `getPaymentTagsFromTestData(testData)` from `utils/e2e-run-utils.ts`. It derives both processor and method tags using the existing ID helpers.

- Card paths need a configured processor. Stripe also needs a known system/custom gateway and an API or integration type. The helper rejects missing metadata rather than silently labelling that card path `none`.
- Ground missing values in the existing payment configuration or verified venue metadata. A venue name, account name, or accepted test card does not establish its gateway configuration.
- A gateway tag describes the configured checkout path. It is not evidence that a real gateway charge occurred.

#### In-person payments and Card checkout

Cash, Complimentary, and Other are the in-person payment methods grouped by `isInPersonPaymentMethod` in the tagging helper. They report processor `none`.

The Card checkout referred to here goes through Stripe; it is a gateway checkout flow, not an in-person payment flow. Keep the configured provider when a test explicitly covers another gateway, such as Authorize.net or Yuno. Starting a Card checkout in Box Office does not change its payment classification.

Square is a separate **in-person payment** flow. It must keep its Square processor information when covered; it must not be grouped into `none` just because it is in-person. The Cash / Complimentary / Other check does not stand in for Square coverage.

A Complimentary Hold Link can also be redeemed through WebPublic. Keep the actual platform and method rather than inferring the platform from the method name.

#### Payment-method tags

Use the IDs from `PAYMENT_METHOD_ID`:

| Payment path             | Tag                                  |
| ------------------------ | ------------------------------------ |
| Standard card            | `@payment-method-CreditCard`         |
| Card requiring 3D Secure | `@payment-method-3DSecure`           |
| Saved card               | `@payment-method-SavedCard`          |
| Pre-authorized debit     | `@payment-method-PreAuthorizedDebit` |
| Cash                     | `@payment-method-Cash`               |
| Complimentary            | `@payment-method-Complimentary`      |
| Other                    | `@payment-method-Other`              |
| Affirm                   | `@payment-method-Affirm`             |
| Alipay                   | `@payment-method-Alipay`             |
| WeChat Pay               | `@payment-method-WeChatPay`          |

Avoid `@payment-method-stripe`, `@payment-method-Card`, or separate names such as `@payment-credit-card`. Stripe is a processor, and the canonical standard-card method ID is `CreditCard`.

Card variants remain distinct. A `CreditCard` filter alone does not include `3DSecure` or `SavedCard`. Combine the method IDs when you want the whole card family.

A free or discounted-to-zero order is not automatically a complimentary payment. For zero-total scenarios, preserve the configured checkout path rather than inferring a method from the final amount. Browsing, shipping validation, and identity-only forms should not acquire payment tags just because their resource data happens to contain card details.

#### Customer-state tags

Use `getCustomerStateTags(platform, customerState)`. Pass the configured state; do not turn every value other than “Authenticated” into “Guest,” or every value other than “ExistingCustomer” into “NewCustomer.” Unknown states should fail clearly.

The state describes the identity at the scenario's main action, not the empty browser before login setup or the signed-out browser after cleanup.

| Scenario                                                                      | Customer-state tag      |
| ----------------------------------------------------------------------------- | ----------------------- |
| Anonymous browsing or guest checkout                                          | `@user-guest`           |
| Successful sign-in or an existing account exercising a protected action       | `@user-authenticated`   |
| Successful account registration or checkout explicitly creating a new account | `@user-new-user`        |
| Rejected identity forms that remain signed out                                | `@user-guest`           |
| Individual Box Office customer already exists                                 | `@bo-customer-existing` |
| Individual Box Office customer is created during the scenario                 | `@bo-customer-new`      |
| Existing customer group                                                       | `@bo-group-existing`    |
| Newly created customer group                                                  | `@bo-group-new`         |

A customer group is not an individual customer. In particular, `ExistingGroup` must not fall through to `@bo-customer-new`.

A public group-hold checkout can legitimately carry **two different dimensions**: a group tag describing the prepared group, plus `@user-authenticated` describing the public checkout identity. Derive the group tag with the Box Office platform and the auth tag with the public platform. This is different from emitting the same customer tag twice.

If a scenario intentionally exercises several identities, include each applicable identity once and explain the distinct paths. Do not add every state simply because a login or logout happens somewhere in setup or cleanup.

#### When a dimension is not applicable

| Scenario                                        | Platform                                 | Payment tags                                             | Customer-state tags                               |
| ----------------------------------------------- | ---------------------------------------- | -------------------------------------------------------- | ------------------------------------------------- |
| Guest browses a public event                    | `WebPublic`                              | Omit                                                     | Guest                                             |
| Guest completes a configured card checkout      | `WebPublic` or `Widget`                  | Processor + method                                       | Guest                                             |
| Employee sells to an existing customer for cash | `WebBoxOffice`                           | `none` + `Cash`                                          | Existing individual customer                      |
| Employee sells to a new group as complimentary  | `WebBoxOffice`                           | `none` + `Complimentary`                                 | New group                                         |
| Employee authors an event in Dashboard          | `WebDashboard`                           | Omit                                                     | Omit: Venue Employee access is not Customer state |
| Desktop app starts or an employee signs in      | `DesktopApp`                             | Omit                                                     | Omit                                              |
| Desktop checkout sells to a customer            | `DesktopApp`                             | Configured processor + method                            | Actual individual/group state                     |
| API maintenance utility                         | Omit when there is no product UI surface | Omit unless the scenario actually tests payment behavior | Omit                                              |

Omission should mean “this dimension does not apply,” not “we could not work out the value.” Resolve or explicitly record missing metadata on an applicable path.

### Where to generate tags

Case metadata belongs in the suite config. Generate tags at the existing registration owner: the test or its shared runner. Inherited suite tags count, so inspect them before adding another copy.

Build the details object at registration and pass it to the existing `test(...)` call:

```ts
// testData, platform, and customerState come from the suite config/matrix.
const testDetails = {
  annotation: { type: "QaseID", description: String(testData.qaseId) },
  tag: [
    "@checkout",
    `@platform-${platform}`,
    ...getPaymentTagsFromTestData(testData),
    ...getCustomerStateTags(platform, customerState),
    ...getE2ETagsFromTestData(testData),
  ],
};
```

This is a registration fragment, not a standalone test. Use the payment helper only for applicable payment coverage, and include the `QaseID` annotation only when a matching case ID is assigned.

**One owner per conceptual tag:** if the shared helper emits the customer tag, remove the inline branch that emits it again. Do not depend on a set/deduplication pass to hide competing owners.

For separate payment objects, pass the payment configuration, not unrelated event details. A payment configuration that omits its gateway cannot safely be reconstructed from an event slug.

### Keep Playwright and Qase metadata aligned

The scenario actions, selected test data, Playwright tags, and Qase execution parameters should tell the same story. For example, a guest card purchase through WebPublic should not be tagged as cash or reported as an authenticated Widget purchase.

- Read the existing Qase case before reusing its ID. A valid number can still point to the wrong behavior.
- Prefer a registration-time `QaseID` annotation for a known case ID, so failures during fixture setup can retain the case link.
- Runtime `qase.id(...)` remains valid for IDs determined during execution, but cannot link a failure that happens before the test body reaches it.
- Register meaningful execution dimensions with `qase.groupParameters(...)` before the scenario actions. Use `getQaseParametersFromTestData` for shared priority/smoke parameters.
- Include a distinct `Scenario` parameter when different behaviors share a Qase case. Include locale, Widget mode, or other dimensions when they distinguish the actual execution.
- For Electron, report the runtime, operating system, and desktop release; do not pretend it is an ordinary browser run.
- Assigned Qase cases use `test.step(qase.step(action, expectedResult), callback)` for new or modified scenario steps. Each expected result must match the assertions made in that step.
- Missing Qase linkage does not justify skipping a supported test, inventing a case ID, or ignoring the test's own result.

`PUSH_TO_QASE=false` still permits normal execution and local reporting. With uploads enabled, the configured reporter excludes results without valid explicit IDs from Qase uploads; it does not make an unmatched case a passing or skipped test. Upload permission and actual case correspondence must still be checked.

Remote Qase case tags and other saved fields follow [[05 Tooling/Qase Test Case Writing Rules]] and [[05 Tooling/qasectl]]. Local tag maintenance is not permission to modify remote cases.

### Priority and smoke

Use `getE2ETagsFromTestData(testData)` rather than hand-maintaining priority/smoke strings.

- `@priority-critical`, `@priority-major`, and `@priority-medium` come from case metadata. Priority describes the case's importance; smoke describes its place in the quick functional check.
- For a `smoke: true` case, `@all-customer-states-smoke` covers every state the matrix actually generated.
- `@smoke` selects the preferred-state representative according to the configured policy. That row also has the all-states tag.
- Follow the suite's policy. Common defaults are guest for WebPublic/Widget and an existing customer for WebBoxOffice, but suites can define appropriate alternatives.
- Important files included in smoke need a representative for each supported platform. Add more only when they cover different important behavior; keep equivalent data/gateway/state variants in broader regression coverage.
- Do not mark an entire scenario axis as smoke accidentally, or remove supported regression cases to shorten smoke.

The nightly selection's **OR** means priority **or** smoke; **AND** requires both. “All customer states” expands only the states generated by the matrix—it does not invent extra coverage.

### Check selection before running tests

Run commands from the `showpass-playwright` repository with the Node version in `.nvmrc`. These examples use `--list`; they do not execute the test bodies.

```bash
nvm use
APP_ENV=beta PUSH_TO_QASE=false SEND_TO_SLACK=false npx playwright test tests/core/checkout/events/single-events/single-events.test.ts --list --project=DesktopChrome --reporter=list
```

Require **all four** dimensions with one combined expression:

```bash
APP_ENV=beta PUSH_TO_QASE=false SEND_TO_SLACK=false npx playwright test tests/core/checkout/events/single-events/single-events.test.ts --list --project=DesktopChrome --grep '(?=.*@platform-WebPublic)(?=.*@payment-processor-StripeSystemGatewayPaymentIntents)(?=.*@payment-method-CreditCard)(?=.*@user-guest)' --reporter=list
```

Select new-customer Box Office cash/complimentary coverage:

```bash
APP_ENV=beta PUSH_TO_QASE=false SEND_TO_SLACK=false npx playwright test tests/core/checkout/events/single-events/single-events.test.ts --list --project=DesktopChrome --grep '(?=.*@platform-WebBoxOffice)(?=.*@payment-method-(Cash|Complimentary))(?=.*@bo-customer-new)' --reporter=list
```

Useful filter patterns to substitute into the same command:

| Selection                             | `--grep` expression                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------- |
| Public card family                    | `(?=.*@platform-WebPublic)(?=.*@payment-method-(CreditCard\|3DSecure\|SavedCard))`     |
| Existing-group card sales             | `(?=.*@platform-WebBoxOffice)(?=.*@bo-group-existing)(?=.*@payment-method-CreditCard)` |
| Critical preferred-state smoke        | `(?=.*@priority-critical)(?=.*@smoke)`                                                 |
| Critical **or** preferred-state smoke | `(@priority-critical\|@smoke)`                                                         |
| All generated smoke customer states   | `@all-customer-states-smoke`                                                           |

`@platform-WebPublic|@user-guest` means **public OR guest**. It does not require both. Use the combined lookahead pattern when every requested category must match.

Electron uses its own config and project:

```bash
APP_ENV=beta PUSH_TO_QASE=false SEND_TO_SLACK=false npx playwright test --config=playwright.desktop.config.ts --project=Electron --list --grep '(?=.*@platform-DesktopApp)(?=.*@bo-customer-existing)' --reporter=list
```

An empty result can mean a missing tag, the wrong project/config, an unsupported combination, an empty case array, or an existing registration flag. Investigate the cause before changing coverage or adding a tag to force a match.

> [!important] Selection is not execution
> `--list` proves which tests register and match the filter. It does not prove a supported view runs successfully, a Qase upload works, a payment succeeds, or cleanup completes. Browser and device coverage need their own execution evidence.

### Tagging review checklist

- [ ] Platform matches the configured product surface; browser project and view remain separate.
- [ ] Every applicable payment path has the correct processor and canonical method.
- [ ] Card metadata is known; `none` is reserved for the Cash, Complimentary, and Other methods handled by the helper.
- [ ] Guest, existing account, new account, individual customer, and customer group are distinguished correctly.
- [ ] Checks limited to Venue Employee access and non-payment paths do not carry invented Customer/payment dimensions.
- [ ] Each conceptual tag has one owner, including inherited suite tags.
- [ ] Priority and both smoke scopes come from the configured metadata/policy.
- [ ] The matching Qase ID is linked, and Qase parameters agree with the actual execution.
- [ ] Combined filters select the intended cases on the supported projects/configs.
- [ ] Tag-only changes preserve scenario actions, names, Qase IDs, smoke selection, skips, and cleanup unless a separate change is explicitly intended.

## Guardrails

- Work within the requested feature or suite. Read the current branch/status/diff, preserve user edits, and explain broad changes before editing.
- Know the environment, Organization/Venue, account role, required settings, test data, mutation scope, and cleanup before a live run. A setting's name or source default does not prove its live value.
- For vault work, follow the readiness and access rules in the vault's `AGENTS.md`. Admin access needs explicit permission, including read-only inspection. Do not switch tools to bypass an access denial.
- Never put credentials, session cookies, API tokens, or reusable secrets in tests, tags, Qase parameters, notes, or request/error logs.
- Keep customers, baskets, orders, and other mutable resources isolated. Reuse existing cleanup and verify that it completed; do not let cleanup hide the original test failure.
- Use the authorized Codex browser scope. Personal browsers and desktop apps—including Obsidian—need explicit permission; an existing session or pasted link does not grant it.
- Git writes and publication need the repository's required authorization. A coding task does not automatically authorize staging, committing, branch changes, pushing, or PR publication.
- Stop after two failures with the same signature, or one run proving the product/data assumption wrong. Diagnose the failed action and evidence instead of repeatedly changing waits or selectors.

## Rules

### A normal implementation pass

1. Read the applicable repo instructions, workflow, local scenario guide/spec, and nearest implementation. Search for equivalent behavior and inspect its callers before adding logic.
2. Establish the supported platforms/views, identities, payment paths, expected results, and cleanup. For a matrix, generate valid combinations rather than a blind cross-product of every option.
3. Put scenario data and reporting metadata in their existing owners. Reuse suitable POMs and journeys; keep the scenario understandable from top to bottom.
4. Discover selectors in order: existing Playwright code → local frontend source/guidance → permitted live DOM inspection → a specific question only when blocked. Do not invent selectors or add `.first()` just to silence ambiguous matches.
5. Use meaningful page assertions, Playwright auto-waiting, and verified response/URL waits. Register listeners before the action that triggers them. Avoid arbitrary sleeps, broad readiness assumptions, and speculative timeout increases.
6. Keep supported tests enabled. Unsupported paths need an accurate reason; call `qase.ignore()` before the relevant unsupported-path skip. Missing data or case IDs must not silently remove supported coverage.
7. Run the checks appropriate to the change, then review configuration → registration → actions → assertions → cleanup → reporting. Select affected scenarios and projects; do not default to the whole suite.

### Verification and handoff

| Change                            | Minimum useful verification                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Tags, matrices, or smoke policy   | Lint/types/formatting, expanded/filtered `--list`, and a check that intended registration and selection remain correct |
| POMs, interactions, or assertions | Static checks plus the smallest supported browser runs that exercise the changed behavior                              |
| Shared helper or fixture behavior | Trace consumers and cover each distinct affected behavior; sharing a file alone does not justify a full-suite run      |
| Documentation only                | Check paths/links, heading references, examples, and consistency with the owning source                                |

Report what changed, which exact commands/checks passed or failed, and what was not run. Keep a test that passed on retry separate from a clean first-attempt pass. Keep generated evidence in the owner's ignored evidence locations; do not commit screenshots, traces, reports, or one-off builders as lasting engineering guidance.

## Skills

Repository skills are entry points to the documented workflows. They do not replace product/source investigation or authorize publication and live mutations by themselves.

| Task                                                | Skill                                      |
| --------------------------------------------------- | ------------------------------------------ |
| Write new automation                                | `write-playwright-test`                    |
| Update existing automation                          | `update-playwright-test`                   |
| Diagnose a failed test                              | `debug-playwright-test`                    |
| Write a human-executable browser plan               | `write-browser-test`                       |
| Execute an existing browser plan                    | `run-browser-test`                         |
| Convert an agreed frontend spec into a browser plan | `convert-frontend-spec-to-playwright-spec` |
| Generate manual QA cases                            | `showpass-qa-test-case-generator`          |
| Audit Qase coverage                                 | `showpass-qase-audit`                      |
| Review a committed branch diff                      | `review-branch-diff`                       |

Choose the workflow for the actual task. A browser plan is not CI automation, a code review is not permission to fix or publish, and source review is not a passing browser run.

## Repository references

Paths below are relative to the sibling `showpass-playwright` checkout from this note. Follow the current files when this summary and implementation differ.

- [Agent instructions](../../showpass-playwright/AGENTS.md)
- [Workflow index](../../showpass-playwright/docs/agent-workflows/README.md)
- [Execution-dimension tags](../../showpass-playwright/docs/playwright-handbook/reporting/tags-and-metadata.md#execution-dimension-tags) and [verification and reporting](../../showpass-playwright/docs/playwright-handbook/running/verification.md)
- [Tag-generation helpers](../../showpass-playwright/utils/e2e-run-utils.ts)
- [Processor and payment-method ID helpers](../../showpass-playwright/utils/test-id-helpers.ts)
- [Shared platform, state, and payment constants](../../showpass-playwright/shared/constants/index.ts)
- [Test architecture](../../showpass-playwright/docs/playwright-handbook/foundations/test-architecture.md)
- [Code quality](../../showpass-playwright/docs/playwright-handbook/foundations/code-quality.md)
- [Selectors and browser evidence](../../showpass-playwright/docs/playwright-handbook/writing/locators-and-browser-evidence.md)
- [Assertions and waiting](../../showpass-playwright/docs/playwright-handbook/writing/assertions-and-waiting.md)
- [Test data and isolation](../../showpass-playwright/docs/playwright-handbook/writing/test-data-and-isolation.md)
- [Smoke policy](../../showpass-playwright/docs/playwright-handbook/reporting/smoke.md)
- [Worked checkout example](../../showpass-playwright/docs/playwright-handbook/guides/checkout-payments.md)
