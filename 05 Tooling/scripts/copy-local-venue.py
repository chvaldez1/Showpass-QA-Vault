"""Create and check the local parent/child Venues, separately from Events.

Entry points (load this file with runpy.run_path):
    copy_local_venue(input_path)                       -- offline preview
    copy_local_venue(input_path, owner_email=..., apply=True)
                                                     -- Django shell: create both
    verify_local_venue(input_path, venue_id=...)       -- Django shell: read/check

Pass the CHILD input; its parent_input file supplies the parent automatically.
Use the returned venue_id (child) for copy_local_event. Do not call _create_venue
directly: the public function owns environment checks and the shared transaction.

Progress is timestamped in UTC and flushed immediately. IDs printed while the
transaction is open are provisional. Exceptions are re-raised; a FAILED line
does not establish whether a database commit/connection failure saved anything.
Check the records before retrying. No owner email or credentials are logged.

Only selected fields and the local parent link are checked. Fees, module prices,
flags and other related configuration are reported as deferred, not verified.
See the local setup instructions in Production Event Copy to Beta Investigation.
"""

import json
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from time import perf_counter
from unittest.mock import patch


VENUE_FIELDS = {
    "name", "currency", "timezone", "unit_number", "street_name", "city",
    "province", "postal_code", "country", "pricing_tier", "fee_structure",
    "shipping_quantity_limit_message", "barcode_delivery",
    "package_revenue_realization_type", "is_test", "is_disabled", "is_parent",
    "tax_on_fees", "allow_shipping", "shipping_quantity_limit_enabled",
    "allow_delivery_ticket_transfers", "allow_guest_checkout",
    "ticket_transfers_enabled", "all_in_pricing_is_enabled",
    "allow_recurring_events", "enable_multi_layer_packages",
    "disable_event_refunds", "enable_automated_returns", "category",
    "shipping_quantity_limit", "barcode_delivery_delay", "modules_enabled",
    "allowed_shipping_countries", "blocked_shipping_regions",
    "exchange_tickets_fees_type", "exchange_tickets_fees_type_box_office",
}


def progress(message):
    """Print one immediate, UTC-stamped step without dumping account settings."""
    timestamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    print(f"[local-copy {timestamp}] {message}", flush=True)


@contextmanager
def track_operation(name, mode):
    """Report elapsed time and failures; preserve the original exception."""
    started = perf_counter()
    progress(f"{name} {mode} STARTED")
    try:
        yield
    except Exception as error:
        progress(
            f"{name} {mode} FAILED after {perf_counter() - started:.2f}s "
            f"({type(error).__name__}). Read the exception before retrying."
        )
        raise
    else:
        progress(f"{name} {mode} COMPLETE in {perf_counter() - started:.2f}s")


def load_venue_plan(input_path):
    """Read the child and its one root-parent input; connect to no database."""
    input_path = Path(input_path)
    plan = json.loads(input_path.read_text())
    if plan.get("parent_input"):
        parent = json.loads((input_path.parent / plan["parent_input"]).read_text())
        if (
            parent["source_venue_id"] != plan.get("source_parent_venue_id")
            or parent.get("source_parent_venue_id") is not None
            or parent.get("parent_input")
            or not parent["venue"].get("is_parent")
        ):
            raise ValueError("Expected the supplied root parent followed by its child Venue.")
        plan["_parent_plan"] = parent
    elif plan.get("source_parent_venue_id") is not None:
        raise ValueError("Supply the parent input before creating the child Venue.")
    return plan


def require_venue_data(plan):
    """Reject missing basic settings and fields outside the test-copy allowlist."""
    if not plan.get("venue") or "unresolved" not in plan:
        raise ValueError("Supply Venue settings and an explicit unresolved list.")
    if plan["unresolved"]:
        raise ValueError("Venue is not ready: " + "; ".join(plan["unresolved"]))
    if set(plan["venue"]) - VENUE_FIELDS:
        raise ValueError("Venue input contains fields outside the selected test settings.")
    if plan.get("_parent_plan"):
        require_venue_data(plan["_parent_plan"])


def require_local_database():
    """Reject non-DEV or non-loopback database configuration before model queries."""
    from django.conf import settings

    database = settings.DATABASES["default"]
    if not settings.IS_DEV or database.get("HOST") not in {"127.0.0.1", "localhost", "::1"}:
        raise ValueError("These helpers only write to a DEV database on localhost.")


@contextmanager
def local_setup_only():
    """Suppress process-local email/Slack delivery and task dispatch during setup."""
    from django.test import override_settings

    with override_settings(
        EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
        SLACK_BOT_ENABLED=False,
        CELERY_TASK_ALWAYS_EAGER=False,
        ALLOW_CELERY_BYPASS=False,
    ):
        with patch("celery.app.task.Task.apply_async") as queued_jobs:
            yield queued_jobs


def check_venue(venue, plan):
    """Check selected saved settings and the parent link, without asserting fee parity."""
    from core.timezones.canonicalization import canonicalize_venue_timezone

    require_venue_data(plan)
    progress(f"Checking local Venue ID {venue.pk}: {len(plan['venue'])} selected fields")
    venue.refresh_from_db()
    for field, value in plan["venue"].items():
        expected = venue._meta.get_field(field).to_python(value)
        actual = getattr(venue, field)
        if field == "timezone":
            expected = canonicalize_venue_timezone(
                value, country=venue.country, province=venue.province,
            )
            actual = str(actual)
        elif field in {"modules_enabled", "blocked_shipping_regions", "allowed_shipping_countries"}:
            actual, expected = set(actual or []), set(expected or [])
        if actual != expected:
            raise ValueError(f"Venue {venue.pk}: {field} does not match the Venue input.")
    if venue.is_disabled:
        raise ValueError("The local Venue is disabled.")
    parent = plan.get("_parent_plan")
    if parent:
        if venue.parent_venue_id is None:
            raise ValueError("The child Venue is not linked to its local parent.")
        check_venue(venue.parent_venue, parent)
    elif venue.parent_venue_id is not None:
        raise ValueError("The root Venue unexpectedly has a parent.")
    progress(f"PASS: local Venue ID {venue.pk}, selected settings and parent link")
    return {
        "venue_id": venue.pk,
        "parent_venue_id": venue.parent_venue_id,
        "supplied_fields_match": True,
        "verification_scope": "selected_venue_fields_and_parent_link",
        "financial_configuration_verified": False,
        "deferred": plan.get("deferred", []),
    }


def _create_venue(plan, owner, parent=None):
    """Internal: create one Venue inside the caller's transaction and suppression.

    owner is an existing active local User. parent is the newly created LOCAL
    parent instance, never a production ID. The returned row is still provisional;
    copy_local_venue checks both records before its transaction finishes.
    """
    from venues.models import Venue, VenueEmployment

    role = "child" if parent else "root"
    progress(f"Creating {role} Venue '{plan['venue']['name']}' from source Venue {plan['source_venue_id']}")
    venue = Venue(**plan["venue"], parent_venue=parent)
    if venue.is_parent:
        # Required by Venue validation; use only the existing local owner.
        venue.confirmation_email_on_suborg_registration = [owner.email]
        progress("Using the local owner for the required parent registration recipient")
    if "7" in plan["venue"].get("modules_enabled", []):
        venue.enable_exchange_module()
    save_options = {
        "sync_zendesk": False,
        "sync_company_marketing": False,
        "sync_quickbooks": False,
        "sync_stripe_product_statement_descriptor": False,
        "sync_salesforce": False,
    }
    venue.save(**save_options)
    progress(f"Saved local Venue ID {venue.pk} (transaction open)")
    # Creation can enable new default features. Reapply the explicitly selected
    # values through the normal save path, then compare fresh database values.
    for field, value in plan["venue"].items():
        setattr(venue, field, Venue._meta.get_field(field).to_python(value))
    venue.save(update_fields=set(plan["venue"]), **save_options)
    progress(f"Reapplied selected settings for local Venue ID {venue.pk}")
    progress(f"Creating roles and local owner access for Venue ID {venue.pk}")
    venue.create_default_roles()
    venue.add_employee_owner([owner.email])
    if not VenueEmployment.objects.filter(venue=venue, employee=owner, is_owner=True).exists():
        raise ValueError("Local owner access was not created.")
    progress(f"PASS: local owner access for Venue ID {venue.pk}")
    if parent:
        progress(f"Linked local child Venue ID {venue.pk} to local parent Venue ID {parent.pk}")
    return venue


def copy_local_venue(input_path, owner_email=None, *, apply=False):
    """Preview or create the selected Venue and its supplied parent.

    input_path: path to the CHILD JSON; the parent is loaded automatically.
    owner_email: existing active local login, required only for apply; never logged.
    apply: False reads files only. True requires a configured local Django shell.

    Returns a plan in preview, or a dict with the new child venue_id, parent ID,
    source-to-local mapping and deferred work after apply. Creation is one atomic
    operation; an exception is re-raised with a FAILED progress line. This does
    not create an Event or verify financial configuration.
    """
    with track_operation("Venue copy", "APPLY" if apply else "PREVIEW"):
        plan = load_venue_plan(input_path)
        progress("Loaded Venue inputs; source IDs will be remapped to new local IDs")
        parent = plan.get("_parent_plan")
        create_order = ([parent] if parent else []) + [plan]
        summary = {
            "mode": "apply" if apply else "preview",
            "source_venue_id": plan["source_venue_id"],
            "venue": plan["venue"],
            "create_order": [
                {"source_venue_id": item["source_venue_id"], "settings": item["venue"]}
                for item in create_order
            ],
            "unresolved": plan["unresolved"],
            "status": "blocked" if any(item["unresolved"] for item in create_order) else "requires_local_verification",
            "creates_events": False,
            "financial_configuration_verified": False,
            "deferred": plan.get("deferred", []),
            "warnings": [warning for item in create_order for warning in item.get("warnings", [])],
        }
        for warning in summary["warnings"]:
            progress(f"WARNING: {warning}")
        if not apply:
            progress("Preview only: no Django/database access and no records created")
            print(json.dumps(summary, indent=2))
            return summary

        # Fail before Django imports or database access when the source data is incomplete.
        progress("Checking required data and DEV/localhost database configuration")
        require_venue_data(plan)
        require_local_database()
        progress("PASS: required input and local environment checks")

        from django.db import transaction
        from users.models import User
        from venues.models import Venue

        if not owner_email:
            raise ValueError("Pass the email address you use to sign in locally.")
        progress("Looking up the existing active local owner")
        owner = User.objects.get(email=owner_email, is_active=True)
        progress("PASS: active local owner found")
        with local_setup_only() as queued_jobs:
            progress("Opening Venue transaction; checking for existing destination names")
            with transaction.atomic():
                if Venue.objects.filter(name__in=[item["venue"]["name"] for item in create_order]).exists():
                    raise ValueError("A Venue with this name already exists. Verify it instead of creating another.")
                local_parent = _create_venue(parent, owner) if parent else None
                venue = _create_venue(plan, owner, parent=local_parent)
                progress("Verifying both saved Venues before finishing the transaction")
                result = check_venue(venue, plan)
                result["source_to_local_venue_ids"] = {str(plan["source_venue_id"]): venue.pk}
                if local_parent:
                    result["source_to_local_venue_ids"][str(parent["source_venue_id"])] = local_parent.pk
            progress(f"Venue transaction finished: child ID {venue.pk}; parent ID {venue.parent_venue_id}")
            result["background_jobs_not_dispatched"] = queued_jobs.call_count
            progress(f"Background jobs not dispatched: {queued_jobs.call_count}")
        progress("Fees and other deferred configuration remain unverified")
        print(json.dumps(result, indent=2))
        return result


def verify_local_venue(input_path, venue_id):
    """Read/check the existing local CHILD Venue and its parent; create nothing.

    Pass the same child input and the local venue_id returned by copy_local_venue.
    The return dict identifies the checked child and parent. Missing records or
    mismatched settings raise; fees and other deferred settings are not checked.
    """
    with track_operation("Venue verification", "READ ONLY"):
        progress(f"Loading expected settings for local child Venue ID {venue_id}")
        plan = load_venue_plan(input_path)
        require_venue_data(plan)
        require_local_database()
        from venues.models import Venue

        result = check_venue(Venue.objects.get(pk=venue_id), plan)
        print(json.dumps(result, indent=2))
        return result
