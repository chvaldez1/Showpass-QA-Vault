---
title: Showpass Playwright Recipe
date: 2026-11-03
status: draft
tags:
  - writing/blog
  - qa/automation
---

# Showpass Playwright Recipe

_Writing the next test shouldn’t mean copying half the last one._

When we started building our Playwright suite at Showpass, we didn’t have our own recipe for writing tests. We had to chef it up.

## The problem we needed to solve

Checkout gives us plenty to test. The customer, payment method, and way someone reaches checkout can all change. The behavior we’re checking changes too, but many tests still need to select tickets, enter customer details, complete a purchase, and check the order.

We needed to cover those differences without writing another version of checkout for every test. Copying a working test would also copy its setup, browser interactions, and reporting. When a shared part of checkout changed, we’d have several copies to find and update. Copy and paste is convenient right up until it becomes homework.

There was another part to keep consistent: the results. Each test needed to connect to the right Qase case and tell us which conditions it ran under. Repeating that setup in every test would give us more places to get it wrong.

## What we built

We built a recipe that lets tests share the work they have in common. A new scenario can supply its own data and actions, then reuse the checkout interactions, checks, and reporting that already fit.

That’s what we mean by a composable pattern. We put reusable pieces together to build a test, with a clear place for the behavior that makes it different. Our discount tests use this approach to add discount checks to the same purchase journeys used elsewhere in the suite.

This gives us a way to add coverage while keeping the shared work in fewer places. It also gives the next person writing a test a starting point, rather than a blank file and a prayer.

## Start with the ingredients

Before a test clicks anything, we need to know what data it will use and what should happen. We also need the results to tell us enough about a failure to investigate it afterward.

Our recipe gives each part a job, then connects the parts in an order we can follow.

```text
Fixtures + suite configuration
              ↓
       Test declaration
              ↓
         Suite runner
              ↓
        Scenario steps
              ↓
         Shared flows
              ↓
        Reusable steps
              ↓
         Page objects
```

## Give each part a job

**Fixtures** hold the data a test needs and the result it should expect. We define that expected result before the test runs.

**Suite configuration** says which data and conditions to use. The **test file** connects those choices to the scenario we want to run.

The **runner** creates the individual tests, gives them names, and adds the reporting details. Sharing this work means each test doesn’t have to repeat it.

**Scenario steps** describe what the person does, in order. They use shared flows and reusable steps to carry out common parts of the journey.

**Page objects** handle the browser actions and check the results. They keep the details of interacting with a page out of the scenario.

This gives us a clear place to make changes. We can update the test data, the journey, or a page interaction without rewriting the whole test.

## Compose the test

With those pieces in place, the test file can stay fairly small. It connects the configuration to the functions that run each scenario. We’ve simplified the names in the snippets below so we can focus on the pattern.

```typescript
createTestSuite({
  title: "Sample workflow",
  configurations: workflowConfiguration,
  primaryRunner: runPrimaryScenario,
  alternateRunner: runAlternateScenario,
});
```

Inside a scenario, we put together the parts of the journey we need. Someone reading it should be able to follow the actions without digging through every button click along the way.

```typescript
await journey(page, testData)
  .start()
  .selectItems(testData.items)
  .withCustomer(testData.customer)
  .withAdjustment(testData.adjustment)
  .complete()
  .verifyResult(testData.expected)
  .result();
```

This is why we have more than one level of steps. The scenario steps describe the journey for a particular test. The shared steps carry out parts of that journey that other tests need too, using the page objects underneath them.

We share what fits and keep different workflows separate where they need to be. The test should still make sense from top to bottom, without a guided tour from the person who wrote it.

## Build Qase into the pattern

We use Qase to manage our test cases, so we built that connection into the runner. Every scenario needs reporting information, and we didn’t want each one setting it up in its own way.

Before the scenario starts, the runner links the test to its case and records the conditions it’s running under. With generic names, that looks like this:

```typescript
qase.id(scenario.caseId);
qase.groupParameters({
  Platform: environment.platform,
  View: environment.view,
  Browser: environment.browser,
  Scenario: scenario.name,
});

await runScenario(scenario);
```

The case ID tells us which test case the result belongs to. The other details tell us which version of the scenario ran. We register them before the actions begin so they’re already attached if the journey fails.

We also give the steps meaningful names. When a test fails, we want to see where it stopped and what it was trying to do. Future us has enough debugging to do already.

We still have to check that the linked case matches the behavior being tested. A valid case ID can point to the wrong case, so that part needs a human check.

## Make growth manageable

Our discount tests show how this works in practice. They use the same shared checkout journeys as our regular purchase tests. Selecting tickets, entering customer details, paying, and checking the order don’t need a separate implementation just because a discount is involved.

The middle of the journey changes, while the checkout pieces around it stay shared:

```text
                Shared checkout journey
              Select tickets + customer
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   Regular purchase  Manual discount  Automatic discount
     Review basket     Enter code      Verify discount
          │                │                │
          └────────────────┼────────────────┘
                           │
                 Shared totals checks
                           │
                  Shared payment flow
                           │
                Shared order confirmation
```

The discount scenario supplies the extra information: which discounts should apply and what the result should be. The shared review step handles applying or checking them before the purchase continues.

Manual codes and automatic discounts also reuse that review work. A manual-code scenario needs to enter a code. An automatic-discount scenario checks that the discount appears when the basket qualifies. Both can reuse the summary checks, payment flow, and order confirmation.

When we test a basket change that makes an automatic discount qualify, we add that change to the scenario. We can keep the checkout pieces that already fit. The next test shouldn’t need its own checkout engine.

The related discount suites also share a runner, so test registration and Qase reporting follow the same pattern. That’s what we mean by scalable tests: new behavior has a place to go without bringing another copy of everything else.

## When something changes

A test can change because the data is different, the person takes another path, or the page itself has changed. Our structure gives us somewhere to handle each of those changes.

We update fixtures when the data changes, scenario steps when the journey changes, and page objects when an interaction changes. Tests that share those pieces can use the update too.

We still need to check the affected tests afterward. The benefit is that we have fewer copies of the same behavior to maintain, and a clearer idea of where to look.

## Keep the recipe practical

The tricky part is deciding how much to share. A change to a shared flow can affect several suites, so we need to follow those connections when we update it.

One tradeoff is that a test can be easy to read at the top and harder to follow underneath. You open a method expecting to find the action, but it sends you to another helper, then another. Eventually, finding where the browser actually does something becomes a small investigation of its own.

Here’s a simplified example with generic names:

```javascript
async function finishPurchase(page) {
  return runPurchase(page);
}

async function runPurchase(page) {
  return submitPurchase(page);
}

async function submitPurchase(page) {
  await page.getByRole("button", { name: "Complete purchase" }).click();
}
```

The browser action is in the last function, but we have to follow two other functions to reach it. Both pass along the same information without doing anything else. We’ve given a button click a longer commute.

That’s where abstraction can work against us. We want to reuse behavior while keeping the path to its implementation easy to follow. If a layer only passes the same information to another method, we should question whether it needs to be there. Sometimes a little duplication is the clearer choice.

We also have to keep checking what the tests actually prove. Reusing a flow makes it easier to write another test, but we still need to choose useful scenarios and check the right outcomes.

## A recipe we can keep changing

This is the recipe we’re building on. It gives us a consistent starting point, with room for tests that need to behave differently.

When someone opens a test, we want them to understand what it checks, where the expected result comes from, and how the pieces fit together. As the suite grows, we want the next test to feel like something we know how to put together.

---

## Internal source notes

These notes support editing and fact-checking. The publishable article ends above the divider.

- **Basis:** user-provided origin story, plus read-only inspection of the local `showpass-playwright` checkout on 2026-11-03, branch `create-public-sold-out-test`, commit `5d58422b`. This is an architecture article, not a branch review or execution report. No tests were run and no live Qase case contents or uploaded results were inspected. Qase IDs and reporting behavior are described as configured in source.
- **Repository reference:** [[01 Repositories/QA Automation - showpass-playwright]]. Source root: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`.
- **Documented recipe and boundaries:** `docs/agent-workflows/workflows/test-writing-recipe.md`; `docs/agent-workflows/standards/test-architecture.md`.
- **Original draft data and expected savings:** `fixtures/staticData/single-events.ts` (`taEventSystemGatewayPaymentIntent`); `fixtures/helpers/checkout-discounts.ts`. The original draft's $5.50, 50%, and $2.75 example came from this fixture. The current article omits exact amounts and describes the pattern at a high level.
- **Configuration, Qase identity, and supported combinations:** `tests/core/checkout/discounts/single-discount-code/single-discount-code-config.ts`; `auto-discount/auto-discount-config.ts` under the same discount root.
- **Registration, metadata before journey actions, skips, and dispatch:** `tests/core/checkout/discounts/discount-suite.runner.ts`.
- **Declarations and shared runner consumers:** `single-discount-code/single-discount-code.test.ts`, `auto-discount/auto-discount.test.ts`, `multi-discount/multi-discount.test.ts`, and `discount-usage-limit/discount-usage-limit.test.ts`, all under the discount root. The first, multi-discount, and usage-limit declarations explicitly skip Safari projects.
- **Scenario sequencing and fresh customer identities:** the corresponding `.steps.ts` files; `flows/checkout-journey.ts`; `flows/box-office-journey.ts`. The current article uses simplified names and illustrative code adapted from those patterns, rather than literal source excerpts. The abstraction snippet illustrates forwarding-only wrappers; it does not claim that all existing checkout layers merely forward calls.
- **UI interactions and assertions:** `pages/public/checkout/steps/ReviewStep.ts`; `pages/public/checkout/PublicCheckoutDiscounts.ts`; `pages/shared/components/Checkout/Review.ts`. The discount-card amount TODO remains in `PublicCheckoutDiscounts.ts`; combined saving is asserted in `Review.ts`.
- **Reporting controls:** `playwright.config.ts`; `reporters/strict-qase-reporter.ts`. Qase publication depends on the upload setting. Reporter identity validation cannot establish that the remote case describes the matching behavior.
- **Reuse example verified for the local revision:** `tests/core/checkout/events/single-events.test.ts` and the single-code/automatic-discount `.steps.ts` files use the same public/widget checkout journey builders. The discount-suite declarations share the discount runner. `pages/public/checkout/steps/ReviewStep.ts` enters manual codes, checks automatic discounts without code entry, and uses the same discount-summary checks. This supports current reuse, not a claim about which suite was built first.
- **Editorial direction:** title and light cooking references requested by the user. Keep the architecture story distinct from the earlier nightly-E2E post. Avoid invented dates, performance gains, incident history, or claims that every discount behavior/client currently passes.

- **Coda sync:** The local article started from the Coda version verified after the conversational-prose revision on 2026-11-03. [Coda draft](https://docs.superhuman.com/d/Dev-Team-Process_dYC2ikYLoK9/Showpass-Playwright-Recipe-Chris_subosj93). A fresh read during that sync was blocked by Coda's monthly MCP request limit. The subsequent problem-first opening, playful-tone revision, simplified responsibilities, Qase snippet, discount-reuse example, reuse diagram, and maintenance section are local-only changes requested in chat; they have not been sent to Coda.
