"""Create a Draft Event under an existing, checked local Venue.

Load with runpy.run_path(), then call copy_local_event(input_path, venue_id=..., apply=True).
Pass the LOCAL CHILD venue_id returned by copy_local_venue, never source ID 18350.
Preview is offline; apply requires the configured local backend's Django shell.
This stage creates only a Location and Draft Event, never a Venue or TT. Incomplete
Venue input blocks apply. A new local Venue parent/child pair must already exist.
UTC progress messages report each step; exceptions are re-raised with FAILED.
IDs printed inside the transaction remain provisional until it finishes.
"""

import json
import runpy
from pathlib import Path


def copy_local_event(input_path, venue_id=None, *, apply=False):
    """Preview or create a Draft Event under an existing checked local Venue.

    input_path: Event JSON referencing the child Venue input and Location values.
    venue_id: positive LOCAL child ID, required only for apply.
    apply: False reads files only; True creates Location + Event in one transaction.

    Returns a plan in preview, or saved Venue/Location/Event IDs, slug, Draft state,
    zero TT count and deferred work after apply. No Venues or TTs are created.
    Errors retain their exception/traceback and emit a FAILED progress line.
    """
    venue_helpers = runpy.run_path(str(Path(__file__).with_name("copy-local-venue.py")))
    with venue_helpers["track_operation"]("Event copy", "APPLY" if apply else "PREVIEW"):
        input_path = Path(input_path)
        plan = json.loads(input_path.read_text())
        progress = venue_helpers["progress"]
        progress("Loading Event input and its expected Venue hierarchy")
        venue_plan = venue_helpers["load_venue_plan"](input_path.parent / plan["venue_input"])
        if venue_plan["source_venue_id"] != plan["source_venue_id"]:
            raise ValueError("The Event and Venue inputs refer to different source Venues.")
        summary = {
            "mode": "apply" if apply else "preview",
            "source_event_id": plan["source_event_id"],
            "existing_local_venue_id": venue_id,
            "organization": venue_plan["venue"]["name"],
            "venue_blockers": venue_plan["unresolved"],
            "venue_financial_configuration_verified": False,
            "venue_deferred": venue_plan.get("deferred", []),
            "location": plan["location"]["name"],
            "event": plan["event"],
            "deferred": plan["deferred"],
        }
        if not apply:
            progress("Preview only: no Django/database access and no records created")
            print(json.dumps(summary, indent=2))
            return summary

        progress("Checking required Venue data and DEV/localhost database configuration")
        venue_helpers["require_venue_data"](venue_plan)
        venue_helpers["require_local_database"]()
        if not isinstance(venue_id, int) or isinstance(venue_id, bool) or venue_id <= 0:
            raise ValueError("Pass the existing local Venue ID returned by the Venue stage.")

        from django.db import transaction

        from tickets.models import Event, EventLocation
        from venues.models import Venue

        progress("Checking Event values and whether the destination slug already exists")
        event_values = {
            name: Event._meta.get_field(name).to_python(value)
            for name, value in plan["event"].items()
        }
        slug = plan["event"]["slug_custom"]
        if Event.objects.filter(slug=slug).exists():
            raise ValueError(f"The local copy already exists: {slug}. No records changed.")

        # This stage saves the fixture only. Do not dispatch notification/provider jobs.
        with venue_helpers["local_setup_only"]() as queued_jobs:
            progress("Opening Event transaction; locking and checking the existing local Venue")
            with transaction.atomic():
                venue = Venue.objects.select_for_update().get(pk=venue_id)
                venue_helpers["check_venue"](venue, venue_plan)

                location_values = dict(plan["location"])
                position = EventLocation._meta.get_field("position")
                location_values["position"] = position.to_python(location_values["position"])
                progress("Creating the Event Location under the existing local Venue")
                location = EventLocation.objects.create(venue=venue, **location_values)

                progress(f"Saved local Location ID {location.pk} (transaction open)")
                progress("Creating the Draft Event")
                event = Event.objects.create(venue=venue, location=location, **event_values)
                progress(f"Saved local Event ID {event.pk} (transaction open); checking saved fields and zero TTs")
                event.refresh_from_db()
                if event.status != "sp_event_draft" or event.save_pending or event.async_save:
                    raise ValueError("The Event did not finish saving as a Draft.")
                if event.tickettype_set.exists():
                    raise ValueError("Unexpected TT creation.")
                for field, expected in event_values.items():
                    if getattr(event, field) != expected:
                        raise ValueError(f"Event field {field} changed during save.")

            progress(f"PASS: Event transaction finished; Draft Event ID {event.pk}, zero TTs")
            progress(f"Background jobs not dispatched: {queued_jobs.call_count}")
            result = {
                "venue_id": venue.id,
                "location_id": location.id,
                "event_id": event.id,
                "event_slug": event.slug,
                "status": event.status,
                "tt_count": event.tickettype_set.count(),
                "venue_financial_configuration_verified": False,
                "venue_deferred": venue_plan.get("deferred", []),
                "background_jobs_not_dispatched": queued_jobs.call_count,
                "admin_path": f"/admin/tickets/event/{event.id}/change/",
                "deferred": plan["deferred"],
            }
        print(json.dumps(result, indent=2))
        return result
