# Guestlist QA Gap Analysis

## Summary

Read-only QA gap analysis for Guestlist coverage in Qase suite 571. Existing Qase coverage covers core dashboard happy paths, but backend behavior includes additional public widget validation, booked-only reservations, rejection/date-change notifications, check-in categories/stats, CSV error handling, SMS parsing edge cases, employee stats exports, and websocket updates.

## Sources Reviewed

- Qase suite 571: cases 3774, 3775, 3776, 3777, 4793, 4794
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reservations/models.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reservations/api/venue_based/viewsets.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reservations/api/venue_based/serializers.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reservations/api/public/serializers.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reservations/tasks.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reservations/forms.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/user_based/serializers.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/user_based/viewsets.py`
- Backend tests: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reservations/tests/test_api.py`
- Backend tests: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/tests/test_api.py`

## Existing Qase Coverage

- `3774` Guestlist permissions: `VP_VIEW_RESERVATIONS` can access check-in and cannot create/edit/delete.
- `3775` Guestlist check-in: plus/minus controls update and persist checked-in count.
- `3776` Guestlist approval: manager approves a pending widget submission.
- `3777` SMS guestlist: simple SMS webhook creates a guestlist for tomorrow.
- `4793` Dashboard guestlist creation: create entry for event/today, date switching, refresh persistence.
- `4794` Bulk CSV upload: download template, upload valid CSV, entries appear.

## Source-Backed Behavior

- Reservation statuses are `PENDING`, `APPROVED`, and `REJECTED`; `status` is synced with deprecated `is_approved`.
- Public/widget reservations default to `PENDING`, require name/email/arrival date, reject past dates, enforce web reservation limits, can attach logged-in users, and produce analytics registration events.
- Dashboard reservations default to employee/web source and approved status; booked-reservation endpoint creates pending reservations scoped to the booking employee.
- Approval and rejection set `approved_by`, spawn customer emails/push notifications, and write activity records.
- Arrival date changes on non-new reservations trigger date-change notifications when status is not changing at the same time.
- Guestlist check-ins are separate records with category and gender, update venue-user stats flags, support stats endpoints, and require date-range filtering for check-in list queries.
- CSV upload validates every row before async import; invalid rows return line-specific validation errors, while valid async rows are approved and send confirmation emails.
- SMS reservation parsing supports plus-one settings, default venue time, optional date/time/party size, details, multiple reservations in one SMS, partial success, employee phone matching, and Twilio signature validation.
- Reason management supports widget-specific reasons and soft-delete behavior.
- Reservation websocket consumers emit reservation/check-in changes scoped to a single venue.

## Coverage Gaps

- Public/widget submission validation is mostly uncovered: required fields, past date rejection, reservation-limit enforcement, logged-in customer sync, and pending status.
- Rejection flow is uncovered: manager rejects pending reservation, customer is notified, status becomes rejected, and rejected records no longer count as active/not-rejected where applicable.
- Date-change behavior is uncovered: approved reservation date/time updates trigger date-change notification without also sending status-change notifications.
- Booked guestlist flow is uncovered: `VP_EDIT_BOOKED_RESERVATIONS` creates pending reservations and can only list reservations booked by the current employee.
- CSV negative and async behavior is weak: invalid row line errors, all-or-nothing validation before task dispatch, and confirmation emails after import are not covered.
- SMS coverage is too narrow: no invalid time/date, no missing name, no multi-line partial success, no plus-one mode difference, no custom default time, and no unmatched employee phone behavior.
- Check-in backend edge cases are uncovered: category/gender-specific check-ins, delete with no existing check-in, required date-range filter, and aggregate stats by male/female/category/event/booked_by.
- Reason management and soft delete are uncovered.
- Employee stats CSV export and daily reservation CSV email jobs are uncovered.
- Websocket venue scoping for reservation/check-in updates is uncovered.

## Risk Areas

- Guestlist capacity limits can be bypassed or over-enforced depending on source (`WIDGET`, `EMPLOYEE`, `SMS`) and permission.
- Pending/approved/rejected status transitions can desync from `is_approved`, creating wrong dashboard state or notifications.
- SMS parser ambiguity can create wrong party size/date/time, especially with plus-one mode and multi-line messages.
- CSV upload can partially import bad data or fail without a clear line-level error.
- Check-in counts and stats can drift if check-in delete/category/gender behavior is not verified.
- Employee-scoped booked reservations can leak other employees' guestlists.
- Notifications can be duplicated or skipped on approval, rejection, date change, CSV import, and widget submission.

## Suggested Qase-Ready Cases

### Test Case 1: Verify public widget guestlist validation and pending status

**Priority:** High  
**Type:** Negative / Regression  
**Area:** Guestlist widget

#### Step 1: Submit valid widget request

**GIVEN** a venue has guestlists enabled, an active widget reason, and web reservation capacity available.  
**WHEN** a public user submits name, email, phone, party size, reason, and a future arrival date.  
**THEN** a guestlist reservation is created with source `WIDGET`, status `PENDING`, the submitted contact fields, and the selected reason.

#### Step 2: Submit invalid widget requests

**GIVEN** the same venue and widget.  
**WHEN** the user submits a past date, missing name, missing email, or party size above the web limit.  
**THEN** the request is rejected with a clear validation error and no reservation is created for that invalid submission.

### Test Case 2: Verify manager rejection and date-change notifications

**Priority:** High  
**Type:** Regression / Integration  
**Area:** Guestlist approval workflow

#### Step 1: Reject pending reservation

**GIVEN** a pending widget guestlist exists and a user has `VP_MANAGE_RESERVATIONS`.  
**WHEN** the manager rejects the reservation.  
**THEN** status changes to `REJECTED`, `approved_by` records the manager, rejection notification is sent, and the reservation is not treated as approved.

#### Step 2: Change approved reservation arrival time

**GIVEN** an approved guestlist exists with customer contact information.  
**WHEN** the manager updates only the arrival date/time.  
**THEN** the reservation persists the new arrival date/time and sends the date-change notification without also sending approval/rejection notifications.

### Test Case 3: Verify booked guestlists are scoped to the booking employee

**Priority:** Medium  
**Type:** Permission / Regression  
**Area:** Guestlist employee booking

#### Step 1: Create booked reservation

**GIVEN** an employee has `VP_EDIT_BOOKED_RESERVATIONS` but not full guestlist management.  
**WHEN** the employee creates a booked guestlist.  
**THEN** the reservation is created as source `EMPLOYEE`, status `PENDING`, and `booked_by` is the current employee.

#### Step 2: List booked reservations

**GIVEN** multiple employees have booked guestlists at the same venue.  
**WHEN** the employee opens the booked guestlist endpoint/view.  
**THEN** only guestlists booked by that employee are returned.

### Test Case 4: Verify CSV upload validates all rows before import

**Priority:** Medium  
**Type:** Negative / Integration  
**Area:** Guestlist CSV upload

#### Step 1: Upload invalid CSV

**GIVEN** a manager has guestlist management permission and a CSV contains one invalid row among otherwise valid rows.  
**WHEN** the manager uploads the CSV.  
**THEN** the upload is rejected with the invalid line number and no async import is started.

#### Step 2: Upload valid CSV

**GIVEN** every CSV row has valid reservation data.  
**WHEN** the manager uploads the CSV.  
**THEN** the async import creates approved guestlists, assigns `booked_by`, normalizes arrival date to the venue timezone, and sends confirmation emails.

### Test Case 5: Verify SMS guestlist parser edge cases

**Priority:** Medium  
**Type:** Edge Case / Integration  
**Area:** Guestlist SMS

#### Step 1: Submit multi-line SMS with one invalid line

**GIVEN** an employee phone number is linked to the venue and Twilio signature validation passes.  
**WHEN** the employee texts multiple guestlists where one line is invalid and another line is valid.  
**THEN** valid lines are created, the response reports the invalid line error, and the response indicates other reservations were created.

#### Step 2: Verify venue SMS settings

**GIVEN** a venue has a custom SMS default time and either old or new plus-one mode.  
**WHEN** the employee texts a guestlist without an explicit time or with `+N`.  
**THEN** the reservation uses the venue default time and the party size follows the configured plus-one method.

### Test Case 6: Verify check-in records, filters, and stats

**Priority:** Medium  
**Type:** Regression  
**Area:** Guestlist check-in

#### Step 1: Add and delete categorized check-ins

**GIVEN** a guestlist has available check-in categories.  
**WHEN** staff adds male/female check-ins by category and then deletes one check-in.  
**THEN** check-in records are created/deleted correctly and counts reflect the remaining records.

#### Step 2: Verify stats filters

**GIVEN** check-ins exist across dates, events, categories, and booked_by employees.  
**WHEN** staff requests check-in stats with a required arrival-date range and filters.  
**THEN** totals, male/female counts, and filtered records match only the selected scope.

## Automation Candidates

- API test: public reservation create success and validation failures.
- API test: manager approve/reject/date-change transitions and notification task dispatch.
- API test: booked reservations are scoped to `booked_by`.
- API test: CSV upload invalid row returns line-specific error before async import.
- API test: SMS parser multi-line partial success and plus-one/default-time behavior.
- API test: check-in stats require date range and count category/gender filters correctly.
- Consumer test: reservation and check-in websocket events only broadcast to the matching venue.

## Open Questions

- Should Qase include backend/API-only cases for websocket and async email/export jobs, or keep those as automation-only coverage candidates?
