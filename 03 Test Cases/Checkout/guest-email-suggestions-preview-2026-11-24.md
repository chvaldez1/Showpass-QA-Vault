---
title: Guest checkout email suggestions
date: 2026-11-24
tags:
  - checkout
  - browser-testing
---

# Browser Test Report: Guest checkout email suggestions

## Overview

**Failed the missing- and extra-letter check.** All six examples stayed as typed with no correction offered. The preview offered four corrections across 18 addresses, and the two control corrections updated the field on selection. The local candidate explicitly restricts provider suggestions for `.com` addresses to provider names of the same length.

**Plan 1** received independent QA Lead approval. The run covered the signed-out desktop guest form in the Vercel branch preview through typing, leaving the field, and accepting the two positive controls. The deployed commit could not be verified. Contact submission, final confirmation, purchase, email delivery, and submission-time validation were outside the run.

## Confirmed bugs

The missing- and extra-letter check failed the requested outcome. It reproduced the local candidate's explicit eligibility rule. Whether to change that rule remains a product decision.

## Test index

- [TC-01 Checkout entry](#tc-01-checkout-entry)
- [TC-02 Swapped letters](#tc-02-swapped-letters)
- [TC-03 Mistyped suffix](#tc-03-mistyped-suffix)
- [TC-04 Missing and extra letters](#tc-04-missing-and-extra-letters)
- [TC-05 Replaced letters](#tc-05-replaced-letters)
- [TC-06 Suggestion boundaries](#tc-06-suggestion-boundaries)

## Setup / Prerequisites

- **Environment and role** · Vercel guest-email-suggestions branch preview, signed-out, desktop in-app browser, English.
- **Event** · Volleyball Games, under Organization For Testing Memberships. Use the July 11, 2031, 10:00 AM PT performance, **Adult (Ages 19-64)**, quantity one. [Event preview](https://next-git-leonardo-guest-email-suggestions-showpass.vercel.app/volleyball-games-2/)
- **Changes** · A temporary one-ticket cart and unsent synthetic email inputs. Stop before **Continue** on the guest form. After the last check, clear the input and remove the ticket.

## TC-01 Checkout entry

**What this tests** · A signed-out visitor can reach the guest contact form for the Event.

**Start here** · Open the linked Event preview and confirm the header offers **Log In** and the cart is empty.

1. Select **BUY PASSES**, choose **Friday Jul 11, 2031 | 10:00 AM PT**, and increase **Adult (Ages 19-64)** from zero to one. Select **Checkout 1** and then **Continue as guest**.

   **Expected** · **Where should we send your order?** displays **Email address**, and the checkout cart shows one item.

   **Actual — Passed** · The guest form opened with one item. The checkout form and cart are visible in the screenshots in [TC-02](#tc-02-swapped-letters).

## TC-02 Swapped letters

**What this tests** · The prompt appears after leaving the field, and accepting it applies the suggestion.

**Start here** · **Where should we send your order?** in [TC-01](#tc-01-checkout-entry).

1. Enter `guest@gmial.com` in **Email address**, then click **Full name** to leave the email field.

   **Expected** · **Did you mean guest@gmail.com?** appears while the field retains the typed address.

   **Actual — Passed** · The prompt and both choices appeared. The field showed `guest@gmial.com`.

   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/01-transposition-prompt.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/01-transposition-prompt.jpg" alt="Guest checkout shows a Gmail suggestion for gmial.com" width="600" style="max-width: 100%; height: auto;"></a>

   Preview guest checkout, November 24, 2026.

2. Select **Use suggested email**.

   **Expected** · The field displays `guest@gmail.com` and the prompt closes.

   **Actual — Passed** · The screenshot shows the corrected address and the prompt is gone.

   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/02-transposition-accepted.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/02-transposition-accepted.jpg" alt="Email field displays guest@gmail.com after accepting" width="600" style="max-width: 100%; height: auto;"></a>

   Preview guest checkout, November 24, 2026.

## TC-03 Mistyped suffix

**What this tests** · The helper can offer a correction for a mistyped suffix when the provider is spelled correctly.

**Start here** · The guest form from [TC-01](#tc-01-checkout-entry).

1. Replace the address with `guest@gmail.vom`, then click **Full name**.

   **Expected** · **Did you mean guest@gmail.com?** appears.

   **Actual — Passed** · The prompt appeared with `guest@gmail.com`.

   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/03-suffix-prompt.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/03-suffix-prompt.jpg" alt="Guest checkout offers guest@gmail.com for gmail.vom" width="600" style="max-width: 100%; height: auto;"></a>

   Preview guest checkout, November 24, 2026.

2. Select **Use suggested email**.

   **Expected** · The email changes to `guest@gmail.com` and the prompt closes.

   **Actual — Passed** · The screenshot shows the corrected address and the prompt is gone.

   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/04-suffix-accepted.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/04-suffix-accepted.jpg" alt="Guest checkout field displays gmail.com after the suffix correction" width="600" style="max-width: 100%; height: auto;"></a>

   Preview guest checkout, November 24, 2026.

## TC-04 Missing and extra letters

**What this tests** · Whether the preview offers corrections for provider names that are one letter shorter or longer.

**Start here** · The guest form from [TC-01](#tc-01-checkout-entry).

1. Replace the address with each value below. After every entry, click **Full name** and check for advice under **Email address**.

   **Expected** · Leaving the field offers the matching provider correction for each one-letter typo. The typed address stays in the field until the guest accepts a suggestion.

   **Actual — Failed** · All six stayed as entered with no prompt. The existing provider-length rule explains the failure.

   | Address entered | Variation | Evidence |
   | --- | --- | --- |
   | `guest@gmai.com` | Missing final letter | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/05-gmai.jpg) |
   | `guest@gmal.com` | Missing internal letter | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/06-gmal.jpg) |
   | `guest@yaho.com` | Missing letter from a repeated pair | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/07-yaho.jpg) |
   | `guest@yahooo.com` | Extra final letter | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/08-yahooo.jpg) |
   | `guest@outloook.com` | Extra internal letter | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/09-outloook.jpg) |
   | `Case+Tag@GMAI.COM` | Missing letter in an uppercase domain | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/12-uppercase-gmai.jpg) |

   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/05-gmai.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/05-gmai.jpg" alt="Missing l in gmai.com stays as entered" width="430" style="max-width: 100%; height: auto;"></a>
   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/08-yahooo.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/08-yahooo.jpg" alt="Extra o in yahooo.com stays as entered" width="430" style="max-width: 100%; height: auto;"></a>

   Preview guest checkout, November 24, 2026. Gmail and Yahoo examples after leaving the field.

## TC-05 Replaced letters

**What this tests** · Whether a single letter substitution still gets advice.

**Start here** · The guest form from [TC-01](#tc-01-checkout-entry).

1. Enter `guest@gmaik.com`, click **Full name**, and inspect the prompt. Repeat with `guest@hotmaol.com`.

   **Expected** · The Gmail and Hotmail corrections appear.

   **Actual — Passed** · The prompts read **Did you mean guest@gmail.com?** and **Did you mean guest@hotmail.com?**. The email field still showed the typed address in each case.

   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/10-gmaik.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/10-gmaik.jpg" alt="Gmail suggestion for the same-length gmaik.com typo" width="430" style="max-width: 100%; height: auto;"></a>
   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/11-hotmaol.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/11-hotmaol.jpg" alt="Hotmail suggestion for the same-length hotmaol.com typo" width="430" style="max-width: 100%; height: auto;"></a>

   Preview guest checkout, November 24, 2026.

## TC-06 Suggestion boundaries

**What this tests** · Which other shapes receive a suggestion, including a typo before the `@`.

**Start here** · The guest form from [TC-01](#tc-01-checkout-entry).

1. Enter each address below and click **Full name** after each entry.

   **Expected** · The prompt stays hidden for each value under the branch rules.

   **Actual — Passed for prompt visibility** · The browser showed no suggestion for any of the eight values.

   | Address entered | Variation | Evidence |
   | --- | --- | --- |
   | `guest@gmai.vom` | Provider and suffix typo | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/13-gmai-vom.jpg) |
   | `guest@gmi.com` | Two missing letters | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/14-gmi.jpg) |
   | `guest@gmailcom` | Missing dot | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/15-missing-dot.jpg) |
   | `guest@yaho.co.uk` | Alternate suffix | Live prompt check. The screenshot framing missed the email field. |
   | `guest@notgmail.com` | Provider name inside a longer domain | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/17-notgmail.jpg) |
   | `guest@gmail.example.com` | Provider name in a subdomain | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/18-subdomain.jpg) |
   | `guest@gmaіl.com` | Cyrillic `і` in the domain | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/19-cyrillic-i.jpg) shows no advice. The lookalike glyph limits visual character verification. |
   | `gmial+Case@outlook.com` | Typo-looking text before `@` | [Screenshot](../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/20-local-part.jpg) |

   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/13-gmai-vom.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/13-gmai-vom.jpg" alt="No suggestion for a typo in both the provider and suffix" width="430" style="max-width: 100%; height: auto;"></a>
   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/20-local-part.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/20-local-part.jpg" alt="No suggestion or visible rewrite for typo-like text before the at sign" width="430" style="max-width: 100%; height: auto;"></a>

   Preview guest checkout, November 24, 2026. No checkout submission or validation check was performed.

## Postconditions and Cleanup

1. Clear **Email address**, go back to the Event, and open **Cart summary**. On the only **Adult (Ages 19-64) - Volleyball Games** line, choose **Delete**.

   **Expected** · The temporary item disappears and the Event page shows no cart button with an item count.

   **Actual — Passed** · **Remove item** left the quantity at one. **Delete** cleared the line, closed **Cart summary**, and removed the cart button. The signed-out Event page remained open. No contact details were submitted and no order was placed.

   <a href="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/21-cart-cleared.jpg"><img src="../../99%20Archive/QA%20Evidence/Guest%20Checkout/2026-11-24-email-suggestions/21-cart-cleared.jpg" alt="Volleyball Games event page after clearing the only test cart item" width="600" style="max-width: 100%; height: auto;"></a>

   Preview Event page, November 24, 2026.

## References / Open Questions

- The local frontend candidate was `e4c00c94fd8f701a8d9d9e8f0d3e291578c4ca89` on `origin/leonardo/guest-email-suggestions`. For `.com`, the provider-length check rejects a suggestion when the typed and suggested provider names have different lengths. [Helper source](https://github.com/showpass/showpass-frontend/blob/e4c00c94fd8f701a8d9d9e8f0d3e291578c4ca89/packages/core/src/shared/utils/email/suggestEmailDomain.ts#L39-L48)
- Decide whether the suggested-email feature should cover common one-letter insertions and deletions while preserving intended custom domains.

## Results

The inline prompt failed the requested missing- and extra-letter check. The swapped-letter and mistyped-suffix controls passed.

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [Checkout entry, step 1](#tc-01-checkout-entry) | Passed | — | Reached the signed-out guest form with one temporary ticket. |
| [Swapped letters, steps 1–2](#tc-02-swapped-letters) | Passed | — | `gmial.com` suggested `gmail.com`. Accepting changed the field. |
| [Mistyped suffix, steps 1–2](#tc-03-mistyped-suffix) | Passed | — | `gmail.vom` suggested `gmail.com`. Accepting changed the field. |
| [Missing and extra letters, step 1](#tc-04-missing-and-extra-letters) | Failed | — | No prompt for any of six examples. |
| [Replaced letters, step 1](#tc-05-replaced-letters) | Passed | — | `gmaik.com` and `hotmaol.com` both prompted. |
| [Suggestion boundaries, step 1](#tc-06-suggestion-boundaries) | Passed for prompt visibility | — | No prompt for any of eight examples. |
| [Cart cleanup, step 1](#postconditions-and-cleanup) | Passed | — | Temporary item removed and cart button gone. |

