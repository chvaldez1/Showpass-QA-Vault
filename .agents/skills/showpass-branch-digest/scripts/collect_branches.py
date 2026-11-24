#!/usr/bin/env python3
"""Refresh two existing checkouts safely and collect pinned branch evidence.

Standard library only. JSON is evidence for a source-reading agent, not release notes.
"""

import argparse
import json
import os
from pathlib import Path
import re
import subprocess
from datetime import datetime
from urllib.parse import urlsplit
from zoneinfo import ZoneInfo


class GitError(RuntimeError):
    pass


def git(repo, *args, optional=False):
    env = dict(os.environ, GIT_TERMINAL_PROMPT="0")
    try:
        result = subprocess.run(
            ["git", "-C", str(repo), *args], capture_output=True,
            text=True, errors="replace", env=env, timeout=120,
        )
    except subprocess.TimeoutExpired as exc:
        raise GitError(f"git {args[0]} timed out after 120 seconds") from exc
    if result.returncode and not optional:
        # Never echo arbitrary remote responses or embedded credentials.
        reasons = [
            "Could not resolve host", "Authentication failed", "Permission denied",
            "Operation not permitted", "Connection refused", "Not possible to fast-forward",
            "couldn't find remote ref", "not a git repository", "could not read Username",
        ]
        reason = next((x for x in reasons if x.lower() in result.stderr.lower()), "command failed")
        raise GitError(f"git {args[0]}: {reason} (exit {result.returncode})")
    return result


def value(repo, *args):
    return git(repo, *args).stdout.strip()


def resolve(repo, ref):
    return value(repo, "rev-parse", "--verify", "--end-of-options", ref + "^{commit}")


def exists(repo, ref):
    return git(repo, "rev-parse", "--verify", "--end-of-options", ref + "^{commit}", optional=True).returncode == 0


def remote_info(url):
    if "://" in url:
        parsed = urlsplit(url)
        host, path = parsed.hostname or "unknown", parsed.path.strip("/")
    elif ":" in url and not url.startswith("/"):
        host, path = url.split(":", 1)
        host = host.rsplit("@", 1)[-1]
    else:
        return {"provider": "local", "url": "local repository"}
    path = path.removesuffix(".git")
    provider = {"github.com": "github", "bitbucket.org": "bitbucket"}.get(host, "unknown")
    return {"provider": provider, "host": host, "repository": path, "url": f"https://{host}/{path}"}


def branch_exists(repo, remote, branch):
    return exists(repo, f"refs/remotes/{remote}/{branch}")


def select_base(repo, remote, requested, fresh=False):
    if requested:
        if git(repo, "check-ref-format", f"refs/heads/{requested}", optional=True).returncode:
            raise GitError("Invalid base branch name; supply a branch name, not a SHA or revision expression")
        if not branch_exists(repo, remote, requested):
            raise GitError(f"Remote base {remote}/{requested} is unavailable")
        return f"refs/remotes/{remote}/{requested}"
    candidates = [b for b in ("master", "main") if branch_exists(repo, remote, b)]
    if len(candidates) == 1:
        return f"refs/remotes/{remote}/{candidates[0]}"
    default = git(repo, "symbolic-ref", "--quiet", f"refs/remotes/{remote}/HEAD", optional=True).stdout.strip()
    if len(candidates) > 1 and fresh:
        response = value(repo, "ls-remote", "--symref", remote, "HEAD")
        match = re.search(r"^ref: refs/heads/(.+)\tHEAD$", response, re.MULTILINE)
        default = f"refs/remotes/{remote}/{match.group(1)}" if match else ""
    if default in [f"refs/remotes/{remote}/{b}" for b in candidates]:
        return default
    raise GitError("Base ambiguous: specify --backend-base/--frontend-base" if candidates else "Neither remote master nor main exists")


def in_progress(repo):
    for name in ("MERGE_HEAD", "CHERRY_PICK_HEAD", "REVERT_HEAD", "rebase-merge", "rebase-apply", "BISECT_LOG", "sequencer"):
        location = value(repo, "rev-parse", "--path-format=absolute", "--git-path", name)
        if Path(location).exists():
            return name
    return None


def collect(repo, label, requested_target, requested_base, remote, offline):
    item = {"name": label, "path": str(repo), "warnings": [], "refresh": {}}
    try:
        value(repo, "rev-parse", "--show-toplevel")
        git(repo, "check-ref-format", f"refs/remotes/{remote}/check")
        current = git(repo, "symbolic-ref", "--quiet", "--short", "HEAD", optional=True).stdout.strip()
        item["current_branch"] = current or "detached HEAD"
        before = resolve(repo, "HEAD")
        dirty = bool(value(repo, "status", "--porcelain=v1", "--untracked-files=normal"))
        item["local_edits_excluded"] = dirty
        upstream = git(repo, "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}", optional=True).stdout.strip() if current else ""
        item["upstream"] = upstream or None
        item["remote"] = remote_info(value(repo, "remote", "get-url", remote))
        operation = in_progress(repo)
        if offline:
            item["refresh"]["fetch"] = "Skipped: explicitly offline"
            item["refresh"]["pull"] = "Skipped: explicitly offline"
        else:
            # Explicit full branch refspec makes main/master and selected targets
            # fresh even for clones configured to fetch a single branch.
            try:
                git(repo, "fetch", "--prune", "--no-tags", remote, f"+refs/heads/*:refs/remotes/{remote}/*")
                item["refresh"]["fetch"] = "Succeeded"
            except GitError as exc:
                item["refresh"]["fetch"] = str(exc)
                item["warnings"].append("Remote refresh failed; any comparison uses cached refs")
            reason = None
            if item["refresh"]["fetch"] != "Succeeded":
                reason = "fetch failed"
            elif dirty:
                reason = "checkout has local edits; preserved without stashing"
            elif operation:
                reason = f"Git operation in progress: {operation}"
            elif not current:
                reason = "detached HEAD"
            elif not upstream:
                reason = "no upstream; current branch is local-only"
            if reason:
                item["refresh"]["pull"] = "Skipped: " + reason
            else:
                try:
                    git(repo, "pull", "--ff-only", "--no-rebase")
                    item["refresh"]["pull"] = "Succeeded"
                except GitError as exc:
                    item["refresh"]["pull"] = str(exc)
        item["head_before"] = before
        item["head_after"] = resolve(repo, "HEAD")
        item["fully_refreshed"] = all(item["refresh"].get(k) == "Succeeded" for k in ("fetch", "pull"))
        if not item["fully_refreshed"]:
            item["warnings"].append("Not fully refreshed; see fetch/pull results")
        if value(repo, "rev-parse", "--is-shallow-repository") == "true":
            item["warnings"].append("Shallow clone; history/comparison may be incomplete")
        base = select_base(repo, remote, requested_base, item["refresh"].get("fetch") == "Succeeded")
        if not requested_target or requested_target in (current, "HEAD"):
            target = "HEAD"
        elif requested_target.startswith(remote + "/"):
            target = "refs/remotes/" + requested_target
        elif requested_target.startswith("refs/"):
            target = requested_target
        elif branch_exists(repo, remote, requested_target):
            target = f"refs/remotes/{remote}/{requested_target}"
        else:
            target = requested_target
        base_sha, target_sha = resolve(repo, base), resolve(repo, target)
        item.update(base_ref=base, target_ref=target, target_branch=requested_target or current or "detached HEAD", base_sha=base_sha, target_sha=target_sha)
        ancestors = value(repo, "merge-base", "--all", base_sha, target_sha).splitlines()
        item["merge_bases"] = ancestors
        if len(ancestors) != 1:
            raise GitError("Comparison blocked: no unique best common ancestor")
        ancestor = ancestors[0]
        item["merge_base_sha"] = ancestor
        behind, ahead = value(repo, "rev-list", "--left-right", "--count", f"{base_sha}...{target_sha}").split()
        item.update(base_only_commits=int(behind), target_only_commits=int(ahead))
        raw_stats = git(repo, "diff", "--no-ext-diff", "--no-renames", "--numstat", "-z", ancestor, target_sha, "--").stdout
        stats = {}
        for row in raw_stats.split("\0"):
            if row:
                added, removed, path = row.split("\t", 2)
                stats[path] = {"insertions": int(added) if added != "-" else None, "deletions": int(removed) if removed != "-" else None}
        names = git(repo, "diff", "--no-ext-diff", "--no-renames", "--name-status", "-z", ancestor, target_sha, "--").stdout.split("\0")
        item["files"] = [{"status": names[i], "path": names[i + 1], **stats.get(names[i + 1], {})} for i in range(0, len(names) - 1, 2)]
        raw_commits = git(repo, "log", "-z", "--format=%H%x00%P%x00%aI%x00%B", f"{base_sha}..{target_sha}", "--").stdout.split("\0")
        item["commits"] = []
        for i in range(0, len(raw_commits) - 1, 4):
            sha, parents, date, message = raw_commits[i:i + 4]
            item["commits"].append({"sha": sha, "parents": parents.split(), "date": date, "message": message.strip(), "jira_keys": sorted(set(re.findall(r"\b[A-Z][A-Z0-9]+-\d+\b", message)))})
        item["branch_jira_keys"] = sorted(set(re.findall(r"\b[A-Z][A-Z0-9]+-\d+\b", requested_target or current)))
        item["file_count"] = len(item["files"])
        item["comparison_status"] = "Collected; source review not yet performed"
    except (GitError, OSError, ValueError) as exc:
        item["error"] = str(exc)
        item["comparison_status"] = "Blocked"
    return item


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    root = Path(__file__).resolve().parents[5]
    parser.add_argument("--backend", type=Path, default=Path(root) / "web-app")
    parser.add_argument("--frontend", type=Path, default=Path(root) / "showpass-frontend")
    for repo in ("backend", "frontend"):
        parser.add_argument(f"--{repo}-target", help="Target branch/ref; default is the current branch")
        parser.add_argument(f"--{repo}-base", help="Remote base branch name; default is verified master/main")
    parser.add_argument("--remote", default="origin")
    parser.add_argument("--offline", action="store_true", help="Explicitly use cached refs; do not claim current data")
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    if args.remote.startswith("-"):
        parser.error("--remote must be a remote name, not an option")
    result = {"collected_at": datetime.now(ZoneInfo("America/Edmonton")).isoformat(), "timezone": "America/Edmonton", "offline": args.offline, "repositories": []}
    for name in ("backend", "frontend"):
        result["repositories"].append(collect(getattr(args, name), name, getattr(args, name + "_target"), getattr(args, name + "_base"), args.remote, args.offline))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + "\n")
    for item in result["repositories"]:
        print(json.dumps({k: item[k] for k in ("name", "current_branch", "refresh", "comparison_status", "error", "target_only_commits", "base_only_commits", "file_count") if k in item}))
    return 1 if any("error" in item or not item.get("fully_refreshed") for item in result["repositories"]) else 0


if __name__ == "__main__":
    raise SystemExit(main())
