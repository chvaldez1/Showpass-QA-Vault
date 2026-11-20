---
title: Organizer Profile — product category URL, reload and fresh tab
date: 2026-11-19
status: Tested and passed on 1859-qa-cad
---

# Organizer Profile — selected product category

**Result:** The reported reset was **not reproduced** on the refreshed beta profile. Selecting the second category produced a category-specific URL. Reload and a fresh tab both reopened the same category and products.

## Setup and scope

- November 19, 2026; beta; Codex in-app browser; existing signed-in Christian Valdez session; English desktop view.
- The user confirmed the k8s readiness question with “yes.” This was treated as deployment-ready confirmation; the running revision was not independently established.
- Initial Organizer **Organization For System Gateway Payment Intent**, Venue 1547, showed only T-shirt with logo and no category selector, including after another refresh. It could not satisfy the two-category prerequisite.
- Used the existing public **[1859-qa-cad profile](https://beta.showpass.com/o/1859-qa-cad/)** instead. No Dashboard Organization switch or data preparation was performed.
- Its Products tab showed three public category buttons: drinks, Merch Merch Merch Merch Merch Merch, and Catering. The first and second had different products, as recorded below.
- Scope: select the second category through the public UI, reload the resulting address and open that same address in a fresh tab. Dashboard Copy product link, purchases, product changes, Admin and actual outbound sharing were excluded.

## Test index

- [TC-01 — Select the second category](#tc-01-select-the-second-category)
- [TC-02 — Reload the category URL](#tc-02-reload-the-category-url)
- [TC-03 — Reopen the address in a fresh tab](#tc-03-reopen-the-address-in-a-fresh-tab)

## TC-01 Select the second category

**What this tests:** Public category selection changes both the product list and the address to identify the selected category.

**Start here:** Open the beta 1859-qa-cad public profile and select Products. No employee permission is needed for the public page; this run retained its existing signed-in browser session.

1. **Open Products and inspect the first category, drinks.**

   **Expected:** The profile provides at least two public categories with distinct products.

   **Actual — Passed:** At `/o/1859-qa-cad/products/`, drinks displayed Drink Tickets, Beeer, Beeeer 2 and Mojito. The second category button was available.

   <img src="../../99%20Archive/QA%20Evidence/organizations/product-category-url-2026-11-19/01-first-category.jpg" width="600" alt="First public category displays drink products" />

2. **Select Merch Merch Merch Merch Merch Merch and wait for its products.**

   **Expected:** Different products appear, and a shareable selection is represented in the resulting address.

   **Actual — Passed:** Products changed to **Anime Shirt** and **BING BONG**. The address became `https://beta.showpass.com/o/1859-qa-cad/categories/2403/`. This URL came from the public category click, not Dashboard Copy product link.

   <img src="../../99%20Archive/QA%20Evidence/organizations/product-category-url-2026-11-19/02-second-category.jpg" width="600" alt="Second category displays Anime Shirt and BING BONG" />

## TC-02 Reload the category URL

**What this tests:** Reloading preserves the selected category rather than returning to drinks.

**Start here:** The second category selected in TC-01, at `/o/1859-qa-cad/categories/2403/`.

1. **Reload the page and wait for the products to load.**

   **Expected:** The same Organizer and category URL reopen Anime Shirt and BING BONG.

   **Actual — Passed:** The address retained `/categories/2403/`, the heading remained 1859-qa-cad, and Anime Shirt / BING BONG remained displayed. It did not reset to the first category's drinks.

   <img src="../../99%20Archive/QA%20Evidence/organizations/product-category-url-2026-11-19/03-category-after-reload.jpg" width="600" alt="Second category and its products retained after reload" />

## TC-03 Reopen the address in a fresh tab

**What this tests:** The resulting address reopens the selected category and Organizer in a new tab.

**Start here:** Use the exact `/o/1859-qa-cad/categories/2403/` address produced by the public category click.

1. **Open that address in a fresh in-app browser tab.**

   **Expected:** Same Organizer, selected second category, Anime Shirt and BING BONG.

   **Actual — Passed:** The fresh tab opened the same category-specific address and displayed the same Organizer and both products. It did not reopen drinks. The new tab shared the existing session; no independent Customer/private-browser session or actual message/share was tested.

   <img src="../../99%20Archive/QA%20Evidence/organizations/product-category-url-2026-11-19/04-category-fresh-tab.jpg" width="600" alt="Fresh tab reopens category 2403 and both merchandise products" />

## Cleanup and limits

The two temporary test tabs were closed. The original Venue 1547 profile tab was returned to its original root address with Events selected. No product, category, basket, Organization settings or other saved business data changed.

No bug was confirmed. This proves the observed category selection is reopenable on this beta profile; it does not establish the deployment revision, a specific fixing commit, every category/Organizer, French routing or anonymous sharing. The conditional Product decision about whether all category selections must be shareable remains separate from this observed passing behavior.

## Results

| Check and step | Status | Observed result |
| --- | --- | --- |
| [TC-01 — Select category, steps 1–2](#tc-01-select-the-second-category) | Passed | Different products; URL changed to `/categories/2403/` |
| [TC-02 — Reload, step 1](#tc-02-reload-the-category-url) | Passed | Same category, Organizer and merchandise products |
| [TC-03 — Fresh tab, step 1](#tc-03-reopen-the-address-in-a-fresh-tab) | Passed | Same category-specific URL and products reopened |
