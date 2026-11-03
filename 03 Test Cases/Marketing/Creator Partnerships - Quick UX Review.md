---
title: Creator Partnerships - Quick UX Review
date: 2026-11-02
tags:
  - qa/browser-testing
  - qa/ux
---

# Creator Partnerships — quick UX review

## Overview

- **What worked:** The three-step jump, influencer application link, partner form access, and sampled keyboard controls. Content wraps without horizontal page scrolling at the tested widths.
- **Confirmed bug:** Two image descriptions do not match the photos. This gives screen-reader users incorrect information.
- **UX suggestions:** Send the partner button straight to the brief; enlarge phone navigation; clarify eligibility and follow-up expectations. These are design recommendations, not confirmed functional failures.
- **What remains unverified:** Form validation, submissions, email delivery, physical phones, other browsers, and a full accessibility audit.
- **Limited recommendation:** **Go with known non-blocking issues** for this public-page navigation and layout sample. This is not approval of the application-submission workflow.

See the [test index](#test-index) or [results](#results).

## Confirmed bugs

| Bug | Where | What went wrong |
| --- | --- | --- |
| [BUG-01](#bug-01-jira-draft) | Hero and event-partner photos | Their accessible descriptions refer to laptops that are not shown. |

## Test index

- [TC-01 Desktop layout and wording](#tc-01-desktop-layout-and-wording)
- [TC-02 Three-step link](#tc-02-three-step-link)
- [TC-03 Influencer destination](#tc-03-influencer-destination)
- [TC-04 Partner destination](#tc-04-partner-destination)
- [TC-05 Keyboard access](#tc-05-keyboard-access)
- [TC-06 Phone layout](#tc-06-phone-layout)
- [TC-07 Image descriptions](#tc-07-image-descriptions)

## Setup and scope

- **Environment:** Public production [How It Works page](https://www.showpass.com/sell/how-it-works-influencer-market#how-it-works), November 2, 2026, approximately 11:00–11:02 a.m. America/Edmonton. Deployed revision unknown.
- **Browser:** Codex in-app browser. Desktop 1440 × 1000; phone-sized views 390 × 844 and 320 × 740. Partner form also inspected at the restored default 805 × 988.
- **Actor:** Public visitor. No sign-in, Organization selection, employee permissions, or business records required. Existing authentication state was not independently established; no account-specific controls appeared on these pages.
- **Intent:** Check whether visitors can understand the process and reach the appropriate application without losing their place or encountering unreadable controls. This is lower-risk product quality work, proved with navigation, keyboard interaction, rendered content, and screenshots.
- **Allowed changes:** Navigation, focus, scrolling, and temporary browser viewport changes only. No fields filled and no forms submitted. Financial, Inventory, and saved-record gates are not applicable to this visual/navigation scope.
- **Finishing point:** Both destination forms reached, sampled layouts reviewed, findings recorded, and viewport override cleared.
- **Source limit:** A focused backend-first search followed by frontend search found no matches for the page slug, `hiw-program-title`, creator-partnership navigation wording, or influencer-portal slug in the two local repositories. This run establishes live presentation only; it does not establish the page's source owner or backend submission rules.

## TC-01 Desktop layout and wording

**What this tests:** Whether the opening content is readable and makes the program and next action understandable.

**Start here:** A public visitor on the linked How It Works page. No Organizer or test records needed.

### Steps

1. **Select How It Works in the top navigation and read the opening section at 1440 × 1000.** If the page or named controls differ, stop and record the version difference.

   **Expected:** A readable heading, explanation, loaded photo, and visible “See the three steps” link.

   **Actual — Passed:** The hero fits, the photo loads, and the next action is clearly visible. The page width and viewport width both measured 1440px.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/desktop-top.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/desktop-top.jpg" alt="Desktop hero and beginning of the three-step section" width="600" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:00 a.m.; desktop page top.

   **UX-03 — Content recommendation, not a confirmed bug:** The copy explains matching and agreed compensation, but it does not say which locations are supported, what qualifies someone to apply, or when a response should be expected. Add a short FAQ with approved answers, including whether applicants hear back only when there is a match. Do not invent a response-time promise. The repeated “we connect” messaging could make room for these practical details. Confidence is high that these answers are absent from the inspected page; their effect on applications has not been measured.

## TC-02 Three-step link

**What this tests:** Whether the primary opening button takes the visitor to the promised explanation.

**Start here:** How It Works, page top, with “See the three steps” visible.

### Steps

1. **Select See the three steps. Let the scrolling movement finish.**

   **Expected:** “A little context. A much better connection.” and the numbered process cards become visible.

   **Actual — Passed:** The page moves to the section and displays all three cards side by side at desktop width. Direct entry through the user-supplied section link also landed at this section in the initial default-width view.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/desktop-steps.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/desktop-steps.jpg" alt="All three process cards after the section jump" width="600" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:00 a.m.; final desktop anchor position.

## TC-03 Influencer destination

**What this tests:** Whether the influencer action reaches the application form.

**Start here:** How It Works. Scroll past the three cards to “FOR INFLUENCERS & CREATORS.”

### Steps

1. **Select Sign up as an influencer in that card.**

   **Expected:** The influencer application opens at its form, with name, email, city, and social-profile fields.

   **Actual — Passed:** The destination is “Showpass Influencer Sign-up | Creator Application,” at the “Introduce yourself” form. No details entered or sent.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/influencer-destination.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/influencer-destination.jpg" alt="Influencer application reached from the How It Works card" width="600" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:00 a.m.; empty influencer form at 1440 × 1000.

## TC-04 Partner destination

**What this tests:** Whether an event partner can reach the event brief and whether the button wording matches the journey.

**Start here:** Return to How It Works using browser Back. Scroll to “FOR EVENT PARTNERS & ORGANIZERS.”

### Steps

1. **Select Submit an event brief in the partner card.**

   **Expected:** The partner destination opens and gives access to the brief.

   **Actual — Passed, with UX-01:** The partner page opens at another introduction, “Your event. The right creators.” The form is farther down. The bottom-of-page “Submit an event brief” button was also exercised and reaches the same introduction.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/partner-destination.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/partner-destination.jpg" alt="Partner button opens another introduction before the form" width="600" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:01 a.m.; partner introduction at 1440 × 1000.

   **UX-01 — Recommended improvement, not a broken link:** The visitor has already selected “Submit an event brief,” but must select “Start a creator brief” or scroll again. Link that action directly to the brief section, as the influencer action already does. Suggested priority: medium; impact is an extra step before starting the form. Conversion impact has not been measured.

2. **Select Start a creator brief → on the partner page.**

   **Expected:** “Tell us what you have in mind” and the first brief fields come into view.

   **Actual — Passed:** The page moves to “The event & the people,” showing Event name, Brand / company, Your name, Your email, and the other first-step fields. No form data entered and “Next: your goals” was not selected.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/partner-form.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/partner-form.jpg" alt="Partner brief first step after selecting Start a creator brief" width="600" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:02 a.m.; final form position at default 805 × 988.

## TC-05 Keyboard access

**What this tests:** Visible keyboard focus and activation of the main section link. This is a sample, not a complete keyboard audit.

**Start here:** How It Works at the page top. Use Tab to reach the top navigation.

### Steps

1. **Move from For Influencers to For Partners using Tab.**

   **Expected:** The focused link has a visible outline.

   **Actual — Passed:** “For Partners” gets a blue focus outline. The inspected outline was `rgb(0, 95, 204) auto 1px`.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/keyboard-focus.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/keyboard-focus.jpg" alt="Visible keyboard focus around For Partners" width="600" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:01 a.m.; desktop navigation focus.

2. **At phone width, continue past How It Works to See the three steps with Tab, then press Enter.**

   **Expected:** The same process section opens through keyboard activation.

   **Actual — Passed:** Enter activates the section jump. Final evidence is rendered in TC-06, step 2. A separate sampled Tab movement from the partner card action also reached the bottom influencer action, without a focus trap. That lower-page focus was observed but not saved as a separate screenshot.

## TC-06 Phone layout

**What this tests:** Readability, wrapping, and navigation sizing at phone widths. Browser resizing does not prove behavior on physical devices.

**Start here:** How It Works, page top. Set a browser test viewport of 390 × 844; this changes display only.

### Steps

1. **Read the header, hero text, and primary button at 390 × 844.**

   **Expected:** Navigation, text, and button fit within the page width.

   **Actual — Passed, with UX-02:** The page width is 390px, with no horizontal page overflow. Hero text and button fit. Navigation remains small: each link is 18px high with 12px text.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-top.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-top.jpg" alt="Phone header with small navigation links and readable hero" width="390" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:01 a.m.; 390 × 844.

   **UX-02 — Recommended improvement:** Add vertical padding to make the phone navigation easier to tap, and consider increasing its text size. The measured links are 79.25 × 18, 65.63 × 18, and 72.77 × 18px. This is an ergonomic recommendation, not a claim of failed taps or a formal accessibility-conformance failure; no physical-device taps were tested. Suggested priority: medium.

2. **Activate See the three steps and then scroll through the audience cards and the closing content.**

   **Expected:** Cards stack, text wraps, and application links remain readable.

   **Actual — Passed for the sampled views:** The section jump settles at the heading; cards stack vertically. The influencer and event-partner content remains readable. Closing content and the influencer action also fit.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-steps.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-steps.jpg" alt="Phone process section after keyboard activation" width="390" style="max-width:100%;height:auto;"></a>

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-audience-cards.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-audience-cards.jpg" alt="Stacked influencer card and event-partner crowd photo" width="390" style="max-width:100%;height:auto;"></a>

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-bottom.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-bottom.jpg" alt="Phone closing process explanation and follow-up wording" width="390" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:01 a.m.; 390 × 844. These views also support the content recommendation in TC-01.

3. **Reduce the viewport to 320 × 740, inspect the lower process panel, and select How It Works to return to the top.**

   **Expected:** The panel, header, and opening button remain inside the viewport.

   **Actual — Passed:** The page width is 320px. Text and chips wrap, navigation fits, and the opening button stays fully visible. Navigation links remain 18px high.

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-320-bottom.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-320-bottom.jpg" alt="Narrow-phone lower process panel wraps without horizontal overflow" width="320" style="max-width:100%;height:auto;"></a>

   <a href="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-320-top.jpg"><img src="../../99%20Archive/QA%20Evidence/creator-partnerships/2026-11-02-quick-ux/phone-320-top.jpg" alt="Narrow-phone header and hero remain within the page" width="320" style="max-width:100%;height:auto;"></a>

   Production, November 2, 11:01 a.m.; 320 × 740.

## TC-07 Image descriptions

**What this tests:** Whether the descriptions exposed to assistive technology agree with the photos.

**Start here:** How It Works as a public visitor; no account or business records needed.

### Steps

1. **Inspect the opening photo and its accessible description, then scroll to the event-partner photo and inspect its description.** Use a browser accessibility inspector or assistive technology to read the descriptions; these words are not printed visibly on the page.

   **Expected:** Each description accurately represents its photo, or the image is intentionally marked decorative.

   **Actual — Failed:** The hero is described as “A creator working on her phone beside an open laptop,” but shows two people looking at a phone outdoors, with no laptop. The partner card is described as “A small team collaborating around laptops and a notebook,” but shows an audience at a live event. The mismatch was observed in both accessibility output and the image `alt` attributes. Photo evidence is rendered in TC-01, step 1, and TC-06, step 2; do not infer the descriptions from screenshots alone.

   **Impact:** Screen-reader users receive a different account of the photos than sighted visitors. **Severity:** Low. **Confidence:** Confirmed for the exposed descriptions; spoken output on a physical screen-reader setup was not tested. **Safety:** No data change. **Release classification:** Non-blocking for this sampled page review. **Reset:** None required.

### BUG-01 Jira draft

**Draft only — no Jira issue has been created.** No existing Jira issue was searched, so check for duplicates before publication.

**Title:** fix (creator partnerships) | photo descriptions do not match the images

**GIVEN** a visitor is on the public Showpass Creator Partnerships “How It Works” page.

**WHEN** they read the opening photo and the event-partner card photo using assistive technology.

**THEN** the exposed descriptions describe a creator beside a laptop and a team around laptops and a notebook, although the photos show two people looking at a phone and a live-event audience. The descriptions should accurately describe the displayed photos, or the images should be marked decorative if they add no information.

Observed November 2, 2026, in the Codex in-app browser. The browser accessibility output and image descriptions were inspected; spoken screen-reader output was not tested. See TC-07 and its linked photo evidence.

## Postconditions and cleanup

- No application details entered, forms submitted, messages sent, or business records changed. Ordinary site analytics/session activity may occur during public-page navigation.
- Browser viewport override cleared and verified at the restored default size. Final page returned to How It Works with no unsaved inputs. The temporary agent-created tab may close after the turn.
- Screenshots retained locally as necessary evidence in `99 Archive/QA Evidence/creator-partnerships/2026-11-02-quick-ux/`; keep them out of Git. No scratch exports or text dumps created.
- Unrelated existing vault changes were preserved.

## Remaining coverage

- **Deferred:** Form field validation, partner steps 2–3, submission, and email delivery. The requested check was public-page UX, and no production test submission was authorized.
- **Deferred:** Footer link destinations, footer accordions, chat widget, duplicate influencer action, independent top-navigation destination checks, all keyboard paths, zoom, contrast measurement, reduced motion, and performance. These are outside this quick sample; matching link targets alone do not establish an interaction pass.
- **Manual-only:** Physical iOS/Android interactions and screen-reader speech. A real device/assistive-technology session is needed.
- **Blocked:** Source ownership and deployed revision were not established; submission rules cannot be verified from the local source matches available.
- **Not applicable:** Payments, refunds, Inventory, employee permissions, saved-record cleanup, Qase publication, and CI. No application code changed.

## Results

**Go with known non-blocking issues** for this limited navigation/layout sample. Six checks passed within their stated boundaries; one confirmed image-description check failed. Three design recommendations remain. No release conclusion is made about form submissions or the broader creator program.

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01 — Desktop layout and wording, step 1](#tc-01-desktop-layout-and-wording) | Passed | — | Readable desktop hero; UX-03 recommends eligibility and follow-up details. |
| [TC-02 — Three-step link, step 1](#tc-02-three-step-link) | Passed | — | Button reaches the numbered process section. |
| [TC-03 — Influencer destination, step 1](#tc-03-influencer-destination) | Passed | — | Application form opens directly. |
| [TC-04 — Partner destination, steps 1–2](#tc-04-partner-destination) | Passed | — | Form is reachable; UX-01 flags the extra introduction/click. |
| [TC-05 — Keyboard access, steps 1–2](#tc-05-keyboard-access) | Passed | — | Sampled focus outline and Enter activation work. |
| [TC-06 — Phone layout, steps 1–3](#tc-06-phone-layout) | Passed | — | No horizontal page overflow at 390px or 320px; UX-02 flags small navigation. |
| [TC-07 — Image descriptions, step 1](#tc-07-image-descriptions) | Failed | [BUG-01](#bug-01-jira-draft) | Two descriptions disagree with the photos. |
| [Submission and remaining coverage](#remaining-coverage) | Not run | — | Deferred and manual-only checks are listed with reasons above. |
| [Source ownership and deployed revision](#setup-and-scope) | Blocked | — | No matching implementation found in the focused local search. |
