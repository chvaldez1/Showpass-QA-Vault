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

We needed to cover those differences without writing another version of checkout for every test. **Copying a working test would also copy its setup, browser interactions, and reporting.** When a shared part of checkout changed, we’d have several copies to find and update. Copy and paste is convenient right up until it becomes homework.

There was another part to keep consistent: the results. Each test needed to connect to the right Qase case and tell us which conditions it ran under. Repeating that setup in every test would give us more places to get it wrong.

## What we built

> **The recipe**
>
> We built our tests around a **composable pattern**: putting reusable pieces together, with a clear place for the behavior that makes each scenario different.

A new scenario supplies its own data and actions, then uses the checkout interactions, checks, and reporting that already fit.

Our discount tests use this approach to add discount checks to existing purchase journeys. That gives the next person writing a test a starting point, rather than a blank file and a prayer.

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

With those pieces in place, **the test file can stay fairly small**. It connects the configuration to the functions that run each scenario. We’ve simplified the names in the snippets below so we can focus on the pattern.

### Connect the pieces

```typescript
createCheckoutSuite({
  title: "Discount checkout",
  configurations: discountScenarios,
  websiteRunner: runWebsitePurchase,
  embeddedRunner: runEmbeddedPurchase,
});
```

### Describe the journey

Inside a scenario, we put together the parts of the journey we need. For a purchase with a discount code, it might read like this:

```typescript
await checkoutJourney(page, purchaseData)
  .openEvent()
  .selectTickets(purchaseData.tickets)
  .withCustomer(purchaseData.customer)
  .applyDiscount(purchaseData.discount)
  .pay()
  .verifyOrder(purchaseData.expectedOrder)
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

The case ID tells us which test case the result belongs to. The other details tell us which version of the scenario ran. We register them **before the actions begin** so they’re already attached if the journey fails.

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

When we test a basket change that makes an automatic discount qualify, we add that change to the scenario. We can keep the checkout pieces that already fit.

> 💭 **Kitchen thought**
>
> The next test shouldn’t need its own checkout engine.

The related discount suites also share a runner, so test registration and Qase reporting follow the same pattern. That’s what we mean by scalable tests: new behavior has a place to go without bringing another copy of everything else.

## When something changes

The part we update depends on what changed. Different test data belongs in the **fixture**. A different journey belongs in the **scenario steps**. Changes to how we interact with a page belong in its **page object**.

That shared update can affect several tests, so we still need to check them afterward. Having fewer copies makes the change easier to manage; it doesn’t make verification optional.

## Keep the recipe practical

The tricky part is deciding how much to share. A change to a shared flow can affect several suites, so we need to follow those connections when we update it.

One tradeoff is that a test can be **easy to read at the top and harder to follow underneath**. You open a method expecting to find the action, but it sends you to another helper, then another. Eventually, finding where the browser actually does something becomes a small investigation of its own.

This is the kind of layering we want to avoid. The names below are made up, but they show how an action can get buried:

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

The browser action is in the last function, but we have to follow two other functions to reach it. Both pass along the same information without doing anything else.

> 💭 **Kitchen thought**
>
> We’ve given a button click a longer commute.

A useful layer owns meaningful work, such as choosing the checkout path or checking the review page. If it only passes the same information to another method, we should question whether it needs to be there. Sometimes a little duplication is the clearer choice.

We also have to keep checking what the tests actually prove. Reusing a flow makes it easier to write another test, but we still need to choose useful scenarios and check the right outcomes.

## A recipe we can keep changing

As the suite grows, we’ll keep adjusting the recipe. The aim stays the same: the next person should be able to write a test, understand what it proves, and follow the code when something goes wrong.

> **Keep in touch**
>
> If you’re building your own test-writing recipe, we’d love to hear what’s worked for you.
>
> codewizardry - at - showpass - dot - com
