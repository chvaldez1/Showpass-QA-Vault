# Rewards QA Library

Use the Organizer's existing program, earning rules and reward offers to predict what a named Customer will earn or redeem. Carry the original referral, basket and order into the points history check. Treat a paid order and a points redemption as different records and verify the points ledger against the action that changed it. [[03 Test Cases/Test Cases by Feature|Test library]]

| Journey | Proof target | Saved Qase |
| --- | --- | --- |
| Rule → referral → paid order | The named program awards the right points once and the attributed user owns them. Discount and credit amounts follow the saved rule. | [SPT-5271](https://app.qase.io/case/SPT-5271) · [SPT-5273](https://app.qase.io/case/SPT-5273) |
| Waitlist purchase → points history | The completed attributed order earns points for the intended referrer. Use the existing waitlist request and its resulting order. | [SPT-5281](https://app.qase.io/case/SPT-5281) · [[03 Test Cases/Waitlists/Waitlists QA Library|Waitlists]] |
| Points → ticket or Product | The intended offer spends the correct points, affects only its stock and issues the exact item. Follow the resulting ticket into Check In when that is in scope. | [SPT-6006](https://app.qase.io/case/SPT-6006) · [SPT-6011](https://app.qase.io/case/SPT-6011) · [[03 Test Cases/Check In/check-in-qase-test-cases|Check In]] |
| Adjustment → point reversal | Match the original attributed order and selected adjustment to the points activity. | [SPT-5279](https://app.qase.io/case/SPT-5279) · [[03 Test Cases/Refunds and Protection/SPW-19666-customer-self-refunds-test-cases|Refund cases]] |

Backend ledger and redemption code lives under `apps/venues/models/rewards` and `apps/venues/services/rewards`. Frontend configuration starts under Dashboard `features/rewards`. These links identify saved definitions and source.
