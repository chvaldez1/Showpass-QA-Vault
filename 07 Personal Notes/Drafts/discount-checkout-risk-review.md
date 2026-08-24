# Discount Checkout Risk Review

## Scope

This review compares the Playwright discount checkout suite with the discount behavior implemented in the Showpass web app. It prioritizes customer and business risk rather than maximizing platform, browser, or payment-processor permutations.

The ranking uses the following factors:

- Financial impact.
- Likelihood of a silent failure.
- Customer and organizer blast radius.
- Stateful behavior across baskets and purchases.
- Complexity of backend reconciliation.
- Absence of customer-level Playwright coverage.

## Executive Summary

The existing Playwright suite has strong platform and payment compatibility coverage. It covers public checkout, widget, Box Office, several payment processors, fixed and percentage discounts, full discounts, auto discounts, multi-discounts, and partial usage limits.

Its largest weakness is that most scenarios are successful ticket purchases. The highest-risk discount behavior occurs where eligibility, money, identity, and persistent usage intersect:

1. Mixed ticket, product, and membership allocation.
2. Usage reservation and concurrency.
3. Membership-benefit entitlement.
4. Refund, void, and exchange reconciliation.
5. Stacked discount persistence.

A discount applied to a product or membership is not merely another item-type permutation. Products introduce variants, shipping, taxes, fees, and price-lock behavior. Membership benefits introduce identity, entitlement, persistent allowances, concurrent baskets, renewal, refund, and transfer state.

## Current Playwright Coverage

The checkout discount suite currently covers:

- Manual fixed, percentage, and 100%-off codes.
- Stripe system and custom gateways.
- Payment Intents and Charge API.
- Authorize.net and Yuno.
- Affirm and 3D Secure.
- Public checkout, widget, and Box Office.
- Guest, authenticated, newly registered, and Box Office customers.
- Auto discounts based on:
  - Purchase amount.
  - Total basket quantity.
  - Unique item or event quantity.
- Manual plus manual stacking.
- Auto plus manual stacking.
- Partial per-customer and per-event/item limit application.
- Creating an overall-limit discount and using it once.

The suite does not currently provide meaningful end-to-end coverage for product discounts, membership purchase discounts, membership-benefit discounts, tiered discounts, post-purchase usage restoration, or mixed-item financial allocation.

## Highest-Risk Areas

### 1. Mixed-Item Discount Allocation and Permission Isolation

This is the highest-risk area.

A basket containing tickets, product variants, and membership levels can successfully complete while silently discounting the wrong lines. The application supports permissions for all three item types and calculates `apply once` differently from `apply to each`.

Potential failures include:

- An eligible product causes an ineligible product variant to be discounted.
- A ticket-only code discounts a membership purchase.
- An excluded item receives a venue-wide discount.
- A basket-level discount is allocated to the wrong invoice item.
- The displayed total is correct while invoice-level allocation is wrong.
- A later refund or report attributes the discount to the wrong item.

#### Highest-value configuration

- Eligible ticket: $100 × 2.
- Eligible product variant: $40 × 2.
- Ineligible variant of the same product: $60 × 1.
- Eligible membership level: $200 × 1.
- Discount scoped to only the eligible ticket, product variant, and membership level.
- Assert every line, subtotal, discount total, fees, tax, shipping, payment amount, and confirmation.
- Run once with percentage/apply-to-each and once with flat/apply-once.

### 2. Usage Reservation, Concurrency, and Identity Matching

Usage limits are not only counters after purchase. Pending baskets reserve uses, and usage can be associated with a user, email, event, product, membership group, or the discount globally.

Potential failures include:

- Redeeming a discount more times than allowed.
- Blocking a legitimate customer because an abandoned basket stranded a use.
- Counting a guest and registered account as different people when they share an email.
- Failing to count a registered user against a guest basket created earlier.
- Double-consuming usage during retry or purchase recovery.

#### Highest-value configuration

- Create a discount with an overall limit of one.
- Customer A creates a basket and applies the code without purchasing.
- Customer B attempts to apply the code.
- Expire or release Customer A's basket.
- Customer B applies the code and purchases successfully.
- Customer B attempts a second redemption and is rejected.
- Verify the usage state after every transition.

### 3. Membership-Benefit Entitlement Lifecycle

Membership-benefit discounts are materially different from applying a regular code to a membership being purchased.

Membership benefits depend on:

- Active versus expired membership state.
- Membership level and group.
- Authenticated account identity.
- Guest email matching.
- Multiple members associated with an account.
- Per-member and per-item allowances.
- Existing usage history.
- Concurrent baskets.
- Refunded members.
- Renewals and transfers.
- Stacking with regular discounts.

Potential failures can grant a benefit to the wrong person or prevent the rightful member from using it. Exhausted membership discounts can also fail by applying zero savings without blocking basket creation, making customer-level regressions easy to miss.

#### Highest-value configuration

- An active member receives one 100%-off ticket per event.
- Add two eligible tickets and one ticket from an ineligible event.
- Verify only one eligible ticket is discounted.
- Complete the purchase.
- Start another checkout as the same authenticated user and verify the benefit is exhausted.
- Repeat using the member's guest email and confirm it cannot bypass prior usage.
- Confirm that a non-member with a different email receives no benefit.

### 4. Refund, Void, Exchange, and Return Reconciliation

The discount lifecycle continues after confirmation. Usage and invoice allocation must remain correct after:

- Full void.
- Partial void.
- Full refund.
- Partial refund.
- Exchange of discounted items.
- Exchange of full-price items from a partially discounted basket.
- Repeated webhook or retry processing.
- Multiple discounts on the same invoice.
- Membership-benefit use.
- Apply-once and apply-to-each discounts.

Potential failures include restoring too many uses, failing to restore a valid use, or adjusting the wrong discount relation.

#### Highest-value configuration

- Purchase three tickets where a limit discounts only two.
- Refund one discounted ticket and confirm one use becomes available.
- Refund the full-price ticket and confirm usage does not change.
- Retry the refund operation and confirm the use is not restored twice.
- Redeem the newly available use in another checkout.

This flow may belong in a post-purchase suite, but it is one of the highest discount risks overall.

### 5. Stacking Across Discount Origins and Scopes

The current suite proves successful manual-plus-manual and auto-plus-manual combinations. The higher-risk state is reconciling several discount origins that affect different item groups.

Relevant discount origins include:

- Membership benefit.
- Manual ticket code.
- Manual product code.
- Auto discount.
- Tiered discount.
- Voucher or credit.

Stacking also depends on venue configuration and feature flags. Application order, removal, itemization, and persisted `discounts_applied` relations can all produce plausible but incorrect totals.

#### Highest-value configuration

- Apply a membership benefit to one ticket.
- Apply a manual code to a product.
- Trigger an auto discount on the basket.
- Add a second manual ticket code.
- Remove the product.
- Remove the last manual code.
- Verify the membership and auto discounts remain correct.
- Reload the basket and verify the same state persists.

### 6. Basket Mutation and Stale Eligibility

Existing discounts must be recalculated whenever qualifying basket or customer state changes.

High-risk mutations include:

- Changing an eligible product variant to an excluded variant.
- Removing the only eligible membership line.
- Moving below or above an auto-discount threshold.
- Moving beyond an auto-rule maximum.
- Removing one event from a multi-event basket.
- Changing the customer after applying a per-customer discount.
- Removing one discount from a stacked basket.
- Reloading or resuming the basket.

The highest-risk failure is a stale discount remaining attached after the basket or customer no longer qualifies.

### 7. Product Financials: Variants, Shipping, Fees, and Taxes

Product discount coverage is high risk because products introduce behavior that ticket-only baskets may not exercise:

- Product-attribute or variant permissions.
- Shipping costs.
- Shipping quantity thresholds.
- Product-specific taxes.
- Configured fees.
- Add-ons and upsells.
- Price locking.
- Products associated with a specific event or no event.

#### Highest-value configuration

- Add two variants of the same shipped product.
- Permit the discount for only one variant.
- Cross a shipping quantity threshold.
- Apply and remove the discount.
- Confirm that only eligible merchandise value changes.
- Confirm shipping, taxes, fees, and final payment remain correct.

### 8. Auto and Tier Rule Selection

The current auto-discount tests cover qualification at one threshold. They do not cover maximum boundaries, competing rules, multiple auto discounts, or movement in both directions.

Relevant dimensions include:

- Minimum and maximum limits.
- Multiple rules on one discount.
- Total purchase amount.
- Total basket quantity.
- Unique item quantity.
- Tickets, products, and memberships in the qualifying set.
- Include and exclude permissions.
- Multiple auto discounts.
- Venue rollout and feature flags.
- Near-qualification messages.

#### Highest-value configuration

- Mixed ticket, product, and membership basket.
- Rule 1: $5 off from $50 through $99.99.
- Rule 2: 15% off from $100 through $199.99.
- No discount at $200 or above.
- Exercise $49.99, $50, $99.99, $100, $199.99, and $200 through customer basket changes.
- Verify the chosen rule, displayed savings, and removal when leaving the range.

### 9. Zero-Total and Near-Zero Payment Routing

Existing 100%-off ticket tests do not prove all zero and near-zero configurations.

High-risk cases include:

- Discounted merchandise with shipping still due.
- A membership purchase with non-discountable fees.
- A remaining total between $0.01 and $0.49.
- Mixed baskets where some lines become free and others remain paid.
- An apply-once discount larger than one line but smaller than the basket.
- Refund protection or add-ons attached to discounted items.

The checkout must not request an invalid processor charge or mark a non-zero order as free.

### 10. Channel and Purchasing-Mode Restrictions

These cases remain important but rank below silent financial and entitlement failures because they normally produce a visible rejection.

Relevant paths include:

- Public-only discount used in Box Office.
- Box-Office-only discount used publicly.
- Hold-link exceptions.
- Payment-plan incompatibility.
- Complimentary or auto-generated baskets.
- Widget parity.
- New versus existing Box Office customer.
- Safari behavior.

## Product and Membership Coverage Model

### Product Coverage

Product discounts should be exercised through:

- Mixed-item permission isolation.
- Product and product-attribute selection.
- Included and excluded variants.
- Shipping, tax, and fee calculations.
- Quantity changes and variant replacement.
- Stacking with ticket, membership, and auto discounts.
- Auto-rule qualification.
- Refund and reporting allocation.

### Membership Coverage

Membership behavior must be split into two separate domains.

#### Regular Discount on a Membership Purchase

This verifies that a membership item being purchased is eligible for a normal discount. Important behavior includes membership-level permissions, partial discount application, quantity, fees, taxes, and invoice item semantics.

#### Membership-Benefit Discount

This verifies that owning a membership grants a discount on another purchase. It is the higher-risk domain because it combines identity, entitlement, usage history, concurrent baskets, renewal, refund, and transfer state.

## Recommended First Five Configurations

If only five configurations can be implemented initially, prioritize:

1. Mixed ticket, product variants, and membership with selective permissions and an apply-to-each percentage discount.
2. The same mixed basket with a flat apply-once discount, shipping, taxes, and fees.
3. Membership benefit with authenticated and guest identity matching, exhaustion, and an ineligible event.
4. Final overall use contested by two pending baskets, followed by basket expiry and successful redemption.
5. Membership, manual, and auto stacking followed by item removal, discount removal, and basket reload.

These configurations target the paths most likely to produce a successful-looking checkout with an incorrect financial or entitlement result.

## Lower-Risk but Necessary Coverage

The following should still be covered, but should not displace the higher-risk configurations above:

- Invalid code.
- Private or deleted code.
- Code not yet active.
- Expired code.
- Case-insensitive input.
- Leading and trailing whitespace.
- Duplicate code entry.
- Customer-facing error copy.

These failures are generally visible and prevent checkout. They are less dangerous than silent over-discounting, under-discounting, entitlement leakage, or persistent usage corruption.

## Implementation Strategy

Most business-rule configurations should use one representative payment gateway and browser. The existing payment compatibility matrix can continue validating processors independently.

Do not multiply every new business-rule scenario across every gateway, browser, client, and customer state. Instead:

- Use a representative public desktop checkout for deep financial and lifecycle behavior.
- Add mobile coverage where the interaction or displayed summary materially differs.
- Add widget and Box Office coverage for channel-specific behavior.
- Keep processor coverage focused on payment routing and confirmation compatibility.
- Verify both customer-visible totals and downstream invoice or usage state when the risk depends on persistence.

## Source Evidence

Primary implementation areas reviewed in the web app include:

- `apps/tickets/api/serializers/general.py`
- `apps/tickets/models/order_management/order_items.py`
- `apps/tickets/services/discount_usage_limit_validation.py`
- `apps/tickets/services/financials/auto_discount.py`
- `apps/tickets/services/financials/auto_discount_rules.py`
- `apps/financials/models/discount_management/discounts.py`
- `apps/financials/services/discount_usage_adjustment_service.py`
- `apps/memberships/tests/test_discount_benefit_purchases.py`
- `apps/tickets/tests/test_api_user_based_ticket_basket.py`
- `apps/tickets/tests/test_api_basket_discounts.py`

The web app's backend tests and change history show repeated complexity around mixed item groups, shipping and discount fees, auto/manual removal, multi-auto discounts, membership usage, basket reservation, itemization, and exchange reconciliation. These signals informed the risk ordering above.
