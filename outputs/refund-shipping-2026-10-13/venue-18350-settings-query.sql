-- Read only. Drafted from local backend source; not executed against any database.
-- Selected Venue settings for the Event/TT setup. No credentials or customers.
-- Source IDs are lookup references; never reuse them as local relationship IDs.
-- Related fee rules, module usages and feature flags are not included here.
SELECT
    v.id AS venue_id,
    v.name AS organization_name,
    v.parent_venue_id,
    v.currency,
    v.timezone,
    v.street_name,
    v.city,
    v.province,
    v.postal_code,
    v.country,
    v.modules_enabled,
    v.pricing_tier,
    v.fee_structure,
    v.tax_on_fees,
    v.allow_shipping,
    v.allowed_shipping_countries,
    v.blocked_shipping_regions,
    v.shipping_quantity_limit_enabled,
    v.shipping_quantity_limit,
    v.allow_delivery_ticket_transfers,
    v.barcode_delivery,
    v.barcode_delivery_delay,
    v.ticket_transfers_enabled,
    v.all_in_pricing_is_enabled,
    v.allow_recurring_events,
    v.package_revenue_realization_type
FROM venues_venue AS v
WHERE v.id = 18350
ORDER BY v.id;
