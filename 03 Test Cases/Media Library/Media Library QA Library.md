---
title: Media Library QA Library
tags:
  - qa/test-cases
---

# Media Library QA Library

The shared Media Library selects or uploads an asset for an owning form such as Branding or the Website editor. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Use a test-only image and an authorized Venue. Separate asset upload, choosing the asset on a form, and saving that form. Reopen the form and check the actual output before assuming a selected preview was published.

## Connected features

- [[03 Test Cases/Branding/Branding QA Library]]
- [[03 Test Cases/Websites/Websites QA Library]]

## Existing cases

Use the linked vault notes as starting points. Check the exact feature behavior and existing coverage before adding a new definition.

## Draft cases

### TC-1: Image search stays in the Venue of the Website being edited

**Title:** Dashboard - Media Library - Show only images in the selected Website’s Venue

**Description:** An Organizer who can edit Websites in two Venues sees each Venue's own approved library uploads when choosing an image for a draft page.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Use two controlled Venues with `enable_custom_websites` confirmed on and the same Organizer account with **Manage Organization Info** in each. Label the Venues North and South for the test. Each owned Website needs a disposable draft page with an **Image** block.
* Have the setup owner upload a permitted test image into each Venue's public Media Library. Give the files distinct names with a unique shared search token, for example `LibraryScope North.png` and `LibraryScope South.png`. Record the exact shared token, Website, Venue, filename and image for each. Use no other files with that token.

**Tags:** dashboard, appearance

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the North Venue go to **Websites**, open **Edit pages** for the Website and open its draft page. On its **Image** block, open **Select media → Browse library**. | North Website and draft page | The media picker opens on the selected image field. |
| Enter the shared token in **Search media...** and wait for results. | Recorded token from the two filenames | The North image is available, and the South image is absent. |
| Close the picker without selecting an image. Switch the Dashboard to the South Venue and open **Select media → Browse library** from the South draft page's **Image** block. | South Website and draft page | The media picker opens in the South Website editor. |
| Search using the same token and wait for results. | Same recorded token | The South image is available, and the North image is absent. |

**Postconditions:** Close the picker without selection, save or publication. Record the two test filenames and which Venue showed each result.

## Proof and sources

**Status:** Local Organizer Tester draft. **Not run.** The Qase project comparison found font assets and individual ticket image replacement in [SPT-5467](https://app.qase.io/case/SPT-5467) and [SPT-5736](https://app.qase.io/case/SPT-5736). Their definitions do not verify a two-Venue Website image search.

The backend Venue-based asset viewset uses its Venue-scoped queryset and filters private assets in `apps/venues/api/venue_based/viewsets/media.py:57`. The Website editor registers `MediaLibraryField` with the current Venue ID in `WebsiteEditorPage.web.tsx:1291`. `MediaLibraryModal.web.tsx:144` and `MediaGrid.web.tsx:75` expose the selected tab and search.
