# Waitlisted Ticket Gateway Switch - Qase Draft

## Summary of Change

Create manual Qase coverage for a venue that switches payment gateways after a customer has already joined a waitlist for a sold-out ticket, before that waitlisted basket is fulfilled.

## Sources Reviewed

- Qase: searched `waitlist gateway`, `waitlisted gateway`, `waitlist payment gateway`, `waitlist PaymentIntent`, and `waitlist card verification`; no matching case titles returned.
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/waitlist_fulfillment_and_holds.md`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/waitlist/subscriber_processing/utils/subscriber_purchase.py:54`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:1076`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:5149`
- Backend tests: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1547`
- Backend tests: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/tests/test_models.py:3402`
- Related prompt: `06 Prompts/Showpass QA Test Case Generator.md`

## Existing Qase Coverage

- No Qase case found for waitlist fulfillment after a venue payment gateway switch.
- Backend tests cover non-system gateway waitlist resale processing and Yuno gateway waitlist CC verification behavior, but the manual Qase gap is the lifecycle sequence where the gateway changes after the waitlist basket already exists.

## Source-Backed Behavior

- Waitlist fulfillment locks the subscriber and basket, moves the basket from waitlisted to pending, validates with the purchase serializer, then either creates a Stripe PaymentIntent or places the basket on hold.
- PaymentIntent creation uses `basket.payment_gateway`, so stale or changed gateway state is high risk for off-session waitlist charging.
- Basket gateway retrieval normally follows the venue payment gateway unless a special path forces a system gateway, such as resale handling.
- When a basket payment gateway changes, existing Stripe wallet payment intent state and application fee amount are cleared.
- Switching a venue to Yuno should disable CC verification on waitlists because Yuno does not support that waitlist card verification path.

## Coverage Gaps

- No manual case verifies that an existing waitlisted basket remains fulfillable after the venue payment gateway changes.
- No manual case verifies whether the resulting waitlist fulfillment uses the intended gateway behavior, clears stale payment intent data, or safely falls back to hold when auto-charge is no longer valid.
- No manual case covers the operational risk of a gateway switch between waitlist signup and inventory/resale-driven fulfillment.

## Assumptions and Unknowns

- The tester can use an admin or support path to change the venue's payment gateway in the test environment.
- The exact admin UI labels for gateway changes may vary by environment; verify through the venue payment settings available to the tester.
- If the venue is switched to Yuno, expected behavior is hold/manual completion rather than CC-verification auto-charge.

## Risk Areas

- Customer is charged against the wrong gateway or stale Stripe setup/payment intent state.
- Waitlisted basket becomes stuck in `PENDING`, `WAITLISTED`, `IN_PROGRESS`, or `HOLD`.
- Customer does not receive the waitlist hold email or hold link after fallback.
- Resale/inventory remains reserved while the subscriber cannot complete checkout.
- Application fee or gateway metadata is carried over from the prior gateway.

## Recommended Test Data

- Venue with an active Stripe gateway and permission to change payment gateway settings.
- Future event with one sold-out ticket type linked to an active waitlist.
- Waitlist configured with `cc_verification_required=true` for the Stripe setup portion.
- Registered customer account with a valid saved/setup card for waitlist verification.
- Inventory release or resale submission that can trigger waitlist fulfillment.
- Access to verify basket/subscriber state, invoice/payment intent details, email delivery, and gateway used.

## Qase-Ready Manual Test Cases

### Test Case 1: Verify a waitlisted ticket can be fulfilled safely after the venue payment gateway changes

**Priority:** High  
**Type:** Regression / Integration / Edge Case  
**Area:** Waitlist fulfillment / Payment gateways

#### Step 1: Create a verified waitlist subscriber on the original gateway

**GIVEN** a venue is using a Stripe payment gateway, an event has a sold-out ticket type linked to an active waitlist with CC verification required, and the event starts far enough in the future for a 24-hour hold window.  
**WHEN** a logged-in customer joins the waitlist for that ticket type and completes card verification.  
**THEN** the basket is saved as a waitlisted basket, the subscriber is pending, the basket records the original payment gateway, and setup intent/card verification data exists for the waitlist basket.

#### Step 2: Switch the venue gateway before fulfillment

**GIVEN** the customer remains pending on the waitlist.  
**WHEN** an authorized admin changes the venue payment gateway from the original Stripe gateway to a different supported gateway, such as a new Stripe gateway or Yuno.  
**THEN** the venue saves the new gateway configuration, existing waitlist configuration remains valid for that gateway, and any gateway-specific waitlist rule is applied, including disabling CC verification for Yuno.

#### Step 3: Trigger waitlist fulfillment

**GIVEN** the waitlist subscriber was created before the gateway change.  
**WHEN** inventory is made available or a resale submission is created so waitlist processing runs for the ticket type.  
**THEN** the waitlist processor selects the pending subscriber, moves the basket out of waitlisted status, and does not leave the basket stuck because of stale gateway state.

#### Step 4: Verify payment or hold outcome

**GIVEN** waitlist processing has completed for the subscriber.  
**WHEN** the tester reviews the basket, subscriber, invoice/payment details, and customer notification.  
**THEN** one of the expected outcomes occurs: the basket is purchased using the intended current gateway/payment path, or the basket is placed on hold with a valid hold URL and 24-hour expiry for customer completion. Stale payment intent IDs, setup intent assumptions, or application fee values from the previous gateway are not reused.

#### Step 5: Verify customer completion and operational records

**GIVEN** the basket was placed on hold after the gateway switch.  
**WHEN** the customer opens the hold link and completes checkout.  
**THEN** the purchase completes successfully, tickets are issued, the subscriber no longer remains pending, inventory/resale allocation is consistent, confirmation email is sent, and reporting/payment records show the gateway actually used.

**Notes:** This case intentionally models the initial creation path and the later gateway change because the risk depends on gateway state captured when the waitlist basket was created.

## Regression Coverage

- Waitlist signup with CC verification on a Stripe venue still creates a valid pending subscriber.
- Waitlist signup without CC verification still falls back to hold when inventory becomes available.
- Resale-driven waitlist fulfillment still puts non-system gateway resale baskets on hold when expected.
- Gateway switch to Yuno disables waitlist CC verification and does not allow unsupported CC verification on new waitlists.

## Suggested Automated Coverage

- **GIVEN** a waitlist basket was created while the venue used gateway A, **WHEN** the venue gateway is changed to gateway B and waitlist processing runs, **THEN** stale payment intent/application fee data from gateway A is cleared or not reused.
- **GIVEN** a venue is switched to Yuno after a CC-verified waitlist exists, **WHEN** fulfillment runs, **THEN** the subscriber is safely put on hold and notified instead of attempting unsupported CC verification.

## Questions for Developer or Product

- Should existing waitlist baskets continue using the gateway captured at signup, or should fulfillment always follow the venue's current gateway?
- For a Stripe-to-Stripe gateway change, should the existing setup intent remain valid only if it belongs to the same Stripe account, or should the basket always fall back to hold?
