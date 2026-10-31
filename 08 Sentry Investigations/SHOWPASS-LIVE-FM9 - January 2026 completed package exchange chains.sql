-- Read-only PostgreSQL query. Source-checked; NOT executed on Showpass data.
-- Finds saved A -> B -> C Package Exchange chains across ANY VENUE.
-- The second Exchange must be recorded in January 2026 (UTC).
-- The first Exchange may be older, including December 2025.
-- No incident ID, Customer or Venue parameter is required.
-- LIMIT controls returned rows, not scan cost.
-- Conservative match: source Package must be the credit's primary source item.
-- Multi-item credits anchored to another primary item can be missed.
-- Recorded times are credit-deduction creation times, not exact completion times.
-- Current bundle/itemization flags may differ from their historical values.
WITH params AS (
    SELECT TIMESTAMPTZ '2026-01-01 00:00:00+00' AS start_utc,
           TIMESTAMPTZ '2026-02-01 00:00:00+00' AS end_utc
), completed_package_exchanges AS NOT MATERIALIZED (
    SELECT spend.id AS deduction_credit_id, spend.created AS recorded_exchange_at,
           source.id AS source_invoice_item_id,
           source.invoice_id AS source_invoice_id,
           source.ticket_type_id AS source_ticket_type_id,
           source.description AS source_package,
           replacement.id AS replacement_invoice_item_id,
           replacement.invoice_id AS replacement_invoice_id,
           replacement.description AS replacement_package,
           replacement_sale.transaction_id AS replacement_order_reference,
           replacement_sale.email AS receipt_email,
           source.venue_id
    FROM financials_usercredit AS spend
    JOIN financials_invoiceitem AS source
      ON source.id = spend.exchanged_from_invoice_item_id
    -- For a deduction, generated_from_invoice_item is the replacement order line.
    JOIN financials_invoiceitem AS replacement
      ON replacement.id = spend.generated_from_invoice_item_id
    JOIN financials_invoice AS source_sale ON source_sale.id = source.invoice_id
    JOIN financials_invoice AS replacement_sale
      ON replacement_sale.id = replacement.invoice_id
     AND replacement_sale.id = spend.used_on_invoice_id
    JOIN tickets_tickettype AS source_type ON source_type.id = source.ticket_type_id
    JOIN tickets_tickettype AS replacement_type
      ON replacement_type.id = replacement.ticket_type_id
    WHERE source.venue_id = spend.venue_id
      AND replacement.venue_id = spend.venue_id
      AND spend.type = 'exchange' AND spend.amount < 0 AND spend.is_settled IS TRUE
      AND source_sale.post_purchase_completed IS TRUE
      AND replacement_sale.post_purchase_completed IS TRUE
      AND source.is_itemized IS TRUE AND replacement.is_itemized IS TRUE
      AND source_type.is_bundle IS TRUE AND replacement_type.is_bundle IS TRUE
      AND source.is_sub_ticket IS FALSE AND replacement.is_sub_ticket IS FALSE
      AND source.sale_invoice_item_id IS NULL AND replacement.sale_invoice_item_id IS NULL
      -- A credit preview, expired grant or unused credit alone is not completion.
      AND EXISTS (
          SELECT 1 FROM financials_usercredit AS credit_grant
          WHERE credit_grant.generated_from_invoice_item_id = source.id
            AND credit_grant.exchanged_from_invoice_id = source.invoice_id
            AND credit_grant.used_on_invoice_id = replacement.invoice_id
            AND credit_grant.type = 'exchange' AND credit_grant.amount > 0
            AND jsonb_typeof(credit_grant.exchanged_ticket_item_ids) = 'array'
            AND credit_grant.exchanged_ticket_item_ids <> '[]'::jsonb
      )
      AND EXISTS (
          SELECT 1 FROM financials_invoiceitem AS adjustment_item
          JOIN financials_invoice AS adjustment
            ON adjustment.id = adjustment_item.invoice_id
          WHERE adjustment_item.sale_invoice_item_id = source.id
            AND adjustment.sale_invoice_id = source.invoice_id
            AND adjustment.type = 805 -- INVOICE_TYPE_EXCHANGE_ADJUSTMENT
      )
)
SELECT second_exchange.recorded_exchange_at AS second_exchange_recorded_at_utc,
       first_exchange.recorded_exchange_at AS first_exchange_recorded_at_utc,
       venue.id AS venue_id, venue.name AS venue_name,
       first_exchange.source_invoice_id AS original_invoice_id,
       first_exchange.source_invoice_item_id AS original_invoice_item_id,
       second_exchange.source_invoice_id AS first_replacement_invoice_id,
       second_exchange.source_invoice_item_id AS first_replacement_invoice_item_id,
       second_exchange.replacement_invoice_id AS second_replacement_invoice_id,
       second_exchange.replacement_invoice_item_id AS second_replacement_invoice_item_id,
       second_exchange.replacement_order_reference AS second_replacement_order_reference,
       first_exchange.source_package AS original_package,
       second_exchange.source_package AS first_replacement_package,
       second_exchange.replacement_package AS second_replacement_package,
       second_exchange.receipt_email,
       first_exchange.deduction_credit_id AS first_deduction_credit_id,
       second_exchange.deduction_credit_id AS second_deduction_credit_id
FROM completed_package_exchanges AS second_exchange
JOIN completed_package_exchanges AS first_exchange
  ON first_exchange.replacement_invoice_item_id = second_exchange.source_invoice_item_id
 AND first_exchange.recorded_exchange_at < second_exchange.recorded_exchange_at
 AND first_exchange.venue_id = second_exchange.venue_id
CROSS JOIN params AS p
JOIN venues_venue AS venue ON venue.id = second_exchange.venue_id
WHERE second_exchange.recorded_exchange_at >= p.start_utc
  AND second_exchange.recorded_exchange_at < p.end_utc
ORDER BY second_exchange.recorded_exchange_at DESC,
         second_exchange.deduction_credit_id DESC,
         first_exchange.recorded_exchange_at DESC
LIMIT 10;
