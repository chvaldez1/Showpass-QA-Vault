

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


