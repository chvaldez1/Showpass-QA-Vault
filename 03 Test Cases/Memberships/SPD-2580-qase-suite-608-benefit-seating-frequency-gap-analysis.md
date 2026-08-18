---
title: Membership Purchase Paths Qase Gap Analysis
date: 2026-08-14
tags:
  - qa/qase
  - memberships
  - checkout
aliases:
  - SPD-2580 Qase Suite 608 Benefit Seating Frequency Gap Analysis
  - Membership POS Saleability Matrix
---

# Membership purchase paths — Qase gap analysis

**Review status:** Configuration-complete, Qase-ready draft. Qase was read only; no cases were created, updated, moved, or deleted. No browser, device, or payment-provider execution was performed.

- [SPD-2580](https://showpass.atlassian.net/browse/SPD-2580)
- [Qase suite 608 — Core - Checkout - Memberships](https://app.qase.io/project/SPT?suite=608)

## Testing Intent

We are testing whether a customer or employee can complete every supported first-purchase, checkout-upgrade, held-purchase, group-sale, and renewal path while payment, membership ownership, access dates, inventory, and seating remain correct; this matters because a paid customer can otherwise receive no membership, an unpaid attempt can issue access, or a valid sales surface can be blocked, and we will prove it with one charge or approved non-card payment, one transaction, one order, the expected member records, and one inventory change.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Money/order state; fulfillment/access; inventory/ownership; live sales completion; async final state; permission boundary |
| Business invariant | Every supported purchase path creates the intended membership exactly once only after successful payment or an approved complimentary flow; rejected attempts create none. |
| User or business impact | Customers can be charged without access, receive duplicate memberships, lose held seats, or be unable to buy; employees can complete an incorrect sale. |
| Failure mode | Missing, duplicate, misattributed, expired, oversold, or incorrectly seated membership; invalid public/seller exposure; stale hold; blocked POS sale; unpaid fulfillment. |
| Observable proof | Correct basket total; one payment result; one transaction and order; correct member identity, level, dates, benefit/seating, fulfillment, inventory, and confirmation. |
| Source of truth | Backend basket and membership generation first; frontend entry points and handoffs second; Qase and Playwright as coverage evidence. |
| Primary surfaces | WebPublic, Widget, WebBoxOffice, MobileBoxOffice, Electron, POS, React Native Public, attraction pages, holds/group-sale links, and account/Box Office renewals. |
| In scope | First purchase, ticket-to-membership and membership-to-membership checkout upgrades, assigned seating, attraction, regular/branded/group-sale holds, renewal purchase, visibility, member information, sale window, inventory, fulfillment, payment success/cancel/failure/retry, and immediate post-purchase proof. |
| Out of scope | Membership creation/configuration, benefit redemption, refunds/exchanges/transfers after the immediate cleanup check, provider Cartesian products, and ticket-batch administration. Those have separate Qase coverage. |
| Confidence | High for source and Qase gaps; Medium for end-to-end behavior because no live execution was performed. |

## Proof Target Map

| Proof Target | Why It Matters | Coverage |
| --- | --- | --- |
| Every supported entry point reaches the correct membership checkout | Prevents a valid customer or employee path from being silently broken. | Existing 437, 3424, 3425, 3463, 388, 1255, 2868, 4003, 4030, 4033, 4917; revised 2525/3486; suite 610 |
| An eligible checkout upgrade replaces the source item and fulfills one membership | Prevents charging for both items or retaining the wrong access product. | TC-9 |
| A successful purchase creates one paid order and the intended member records | Prevents charged-without-access and duplicate fulfillment. | TC-1 through TC-4, TC-7, TC-13, TC-15, TC-20 through TC-22; existing path-specific cases |
| Rejected or cancelled payment creates no order or membership; retry creates one | Prevents unpaid or duplicate access. | TC-8; automation candidate |
| Inventory, purchase-limit, sale-window, and visibility rules hold on public and seller surfaces | Prevents overselling and unauthorized exposure. | TC-6, TC-18, and TC-24; existing 1173, 1177, 4917 |
| Only an Issue Tickets benefit with a reserved space triggers seating flow | Prevents ordinary benefits from blocking Mobile Box Office/POS and preserves true seat ownership. | TC-1 through TC-4, TC-13, TC-20 through TC-22; existing 1190, 4020 |
| Every renewal frequency produces the correct first-purchase and renewal expiry behavior | Prevents unsupported or incorrectly expired memberships. | TC-1 through TC-4, TC-13 through TC-15, TC-22; Qase 1201 |
| Effective benefits are the valid union of group, selected-level, and current-season benefits | Prevents missing inheritance, cross-level leakage, past-season leakage, and phantom benefits. | TC-11, TC-20, TC-21, and TC-22 |
| Multiple purchased memberships retain distinct member identity | Prevents one buyer's answers or barcode from overwriting another member. | TC-7 |

## Declared Scope

### Entry points

| Entry point | Actor path and starting state | Current Qase evidence | Decision |
| --- | --- | --- | --- |
| Legacy public detail | Open `/m/{membershipSlug}` and select the purchase CTA with an empty or existing public basket. | 437 proves entry; 2525/3486 complete shared WebPublic checkout. | Accounted for without duplicating shared checkout. |
| Branded public detail | Open `/pass/{membershipSlug}` and select the purchase CTA. | Frontend uses the shared membership detail/purchase flow; 2525/3486 complete it. | Source-accounted; no separate manual case. |
| Organizer profile | Open an organizer profile, choose a membership card, then purchase from its detail page. | Frontend links the card to the shared detail flow; 437 plus 2525/3486 cover the handoff and completion. | Source-accounted; no separate manual case. |
| Direct membership Widget | Load the membership widget by slug; the shared purchase wizard starts embedded. | 2525/3486 and Playwright cover Widget checkout. | Covered. |
| WordPress membership button/embed/list | Open a WordPress page using the membership widget button, embedded widget, or membership-list shortcode and start purchase. | 3424, 3425, and 3463 prove each wrapper opens/renders the Widget; 2525/3486 complete Widget checkout. | Covered at the wrapper/shared-flow boundary. |
| Attraction landing | Open a membership modal from a non-calendar attraction and continue with the attraction basket. | 388 covers `EventsMemberships` and mixed supported items. | Covered; preserve as a distinct path. |
| WebBoxOffice / Electron Sell | Employee selects a membership from Sell with customer and venue basket state. | 2525/3486, 4083, 1190. | Covered. |
| POS Sell | Operator opens Memberships in the POS app. | 4917 covers baseline; no Seasonal non-seating proof shared with Mobile Box Office. | Keep 4917; TC-1 adds the cross-client sale. |
| Mobile Box Office | Box Office employee sells a membership from the MobileBoxOffice app. | TC-1/Qase 5035. | Cover the Seasonal non-seating sale shared with POS. |
| React Native Public | Customer selects a membership in Explore/search and enters purchase webview. | 4003 and 2525/3486. | Covered independently from MobileBoxOffice. |
| Checkout upgrade offer | Customer reaches basket review with an eligible non-seating ticket or membership, selects the membership upgrade, then completes checkout. | Configuration cases 4291, 4294, 4295, and 4297; no runtime purchase case found. | Add TC-9. |
| Regular hold checkout | Employee checks out an already-persisted held basket. | 1255 covers Membership with Seat, Location, and None; 1256 covers cancellation. | Covered. |
| Branded hold link | Customer opens a public link with pre-held membership inventory. | 2868 covers membership Seat and Location. | Covered. |
| Group-sale link / Box Office | Customer or employee purchases a group-sale hold containing memberships. | 4030 and 4033 already purchase group-sale holds containing memberships. | Enhance their fulfillment assertions; do not create duplicate path cases. |
| Account renewal | Customer renews active/expired GA or assigned-seating members from account/mobile webview. | 1196, 1198, 1199, 1201. | Retain existing paths; add the missing renewal-toggle boundary in TC-23. |
| Box Office renewal | Employee starts renewal from customer profile, Customer Network, or checkout customer modal. | 1196 and 4986. | Retain existing paths; add the missing renewal-toggle boundary in TC-23. |

### Outcomes

| Outcome | Coverage decision |
| --- | --- |
| Clean first-purchase success | Existing and revised suite 608 plus TC-7. |
| Successful ticket-to-membership or membership-to-membership upgrade | New TC-9. |
| Sold-out membership upgrade target | Backend/API verified as excluded; add automated UI assertion. |
| Assigned-seating membership upgrade target | TC-9 asserts the source-backed intended negative boundary; execution may expose the documented frontend gap. |
| Assigned-seat/manual or best-available success | Existing 1190 and 4020; revised TC-4. |
| Sold out, active basket, hold, or purchase-limit rejection | Existing 1173, 1177, 431, 4917. |
| Outside sale window | Existing 4934; expand surface rows. |
| Public/seller visibility and draft state | New TC-6. |
| Customer cancellation before payment | New TC-8. |
| Payment failure followed by retry | New TC-8. |
| Duplicate or delayed final update | Backend/API automation candidate; not safely reproducible as a routine manual case. |
| Hold checkout cancellation | Existing 1256. |
| Renewal keep-as-is and edit-selection | Existing 1196 and 1199. |
| Renewal disabled | TC-23: no actionable renewal and no basket, payment, order, member, or inventory side effect. |

## Qase Search Summary

- Source: one read-only SPT bulk export saved under `/private/tmp`; no repeated ad hoc requests.
- Cases scanned: **1,597**.
- Broad membership title/tag matches: **134**.
- Suite 608: **18** cases reviewed in full.
- Suite 610: **8** renewal cases reviewed.
- Suite 1014: **6** account membership cases reviewed.
- Follow-up source: one read-only lookup of suites 608, 610, and 1014 saved under `/private/tmp`; no Qase writes were performed.
- Local filter: membership text in the case payload plus purchase, checkout, basket, sale, hold, renewal, attraction, payment, inventory, delivery, or window terms; final selection was reviewed manually to remove configuration-only matches.

### Suite 608 coverage

| Coverage area | Existing cases | Decision |
| --- | --- | --- |
| Non-seasonal purchase | 2525, 3486 | Preserve the grouped Platform/View parameter; expand the RenewalFrequency single parameter to all six non-seasonal values and BenefitContains to ordinary, GA, reserved-location, and reserved-seat values. |
| Seasonal / assigned seating | 2530, 1190 | Narrow 2530 to reserved-location and reserved-seat values; move GA to TC-13 and keep 1190 for explicit assigned-seat ownership. Neither closes the non-seasonal seating gap. |
| Public and Box Office payment matrices | 1170, 4083 | Keep; provider breadth does not replace entry-point or recovery proof. |
| Member questions and checkout steps | 720, 1188 | Keep. |
| Inventory, holds, sale windows | 431, 436, 1173, 1177, 4934 | Keep; expand 4934 to supported Electron, POS, and React Native surfaces where the control exists. |
| Delivery, credits, discounts | 2528, 2532, 1183 | Keep. Product add-on coverage also exists in 3138 with `ItemType: Membership`. |
| Seating persistence | 4400, 4401 | Keep as downstream seating controls. |

### Project-wide path coverage

| Case | What it proves | Gap / action |
| --- | --- | --- |
| 437 | Public detail content and purchase entry at `/m/{slug}`. | Preserve; it does not complete checkout or cover `/pass`/organizer-profile origins. |
| 3424 / 3425 / 3463 | WordPress membership button, embedded widget, and membership-list rendering. | Preserve; 2525/3486 already own the shared Widget purchase completion. |
| 388 | Mixed attraction transaction including `EventsMemberships`. | Preserve. |
| 1255 / 1256 | Membership held-basket checkout and cancellation for Seat, Location, and None. | Preserve. Case 1249 overlaps older hold coverage and should not be expanded instead of 1255. |
| 2868 | Branded hold link purchase for assigned-seating memberships. | Preserve. |
| 4030 / 4033 | Group-sale public and Box Office purchases; preconditions and review steps include memberships. | Enhance the final assertions for member fulfillment; do not duplicate the purchase paths. |
| 1196 / 1198 / 1199 / 1201 / 4986 | Customer and employee renewal paths. | Enhance 1201 with recurring soft/hard expiry windows; preserve the other purchase paths. Account-only renewal visibility remains in suite 1014/Qase 160. |
| 4003 | React Native Public membership webview smoke. | Preserve. |
| 4917 | POS baseline purchase, unavailable levels, purchaser email, and transaction. | Preserve; TC-1 adds a shared Mobile Box Office/POS Seasonal non-seating sale. |
| 1190 / 4020 | Assigned-seating membership purchase. | 1190 is explicitly seasonal; 4020 does not declare renewal frequency. Neither explicitly proves non-seasonal seating. |
| 819 / 2506 | Group-benefit and level-benefit configuration. | Preserve unchanged as setup coverage; do not add configuration tests. TC-11 owns purchase-time group/level benefit proof. |
| 4291 / 4294 / 4295 / 4297 | Ticket-to-membership and membership-to-membership upgrade-path configuration. | Preserve; configuration does not prove the review offer, basket conversion, payment, or fulfillment. |
| 153 / 155 / 158 / 160 / 162 / 2500 | Account membership list, detail, renewal visibility, benefit display, and seasonal post-renewal state. | Preserve in suite 1014; do not move purchase configuration or renewal checkout cases into the account suite. |

## Source-Backed Behavior

### Membership model used for coverage

| Model state | Source-backed behavior | Qase implication |
| --- | --- | --- |
| Membership group | Owns one `renewal_frequency` value: OneTime, Monthly, Every3Months, Every6Months, Yearly, Lifetime, or Seasonal. | Frequency belongs in the group fixture, never on an individual level. |
| Renewal season | A Seasonal group can have multiple dated renewal-season records. | Seasonal cases must name the on-sale season and its date/expiry result. |
| Membership level | Purchasable tier under one group; owns price, inventory, purchase limit, visibility, and optional level benefits. | Purchase and inventory proof belongs to the selected level. |
| Group benefit | Applies to members purchased from every level in the group. | Use at least two sibling levels to prove inheritance. |
| Level benefit | Applies only to members purchased from that level. | Prove a sibling level's benefit is not granted to the selected level. |
| Effective purchased benefits | The backend generates the union of currently purchasable group benefits and selected-level benefits. | Verify the member receives both scopes exactly once. |
| Assigned-seating Issue Tickets | A space-backed Issue Tickets benefit must be group-level; it cannot be attached to a level. | Reserved-seat/location fixtures must put the benefit on the group. |
| GA Issue Tickets | A no-space Issue Tickets benefit can be attached to a group or level when enabled. | Include a level-scoped GA purchase without a seating prompt. |
| Season-scoped benefit | Must be an Issue Tickets benefit attached to the group and renewal season, not to a level. | Correct case 2530's setup wording and do not create seasonal level-benefit fixtures. |

- Backend user-based and venue-based baskets both create membership item groups, invoice items, and member records after purchase. Guest purchase is supported, and multiple membership quantities can create distinct members with separate information and barcodes.
- Membership inventory counts active held/purchased quantities, rejects insufficient inventory, and releases capacity after the applicable hold or void/refund lifecycle.
- Renewal frequency drives member expiry: recurring and seasonal fixtures receive a calculated date, lifetime has no expiry, and a one-time membership past its custom expiry is rejected as no longer for sale.
- Public membership list reads require published public visibility. A known direct group can be retrieved when its group status is viewable, but public levels are still filtered to published/public levels. Seller reads filter group and nested level visibility separately.
- Public and Widget purchases use the shared membership purchase flow. A reserved-seating benefit opens seating; otherwise the membership-level detail step modifies the basket and continues to checkout.
- Reserved seating is determined by an Issue Tickets benefit with a non-null space, independently of membership renewal frequency. Backend public reads include non-seasonal reserved-seating benefits whose renewal-season value is null, and assigned-seating purchase tests use the default non-seasonal yearly group fixture.
- `/m/{slug}` and `/pass/{slug}` feed the membership detail flow. Organizer-profile membership cards link to the configured membership detail URL.
- Non-calendar attraction membership cards open a membership modal that adds membership levels to the attraction basket.
- The renewal modal is shared by account and Box Office. It filters to active/expired members, supports keep-as-is or edit selection, can change levels, and routes assigned-seating edits to the seating flow.
- POS treats a non-empty `reserved_seating_benefits` list as web-restricted. The public serializer limits that list to Issue Tickets benefits with a non-null space, while the venue serializer currently sources it from the full membership-benefit collection. This is the SPD-2580 regression risk.
- Membership-only baskets can expose configured product add-ons when `show_membership_product_addons` is active; existing Qase 3138 includes `ItemType: Membership`.
- Basket review supports ticket-to-membership and membership-to-membership upgrade offers. The selected upgrade should replace the source item with the target membership and recalculate the basket; sold-out membership targets are omitted by the public API.
- The frontend filters upgrade options when the source item group has seating permissions. It also records a TODO to exclude assigned-seating destination memberships because the required mapping is not yet available; that destination behavior remains an explicit product risk, not a confirmed end-to-end defect.
- Re-running membership post-purchase generation is rejected by backend coverage, which makes exactly-once member creation an explicit async proof target.
- A membership group is not required to have a benefit. This is an inference from the model and purchase generator: no model or purchase validation requires a benefit, and the generator can produce an empty effective-benefit set while still creating the member.
- Multiple Issue Tickets benefits are supported on a group. Backend grouped-member purchase coverage maps each selected seat/location permission to the correct benefit and member, so benefit count `multiple` is a distinct purchase boundary.

## Gap Closure Map

| Gap | Closure | Coverage status |
| --- | --- | --- |
| Supported first-purchase origins | Existing entry cases plus revised 2525/3486 account for wrapper/handoff and shared checkout separately. | Covered; duplicate TC-5 removed |
| Public, hidden, seller-only, and draft visibility | TC-6 proves group and nested-level visibility at the purchase boundary. | Drafted |
| Cancelled/failed payment and retry | TC-8 proves no fulfillment before success and exactly one membership after retry. | Drafted; delayed duplicate callbacks remain automated coverage |
| Multiple member identities in one order | TC-7 proves answers and barcodes remain attached to the correct member. | Drafted |
| Every renewal frequency | TC-2/TC-3 cover all six non-seasonal first-purchase values; TC-14/Qase 1201 covers recurring non-seasonal renewal purchases; TC-1/TC-4/TC-13 cover Seasonal; TC-15 isolates successful OneTime custom-expiry states. | Drafted / existing update |
| Ordinary, GA, reserved-location, and reserved-seat benefits | TC-2/TC-3 cover all classes for non-seasonal purchases; TC-4 owns Seasonal reserved seating; TC-13 owns Seasonal non-seating benefits including GA. | Drafted / existing updates |
| Group inheritance, level addition, mixed benefits, and sibling isolation | Combined TC-11 proves the effective purchased-benefit union across every supported group/level class without a configuration-only case. | Drafted |
| Seasonal always-available + current-season benefit union | TC-20 combines group/level ordinary benefits with current-season GA/location/seat benefits and excludes a past-season benefit. | Drafted |
| Zero and multiple benefits | TC-22 proves a membership with no benefits; TC-21 proves multiple GA/location/seat Issue Tickets mappings. | Drafted |
| Renewal availability toggle | Enhance Qase 160 with RenewalsDisabled instead of duplicating its non-renewable membership purpose. | Existing case enhancement |
| Membership-level purchase limit | TC-24 covers the non-seating finite/unlimited boundary; existing Qase 2858 retains assigned-seating maximum coverage. | Drafted without assigned-seating duplication |
| Invalid level-scoped assigned seating | TC-11 uses GA/no-space for level-scoped Issue Tickets and keeps reserved location/seat at group scope; Qase 2506 remains unchanged as configuration setup coverage. | Drafted purchase proof |
| Group-sale membership fulfillment | Enhance Qase 4030 and 4033 with exact membership fulfillment assertions. | Existing cases; duplicate TC-16/TC-17 removed |
| Mobile Box Office/POS Seasonal non-seating sale | TC-1 proves both MobileBoxOffice and POS can sell a Seasonal membership without reserved seating; TC-13 owns the broader non-seating benefit matrix. | Added as Qase 5035 |
| Runtime upgrade fulfillment and invalid upgrade states | TC-9 covers ticket/membership sources, successful replacement, seated-source rejection, sold-out targets, and assigned-seating targets. | Drafted; assigned-seating target may expose the documented frontend gap |
| Renewal and expiry boundaries | TC-14 enhances suite 610/Qase 1201 for recurring soft/hard renewal purchases; TC-15 covers successful OneTime no/future custom expiry; Qase 4934 covers past expiry; TC-2/TC-3 cover Lifetime first purchase. | Drafted / existing updates |
| Exactly-once async generation | Add backend integration coverage for duplicate or delayed finalization after TC-8's manual retry proof. | Automation-only follow-up |

## Qase Change Plan

| Draft    | Actual action | Qase ID / Suite                                                                      | Qase title                                                                                                                                                                                                                                       | Actual result                                                                                                                                  |
| -------- | ------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| TC-1     | Updated       | [5035](https://app.qase.io/case/SPT-5035) / 608                                      | Core - Checkout - Memberships - Sell a seasonal non-seating membership on Mobile Box Office and POS                                                                                                                                              | Corrected Mobile to MobileBoxOffice; verified with 2 grouped Platform/View rows and 5 steps.                                                   |
| TC-2     | Updated       | [2525](https://app.qase.io/case/SPT-2525) / 608                                      | Core - Checkout - Memberships - Purchase non-seasonal memberships with Info Collect enabled                                                                                                                                                      | Title and 6-step content verified. All 8 grouped Platform/View rows remain intact; 6 RenewalFrequency and 6 BenefitContains values are stored. |
| TC-3     | Updated       | [3486](https://app.qase.io/case/SPT-3486) / 608                                      | Core - Checkout - Memberships - Purchase non-seasonal memberships with Info Collect disabled                                                                                                                                                     | Title and 5-step content verified. All 8 grouped Platform/View rows remain intact; 6 RenewalFrequency and 6 BenefitContains values are stored. |
| TC-4     | Updated       | [2530](https://app.qase.io/case/SPT-2530) / 608                                      | Core - Checkout - Memberships - Purchase seasonal memberships with reserved seating benefits                                                                                                                                                     | Verified with `IssueTicket: ReservedLocation, ReservedSeat`, `InfoCollect: Enabled, Disabled`, and 5 steps.                                    |
| TC-6     | Created       | [5036](https://app.qase.io/case/SPT-5036) / 608                                      | Core - Checkout - Memberships - Enforce public and seller purchase visibility                                                                                                                                                                    | Verified with 5 VisibilityProfile values and 5 steps.                                                                                          |
| TC-7     | Created       | [5037](https://app.qase.io/case/SPT-5037) / 608                                      | Core - Checkout - Memberships - Preserve each member's information when Info Collect is enabled                                                                                                                                                  | Verified with 3 BuyerState values and 6 steps.                                                                                                 |
| TC-8     | Created       | [5038](https://app.qase.io/case/SPT-5038) / 608                                      | Core - Checkout - Memberships - Edge case: recover from cancelled or failed payment without duplicate fulfillment                                                                                                                                | Verified with 2 RecoveryOutcome values and 5 steps.                                                                                            |
| TC-9     | Created       | [5039](https://app.qase.io/case/SPT-5039) / 608                                      | Core - Checkout - Memberships - Complete an eligible upgrade to a membership                                                                                                                                                                     | Verified with UpgradePath, SourceState, TargetState, and 6 steps.                                                                              |
| TC-11    | Created       | [5040](https://app.qase.io/case/SPT-5040) / 608                                      | Core - Checkout - Memberships - Apply group and selected-level benefits to purchased members                                                                                                                                                     | Verified with 10 BenefitConfiguration values and 6 steps.                                                                                      |
| TC-13    | Created       | [5041](https://app.qase.io/case/SPT-5041) / 608                                      | Core - Checkout - Memberships - Purchase seasonal memberships with non-seating benefits                                                                                                                                                          | Verified with 4 BenefitContains values, including IssueTicketGA, and 4 steps.                                                                  |
| TC-14    | Updated       | [1201](https://app.qase.io/case/SPT-1201) / 610                                      | Core - Renewals - Renew non-seasonal memberships across recurring expiry windows                                                                                                                                                                 | Verified with 4 RenewalFrequency values, 2 RenewalWindow values, and 5 steps.                                                                  |
| TC-15    | Created       | [5042](https://app.qase.io/case/SPT-5042) / 608                                      | Core - Checkout - Memberships - Purchase OneTime memberships with no or future custom expiry                                                                                                                                                     | Verified with 2 CustomExpiry values and 3 steps.                                                                                               |
| TC-18    | Updated       | [4934](https://app.qase.io/case/SPT-4934) / 608                                      | Core - Checkout - Memberships - Prevent purchase outside membership sale window                                                                                                                                                                  | Content and 5 steps verified. All 6 grouped Platform/View rows and both SaleWindowRule values are stored.                                      |
| TC-20    | Created       | [5043](https://app.qase.io/case/SPT-5043) / 608                                      | Core - Checkout - Memberships - Apply always-available and current-season benefits together                                                                                                                                                      | Verified with 7 BenefitConfiguration values and 5 steps.                                                                                       |
| TC-21    | Created       | [5044](https://app.qase.io/case/SPT-5044) / 608                                      | Core - Checkout - Memberships - Preserve multiple Issue Tickets benefit fulfillment                                                                                                                                                              | Verified with 5 IssueTicketConfiguration values and 5 steps.                                                                                   |
| TC-22    | Created       | [5045](https://app.qase.io/case/SPT-5045) / 608                                      | Core - Checkout - Memberships - Purchase a membership with no benefits                                                                                                                                                                           | Verified with Yearly and Seasonal values and 5 steps.                                                                                          |
| TC-23    | Updated       | [160](https://app.qase.io/case/SPT-160) / 1014                                       | Core - User - Memberships - Verify Renew button is hidden when membership cannot be renewed                                                                                                                                                      | Content and 5 steps verified. All 3 grouped Platform/View rows remain intact and MembershipRenewalState includes RenewalsDisabled.             |
| TC-24    | Created       | [5046](https://app.qase.io/case/SPT-5046) / 608                                      | Core - Checkout - Memberships - Enforce membership-level purchase limits                                                                                                                                                                         | Verified with 3 LimitScenario values and 5 steps.                                                                                              |
| Existing | Not changed   | [4030](https://app.qase.io/case/SPT-4030), [4033](https://app.qase.io/case/SPT-4033) | 4030 — Dashboard - Box Office - Group Sale Hold - Verify that group sales are purchased via the group sale link (WEB PUBLIC FLOW)<br>4033 — Dashboard - Box Office - Group Sale Hold - Verify that group sale holds are purchased via box office | Full update bodies were not drafted or dry-run, so no assertions or parameters were changed.                                                   |

## Duplication Review

| Decision | Cases | Reason |
| --- | --- | --- |
| Remove | TC-5 | Its routes and wrappers only hand off to shared checkout already covered by 437, 3424/3425/3463, 4003, and 2525/3486. |
| Remove; enhance existing | TC-16, TC-17 | Qase 4030/4033 already execute the same public and Box Office group-sale purchases with memberships in scope. |
| Convert to existing-case enhancement | TC-23 → Qase 160 | Qase 160 already owns hidden renewal actions for non-renewable membership states. |
| Absorb into existing parameters | TC-10 → Qase 2525/3486 | Every3Months, Every6Months, Yearly, and Lifetime use the same non-seasonal first-purchase flow and expected fulfillment as OneTime/Monthly. |
| Combine | TC-12 → TC-11 | Group inheritance, level isolation, and mixed group/level benefit unions are clearer as one constrained checkout matrix. |
| Remove configuration-only draft | TC-19 | Qase 2506 already covers level setup. TC-11 proves the user-visible purchase result, so no Qase 2506 update is proposed. |
| Move overlapping value | TC-4 → TC-13 | GA does not use reserved seating, so TC-4 is seating-only and TC-13 owns every Seasonal non-seating benefit. |
| Convert to existing-case enhancement | TC-14 → Qase 1201 in suite 610 | Qase 1201 already owns non-seasonal renewal purchases and expiry updates. |
| Keep account checks in account suite | TC-23 → Qase 160 in suite 1014 | Renewal-action visibility belongs to the account suite; renewal checkout and expiry belong to suite 610/Qase 1201. |
| Remove redundant execution axes | TC-13, TC-15, TC-22, TC-24 | Sales surface stays in each Platform/View table; it does not need a second Qase single parameter when behavior is shared. |
| Keep focused | TC-1–TC-4, TC-6–TC-9, TC-11, TC-13–TC-15, TC-18, TC-20–TC-24 | Each protects a distinct entry path, state, boundary, benefit mapping, recovery, or fulfillment result. |

Cases 2525, 3486, 4934, and 160 contain grouped Platform/View parameters. Their API content updates excluded `params` and `parameters`; the grouped and single-parameter edits were completed through the Qase UI and verified by API readback. Cases 2525/3486 now store `RenewalFrequency: OneTime, Monthly, Every3Months, Every6Months, Yearly, Lifetime` and all six BenefitContains values. Case 2530 stores `IssueTicket: ReservedLocation, ReservedSeat` and `InfoCollect: Enabled, Disabled`; all four combinations are valid.

## Qase Apply and Verification

- Applied on 2026-08-17: **12 creates and 6 updates** from the approved 18-operation dry run.
- Created Qase IDs: **5035–5046**. Every title, suite, tag set, parameter set, and step count was re-read from Qase.
- Updated and re-read: **2525, 3486, 2530, 1201, 4934, and 160**.
- The batch verifier paused twice because Qase returned the same tags in a different order. Readback confirmed the stored tag sets and parameter values, and the batch was resumed from the next unapplied operation without creating duplicates.
- Qase 2530 and 1201 have their intended single parameters. Grouped Platform/View parameters in 2525, 3486, 4934, and 160 were preserved because both `params` and `parameters` were excluded from their API updates.
- Manual Qase UI edits were completed and verified: 2525/3486 have the full frequency/benefit matrices, 4934 has all six Platform/View rows, and 160 includes RenewalsDisabled. No grouped rows were lost.
- Qase 5035 was subsequently corrected from React Native Public to MobileBoxOffice and re-read with grouped rows `MobileBoxOffice/Mobile` and `POS/Tablet`.
- Qase 4030/4033 were not changed because complete update bodies were not part of the approved dry run.

## Configuration Coverage Ledger

| Dimension | Values | Coverage |
| --- | --- | --- |
| RenewalFrequency | OneTime; Monthly; Every3Months; Every6Months; Yearly; Lifetime; Seasonal | TC-2/TC-3 cover every non-seasonal first purchase; TC-14/Qase 1201 covers recurring renewals; TC-1/TC-4/TC-13 cover Seasonal |
| BenefitContains | EventScanAccess; Discount; DailyScanAccess; IssueTicketGA; IssueTicketReservedLocation; IssueTicketReservedSeating | TC-2/TC-3 cover non-seasonal; TC-4 covers Seasonal reserved seating; TC-13 covers Seasonal non-seating |
| Benefit scope | Group; selected level; mixed group + level; sibling exclusion; group + season | TC-11 and TC-20 |
| Benefit count | None; one; multiple | TC-22; TC-1 through TC-4 and TC-11; TC-20 and TC-21 |
| Seasonal benefit selection | Always available; current season; past season excluded; mixed always available + current season | TC-1, TC-4, TC-13, and TC-20 |
| Information collection | Enabled; Disabled | TC-2, TC-3, and TC-4 |
| Renewal availability | Enabled; Disabled | TC-23 |
| Sales channel | Public; seller; POS | Platform/View tables in TC-1 through TC-3, TC-6, TC-13 through TC-15, TC-22, and TC-24 |
| Purchase origin | Direct `/m`; direct `/pass`; organizer; Widget; WordPress button/embed/list; Web Box Office; Electron; React Native; public group-sale link; Box Office group-sale hold | Existing Qase 437, 3424/3425/3463, 4003, 4030/4033 plus revised 2525/3486 |
| Seating state | No seating; GA/no space; reserved location; assigned seat | TC-1 through TC-4, TC-9, TC-11, TC-13, and TC-20 through TC-22 |
| Purchase outcome | Success; unavailable/blocked; cancel; failure; retry; held/cancelled; sold out; limit rejected | TC-6/TC-8/TC-9/TC-15/TC-18/TC-23/TC-24 plus existing 1255/1256/2868/1173/1177/431/4917 |
| Purchase limit | Finite at limit; finite above limit; unlimited above default | TC-24 |
| Expiry state | Recurring soft window; recurring hard window; no custom expiry; future custom expiry; past custom expiry; lifetime | TC-2/TC-3, TC-14/Qase 1201, TC-15, and TC-18 |
| Fulfillment identity | One member; multiple distinct members; exactly-once after retry | TC-7 and TC-8; duplicate/delayed callback proof is automated |

All source-backed purchase configuration classes are accounted for at their behavior boundaries. Existing Qase cases retain the orthogonal provider, delivery, fee, terms, add-on, hold, and inventory ranges; TC-24 owns the membership-level quantity boundary, so these dimensions are not multiplied into every renewal/benefit case.

## Purchase-Path Coverage Ledger

| Declared path or state | Coverage | Evidence / next action |
| --- | --- | --- |
| Direct legacy/branded, organizer profile, Widget, WordPress, Web Box Office, Electron, and mobile origins | Existing entry cases + revised 2525/3486 | Wrapper/handoff checks and shared checkout completion are accounted separately; TC-5 was duplicate. |
| Attraction membership purchase | Existing | Qase 388; Playwright non-calendar attraction membership flow. |
| POS first purchase | Existing + TC-1/TC-2/TC-3 | Qase 4917 provides the baseline; drafted cases distinguish allowed non-seating from blocked space-backed benefits. |
| Regular and branded hold purchase/cancel | Existing | Qase 1255, 1256, and 2868. |
| Group-sale membership purchase | Existing Qase 4030/4033 | Add member and seat/location fulfillment assertions without new path cases. |
| Account and Box Office renewal | Existing + TC-14/Qase 1201 + TC-23/Qase 160 | Suite 610/Qase 1201 gains recurring expiry windows; suite 1014/Qase 160 gains RenewalsDisabled account behavior. |
| Public/seller/draft visibility | TC-6 | No equivalent purchase-boundary case was found. |
| All non-seasonal frequencies and benefit classes | Revised TC-2/TC-3 plus TC-15 | RenewalFrequency is expanded in Qase 2525/3486; TC-15 isolates the OneTime custom-expiry boundary. |
| Group/level inheritance and sibling isolation | Combined TC-11 | One constrained checkout matrix covers inheritance, isolation, mixed benefits, GA level scope, and group-only reserved seating. |
| Seasonal without seating | TC-1/TC-13 | Proves Seasonal frequency does not imply reserved seating. |
| Seasonal GA/location/seat | TC-13 + TC-4 + existing Qase 1190 | TC-13 owns GA; seating-only TC-4 covers reserved location/seat; 1190 retains assigned-seat ownership proof. |
| Seasonal mixed-scope benefit union | TC-20 | Proves group/level ordinary benefits combine with only the current season's Issue Tickets benefit. |
| No-benefit membership | TC-22 | Proves benefit absence does not block purchase or create phantom benefit records. |
| Multiple Issue Tickets benefits | TC-21 | Proves each GA/location/seat fulfillment remains mapped to the correct benefit and member. |
| Renewals enabled/disabled | TC-23 + existing suite 610 | Adds the missing availability gate to existing GA/seating, state, frequency, and entry-point renewal coverage. |
| Membership purchase limit | TC-24 | Adds the missing level-specific finite/unlimited quantity boundary; inventory and hold limits remain in existing Qase 431/1173/1177/4917. |
| Multiple distinct members in one order | TC-7 | Verifies answers, membership records, and barcodes per member. |
| Cancel/failure/retry | TC-8 | Delayed/duplicate finalization remains automation/API coverage. |
| Checkout upgrade into a membership | TC-9 | Covers both source types and available, sold-out, and assigned-seating targets. |
| Sold out, limits, holds, and sale window | Existing + TC-18 | Qase 1173, 1177, 431, 4934, and 4917; TC-18 makes the 4934 surface expansion executable. |
| Delivery, credits, add-ons, terms, and refund protection | Existing | Qase 2528, 2532, 3138, 1346, and 3985. |
| Exactly-once async member generation | Backend verified; automation required | Add an integration assertion for duplicate/delayed purchase-finalization events. |
| Live end-to-end behavior | Not executed | Requires browser, POS/device, and payment fixtures. |

## Qase-Ready Cases

### TC-1: Core - Checkout - Memberships - Sell a seasonal non-seating membership on Mobile Box Office and POS

**Qase case:** 5035

**Description:** Verifies that a Box Office employee using MobileBoxOffice and a POS employee can each complete a clean purchase of a Seasonal membership whose benefit does not require a reserved seat or location. It proves that Seasonal frequency alone does not block these supported employee sales surfaces.

| Platform | View |
| --- | --- |
| MobileBoxOffice | Mobile |
| POS | Tablet |

**Preconditions:**

* A published Seasonal membership group has an on-sale renewal season and one available level.
* The group has an Event Scan Access benefit and no space-backed Issue Tickets benefit or reserved seat/location permission.
* A MobileBoxOffice employee and POS employee can each use a supported payment method.
* Record the customers, membership level, on-sale season, expected member expiry, and starting inventory before each run.

**Postconditions:**

* Each supported surface creates one transaction, one order, and one membership.
* Each member is associated with the on-sale season and receives Event Scan Access without a reserved seat/location.
* Refund or void only the disposable completed orders created by this test.

**Tags:** memberships, checkout, mobile-view

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the membership in the selected supported surface. | MobileBoxOffice Mobile or POS Tablet | The on-sale Seasonal group and available level are visible. |
| Select the membership level. | Membership fixture | The purchase continues without a web-only or assigned-seating restriction and without requesting a seat/location. |
| Provide the required customer and member information. | Customer fixture | The customer and member information are accepted for the selected level. |
| Complete the supported payment. | Payment fixture | The sale completes once and confirmation is shown. |
| Open the completed transaction, order, and customer membership. | Customer; selected surface | Exactly one transaction, one order, and one membership exist with the correct purchase source, season, expiry, level, Event Scan Access benefit, and inventory decrement; no reserved seat/location is attached. |

### TC-2: Core - Checkout - Memberships - Purchase non-seasonal memberships with Info Collect enabled

**Qase case:** 2525
**Description:** Verifies every non-seasonal renewal frequency with required member information when the group contains an ordinary, GA Issue Tickets, reserved-location, or reserved-seat benefit. It preserves the existing Platform/View group and protects benefit inheritance, seating behavior, member data, expiry, order state, and inventory.

Current grouped parameter — preserve unchanged: Platform + View.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| POS | Tablet |
| React Native Public | Mobile |

**Preconditions:**

* A published non-seasonal group uses RenewalFrequency and has one available level.
* BenefitContains is attached to the group so the selected level inherits it.
* EventScanAccess, Discount, DailyScanAccess, and IssueTicketGA have no reserved space; IssueTicketReservedLocation and IssueTicketReservedSeating have a configured space and an available location or seat.
* Info Collect is enabled with at least one required member field.
* Record the expected expiry, price, starting inventory, and available seat when applicable.

**Postconditions:**

* A purchase-capable combination creates one order and membership with the inherited group benefit, required member data, expected expiry, and selected location/seat when applicable.
* POS + IssueTicketReservedLocation or IssueTicketReservedSeating creates no payment, order, or membership and leaves inventory unchanged.
* Clean up only a disposable completed order.

**Tags:** checkout, memberships

**Parameters:**
RenewalFrequency: OneTime, Monthly, Every3Months, Every6Months, Yearly, Lifetime
BenefitContains: EventScanAccess, Discount, DailyScanAccess, IssueTicketGA, IssueTicketReservedLocation, IssueTicketReservedSeating

| BenefitContains | Group benefit setup | Expected selection path |
| --- | --- | --- |
| EventScanAccess | Event Scan Access; no space | Continue without seating selection. |
| Discount | Discount; no space | Continue without seating selection. |
| DailyScanAccess | Daily Scan Access; no space | Continue without seating selection. |
| IssueTicketGA | Issue Tickets; no space | Continue without seating selection. |
| IssueTicketReservedLocation | Issue Tickets; reserved location space | Select and retain a location; POS shows the supported web/assigned-seating restriction instead of taking payment. |
| IssueTicketReservedSeating | Issue Tickets; reserved seating space | Select and retain a seat; POS shows the supported web/assigned-seating restriction instead of taking payment. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the membership purchase surface for the existing Platform/View row and choose the prepared group and level. | Platform; View; RenewalFrequency; BenefitContains | The published level loads with the correct price, selected non-seasonal frequency, and inherited group benefit. |
| Add the membership. | BenefitContains | Ordinary and IssueTicketGA values continue without seating selection. IssueTicketReservedLocation or IssueTicketReservedSeating opens seating and retains the chosen location/seat, except POS shows the assigned-seating/web restriction and does not open payment. |
| Continue without completing the required member fields. | Required field fixture | Validation identifies the missing fields and checkout does not advance. |
| Enter valid member information and continue. | Named test member data | The information is accepted and remains associated with the selected membership. |
| Complete the supported payment flow for a purchase-capable combination. | Payment fixture | One membership purchase completes and confirmation is shown; the blocked POS seating combination creates no payment or success state. |
| Open the transaction, order, and customer membership, or verify their absence for blocked POS seating. | Customer; RenewalFrequency; BenefitContains | A completed purchase has one payment result, transaction, order, and membership with required member data, inherited benefit, expected expiry, inventory decrement, and location/seat when applicable. A blocked POS seating run creates none and preserves inventory. |

### TC-3: Core - Checkout - Memberships - Purchase non-seasonal memberships with Info Collect disabled

**Qase case:** 3486
**Description:** Verifies every non-seasonal renewal frequency without member information collection when the group contains an ordinary, GA Issue Tickets, reserved-location, or reserved-seat benefit. It preserves the existing Platform/View group and protects benefit inheritance, seating behavior, expiry, order state, and inventory without introducing disabled member data.

Current grouped parameter — preserve unchanged: Platform + View.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| POS | Tablet |
| React Native Public | Mobile |

**Preconditions:**

* A published non-seasonal group uses RenewalFrequency and has one available level.
* BenefitContains is attached to the group so the selected level inherits it.
* EventScanAccess, Discount, DailyScanAccess, and IssueTicketGA have no reserved space; IssueTicketReservedLocation and IssueTicketReservedSeating have a configured space and an available location or seat.
* Info Collect is disabled.
* Record the expected expiry, price, starting inventory, and available seat when applicable.

**Postconditions:**

* A purchase-capable combination creates one order and membership with the inherited group benefit, expected expiry, and selected location/seat when applicable.
* No disabled member-question answers are requested or saved.
* POS + IssueTicketReservedLocation or IssueTicketReservedSeating creates no payment, order, or membership and leaves inventory unchanged.
* Clean up only a disposable completed order.

**Tags:** checkout, memberships

**Parameters:**
RenewalFrequency: OneTime, Monthly, Every3Months, Every6Months, Yearly, Lifetime
BenefitContains: EventScanAccess, Discount, DailyScanAccess, IssueTicketGA, IssueTicketReservedLocation, IssueTicketReservedSeating

| BenefitContains | Group benefit setup | Expected selection path |
| --- | --- | --- |
| EventScanAccess | Event Scan Access; no space | Continue without seating selection. |
| Discount | Discount; no space | Continue without seating selection. |
| DailyScanAccess | Daily Scan Access; no space | Continue without seating selection. |
| IssueTicketGA | Issue Tickets; no space | Continue without seating selection. |
| IssueTicketReservedLocation | Issue Tickets; reserved location space | Select and retain a location; POS shows the supported web/assigned-seating restriction instead of taking payment. |
| IssueTicketReservedSeating | Issue Tickets; reserved seating space | Select and retain a seat; POS shows the supported web/assigned-seating restriction instead of taking payment. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the membership purchase surface for the existing Platform/View row and choose the prepared group and level. | Platform; View; RenewalFrequency; BenefitContains | The published level loads with the correct price, selected non-seasonal frequency, and inherited group benefit. |
| Add the membership. | BenefitContains | Ordinary and IssueTicketGA values continue without seating selection. IssueTicketReservedLocation or IssueTicketReservedSeating opens seating and retains the chosen location/seat, except POS shows the assigned-seating/web restriction and does not open payment. |
| Continue through the customer/member information area. | Info Collect disabled | Checkout does not require the disabled membership questions. |
| Complete the supported payment flow for a purchase-capable combination. | Payment fixture | One membership purchase completes and confirmation is shown; the blocked POS seating combination creates no payment or success state. |
| Open the transaction, order, and customer membership, or verify their absence for blocked POS seating. | Customer; RenewalFrequency; BenefitContains | A completed purchase has one payment result, transaction, order, and membership with inherited benefit, expected expiry, inventory decrement, and location/seat when applicable, without disabled member-question data. A blocked POS seating run creates none and preserves inventory. |

### TC-4: Core - Checkout - Memberships - Purchase seasonal memberships with reserved seating benefits

**Qase case:** 2530
**Description:** Verifies seasonal membership checkout with reserved-location or reserved-seat Issue Tickets and with member information enabled or disabled. GA and all other non-seating benefits are covered by TC-13.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* A published Seasonal group has an on-sale renewal season and an available level for the selected IssueTicket and InfoCollect values.
* The Issue Tickets benefit is attached to the group and the on-sale renewal season, never to a level.
* ReservedLocation and ReservedSeat use the group-and-season benefit with the matching reserved space.
* Record the expected season, member expiry, price, seating, and starting inventory.

**Postconditions:**

* One seasonal order and membership exist for a successful run.
* ReservedLocation or ReservedSeat retains the selected permission.
* Member information is saved only when enabled; inventory decreases once.

**Tags:** checkout, memberships, assigned-seating

**Parameters:**
IssueTicket: ReservedLocation, ReservedSeat
InfoCollect: Enabled, Disabled

| IssueTicket | Group-and-season benefit setup | Purchase path |
| --- | --- | --- |
| ReservedLocation | Issue Tickets with a reserved location space | Select and retain a location. |
| ReservedSeat | Issue Tickets with a reserved seating space | Select and retain a seat. |

| InfoCollect | Checkout behavior |
| --- | --- |
| Enabled | Required member fields are validated and saved. |
| Disabled | Disabled member fields are not requested or saved. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected purchase surface and select the seasonal membership. | IssueTicket; InfoCollect | The on-sale season and available membership level are visible with the mapped benefit setup. |
| Add the membership and complete the configured location or seat selection. | IssueTicket | ReservedLocation or ReservedSeat retains the chosen assignment. |
| Complete required member information when enabled and continue. | InfoCollect | Enabled requires and accepts member data; Disabled does not request the disabled fields. |
| Complete the supported payment flow. | Payment fixture | One seasonal membership purchase completes and confirmation is shown. |
| Open the order, membership, and issued ticket details. | Customer; IssueTicket; InfoCollect | Records show one purchase, correct season/expiry, expected member-data state, inventory change, and expected assigned ticket behavior. |

### TC-6: Core - Checkout - Memberships - Enforce public and seller purchase visibility

**Qase case:** 5036

**Description:** Verifies that membership group and level visibility controls which public and seller surfaces can list and sell a membership, while a hidden public level remains available only through its known direct link. This protects against unintended exposure and blocked employee sales.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| POS | Tablet |

**Preconditions:**

* A venue has one membership group/level fixture for each VisibilityProfile.
* All non-draft fixtures have inventory and an open sale window.
* The employee can sell memberships; record the fixture slugs and starting inventory.

**Postconditions:**

* A permitted run creates one order and membership only on an allowed surface.
* A blocked run creates no order, payment, membership, or inventory change.
* Restore fixture visibility only if this test changed it; otherwise leave shared fixtures unchanged.

**Tags:** memberships, checkout, box-office

**Parameters:**
VisibilityProfile: PublicEverywhere, HiddenDirectLink, SellersOnly, PublicOnly, Draft

| VisibilityProfile | Group / level setup | Expected availability |
| --- | --- | --- |
| PublicEverywhere | Public / Public | Public listings/direct link and seller surfaces. |
| HiddenDirectLink | Hidden group / Public level | Absent from public listings; known direct link can sell; seller listing is hidden. |
| SellersOnly | SellersOnly / SellersOnly | Seller surfaces only; public cannot select a level. |
| PublicOnly | PublicOnly / PublicOnly | Public surfaces only; seller surfaces cannot select it. |
| Draft | Draft group / any level | Not purchasable on public or seller surfaces. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Search public discovery and the organizer profile for VisibilityProfile. | VisibilityProfile | Only PublicEverywhere and PublicOnly appear in public listings; HiddenDirectLink, SellersOnly, and Draft do not. |
| Open the fixture's known public detail or Widget link. | Fixture slug | PublicEverywhere, HiddenDirectLink, and PublicOnly expose the public level; SellersOnly and Draft cannot be purchased publicly. |
| Open WebBoxOffice or Electron Sell and search Memberships for the fixture. | VisibilityProfile | PublicEverywhere and SellersOnly are selectable; HiddenDirectLink, PublicOnly, and Draft are not seller-selectable. |
| Open POS Memberships and search for the fixture. | VisibilityProfile | POS follows seller visibility and does not expose a disallowed fixture. |
| Complete one purchase on an allowed surface for the selected profile, or stop after the blocked proof. | Customer and payment fixture | An allowed purchase creates one order and membership; a blocked profile creates none on the disallowed surface. |

### TC-7: Core - Checkout - Memberships - Preserve each member's information when Info Collect is enabled

**Qase case:** 5037

**Description:** Verifies that when Info Collect is enabled, buying more than one membership in one order preserves the information entered for each member. Each membership must keep the correct answers and unique membership code or barcode.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* A non-seating membership level has inventory of at least two, purchase limit at least two, and per-member Info Collect enabled.
* Prepare two people with different names, emails, and one additional required answer.
* Record starting inventory and confirm neither person already has the disposable membership.

**Postconditions:**

* One order contains quantity two and two distinct memberships.
* Each membership retains its intended person's information and unique membership code/barcode.
* Inventory decreases by two; clean up only the disposable order.

**Tags:** memberships, checkout, orders

**Parameters:**
BuyerState: AuthenticatedBuyer, GuestBuyer, BoxOfficeCustomer

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supported purchase surface for BuyerState and add quantity two. | BuyerState; membership level | The basket contains two memberships at the correct total and stays within the purchase limit. |
| Enter Person A's required member information for the first membership. | Person A fixture | The first membership displays Person A's answers. |
| Enter Person B's required member information for the second membership. | Person B fixture | The second membership displays Person B's different answers. |
| Complete the supported payment flow. | Payment fixture | One order for quantity two completes. |
| Open the order and both customer membership records. | Person A and Person B | Two distinct memberships exist under the one order, each with the correct person, level, unique code/barcode, and no crossed answers. |
| Compare inventory with the recorded starting value. | Starting inventory | Available inventory decreased by exactly two. |

### TC-8: Core - Checkout - Memberships - Edge case: recover from cancelled or failed payment without duplicate fulfillment

**Qase case:** 5038

**Description:** This edge case verifies that cancelling or failing a membership payment creates no paid order or membership and that a later successful retry creates exactly one. It protects against unpaid access and duplicate charges or memberships.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Preconditions:**

* An authenticated customer has no active copy of the disposable membership.
* The membership is non-seating, in stock, within its sale window, and uses no shipping fulfillment.
* A supported cancellation path and a controlled declined-payment fixture are available.
* Record starting inventory and the customer's current membership/order count.

**Postconditions:**

* The cancelled or failed attempt creates no paid order, charge, or membership and does not permanently consume inventory.
* The successful retry creates one charge, one transaction, one order, and one membership.
* Clean up only the successful disposable order.

**Tags:** memberships, checkout, edge-case

**Parameters:**
RecoveryOutcome: CustomerCancelsBeforeAuthorization, PaymentDeclinedThenRetry

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Add the disposable membership and continue to payment. | Membership and customer | The basket shows one membership and the correct total. |
| Trigger RecoveryOutcome without completing payment. | Cancellation control or declined-payment fixture | Checkout shows the expected cancellation or payment error and no success confirmation. |
| Open the customer's orders/memberships and the employee transaction view. | Customer | No paid order, transaction, charge, or membership exists for the failed attempt. |
| Return to the supported retry path and complete payment successfully. | Accepted payment fixture | Checkout completes once without requiring a duplicate basket item. |
| Open the completed transaction, order, and customer membership. | Customer and membership | Exactly one charge, one transaction, one order, and one membership exist, and inventory decreased once. |

### TC-9: Core - Checkout - Memberships - Complete an eligible upgrade to a membership

**Qase case:** 5039

**Description:** Verifies ticket-to-membership and membership-to-membership upgrade behavior for eligible non-seating sources, seated sources, available targets, sold-out targets, and assigned-seating targets. It protects against charging for both items, retaining the original access product, offering an ineligible target, or failing to issue the upgraded membership.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* UpgradePath is configured and published using the corresponding existing Qase configuration case.
* SourceState and TargetState fixtures match their configured seating and availability state and are inside applicable sale windows.
* AvailableNonSeating costs more than the source item and the expected price difference is recorded.
* The customer owns neither the source nor target before checkout; record starting inventory and order/membership counts.

**Postconditions:**

* EligibleNonSeating + AvailableNonSeating creates one payment, transaction, order, and target membership for the recalculated total.
* AssignedSeating source, SoldOut target, and AssignedSeating target combinations show no actionable membership upgrade and create no upgrade mutation.
* Source and target inventory changes match the final state; clean up only a disposable completed order.

**Tags:** memberships, checkout, purchases

**Parameters:**
UpgradePath: TicketToMembership, MembershipToMembership
SourceState: EligibleNonSeating, AssignedSeating
TargetState: AvailableNonSeating, SoldOut, AssignedSeating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Add the configured source item and continue to basket review. | UpgradePath; SourceState; TargetState | The basket contains one source item at its original price. |
| Review the source item for an upgrade offer. | SourceState; TargetState | EligibleNonSeating + AvailableNonSeating shows the configured target and correct price difference. AssignedSeating source, SoldOut target, and AssignedSeating target show no actionable membership upgrade. |
| For an actionable offer, select the membership upgrade. | Upgrade action | The source item is replaced by one target membership; the basket does not contain both items and the total increases by the recorded difference. Ineligible combinations remain unchanged. |
| Complete required membership information and payment only for an actionable offer. | Customer; accepted payment fixture | EligibleNonSeating + AvailableNonSeating completes once; ineligible combinations create no upgrade payment or order. |
| Open the basket, transaction, order, and customer membership. | Customer; source; target membership | A successful upgrade creates one charge, transaction, order, and target membership with no source access. Ineligible combinations retain the original basket item and create no target membership. |
| Compare source and target inventory with the recorded starting values. | Starting inventory | Inventory reflects only a completed available-target upgrade and no duplicate or stale hold remains. |

### TC-11: Core - Checkout - Memberships - Apply group and selected-level benefits to purchased members

**Qase case:** 5040

**Description:** Verifies at checkout that group benefits are inherited by purchased members from both sibling levels, selected-level benefits stay on that level, and valid group-plus-level combinations are granted exactly once. It also proves that reserved-location and reserved-seat Issue Tickets remain group-scoped.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* A published Yearly group has two available sibling levels, Level A and Level B, matching BenefitConfiguration.
* Level-scoped IssueTicketGA has no space; reserved-location and reserved-seat Issue Tickets are group-scoped.
* Neither level has a duplicate benefit of the same type, and Daily Scan Access respects the group/level exclusivity rule.
* Record both levels' starting inventory and prepare two disposable customers.

**Postconditions:**

* Each purchased member receives the exact group plus selected-level benefit set once.
* A Level A-only benefit never leaks to the Level B member.
* Any reserved location or seat remains attached to the correct member.
* Two orders and memberships exist per run; clean up only those disposable orders.

**Tags:** memberships, checkout, assigned-seating

**Parameters:**
BenefitConfiguration: GroupEvent, LevelEvent, GroupDiscount, LevelDiscount, GroupDaily, LevelDaily, GroupGA, LevelGA, GroupLocationLevelEvent, GroupSeatLevelDiscount

| BenefitConfiguration | Group benefits | Level A benefits | Level B benefits |
| --- | --- | --- | --- |
| GroupEvent | Event Scan Access | None | None |
| LevelEvent | None | Event Scan Access | None |
| GroupDiscount | Discount | None | None |
| LevelDiscount | None | Discount | None |
| GroupDaily | Daily Scan Access | None | None |
| LevelDaily | None | Daily Scan Access | None |
| GroupGA | Issue Tickets GA | None | None |
| LevelGA | None | Issue Tickets GA | None |
| GroupLocationLevelEvent | Issue Tickets reserved location | Event Scan Access | None |
| GroupSeatLevelDiscount | Issue Tickets reserved seat | Discount | None |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared group and select Level A. | BenefitConfiguration | Level A is available with the mapped group and selected-level benefits. |
| Add Level A and complete any required location or seat selection. | BenefitConfiguration | Non-seating configurations continue directly; reserved configurations retain the chosen permission. |
| Complete member information and payment for Customer A. | Customer A; payment fixture | One Level A purchase completes. |
| Purchase Level B for Customer B. | Customer B; payment fixture | One Level B purchase completes without receiving Level A-only benefits. |
| Open both member records and compare their benefits. | Customer A; Customer B | Each member has every applicable group and selected-level benefit exactly once; Level A-only benefits do not appear on Level B. |
| Compare both levels' inventory and orders with the starting values. | Starting inventory | Each level decreases once and each customer has exactly one correctly attributed membership. |

### TC-13: Core - Checkout - Memberships - Purchase seasonal memberships with non-seating benefits

**Qase case:** 5041

**Description:** Verifies that supported public and seller clients can purchase a Seasonal membership with Event Scan Access, Discount, Daily Scan Access, or GA Issue Tickets without opening reserved seating. Mobile-app and POS clean sales remain in TC-1; TC-4 owns reserved-location and reserved-seat seasonal purchases.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Preconditions:**

* A published Seasonal group has an on-sale renewal season and an available level.
* EventScanAccess, Discount, and DailyScanAccess are group-level always-available benefits.
* IssueTicketGA is attached to the group and on-sale season with no reserved space.
* Record the expected season, expiry, price, and starting inventory.

**Postconditions:**

* Every run creates one completed order and membership without a seating selection.
* The correct benefit, season, expiry, purchase source, and inventory result are saved.
* Clean up only the disposable order.

**Tags:** checkout, memberships

**Parameters:**
BenefitContains: EventScanAccess, Discount, DailyScanAccess, IssueTicketGA

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a supported purchase surface and select the Seasonal membership. | BenefitContains | The on-sale season and available level load on the intended client. |
| Add the membership. | BenefitContains | Checkout continues without opening seating or requesting a reserved location/seat. |
| Complete required customer/member information and payment. | Customer; payment fixture | One Seasonal membership purchase completes. |
| Open the transaction, order, and customer membership. | BenefitContains | Exactly one purchase exists with the correct source, benefit, season, expiry, and inventory decrement; no reserved permission is attached. |

### TC-14: Core - Renewals - Renew non-seasonal memberships across recurring expiry windows

**Qase case:** 1201
**Qase suite:** 610
**Description:** Enhances the existing non-seasonal renewal-purchase case to verify Monthly, Every3Months, Every6Months, and Yearly renewals under SoftWindow and HardWindow configuration. This remains a renewal checkout test; account-only display behavior remains in suite 1014.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* A renewable non-seasonal membership exists for each RenewalFrequency and RenewalWindow value.
* The member is expired or inside the allowed renewal window and has no reserved-seating benefit.
* Record the current expiry, renewal reference timestamp, venue timezone, and exact expected new expiry before purchase.

**Postconditions:**

* One renewal order exists per run and the original member/customer identity is preserved.
* The renewed member expiry equals the expected rolling duration or venue-local hard boundary.
* The order, invoice, and member history identify one renewal without a duplicate member.

**Tags:** renewals, memberships, checkout

**Parameters:**
RenewalFrequency: Monthly, Every3Months, Every6Months, Yearly
RenewalWindow: SoftWindow, HardWindow

| RenewalWindow | Expected expiry basis |
| --- | --- |
| SoftWindow | Add the configured renewal duration to the purchase reference timestamp. |
| HardWindow | Use the frequency's venue-local hard boundary and store the equivalent UTC timestamp. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the expired or renewal-eligible non-seasonal membership through a supported renewal entry point. | RenewalFrequency; RenewalWindow | The correct member, level, current expiry, and Renew action are available without a seating step. |
| Start renewal and review the basket. | Member; renewal fixture | The basket contains the existing member and correct membership level once. |
| Complete renewal checkout using an allowed payment method. | Payment fixture | One renewal purchase succeeds and confirmation is shown. |
| Open the renewed member and related employee-visible order details. | Customer; venue timezone | The new expiry follows RenewalWindow for the selected frequency without a one-day or timezone shift. |
| Review the order, invoice, and member history. | Renewal order | The renewal is recorded once and no duplicate customer or member exists. |

### TC-15: Core - Checkout - Memberships - Purchase OneTime memberships with no or future custom expiry

**Qase case:** 5042

**Description:** Verifies successful OneTime membership purchase with no custom expiry and with a future custom expiry. Past-expiry purchase prevention remains in Qase 4934.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:**

* A published OneTime non-seating group and available level exist for CustomExpiry.
* The group has an Event Scan Access benefit and known venue timezone.
* Record price and starting inventory before each run.

**Postconditions:**

* Each run creates one order and membership with the expected expiry result.
* Clean up only successful disposable orders.

**Tags:** memberships, checkout, edge-case

**Parameters:**
CustomExpiry: None, Future

| CustomExpiry | Expected result |
| --- | --- |
| None | Purchase succeeds and the member has no custom expiry date. |
| Future | Purchase succeeds and the member expiry matches the configured future timestamp. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the OneTime membership through a supported purchase surface. | CustomExpiry | The membership is available with the configured custom-expiry state. |
| Add the level and complete payment. | Customer; payment fixture | One purchase completes. |
| Open the transaction, order, and employee-visible member details. | Customer; CustomExpiry | None has no custom expiry and Future matches the configured timestamp; account display behavior is not evaluated in this purchase case. |

### TC-18: Core - Checkout - Memberships - Prevent purchase outside membership sale window

**Qase case:** 4934
**Description:** Verifies that an expired OneTime membership and a Seasonal membership with no season on sale cannot be purchased through any supported purchase surface. It preserves the existing Platform/View group and adds Electron, POS, and React Native rows.

Grouped parameter — preserve existing rows and add the missing rows in the Qase UI:

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| POS | Tablet |
| React Native Public | Mobile |

**Preconditions:**

* A fixture exists for SaleWindowRule on the selected Platform/View row.
* OneTimeCustomExpiryPast has a custom expiry in the past.
* SeasonalNoSeasonOnSale has no current season on sale because sales have not started or have ended.
* Record starting membership inventory before each run.

**Postconditions:**

* No successful payment, transaction, order, or member record exists for the blocked attempt.
* Inventory is unchanged until the sale-window configuration is corrected.

**Tags:** checkout, memberships, edge-case

**Parameters:**
SaleWindowRule: OneTimeCustomExpiryPast, SeasonalNoSeasonOnSale

| SaleWindowRule | Fixture | Expected boundary |
| --- | --- | --- |
| OneTimeCustomExpiryPast | OneTime group with custom expiry in the past | Membership is unavailable or rejected as no longer for sale. |
| SeasonalNoSeasonOnSale | Seasonal group with no current season on sale | Membership is unavailable or rejected because there is no purchasable season. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the membership purchase surface for the grouped Platform/View row. | Platform; View; SaleWindowRule | The surface loads, but the membership is unavailable or clearly blocked from a valid purchase. |
| Attempt to select or add the unavailable level. | SaleWindowRule | The UI blocks the action or shows the supported unavailable response. |
| If the level was already in a basket before the window changed, attempt to continue and pay. | Existing basket fixture | Checkout revalidates the membership and blocks before successful payment or order completion. |
| Inspect payment, transaction, order, member, and inventory state. | Customer; fixture | No successful payment, transaction, order, or membership exists and inventory is unchanged. |
| Correct the sale window and retry once with a valid quantity. | Corrected fixture | The membership becomes available and can proceed, proving the original block was tied to SaleWindowRule. |

### TC-20: Core - Checkout - Memberships - Apply always-available and current-season benefits together

**Qase case:** 5043

**Description:** Verifies that a Seasonal membership receives the valid union of its always-available group or selected-level benefit and its current-season Issue Tickets benefit. It also proves that a sibling-level benefit and a past-season benefit are not granted.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* A published Seasonal group has a current on-sale season, a past season, and two available sibling levels.
* BenefitConfiguration is prepared exactly as mapped below; every seasonal Issue Tickets benefit belongs to the group and its season.
* The past season has a separate Issue Tickets benefit that must not be granted.
* Record current-season expiry, inventory, and available location/seat when applicable.

**Postconditions:**

* One order and membership exist with exactly the expected always-available and current-season benefits.
* No past-season or sibling-level benefit is granted.
* Clean up only the disposable completed order.

**Tags:** memberships, checkout

**Parameters:**
BenefitConfiguration: GroupEventSeasonGA, GroupDiscountSeasonLocation, GroupDailySeasonSeat, LevelEventSeasonGA, LevelDiscountSeasonLocation, LevelDailySeasonSeat, SiblingLevelSeasonGA

| BenefitConfiguration | Always-available setup | Current-season setup |
| --- | --- | --- |
| GroupEventSeasonGA | Group Event Scan Access | Group + current season Issue Tickets; no space |
| GroupDiscountSeasonLocation | Group Discount | Group + current season Issue Tickets; reserved location |
| GroupDailySeasonSeat | Group Daily Scan Access | Group + current season Issue Tickets; reserved seat |
| LevelEventSeasonGA | Selected-level Event Scan Access | Group + current season Issue Tickets; no space |
| LevelDiscountSeasonLocation | Selected-level Discount | Group + current season Issue Tickets; reserved location |
| LevelDailySeasonSeat | Selected-level Daily Scan Access | Group + current season Issue Tickets; reserved seat |
| SiblingLevelSeasonGA | Event Scan Access exists only on the unselected sibling | Group + current season Issue Tickets; no space |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Seasonal membership and select the prepared level. | BenefitConfiguration | The on-sale season, correct level, price, and applicable seating path load. |
| Add the membership, selecting the prepared location or seat when required. | Current-season fixture | GA continues without seating; location/seat selection is retained for the matching current-season benefit. |
| Complete required member information and payment. | Customer; payment fixture | One membership purchase completes. |
| Open the customer membership and its benefits. | Customer; BenefitConfiguration | The member has the expected always-available benefit when it belongs to the group or selected level plus the current-season Issue Tickets benefit exactly once. |
| Compare the member with the sibling-level and past-season fixtures. | Sibling level; past season | The sibling-only benefit and past-season Issue Tickets benefit are absent; expiry and inventory match the current season. |

### TC-21: Core - Checkout - Memberships - Preserve multiple Issue Tickets benefit fulfillment

**Qase case:** 5044

**Description:** Verifies that a membership group with multiple Issue Tickets benefits fulfills every configured GA, reserved-location, or reserved-seat entitlement exactly once and keeps each ticket/location/seat mapped to the correct benefit and member.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* A published Yearly group and available level exist for IssueTicketConfiguration.
* Every Issue Tickets benefit is group-scoped; space-backed benefits have distinct available permissions so their mappings can be identified.
* Record price, inventory, benefit identifiers, batches, and available locations/seats.

**Postconditions:**

* One order and membership exist with the exact expected number of Issue Tickets benefit records.
* Each issued ticket or reserved location/seat is owned once and points to the correct benefit/member.
* Clean up only the disposable completed order.

**Tags:** memberships, checkout, assigned-seating

**Parameters:**
IssueTicketConfiguration: TwoGA, TwoReservedLocations, TwoReservedSeats, GAPlusReservedSeat, ReservedLocationPlusReservedSeat

| IssueTicketConfiguration | Group benefit setup | Expected fulfillment |
| --- | --- | --- |
| TwoGA | Two no-space Issue Tickets benefits with distinct batches | One configured GA issuance per benefit; no seating prompt. |
| TwoReservedLocations | Two Issue Tickets benefits with distinct location permissions | One selected location remains mapped to each benefit. |
| TwoReservedSeats | Two Issue Tickets benefits with distinct seat permissions | One selected seat remains mapped to each benefit. |
| GAPlusReservedSeat | One GA and one reserved-seat Issue Tickets benefit | GA issuance plus one correctly mapped seat. |
| ReservedLocationPlusReservedSeat | One reserved-location and one reserved-seat Issue Tickets benefit | One correctly mapped location and one correctly mapped seat. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared group and select its membership level. | IssueTicketConfiguration | The correct level and required GA/seating flow load. |
| Add the membership and select one prepared permission for every space-backed benefit. | Benefit and permission identifiers | Each required location/seat can be selected without substituting another benefit's permission. |
| Complete member information and payment. | Customer; payment fixture | One membership purchase completes. |
| Open the order and customer membership. | Customer; IssueTicketConfiguration | The expected GA tickets and reserved locations/seats are present exactly once. |
| Match each fulfilled entitlement to its source benefit and member. | Recorded benefit identifiers | Every ticket/location/seat maps to the correct benefit and member; there are no missing, duplicate, or cross-benefit assignments. |

### TC-22: Core - Checkout - Memberships - Purchase a membership with no benefits

**Qase case:** 5045

**Description:** Verifies that a membership group with no group-level or level-level benefits remains purchasable for representative non-seasonal and Seasonal configurations. The membership itself is the purchased entitlement; the absence of benefits must not block fulfillment or create phantom benefit records.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |
| POS | Tablet |

**Preconditions:**

* A published group and available level exist for RenewalFrequency with no group or level benefits.
* The Seasonal fixture has a current on-sale season; the Yearly fixture uses its valid default renewal configuration.
* A customer, one supported payment fixture, and starting inventory are recorded.

**Postconditions:**

* Each run creates one transaction, one order, and one membership with the expected expiry and inventory decrement.
* The member has no access, discount, or Issue Tickets benefit records.
* Clean up only the disposable completed order.

**Tags:** memberships, checkout, box-office

**Parameters:**
RenewalFrequency: Yearly, Seasonal

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the no-benefit membership through a supported purchase surface. | RenewalFrequency | The group and available level are visible; Seasonal shows its on-sale season. |
| Select the level and continue. | RenewalFrequency | Checkout proceeds without a seating prompt or a benefit-related restriction. |
| Enter required customer/member information and complete the supported payment. | Customer; payment fixture | One successful membership purchase completes. |
| Open the transaction, order, and customer membership. | Customer; RenewalFrequency | Exactly one transaction, order, and membership exist with the expected level, expiry, and inventory decrement. |
| Inspect the member's generated benefits. | Customer membership | No access, discount, or Issue Tickets benefit records were created. |

### TC-23: Core - User - Memberships - Verify Renew button is hidden when membership cannot be renewed

**Qase case:** 160
**Description:** Verifies that account membership details do not show a Renew action when the membership state or group configuration does not allow renewal. This adds RenewalsDisabled to the existing non-renewable states without duplicating successful renewal coverage.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Preconditions:**

* A logged-in customer has one membership matching MembershipRenewalState.
* ActiveNotEligible is active but outside its allowed renewal window.
* ExpiredOneTimeOrLifetime uses a non-renewable OneTime or Lifetime group.
* RenewalsDisabled is otherwise eligible, but renewals are turned off for its recurring or Seasonal group.
* A separate renewable recurring or Seasonal membership is available as a control.

**Postconditions:**

* No basket, payment, order, member, or inventory change is created by the non-renewable checks.
* No test data changes are required.

**Tags:** memberships, profile

**Parameters:**
MembershipRenewalState: ActiveNotEligible, ExpiredOneTimeOrLifetime, RenewalsDisabled

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Account → Memberships and select the fixture for MembershipRenewalState. | MembershipRenewalState | The membership detail shows the correct membership, status, and expiry information. |
| Review the available actions. | MembershipRenewalState | Renew or Renew membership is not shown. |
| Review the remaining membership details and actions. | MembershipRenewalState | Non-renewal content remains visible and usable as configured. |
| Return to Memberships and open the renewable control membership. | Renewable control | Renew is shown for the control, proving the page is not generally hiding the action. |
| Repeat the selected non-renewable state on its supported mobile view. | Platform; View | The Renew action remains hidden and no renewal basket or order is created. |

### TC-24: Core - Checkout - Memberships - Enforce membership-level purchase limits

**Qase case:** 5046

**Description:** Verifies that a finite non-seating membership-level purchase limit allows the boundary quantity and rejects the next quantity, while a null/unlimited limit allows a quantity above the default limit. Assigned-seating maximum coverage remains in Qase 2858.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |
| POS | Tablet |

**Preconditions:**

* A published Yearly non-seating group has an available level with inventory of at least 20.
* Finite scenarios set the level purchase limit to 2; UnlimitedAboveDefault sets it to null/unlimited.
* FiniteAtLimit uses quantity 2, FiniteAboveLimit uses quantity 3, and UnlimitedAboveDefault uses quantity 9.
* Record price and starting inventory before each run.

**Postconditions:**

* FiniteAtLimit and UnlimitedAboveDefault create exactly the requested number of members and one order.
* FiniteAboveLimit creates no successful payment, order, member, or inventory change.
* Clean up only successful disposable orders.

**Tags:** memberships, checkout, edge-case

**Parameters:**
LimitScenario: FiniteAtLimit, FiniteAboveLimit, UnlimitedAboveDefault

| LimitScenario | Purchase limit | Requested quantity |
| --- | --- | --- |
| FiniteAtLimit | 2 | 2 |
| FiniteAboveLimit | 2 | 3 |
| UnlimitedAboveDefault | Null/unlimited | 9 |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared membership through a supported purchase surface. | LimitScenario | The available level and applicable quantity control are shown. |
| Set the requested quantity for LimitScenario and attempt to add it. | Requested quantity | FiniteAtLimit and UnlimitedAboveDefault are accepted; FiniteAboveLimit is rejected with the supported purchase-limit message. |
| For accepted scenarios, provide distinct required member information and complete payment. | Member fixtures; payment fixture | One order completes for the exact requested quantity; the rejected scenario never reaches successful payment. |
| Inspect payment, transaction, order, member, and inventory state. | LimitScenario | Accepted runs have one transaction/order, the requested number of distinct members, and the matching inventory decrement; the rejected run has none and inventory is unchanged. |
| Reopen the membership level. | LimitScenario | Remaining availability reflects only successful purchases and the configured finite/unlimited limit remains unchanged. |

## Required Configuration Execution Set

Execute every declared parameter row. After duplicate absorption and removal of configuration-only drafts, the plan contains 666 required surface/parameter executions before the existing state-specific controls are added:

1. TC-1: 2 supported surface rows.
2. TC-2: 8 grouped Platform/View rows × 6 RenewalFrequency values × 6 BenefitContains values = 288 configurations.
3. TC-3: 8 grouped Platform/View rows × 6 RenewalFrequency values × 6 BenefitContains values = 288 configurations.
4. TC-4: 2 IssueTicket values × 2 InfoCollect values = 4 configurations.
6. TC-6: 5 VisibilityProfile values.
7. TC-7: 3 BuyerState values.
8. TC-8: 2 RecoveryOutcome values.
9. TC-9: 2 UpgradePath values × 2 SourceState values × 3 TargetState values = 12 configurations.
11. TC-11: 10 valid BenefitConfiguration profiles.
13. TC-13: 4 BenefitContains values.
14. TC-14: 4 RenewalFrequency values × 2 RenewalWindow values = 8 configurations.
15. TC-15: 2 CustomExpiry values.
18. TC-18: 6 grouped Platform/View rows × 2 SaleWindowRule values = 12 configurations.
20. TC-20: 7 valid BenefitConfiguration profiles.
21. TC-21: 5 IssueTicketConfiguration profiles.
22. TC-22: 2 RenewalFrequency values.
23. TC-23: 3 grouped Platform/View rows × 3 MembershipRenewalState values = 9 configurations.
24. TC-24: 3 LimitScenario values.

Also retain existing state-specific controls: Qase 160, 388, 431, 1173, 1177, 1190, 1196, 1199, 1201, 1255, 1256, 2858, 2868, 3138, 4020, 4030, 4033, 4917, and 4986. TC-14 updates 1201, TC-18 updates 4934, and TC-23 updates 160. Qase 2506 remains unchanged because this plan does not add configuration-only tests.

## Suggested Automated Coverage

- Extend `tests/core/checkout/memberships/checkout-memberships.test.ts` with the expanded TC-2/TC-3 renewal-frequency and benefit matrices, including seat retention, POS restriction, expiry, inventory, and member-identity assertions.
- Add the shared TC-1 Seasonal non-seating sale to MobileBoxOffice Mobile and POS coverage.
- Add origin adapters for `/pass/{slug}` and organizer profile to the shared membership checkout journey.
- Add public/seller visibility API and UI matrices for group plus level visibility.
- Add a two-member checkout with distinct answers and barcodes.
- Add failed-payment/retry coverage that asserts no member before success and one member after retry.
- Add ticket-to-membership and membership-to-membership review upgrades, including source replacement, recalculated total, and final membership ownership.
- Add negative upgrade assertions for seated sources, sold-out targets, and assigned-seating destinations; report the assigned-seating destination result as the documented product risk if the option remains actionable.
- Extend Qase 1201 automation with recurring soft/hard renewal-window assertions; keep OneTime custom-expiry first-purchase and Lifetime first-purchase assertions in suite 608 coverage.
- Add effective-benefit assertions for group inheritance, level addition, current/past season filtering, no-benefit purchase, multiple Issue Tickets mappings, and sibling isolation.
- Add member-record and seat/location fulfillment assertions to the existing public and Box Office group-sale journeys.
- Add the full sale-window surface matrix from TC-18 while preserving the existing grouped parameter structure in Qase.
- Add the RenewalsDisabled state to account renewal-action coverage; successful renewals remain in suite 610.
- Add finite-at-limit, finite-above-limit, and unlimited membership quantity assertions across public, seller, and POS baskets.
- Add backend integration coverage for duplicate/delayed purchase-finalization events; manual provider simulation remains deferred.
- Preserve assigned-seating coverage in `tests/core/assigned-seating/membership/` and attraction coverage in `tests/core/attraction-events/non-calendar-attraction.helpers.ts`.

## Open Questions

No question blocks the approved Qase implementation. The final readback confirms all 6 RenewalFrequency × 6 BenefitContains combinations in TC-2/TC-3, all 2 IssueTicket × 2 InfoCollect combinations in TC-4, and all 4 RenewalFrequency × 2 RenewalWindow combinations in TC-14/Qase 1201. TC-9 includes the assigned-seating destination as an intended negative configuration; execution may expose the frontend TODO as a product gap, so record the observed result without treating the unexecuted risk as a confirmed defect. Qase 4030/4033 remain a separate assertion-only proposal with no complete update body and were not changed. Before any further Qase write, confirm its exact scope. POS/Tablet vocabulary is retained because it already exists in live Qase cases 2525, 3486, 4083, and 4917 even though the current writing-rules platform list does not name POS.

## Sources Reviewed

- [[00 Start Here/World-Class Software Quality Standard]]
- [[01 Repositories/Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend]]
- [[01 Repositories/QA Automation - showpass-playwright]]
- [[06 Prompts/Showpass QA Test Case Generator]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- [[05 Tooling/qasectl]]
- Qase SPT bulk export: 1,597 cases and project-wide duplicate/path matches; follow-up read of suite 608's 18 cases, suite 610's 8 cases, and suite 1014's 6 cases completed on 2026-08-17; no writes performed.
- Backend: `apps/memberships/models.py`, `apps/memberships/mixins.py`, `apps/memberships/services/member_access_generator.py`, `apps/memberships/services/membership_validation.py`, `apps/memberships/tests/test_membership_purchase.py`, `apps/memberships/tests/test_membership_issue_ticket_purchase.py`, `apps/memberships/tests/seasonal_benefit_tests/test_seasonal_benefit_purchases.py`, `apps/memberships/tests/grouped_ig_member_tests/test_grouped_members_renewals.py`, `apps/memberships/tests/membership_shipping_tests/test_membership_shipping_purchase.py`, `apps/memberships/managers.py`, `apps/memberships/api/public/serializers.py`, `apps/memberships/api/public/viewsets.py`, `apps/memberships/api/venue_based/serializers.py`, `apps/tickets/tests/test_upgrade_paths.py`, and membership constants.
- Frontend: shared membership purchase flow and detail components; `/m`/`/pass` detail adapter; organizer profile membership cards; attraction membership modal; Widget membership route; account/Box Office renewal modal; POS restriction helper; checkout add-on eligibility; `packages/core/src/shared/modules/basket/domain/services/BasketUpgradesService.ts`; basket review upgrade-offer components.
- Playwright: membership checkout, payment-processor, assigned-seating, Widget launch, and non-calendar attraction membership flows.
