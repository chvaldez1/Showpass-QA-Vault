-- Read-only PostgreSQL diagnostic. Run in the affected environment.
-- Add the working ticket-type ID to this list for a comparison.
WITH selected_ticket_types (id) AS (
    VALUES (1627711)
), rollout AS (
    SELECT EXISTS (
        SELECT 1
        FROM waffle_switch
        WHERE name = 'enable_force_public_sold_out'
          AND active IS TRUE
    ) AS force_public_sold_out_enabled
)
SELECT
    tt.id AS ticket_type_id,
    tt.name AS ticket_type_name,
    tt.venue_id,
    venue.name AS venue_name,
    tt.event_id,
    event.name AS event_name,
    event.slug AS event_slug,
    tt.public_sold_out AS saved_public_sold_out,
    tt.base_inventory_id,
    inventory.sold_out AS actual_inventory_sold_out,
    rollout.force_public_sold_out_enabled,
    CASE WHEN inventory.id IS NOT NULL THEN
        inventory.sold_out
        OR (
            rollout.force_public_sold_out_enabled
            AND COALESCE(tt.public_sold_out, FALSE)
        )
    END AS expected_public_ticket_sold_out,
    tt.waitlist_id,
    waitlist.status AS waitlist_status,
    COALESCE(waitlist.status = 'active', FALSE) AS active_waitlist
FROM selected_ticket_types AS selected
JOIN tickets_tickettype AS tt ON tt.id = selected.id
LEFT JOIN tickets_event AS event ON event.id = tt.event_id
LEFT JOIN venues_venue AS venue ON venue.id = tt.venue_id
LEFT JOIN tickets_venuetickettypeinventory AS inventory
    ON inventory.id = tt.base_inventory_id
LEFT JOIN tickets_waitlist AS waitlist ON waitlist.id = tt.waitlist_id
CROSS JOIN rollout
ORDER BY tt.id;
