

```
SELECT ii.id,
       ii.description,
       ii.created,
       ii.type,
       ii.payment_type,
       CASE ii.payment_type
           WHEN 1 THEN 'Cash'
           WHEN 2 THEN 'Credit'
           WHEN 3 THEN 'Interac Online'
           WHEN 4 THEN 'Complimentary'
           WHEN 5 THEN 'Free'
           WHEN 6 THEN 'Bundled'
           WHEN 7 THEN 'Transferred'
           WHEN 8 THEN 'Direct Deposit'
           WHEN 9 THEN 'Other'
           WHEN 10 THEN 'Payment Plan'
           WHEN 11 THEN 'Full User Credit Payment'
           WHEN 12 THEN 'Full Exchange Credit Payment'
           WHEN 13 THEN 'Afterpay'
           WHEN 14 THEN 'Affirm'
           WHEN 15 THEN 'Auto Generated'
           ELSE 'Unknown'
       END AS payment_type_label,
       ii.quantity,
       ii.discounts,
       ii.final_amount_stat,
       ii.amount_earned_stat,
       ii.amount_company_earned_stat,
       ii.amount_paid_stat
FROM financials_invoiceitem ii
WHERE ii.venue_id = 2063
ORDER BY ii.created DESC
LIMIT 20;
```


```
SELECT ii.id,
       ii.description,
       ii.invoice_id,
       ii.created,
       ii.type,
       CASE ii.payment_type
           WHEN 1 THEN 'Cash'
           WHEN 2 THEN 'Credit'
           WHEN 3 THEN 'Interac Online'
           WHEN 4 THEN 'Complimentary'
           WHEN 5 THEN 'Free'
           WHEN 6 THEN 'Bundled'
           WHEN 7 THEN 'Transferred'
           WHEN 8 THEN 'Direct Deposit'
           WHEN 9 THEN 'Other'
           WHEN 10 THEN 'Payment Plan'
           WHEN 11 THEN 'Full User Credit Payment'
           WHEN 12 THEN 'Full Exchange Credit Payment'
           WHEN 13 THEN 'Afterpay'
           WHEN 14 THEN 'Affirm'
           WHEN 15 THEN 'Auto Generated'
           ELSE CONCAT('Unknown: ', ii.payment_type)
       END AS payment_type,

       ii.discount_id,
       d.code AS discount_code,
       ii.num_discounts_applied,
       ii.quantity,
       ii.quantity_included_in_total,
       ii.is_itemized,
       ii.sale_invoice_item_id,

       ii.items_total_amount_stat,
       ii.discounts_stat,
       ii.tax_stat,
       ii.shipping_cost_stat,
       ii.service_charges_stat,
       ii.tip_charges_stat,
       ii.company_charges_stat,
       ii.cc_charges_stat,
       ii.discovery_charges_stat,
       ii.resale_charges_stat,
       ii.kickbacks_stat,
       ii.cash_kickbacks_stat,

       ii.amount_earned_stat,
       (
           COALESCE(ii.items_total_amount_stat, 0)
         + COALESCE(ii.discounts_stat, 0)
         + COALESCE(ii.tax_stat, 0)
         + COALESCE(ii.shipping_cost_stat, 0)
         + COALESCE(ii.service_charges_stat, 0)
         + COALESCE(ii.tip_charges_stat, 0)
         - COALESCE(ii.company_charges_stat, 0)
         - COALESCE(ii.cc_charges_stat, 0)
         - COALESCE(ii.discovery_charges_stat, 0)
         - COALESCE(ii.resale_charges_stat, 0)
       ) AS recalculated_amount_earned_stat,

       ii.amount_earned_stat - (
           COALESCE(ii.items_total_amount_stat, 0)
         + COALESCE(ii.discounts_stat, 0)
         + COALESCE(ii.tax_stat, 0)
         + COALESCE(ii.shipping_cost_stat, 0)
         + COALESCE(ii.service_charges_stat, 0)
         + COALESCE(ii.tip_charges_stat, 0)
         - COALESCE(ii.company_charges_stat, 0)
         - COALESCE(ii.cc_charges_stat, 0)
         - COALESCE(ii.discovery_charges_stat, 0)
         - COALESCE(ii.resale_charges_stat, 0)
       ) AS amount_earned_delta,

       ii.amount_company_earned_stat,
       ii.amount_paid_stat,
       ii.final_amount_stat

FROM financials_invoiceitem ii
LEFT JOIN financials_discount d
       ON d.id = ii.discount_id
WHERE ii.venue_id = 2063
ORDER BY ii.created DESC
LIMIT 20;
```


```

SELECT ii.id AS invoice_item_id,
       ii.invoice_id,
       ii.created,
       ii.description,
       tig.id AS item_group_id,
       tig.basket_id,
       tig.quantity AS item_group_quantity,
       tig.display_quantity AS item_group_display_quantity,
       tig.is_itemized_partial_apply_to_each_discounted_split,
       ii.event_id,
       ii.ticket_type_id,
       ii.quantity AS invoice_item_quantity,
       ii.quantity_included_in_total,
       ii.price AS invoice_item_price,
       ii.is_itemized,
       ii.discount_id AS invoice_item_discount_id,
       d.code AS discount_code,
       d.apply_method AS discount_apply_method,
       d.amount AS discount_amount_config,
       d.percentage AS discount_percentage_config,
       ii.discount_rule_id AS invoice_item_discount_rule_id,
       dr.amount AS discount_rule_amount,
       dr.percentage AS discount_rule_percentage,
       ii.num_discounts_applied AS invoice_item_num_discounts_applied,
       ii.discounts_stat,
       ii.payment_type,
       CASE ii.payment_type
           WHEN 1 THEN 'Cash'
           WHEN 2 THEN 'Credit'
           WHEN 3 THEN 'Interac Online'
           WHEN 4 THEN 'Complimentary'
           WHEN 5 THEN 'Free'
           WHEN 6 THEN 'Bundled'
           WHEN 7 THEN 'Transferred'
           WHEN 8 THEN 'Direct Deposit'
           WHEN 9 THEN 'Other'
           WHEN 10 THEN 'Payment Plan'
           WHEN 11 THEN 'Full User Credit Payment'
           WHEN 12 THEN 'Full Exchange Credit Payment'
           WHEN 13 THEN 'Afterpay'
           WHEN 14 THEN 'Affirm'
           WHEN 15 THEN 'Auto Generated'
           ELSE CONCAT('Unknown: ', ii.payment_type)
       END AS payment_type_label,
       ii.purchase_source_platform AS item_purchase_source_platform,
       inv.purchase_source_platform AS invoice_purchase_source_platform,
       b.purchase_source_platform AS basket_purchase_source_platform,
       ii.source_channel AS item_source_channel,
       inv.source_channel AS invoice_source_channel,
       ii.items_total_amount_stat,
       ii.tax_stat,
       ii.service_charges_stat,
       ii.company_charges_stat,
       ii.cc_charges_stat,
       ii.discovery_charges_stat,
       ii.resale_charges_stat,
       ii.amount_earned_stat,
       ii.amount_company_earned_stat,
       ii.amount_paid_stat,
       ii.final_amount_stat
FROM financials_invoiceitem ii
JOIN financials_invoice inv ON inv.id = ii.invoice_id
LEFT JOIN tickets_ticketitemgroup tig ON tig.invoice_item_id = ii.id
LEFT JOIN tickets_ticketbasket b ON b.id = tig.basket_id
LEFT JOIN financials_discount d ON d.id = ii.discount_id
LEFT JOIN financials_discountrule dr ON dr.id = ii.discount_rule_id
WHERE ii.venue_id = 1859
 -- AND ii.invoice_id = 123456
 -- AND d.code = 'YOURCODE'
 -- AND ii.created >= NOW() - INTERVAL '7 days'

ORDER BY ii.created DESC,
         ii.invoice_id DESC,
         ii.ticket_type_id,
         tig.id NULLS LAST,
         ii.id
LIMIT 200;

```