---
title: Websites QA Library
tags:
  - qa/test-cases
---

# Websites QA Library

A saved Website page configuration can change the public Event selection, checkout handoff, domain or locale. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Start with a controlled site, one published route and one Draft change. Compare the saved editor content with the actual public route and its owning Event when authorized to publish. Preserve publication state in the handoff.

## Connected features

- [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Integrations → Domains]]
- [[03 Test Cases/Widget/Widget QA Library]]
- [[03 Test Cases/AI Chat/AI Chat QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-5135](https://app.qase.io/case/SPT-5135) · Websites - Configure and render purchase-flow and embedded event controls
- [SPT-5842](https://app.qase.io/case/SPT-5842) · Web Public - Websites - Preserve published routes branding and locale across history
