import { z } from "zod";
import type { BuilderWorkflow } from "./qa-workflow";

export const buildPresetSchema = z.enum(["event", "product", "membership", "discount", "ticket-credit", "package", "dashboard"]);
export type BuildPreset = z.infer<typeof buildPresetSchema>;
export const buildThemeSchema = z.enum([
  "sports", "basketball", "volleyball", "soccer", "football", "mma",
  "music", "music-festival", "edm", "folk-festival", "jazz",
  "comedy", "seasonal", "valentines", "halloween", "christmas", "comic-con",
]);
export type BuildTheme = z.infer<typeof buildThemeSchema>;

export const buildThemes = {
  sports: {
    label: "Sports",
    pattern: /\b(sports?|games?|match(?:es)?|baseball|hockey|lacrosse|tournaments?)\b/i,
    defaults: "Give the Event a credible game or bout schedule, doors and attendance choices. Use seating, session passes or access rules when the scenario needs them. For a Product, consider a fan scarf, game-day cap or shirt with meaningful colors or sizes, separate stock and venue pickup. For a Membership, consider a fan club or season benefit scoped to a specific game and ticket.",
  },
  basketball: {
    label: "Sports · Basketball",
    pattern: /\bbasketball\b/i,
    defaults: "Use tip-off, doors and the game end time. Choose game-only tickets or session passes to match the fixture. Products can use game-day shirt sizes with distinct SKUs and arena pickup. Membership benefits can cover a verified home game.",
  },
  volleyball: {
    label: "Sports · Volleyball",
    pattern: /\bvolleyball\b/i,
    defaults: "Use match or tournament sessions with spectator access and breaks reflected in the schedule. Products can use size-specific tournament merch. Tie a Membership benefit to the intended session or pass.",
  },
  soccer: {
    label: "Sports · Soccer",
    pattern: /\b(soccer|futsal)\b/i,
    defaults: "Use kickoff, gates and full match hours. Choose standard and family or supporter options where useful. Products can use team-color scarves with stadium pickup. Link a Membership benefit to a verified eligible fixture.",
  },
  football: {
    label: "Sports · Football",
    pattern: /\b(football|gridiron)\b/i,
    defaults: "Use kickoff, gates and a game-length schedule. Consider student or supporter eligibility where it fits. Products can use cap or jersey variants with separate stock and game-day pickup. Keep any tailgate access explicit.",
  },
  mma: {
    label: "Sports · MMA",
    pattern: /\b(mma|mixed martial arts|fight night|boxing)\b/i,
    defaults: "Use doors, prelims and the main card. Give Early Bird and Standard General Admission meaningful sale timing or limits where suitable. Keep seating at the requested scope. Products can use fight-night shirts with size-specific stock and venue pickup.",
  },
  music: {
    label: "Music",
    pattern: /\b(music|concerts?|k[- ]?pop|gig|band|recital|listening party)\b/i,
    defaults: "Set a credible doors, show and end time. Use differences such as early-bird versus standard admission or a scoped add-on when appropriate. For a Product, consider a show poster with distinct editions or merch with named sizes and pickup. For a Membership, consider a club-night discount tied to one verified Ticket Type.",
  },
  "music-festival": {
    label: "Music · Festival",
    pattern: /\b(music festival|music fest|festival|fest)\b/i,
    defaults: "Match passes to the actual day or set schedule. Use finite inventory and a meaningful difference between tiers or passes. Products can use editions or sizes of festival merch with a booth pickup window.",
  },
  edm: {
    label: "Music · Rave or EDM",
    pattern: /\b(raves?|edm|dj|electronic dance)\b/i,
    defaults: "Plan real doors, set times, end time and any midnight boundary. Choose early and standard tiers or arrival times only where requested and supported. Products can use distinct merch editions or clothing sizes with separate stock.",
  },
  "folk-festival": {
    label: "Music · Folk festival",
    pattern: /\b(folk festival|folk fest|folk music)\b/i,
    defaults: "Use an afternoon or evening set schedule and distinguish day passes, family options or workshop add-ons when useful. Products can use program and poster variants with pickup at the festival.",
  },
  jazz: {
    label: "Music · Jazz",
    pattern: /\bjazz\b/i,
    defaults: "Use a credible club set or festival schedule. Distinguish first and second sets only when the Event calls for separate admission. Products can use poster or merch editions. A club Membership can use a premium discount on one eligible show ticket.",
  },
  comedy: {
    label: "Comedy",
    pattern: /\b(comedy|stand[- ]?up|improv|comedian)\b/i,
    defaults: "Use a plausible show schedule, doors and admission details. Include meaningful options such as standard and early access or separate shows only where appropriate. For a Product, consider show merchandise with distinct editions, inventory and venue pickup. For a Membership, scope a recurring show benefit to the intended performance and ticket.",
  },
  seasonal: {
    label: "Seasonal",
    pattern: /\b(seasonal|holiday|winter|summer|spring|fall|autumn|easter|new year|markets?)\b/i,
    defaults: "Match the date and hours to the season. Consider entry, family options, or a workshop only where they fit. For a Product, consider distinct seasonal bundle sizes, purposeful finite stock, and a specific pickup or delivery window. For a Membership or promotion, tie expiry and eligibility to the actual season or dates.",
  },
  valentines: {
    label: "Seasonal · Valentine’s",
    pattern: /\bvalentine(?:['’]?s)?\b/i,
    defaults: "Use the intended Valentine’s date or weekend. Distinguish single versus pair admission or bundle quantity when useful. Products can use individual and gift-set variants with separate stock and a clear pickup deadline.",
  },
  halloween: {
    label: "Seasonal · Halloween",
    pattern: /\bhalloween\b/i,
    defaults: "Use the intended October date and give family, timed entry or evening options only if they fit. Products can use distinct treat-box sizes or merch variants with a season-specific pickup window.",
  },
  christmas: {
    label: "Seasonal · Christmas",
    pattern: /\b(christmas|xmas)\b/i,
    defaults: "Use the correct seasonal date and market hours. Distinguish general entry from a workshop or add-on when useful. Products can use gift sizes or seasonal editions with realistic finite stock, pickup timing and a clear fulfillment message.",
  },
  "comic-con": {
    label: "Comic Con",
    pattern: /\b(comic[ -]?cons?|comic conventions?|cosplay)\b/i,
    defaults: "Account for day or weekend admission and distinguish a panel, signing or photo add-on from floor access when needed. Products can use variant-specific prints, badges or merch with exhibitor-booth pickup. Use original scenario names and keep capacity and eligibility explicit.",
  },
} satisfies Record<BuildTheme, { label: string; pattern: RegExp; defaults: string }>;

export function inferBuildTheme(text: string): BuildTheme | undefined {
  const priority: BuildTheme[] = [
    "comic-con", "basketball", "volleyball", "soccer", "football", "mma",
    "folk-festival", "jazz", "edm", "valentines", "halloween", "christmas",
    "comedy", "music-festival", "music", "sports", "seasonal",
  ];
  return priority.find((theme) => buildThemes[theme].pattern.test(text));
}

export const buildPresets = {
  event: {
    label: "Event with tickets",
    workflow: "event-builder",
    summary: "A realistic Event with ticket options, capacity, sale timing and saved proof.",
    defaults: "For a single-day General Admission scenario with open parameters, use the saved QA location, one local date, 7–10 p.m., and one 25.00 ticket with 30 spots in the verified venue currency. Add distinct tiers or experiences when useful to a standalone Event build. Keep the requested schedule, seating, admission, status and artwork scope.",
  },
  product: {
    label: "Product with variants",
    workflow: "offering-builder",
    summary: "Distinct variants and SKUs, stock, purchase limits, eligibility and fulfillment.",
    defaults: "For an open-ended Product, propose realistic copy and at least two meaningful variants, each with a distinct SKU. Start with prices of 15.00 and 24.00 in the verified currency, stock of 12 and 4, and purchase limits of 2 and 1 where supported. Choose a real selling path (standalone, Event add-on, or Membership) and verify its saved eligibility and supported fulfillment, such as pickup instructions for physical goods. Use one compatible supporting record only if that sales path needs it. Reopen the Product and each variant. Give the next tester the exact variant or SKU, expected price, stock, limit, and eligible entry point.",
  },
  membership: {
    label: "Membership with a benefit",
    workflow: "offering-builder",
    summary: "Standard and premium Levels, a Member question, and a scoped benefit with its eligible item.",
    defaults: "For a monthly club Membership with open parameters, use standard and premium Levels at 19.00 and 29.00 in the verified currency, 20 and 10 spots, a purchase limit of one, and a useful optional Member question. For a premium ticket benefit, start at 10% with two uses per member on one eligible Ticket Type. If no compatible ticket is verified, plan one supporting single-day General Admission Event and ticket. Check whether its required status and publication are in scope before creating a fixture that cannot be used. Keep the requested Group status.",
  },
  discount: {
    label: "Discount with eligibility",
    workflow: "organizer-builder",
    summary: "A scoped offer with eligible and excluded items, dates, and use limits.",
    defaults: "For an open-ended discount, choose a realistic value (10% is a starting point), a bounded validity window and use limit, a specific audience and exact eligible item. Preserve an excluded item for comparison when useful. Reopen and verify the saved rules. Give the checkout tester an eligible and ineligible choice to compare.",
  },
  "ticket-credit": {
    label: "Ticket Credit with redemption rules",
    workflow: "organizer-builder",
    summary: "Issuing and redeeming items, credit value, limits, and scope.",
    defaults: "Plan the owned Ticket Credit definition, its amount or allowed quantity, and the exact issuing and redeeming items and limits. Include distinct supporting items only if issuance and redemption cannot be proved with the existing setup. Reopen both sides of the relationship. Keep actual issuance, redemption and orders in their separately authorized jobs.",
  },
  package: {
    label: "Package with included items",
    workflow: "organizer-builder",
    summary: "Exact parent and included items, quantities, inventory, and buyer information.",
    defaults: "Use the actual Package sales entry point and name the parent and each included item, quantity, sale price, inventory, and relevant guest collection. Plan separate supporting Events only when their identity or state is required. Verify the saved parent-to-item links and intended buyer entry point. Keep checkout in the receiving job.",
  },
  dashboard: {
    label: "Other Dashboard setup",
    workflow: "organizer-builder",
    summary: "Configure the owning page, verify the saved settings, and identify their downstream effect.",
    defaults: "Find the owning /manage/ screen and propose concrete values for the requested section. Confirm any dependencies, scope and exclusions through supported controls. Keep a targeted edit limited to the named settings and their proof. For open-ended setup, say how the saved configuration gives the next role something useful to exercise.",
  },
} satisfies Record<BuildPreset, { label: string; workflow: BuilderWorkflow; summary: string; defaults: string }>;

export function inferBuildPreset(title: string, workflow: BuilderWorkflow): BuildPreset | undefined {
  const subject = title.split(/\s+(?:at|for|from|in|of|on|to|under|using|with)\s+/i, 1)[0];
  if (workflow === "event-builder") return "event";
  if (workflow === "offering-builder") {
    if (/\bmemberships?\b/i.test(subject)) return "membership";
    if (/\bproducts?\b/i.test(subject)) return "product";
    return;
  }
  if (/\bticket credits?\b/i.test(subject)) return "ticket-credit";
  if (/\b(discounts?|promotions?|promo codes?)\b/i.test(subject)) return "discount";
  if (/\bpackages?\b/i.test(subject)) return "package";
  return "dashboard";
}
