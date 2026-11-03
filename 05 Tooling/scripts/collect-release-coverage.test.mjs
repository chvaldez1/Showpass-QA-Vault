import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = mkdtempSync('/private/tmp/showpass-coverage-collector-tests-');
after(() => execFileSync('rm', ['-rf', directory]));
const command = fileURLToPath(new URL('./collect-release-coverage.mjs', import.meta.url));
const query = 'synthetic-coverage-assertion';
function file(name, data) {
  const target = path.join(directory, name);
  writeFileSync(target, JSON.stringify(data));
  return target;
}
function run(...args) {
  return spawnSync(process.execPath, [command, '--query', query, ...args], { encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 });
}

test('offline collection leaves Qase unknown and makes no coverage verdict', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.qase.snapshotComplete, false);
  assert.match(output.qase.candidateReview, /Unknown/);
  assert.match(output.meaning, /No tests ran/);
});

test('matching expected results finds candidates without treating them as reviewed', () => {
  const snapshot = file('snapshot.json', { project: 'SPT', retrievedAt: '2026-10-31T12:00:00Z', complete: true, total: 2, cases: [
    { id: 1, title: 'Unrelated title', steps: [{ expected_result: query }] },
    { id: 2, title: 'Another unrelated case', steps: [] },
  ] });
  const result = run('--qase-snapshot', snapshot);
  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.qase.snapshotCaseCount, 2);
  assert.equal(output.qase.matchedCount, 1);
  assert.equal(output.qase.matchingCases[0].id, 1);
  assert.equal(output.qase.candidateReview, 'Not reviewed');
  assert.match(output.qase.absenceConclusion, /Unknown/);
});

test('a plain imported array cannot claim snapshot completeness', () => {
  const result = run('--qase-snapshot', file('array.json', [{ id: 1, title: query }]));
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).qase.snapshotComplete, false);
});

test('duplicate case IDs reject a supposedly complete snapshot', () => {
  const result = run('--qase-snapshot', file('duplicates.json', [{ id: 1 }, { id: 1 }]));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /unique/);
});

function report(results) {
  return { config: { metadata: { applicationBuildRevision: null, testRevision: 'synthetic-revision' } }, stats: {}, suites: [{ specs: [{ title: query, file: 'synthetic.test.ts', line: 1, tests: [{ projectName: 'DesktopChrome', expectedStatus: 'passed', status: 'flaky', results }] }] }] };
}

test('a retry pass keeps the failed first attempt and unknown application build', () => {
  const input = file('retry.json', report([{ retry: 0, status: 'failed' }, { retry: 1, status: 'passed' }]));
  const result = run('--results', input);
  assert.equal(result.status, 0, result.stderr);
  const evidence = JSON.parse(result.stdout).playwrightResults[0];
  assert.equal(evidence.matchingChecks[0].firstAttemptPassed, false);
  assert.deepEqual(evidence.matchingChecks[0].attempts.map(a => a.status), ['failed', 'passed']);
  assert.equal(evidence.metadata.applicationBuildRevision, null);
});

test('discovery-only data is rejected as execution evidence', () => {
  const result = run('--results', file('discovery.json', report([])));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /discovery is not execution evidence/);
});
