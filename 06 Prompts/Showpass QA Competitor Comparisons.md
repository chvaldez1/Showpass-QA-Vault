---
title: Showpass QA Competitor Comparisons
tags:
  - qa/workflow
---

# Showpass QA Competitor Comparisons

A source comparison can finish with the requested findings. Use the [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|review policy]] for live Showpass checks or a release handoff.

Use Showpass as the product under test and other ticketing platforms as independent examples. When the user requests a comparison, or when a peer pattern could explain a specific usability problem, compare the same job from the same person's perspective. A straightforward field edit can finish once the requested values are saved and verified.

## Compare the scenario

1. Define the job and context. A first-time visitor finding a show, a Customer recovering a missing order, an Organizer setting up General Admission, and a Venue Employee admitting a group need different comparisons. Match the client, ticket type, account state, and configuration where they matter.
2. Start with Eventbrite, Leap Event Technology, Ticketmaster, and Tixr. Add any relevant peer, such as Ticket Tailor, when its audience, operating model, or device fits the case. Consult current official help or product documentation. Record the product, region or client where relevant, and the source. Treat public documentation as a description of behavior. Live competitor tests require their own authorization.
3. Check what Showpass does using [[01 Repositories/Backend - web-app]] for business rules and [[01 Repositories/Frontend - showpass-frontend]] for the path and controls. Record separately what was observed in a live Showpass run. Try to understand the reason for a difference before using it as a finding.
4. Explain the impact on the person doing the job. Call a verified mismatch with intended Showpass behavior a bug. A documented alternative can support a usability improvement or a test idea. If competitor details are unavailable or the scenario differs in a material way, say what remains unknown.

## Starting examples

| Scenario | Documented example | Question for Showpass |
| --- | --- | --- |
| Organizer creates a music event with general admission | Eventbrite documents ordinary ticket types and a separate choice for reserved seating. [Create and edit ticket types](https://www.eventbrite.com/help/en-nz/articles/644100/how-to-create-custom-ticket-types/) | Can an Organizer set up and verify a ticket without needing to understand seating maps? |
| Visitor or Customer needs help from the Organizer | Eventbrite exposes an organizer contact path on the event and from an existing order. Tixr distinguishes organizer questions from platform issues. [Eventbrite organizer contact](https://www.eventbrite.com/help/en-us/articles/647151/how-to-contact-the-event-organizer/) · [Tixr contact responsibilities](https://fansupport.tixr.com/en/articles/11085827-who-is-the-event-organizer-and-what-do-they-control) | Can a visitor tell who is responsible and where to ask? Can the Organizer tell which Contact field serves that route? |
| Customer needs to find tickets from the right purchase | Ticketmaster uses **My Tickets** and documents venue or team accounts as alternative destinations for some purchases. Leap directs buyers to the relevant product or region, including its North American event ticketing and conventions flows. Tixr uses **Wallet** and documents separate guest and payment-plan behavior. [Ticketmaster missing-order help](https://help.ticketmaster.com/hc/en-us/articles/9606198059409-What-should-I-do-if-I-can-t-find-my-order-in-my-account) · [Leap ticket buyer help](https://leapevent.tech/ticket-buyer-help/) · [Tixr ticket viewing](https://fansupport.tixr.com/en/articles/12661955-viewing-your-tickets) | Does Showpass tell the Customer how to recover the correct order or understand when an item will be available? |
| Venue Employee finds an order and checks in an Attendee | Tixr documents on-site order lookup and iOS offline scan sync. Ticket Tailor documents a computer-based check-in path from Issued tickets. [Tixr Door](https://creators.tixr.com/products/door) · [Ticket Tailor computer check-in](https://help.tickettailor.com/en/articles/10588947-how-to-check-in-attendees-without-using-the-ticket-tailor-check-in-app) | Can staff identify the right order, tell when admission was recorded, and recover if the current client is unavailable? Verify any offline behavior separately on the applicable device. |
