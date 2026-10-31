-- Read-only comparison; source-checked. User returned both rows on October 30, 2026.
-- Not executed on Showpass data by the agent.
-- These are INVOICE ITEM IDs, not Invoice IDs.
-- Working item 25786569 belongs to reported Invoice 17789827.
-- That result established failing item 26523743 belongs to Invoice 18189103.
-- The NULL reported ID below preserves the original query's initially unknown input;
-- it does not mean the actual parent returned in invoice_id is unknown.
-- Current saved values do not establish historical values at the Sentry event time.
-- NULL means unavailable; it is deliberately not replaced with zero.
WITH targets (comparison, invoice_item_id, reported_invoice_id) AS (
    VALUES ('working_second_exchange_source', 25786569::bigint, 17789827::bigint),
           ('failing_second_exchange_source', 26523743::bigint, NULL::bigint)
)
SELECT
    target.comparison,
    target.invoice_item_id AS requested_invoice_item_id,
    ii.id AS invoice_item_id,
    ii.invoice_id AS invoice_id,
    target.reported_invoice_id,
    ii.invoice_id = target.reported_invoice_id AS matches_reported_invoice,
    i.transaction_id AS order_reference,
    ii.venue_id AS venue_id,
    v.name AS venue_name,
    ii.description,
    ii.created AS invoice_item_created_at,
    ii.updated AS invoice_item_updated_at,
    ii.quantity,
    ii.uses_added_fee_calculation,
    ii.ticket_type_id,
    tt.is_bundle AS ticket_type_is_bundle,
    tt.is_redeemable AS ticket_type_is_redeemable_now,
    tt.internal_dollar_fees_parent_only AS parent_only_internal_dollar_fees_now,
    v.exchange_tickets_fees_type AS web_exchange_fee_policy_now,
    v.exchange_tickets_fees_type_box_office AS box_office_exchange_fee_policy_now,
    v.package_revenue_realization_type AS package_revenue_mode_now,
    ii.parent_ticket_invoice_item_id,
    ii.is_sub_ticket,
    ii.is_itemized,
    ii.credit_applied,
    ii.credit_applied_stat,
    ii.final_amount,
    ii.final_amount_stat,
    ii.amount_earned,
    ii.amount_earned_stat,
    ii.amount_company_earned,
    ii.amount_company_earned_stat,
    ii.amount_refunded,
    ii.amount_refunded_stat,
    ii.credit_amount_refunded,
    ii.credit_amount_refunded_stat,
    ii.amount_credit_issued,
    ii.amount_credit_issued_stat,
    ii.credit_applied_stat - ii.credit_applied AS calculated_credit_difference,
    ii.amount_earned_stat - ii.amount_earned AS calculated_earnings_difference
FROM targets AS target
LEFT JOIN financials_invoiceitem AS ii ON ii.id = target.invoice_item_id
LEFT JOIN financials_invoice AS i ON i.id = ii.invoice_id
LEFT JOIN venues_venue AS v ON v.id = ii.venue_id
LEFT JOIN tickets_tickettype AS tt ON tt.id = ii.ticket_type_id
ORDER BY target.invoice_item_id;
