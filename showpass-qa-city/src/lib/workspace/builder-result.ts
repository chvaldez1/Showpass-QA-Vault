import { z } from "zod";

const id = z.number().int().positive();
const name = z.string().trim().min(1).max(256);
const quantity = z.number().int().nonnegative();
const description = z.string().max(24_000).nullable().optional();
const date = z.iso.datetime({ offset: true }).nullable().optional();
const saleOption = z.strictObject({
  id: id.optional(), name, description,
  price: z.string().regex(/^\d{1,6}\.\d{2}$/, "Use a two-decimal price string such as 25.00.").optional(),
  inventory: quantity.nullable().optional(),
  purchase_limit: quantity.nullable().optional(),
});

// A verified subset of the venue-based response fields in web-app. Some IDs
// and values are unavailable in the Dashboard and may be omitted.
const eventRecord = z.strictObject({
  kind: z.literal("event"),
  record: z.strictObject({
    id, name: name.max(84), description,
    slug: z.string().regex(/^[^/?#]+$/).max(256),
    venue: id.optional(),
    status: z.enum([
      "sp_event_active", "sp_event_postponed", "sp_event_cancelled", "sp_event_refunded",
      "sp_event_refund_in_progress", "sp_event_rescheduled", "sp_event_draft", "sp_event_template",
    ]),
    location_name: name.nullable().optional(),
    starts_on: date, ends_on: date, opens_at: date,
    timezone: name.nullable().optional(),
    inventory: quantity.nullable().optional(),
    is_recurring: z.boolean().nullable().optional(),
    assigned_space: id.nullable().optional(),
    tickettype_set: z.array(saleOption.extend({
      name: name.max(100),
      inventory: quantity.optional(),
      sale_starts_on: date, sale_ends_on: date,
      scan_starts_on: date, scan_ends_on: date,
      custom_ticket_event_starts_on: date, custom_ticket_event_ends_on: date, custom_ticket_event_opens_at: date,
      visibility: z.number().int().optional(),
    })).max(100).optional(),
  }),
});

const productRecord = z.strictObject({
  kind: z.literal("product"),
  record: z.strictObject({
    id, name: name.max(50), description, venue: id.optional(),
    is_active: z.boolean().optional(),
    product_attributes: z.array(saleOption.omit({ description: true }).extend({
      name: name.max(50),
      sku: z.string().max(50).nullable().optional(),
    })).max(100).optional(),
  }),
});

const membershipGroupRecord = z.strictObject({
  kind: z.literal("membership_group"),
  record: z.strictObject({
    id, name: name.max(128), description, venue: id.optional(),
    slug: name.optional(),
    status: name.optional(),
    renewals_enabled: z.boolean().optional(),
    custom_expiry_date: date,
    membership_levels: z.array(saleOption).max(100).optional(),
  }),
});

const membershipBenefitRecord = z.strictObject({
  kind: z.literal("membership_benefit"),
  record: z.strictObject({
    id, name: z.string().trim().min(1).max(1000), venue: id.nullable().optional(),
    membership_group: id.nullable().optional(),
    membership_level: id.nullable().optional(),
    benefit_type: name.optional(),
    ticket_type: id.nullable().optional(),
    scans_allowed: quantity.nullable().optional(),
    discount_uses_allowed: quantity.nullable().optional(),
  }).refine(({ membership_group, membership_level }) => membership_group != null || membership_level != null, {
    message: "Include the benefit’s saved Membership Group or Membership Level ID.",
  }),
});

export const builderRecordsSchema = z.array(z.discriminatedUnion("kind", [
  eventRecord, productRecord, membershipGroupRecord, membershipBenefitRecord,
])).max(25);

export function isMatchingBetaPreview(value: string, slug: string) {
  try {
    const url = new URL(value);
    return url.origin === "https://beta.showpass.com" && !url.username && !url.password
      && url.pathname === `/preview/${encodeURIComponent(slug)}/` && !url.search && !url.hash;
  } catch {
    return false;
  }
}
