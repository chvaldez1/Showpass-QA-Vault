---
title: SPW-21414 Organization Membership API Coverage
date: 2026-11-24
tags:
  - qa/coverage
  - memberships
  - api-testing
---

# SPW-21414 Organization Membership API Coverage

**Manual API smoke complete** · In the user-supplied Beta key-only responses for Organization `1859`, page 1 returned Member `18437` and pointed to page 2, which returned Member `18438` and pointed back to page 1. Both pages had exactly one result and the same total count of `1735`. The detail response for `18438` matched its list row, including Customer ID, Group and Level IDs, and both names. The key-only response omitted `username`, `barcode_string`, and `scan_code`. The pasted evidence did not include HTTP status codes. An earlier Dashboard session response shows the legacy Member fields.

The Beta key-only `?id=135592` list returned `count: 1`, one result with that ID, and no next page. Its Group ID `20438`, Level ID `9831`, and both names match the earlier Dashboard session response. The capture confirms the `id` filter and provides a baseline for the rename check.

**Scope** · [SPW-21414](https://showpass.atlassian.net/browse/SPW-21414) and [PR 12554](https://bitbucket.org/showpass/web-app/pull-requests/12554). Backend merge `afbad82a49` against `48426dbc52`, present in local `web-app` checkout `62067009a8`. Frontend reference `12a457dd28`. Developer keys can list and retrieve issued Memberships for their Organization. The existing Dashboard path continues to use its session response. This review checked read behavior, key issuance coverage, and the contract. No changes were made to Beta or Qase.

| # | Behavior | Coverage | Execution and exact gap |
| --- | --- | --- | --- |
| 1 | Issue a scoped key and paginate | **Partial.** The Membership suite issues a `memberships:read` key in its setup, checks real HTTP middleware, and asserts ordered page 1 and page 2. Generic key API coverage checks creation and one-time secret disclosure with another scope. | Beta response content confirms pagination across pages 1 and 2. HTTP codes and the route used to issue the key were not supplied. The exact Membership test does not exercise issuance through the signed-in POST or Dashboard. |
| 2 | Match list/detail and hide private fields | **Full.** `test_list_and_detail_return_exact_current_names_and_identifiers` compares both shapes and asserts the exact eleven fields. | Beta body comparison passed for Member `18438`. Status codes not captured in chat. |
| 3 | Current names after rename and nullable Group | **Partial.** The backend test re-reads detail after renaming and separately verifies `null` Group ID/name and a populated Level in both list and detail. | No Beta execution evidence. The renamed Group and Level should also be asserted on the list after the save. |
| 4 | Exact filters, bounds and no broadening of access | **Partial for exact codes.** `test_reviewed_filters_and_stable_pagination` asserts matching IDs for the five filters. `test_unreviewed_invalid_or_oversized_queries_are_rejected` checks rejection but accepts either `400` or `403` for each input. | Beta response content confirms the `id` filter. Exact expected codes can be pinned down in the existing backend test. Invalid bounds, unsupported `q`, and repeated filters should be `400`. `show_all=true` should be `403`. |
| 5 | Wrong Organization, wrong Member, wrong scope and blocked writes | **Full.** `test_cross_organization_route_and_member_are_denied` and `test_unrelated_scopes_and_membership_writes_are_denied` assert the exact codes and that the Member remains. | No Beta execution evidence. Use the isolated regression results for these checks. |
| 6 | Current permissions and legacy reads | **Full.** `test_reduced_employment_is_denied_and_cannot_issue_scope` and `test_revoked_key_and_removed_employment_are_denied` cover the key's current access. The existing `test_venue_based_members.py` exercises signed-in `q`, Member code and Level filters. | The earlier Beta session response shows legacy fields. Existing filters, employment changes, and revocation have no execution evidence for this review. |
| 7 | Generated contract and published reference | **Partial.** The checked-in OpenAPI and contract tests cover only the two GET operations, the scope, employee permission, exact fields, nullable Group, and examples. | Local `--check` stopped because the available Python environment lacks Django. The companion public reference could not be verified. Use the configured backend environment to get the generator result and verify the deployed guide and OpenAPI artifact. |

## Rename check · Unrun

In Beta Organization `1859`, use the Group and Level below if both are approved for renaming. Record the original names. Save distinctive new values for **Membership Name** and the Level **Name**, then reopen both forms to confirm the saves. [Edit Membership Group 20438](https://beta.showpass.com/manage/memberships/20438) · [Edit Membership Level 9831](https://beta.showpass.com/manage/memberships/20438/levels/9831)

With the existing `memberships:read` Developer API key and `Authorization: Token <developer-key>`, make these two read-only requests after the saves.

| GET | Expected |
| --- | --- |
| [Member list filtered to 135592](https://beta.showpass.com/api/venue/1859/memberships/members/?id=135592) | `200`, `count: 1`, one row for `135592`, Group `20438`, Level `9831`, and both newly saved names. |
| [Member 135592 detail](https://beta.showpass.com/api/venue/1859/memberships/members/135592/) | `200`, the same Member, Group and Level IDs, and both newly saved names. |

Record the HTTP statuses, IDs, and `membership_group_name` and `membership_level_name` values. Restore the original names after the comparison and confirm the restore in the forms.

## Backend regression matrix · Execution unverified

Use the isolated backend results for permissions, filters, and edge cases. The focused modules are `memberships.tests.members.test_api_venue_based_developer_members`, `memberships.tests.members.test_venue_based_members`, and `venues.tests.developer.test_keys`. No matching CI test results were accessible. Local Django startup needed `drf_spectacular`, and the local database services were unavailable.

For the Membership list and detail, use `Authorization: Token <developer-key>` and a key scoped to the test Organization. Beta examples use Organization `1859` and the previously captured test data. Use the approved test Organization and IDs if executing elsewhere.

| Remaining check | Method and path | Expected |
| --- | --- | --- |
| Prepared Member with no Group | `GET /api/venue/1859/memberships/members/?id=<no-group-member-id>` and `GET /api/venue/1859/memberships/members/<no-group-member-id>/` | `200`. `membership_group` and `membership_group_name` are `null`. Level ID and name are populated. Existing backend test checks this. |
| Pin exact query errors | `GET /api/venue/1859/memberships/members/?page_size=101`, `?page=1001`, `?q=test`, `?id=18438&id=18438`, and `?show_all=true` | First four return `400`. The final one returns `403`. Run isolated automated cases for each input. |
| Check exact filter selections | `GET /api/venue/1859/memberships/members/` with one of `?id=18438`, `?membership_group=18198`, `?membership_level=7061`, `?venue_user=55231`, `?status=ms_expired` | `200`. Every returned row matches the supplied field. Use more than one known Member in the local setup so the filter can exclude a row. |
| Check Organization, Member and key boundaries | `GET /api/venue/<other-test-org-id>/memberships/members/`; `GET /api/venue/1859/memberships/members/<other-org-member-id>/`; `GET /api/venue/1859/memberships/members/` with wrong-scope or disabled test credentials | Wrong Organization or scope `403`. Foreign Member `404`. Key revoked or employee removed `401`. Active employment with unrelated permission only `403`. Use prepared fixtures and backend results. |
| Key issuance path | `POST /api/venue/1859/developer/keys/` with `name` and `scopes: ["memberships:read"]`, signed in as an eligible employee | `201` and a secret returned once. Exact scope issuance belongs in the isolated backend evidence. |
| Excluded operations | `POST /api/venue/1859/memberships/members/`, `PUT`, `PATCH` or `DELETE /api/venue/1859/memberships/members/<member-id>/`, and `GET /api/venue/1859/memberships/members/csv/` | `403` with the Membership read key. Keep the write checks in the isolated backend suite so a regression cannot change a Beta Member. |
| Existing session read | `GET /api/venue/1859/memberships/members/?q=<known-test-member-name>` using a signed-in Dashboard session | Existing search and legacy response fields still work. |

## OpenAPI and published guide

**Checked-in artifact passed.** The stored OpenAPI document is valid, includes exactly the two GET routes, and both example responses validate. `membership_group_name` accepts `null` when there is no Group. `membership_level_name` requires a string. Generator parity still needs `python -m tools.developer_docs.memberships --check` in a configured backend environment. [Checked-in OpenAPI](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/contracts/organization-memberships.openapi.json>)

**Publication check.** On November 24, the dedicated download returned `404`. The general public OpenAPI downloaded successfully and did not contain the Organization Member routes or `memberships:read`. Verify the published guide and download after publication. Expect both GETs, scope and **Manage Memberships** permission, pagination, filters, errors, and examples showing IDs and current names. [Dedicated download](https://dev.showpass.com/openapi/organization-memberships.openapi.json) · [General OpenAPI](https://dev.showpass.com/openapi/openapi.yaml)

## Evidence reviewed

* [Membership Developer API tests](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/tests/members/test_api_venue_based_developer_members.py), [key tests](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/tests/developer/test_keys.py), [existing Member tests](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/tests/members/test_venue_based_members.py), [contract tests](/Users/christianvaldez/Documents/Showpass/repos/web-app/tools/developer_docs/test_memberships.py), and [backend contract](/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/organization_membership_reads.md).
* The coverage collector read all 2,486 Qase cases in project SPT on November 24, 2026. It found zero candidates for `SPW-21414`, `memberships:read`, `organization-memberships`, `Read memberships`, or `/memberships/members/`. An additional title scan for `Developer API`, `API key`, `Organization Member`, and `Member List` found none. This establishes that no matching saved case was found by those searches. There were no relevant Playwright search hits at `72062b88` and no matching Playwright execution results were supplied.
* The user-supplied Beta results establish the observed response content. Key secrets and legacy scan credentials are omitted from this note.
