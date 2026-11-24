"""Isolated Git fixtures verify refresh safety and comparison direction."""

import importlib.util
from pathlib import Path
import subprocess
import tempfile
import unittest


spec = importlib.util.spec_from_file_location("collector", Path(__file__).with_name("collect_branches.py"))
collector = importlib.util.module_from_spec(spec)
spec.loader.exec_module(collector)


def git(repo, *args):
    return subprocess.run(["git", "-C", str(repo), *args], text=True, capture_output=True, check=True).stdout.strip()


class CollectionTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="showpass-digest-test-", dir="/private/tmp")
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        self.remote = root / "remote.git"
        self.work = root / "work"
        self.clone = root / "clone"
        subprocess.run(["git", "init", "--bare", str(self.remote)], capture_output=True, check=True)
        subprocess.run(["git", "init", "-b", "main", str(self.work)], capture_output=True, check=True)
        for key, val in (("user.name", "Digest fixture"), ("user.email", "digest@example.invalid"), ("commit.gpgsign", "false")):
            git(self.work, "config", key, val)
        self.commit("base.txt", "base", "Base")
        git(self.work, "remote", "add", "origin", str(self.remote))
        git(self.work, "push", "-u", "origin", "main")
        git(self.remote, "symbolic-ref", "HEAD", "refs/heads/main")
        git(self.work, "checkout", "-b", "develop")
        self.commit("branch.txt", "branch", "SPW-12345 Add branch behavior (#42)")
        git(self.work, "push", "-u", "origin", "develop")
        subprocess.run(["git", "clone", "-b", "develop", str(self.remote), str(self.clone)], capture_output=True, check=True)
        for key, val in (("user.name", "Digest fixture"), ("user.email", "digest@example.invalid"), ("commit.gpgsign", "false")):
            git(self.clone, "config", key, val)

    def commit(self, filename, body, message):
        (self.work / filename).write_text(body)
        git(self.work, "add", "--", filename)
        git(self.work, "commit", "-m", message)

    def collect(self, **kwargs):
        return collector.collect(self.clone, "fixture", kwargs.get("target"), kwargs.get("base"), "origin", kwargs.get("offline", False))

    def test_fast_forward_and_ahead_behind_direction(self):
        self.commit("later.txt", "later", "SPW-12346 Another change")
        git(self.work, "push")
        git(self.work, "checkout", "main")
        self.commit("base-only.txt", "baseline", "Main-only work")
        git(self.work, "push")
        result = self.collect()
        self.assertNotIn("error", result)
        self.assertTrue(result["fully_refreshed"])
        self.assertEqual(result["target_only_commits"], 2)
        self.assertEqual(result["base_only_commits"], 1)
        self.assertEqual({x["path"] for x in result["files"]}, {"branch.txt", "later.txt"})
        self.assertEqual(len(result["commits"]), 2)
        self.assertEqual(result["commits"][0]["jira_keys"], ["SPW-12346"])
        self.assertEqual(result["target_sha"], git(self.clone, "rev-parse", "HEAD"))

    def test_dirty_checkout_is_preserved_while_base_fetches(self):
        before = git(self.clone, "rev-parse", "HEAD")
        (self.clone / "branch.txt").write_text("user-owned edit")
        self.commit("later.txt", "remote", "Remote addition")
        git(self.work, "push")
        result = self.collect()
        self.assertEqual(result["refresh"]["fetch"], "Succeeded")
        self.assertIn("local edits", result["refresh"]["pull"])
        self.assertEqual(git(self.clone, "rev-parse", "HEAD"), before)
        self.assertEqual((self.clone / "branch.txt").read_text(), "user-owned edit")
        self.assertTrue(result["local_edits_excluded"])
        self.assertFalse(result["fully_refreshed"])

    def test_divergence_does_not_create_merge_or_rebase(self):
        (self.clone / "local.txt").write_text("local")
        git(self.clone, "add", "local.txt")
        git(self.clone, "commit", "-m", "Local commit")
        before = git(self.clone, "rev-parse", "HEAD")
        self.commit("remote.txt", "remote", "Remote commit")
        git(self.work, "push")
        result = self.collect()
        self.assertFalse(result["fully_refreshed"])
        self.assertEqual(git(self.clone, "rev-parse", "HEAD"), before)
        self.assertEqual(git(self.clone, "status", "--porcelain"), "")

    def test_offline_is_not_current_and_empty_comparison_is_honest(self):
        result = self.collect(target="origin/main", offline=True)
        self.assertFalse(result["fully_refreshed"])
        self.assertEqual(result["target_only_commits"], 0)
        self.assertEqual(result["files"], [])
        self.assertEqual(result["commits"], [])

    def test_detached_head_is_not_pulled(self):
        git(self.clone, "checkout", "--detach")
        before = git(self.clone, "rev-parse", "HEAD")
        result = self.collect()
        self.assertIn("detached HEAD", result["refresh"]["pull"])
        self.assertEqual(result["target_sha"], before)

    def test_missing_upstream_is_reported(self):
        git(self.clone, "branch", "--unset-upstream")
        result = self.collect()
        self.assertIn("local-only", result["refresh"]["pull"])
        self.assertFalse(result["fully_refreshed"])

    def test_deleted_remote_base_is_not_accepted_from_stale_cache(self):
        git(self.remote, "symbolic-ref", "HEAD", "refs/heads/develop")
        git(self.work, "push", "origin", ":main")
        result = self.collect()
        self.assertIn("Neither remote master nor main", result["error"])

    def test_two_bases_use_fresh_remote_default_instead_of_cached_head(self):
        git(self.work, "branch", "master", "main")
        git(self.work, "push", "origin", "master")
        git(self.remote, "symbolic-ref", "HEAD", "refs/heads/master")
        result = self.collect()
        self.assertEqual(result["base_ref"], "refs/remotes/origin/master")

    def test_invalid_repository_does_not_raise_to_caller(self):
        result = collector.collect(Path(self.temp.name) / "missing", "missing", None, None, "origin", False)
        self.assertEqual(result["comparison_status"], "Blocked")

    def test_remote_credentials_are_removed(self):
        result = collector.remote_info("https://username:secret@bitbucket.org/showpass/web-app.git?token=secret")
        self.assertEqual(result["url"], "https://bitbucket.org/showpass/web-app")
        self.assertNotIn("secret", str(result))
        self.assertEqual(collector.remote_info("git@github.com:showpass/showpass-frontend.git")["provider"], "github")


if __name__ == "__main__":
    unittest.main()
