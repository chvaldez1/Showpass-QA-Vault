---
title: SPW-21188 Read More - Browser Test Report
date: 2026-11-26
tags:
  - qa/browser-testing
  - accessibility
---

# Read More on the Neon Encore ticket description

## Overview

**Passed in the Codex browser sidebar on Beta.** A signed-in buyer could Tab to **Read More** for **Club Night General Admission**, then expand and collapse the description using either Enter or Space. Focus stayed on the button. The browser accessibility tree showed the button as collapsed and expanded in the corresponding states. No bugs were confirmed. Screen reader speech was not run.

## Test index

- [TC-01 Keyboard activation and focus](#tc-01-keyboard-activation-and-focus)
- [TC-02 Accessibility role, state and description](#tc-02-accessibility-role-state-and-description)
- [TC-03 Screen reader announcement](#tc-03-screen-reader-announcement)

## Setup

- **Environment and record.** Showpass Beta, November 26, 2026, about 2:15 p.m. MST. Event **Neon Encore K-pop Club Night (QA)**, Organization `1859-qa-cad`. The deployed frontend revision was unknown. [Beta Event](https://beta.showpass.com/neon-encore-k-pop-club-night-qa/)
- **Session.** Existing signed-in buyer session in the Codex in-app browser. Customer Tester owned execution after preflight. The Release Engineer reviewed the plan, and the independent QA Lead approved Plan 1 before browser interaction.
- **Fixture.** The **Tickets** dialog showed **Club Night General Admission** and a December 5, 2026, 10:00 a.m. EST sale start. Its long description and disclosure were already visible.
- **Finishing point.** Leave the description collapsed with zero ticket selections.

## TC-01 Keyboard activation and focus

**What this tests.** A buyer can reveal and hide the ticket description with the keyboard without losing their place.

**Start here.** Open the Beta Event above in a signed-in buyer session.

1. Select **BUY TICKETS**. From the **Tickets** dialog’s initial focus, press Tab twice.

   **Expected.** Focus moves to **Close modal**, then to **Read More** beneath the **Club Night General Admission** description.

   **Actual — Passed.** Focus followed that order. The browser identified **Read More** as a focused, collapsed button. The collapsed screenshot below was captured after the last cycle, in the same focused state.

2. With focus on **Read More**, press Enter twice. Then press Space twice without moving focus between presses.

   **Expected.** The first press of each key expands the description and changes the label to **Show Less**. The second collapses it and brings back **Read More**. Focus stays on the button after every press.

   **Actual — Passed.** Both keys completed both actions. In each cycle the description went from 40 px high to 300 px and back to 40 px. The label and focus matched the expected state after every press.

   <img src="../../99%20Archive/QA%20Evidence/read-more/2026-11-26-neon-encore/show-less-expanded.jpg" alt="Focused Show Less button after expanding the ticket description" width="175">

   <img src="../../99%20Archive/QA%20Evidence/read-more/2026-11-26-neon-encore/read-more-collapsed.jpg" alt="Focused Read More button after collapsing the ticket description" width="175">

   Beta Tickets dialog, November 26, 2026, about 2:15 p.m. MST. Evidence crops show the button labels and focus outline.

## TC-02 Accessibility role, state and description

**What this tests.** The browser exposes the control as a button and identifies the description it expands.

**Start here.** Repeat TC-01 with the sidebar accessibility tree available.

1. Inspect the focused button in each state. Compare `aria-expanded` and `aria-controls` on the button and check what `aria-controls` points to.

   **Expected.** The accessibility tree shows a collapsed **Read More** button and an expanded **Show Less** button. `aria-expanded` changes from `false` to `true` and back. `aria-controls` identifies the same ticket description throughout.

   **Actual — Passed.** The accessibility tree showed both button names and states. DOM inspection after each keypress confirmed the expected value of `aria-expanded`. `aria-controls=":rc:"` resolved to the same description container throughout this run. The screenshots in TC-01 show both corresponding visible button states.

## TC-03 Screen reader announcement

**What this tests.** The spoken announcement conveys the control name, button role, and expanded or collapsed state.

**Start here.** Use a browser session with a screen reader running. Open the same **Tickets** dialog and Tab to **Read More**.

1. Listen on focus, expand with Enter, and collapse with Enter.

   **Expected.** The screen reader conveys the button’s name and disclosure state on focus and after activation.

   **Actual — Not run.** The sidebar tools exposed the accessibility tree and DOM attributes. They provided no screen reader speech output.

## End state

The **Tickets** dialog remained open with **Read More** collapsed. Quantity was zero and **Checkout** was disabled. The test exercised the signed-in buyer view on this Event only. [PR #8074](https://github.com/showpass/showpass-frontend/pull/8074) · [SPW-21188](https://showpass.atlassian.net/browse/SPW-21188)

## Results

| Check | Status | Observed result |
| --- | --- | --- |
| [TC-01 Keyboard activation and focus](#tc-01-keyboard-activation-and-focus) | Passed | Tab reached the button. Enter and Space each expanded and collapsed it while focus stayed on the button. |
| [TC-02 Accessibility role, state and description](#tc-02-accessibility-role-state-and-description) | Passed | The browser exposed both button names and states. The description reference resolved in both states. |
| [TC-03 Screen reader announcement](#tc-03-screen-reader-announcement) | Not run | Screen reader speech was unavailable in the sidebar. |
