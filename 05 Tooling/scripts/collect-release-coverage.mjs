#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const vault = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const repositories = path.dirname(vault);
const args = { query: [], results: [] };
const options = new Set(['query', 'results', 'qase-snapshot']);
for (let i = 2; i < process.argv.length; i++) {
  const key = process.argv[i].replace(/^--/, '');
  if (key === 'help') {
    console.log('Usage: node "05 Tooling/scripts/collect-release-coverage.mjs" --query <literal text> [--query <another term>] [--read-qase | --qase-snapshot <file>] [--results <Playwright JSON file>]\nReads source/test candidates and optional existing cases/results. No Qase writes, test execution or coverage verdicts. Redirect output to a temporary JSON file.');
    process.exit(0);
  }
  if (key === 'read-qase') { args.readQase = true; continue; }
  if (!options.has(key) || !process.argv[i + 1] || process.argv[i + 1].startsWith('--')) throw new Error(`Unknown or incomplete option: --${key}`);
  const value = process.argv[++i];
  if (key === 'query' || key === 'results') args[key].push(value);
  else args.snapshot = value;
}
if (!args.query.length || args.query.some(value => !value.trim())) throw new Error('Supply at least one non-empty --query term.');
if (args.readQase && args.snapshot) throw new Error('Choose a live Qase read or a snapshot, not both.');
const matches = value => args.query.some(term => String(value).toLowerCase().includes(term.toLowerCase()));

function git(root, ...parameters) {
  try { return execFileSync('git', ['-C', root, ...parameters], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return null; }
}

function findCandidates(root, folders, globs) {
  const locations = folders.map(folder => path.join(root, folder)).filter(existsSync);
  if (!locations.length) return { available: false, files: [], truncated: false };
  try {
    const parameters = ['-l', '-i', '-F', ...globs.flatMap(glob => ['-g', glob]), '-g', '!**/evidence/**', '-g', '!**/locales/generated/**'];
    for (const term of args.query) parameters.push('-e', term);
    const output = execFileSync('rg', [...parameters, '--', ...locations], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
    const files = [...new Set(output.trim().split('\n').filter(Boolean))].sort();
    return { available: true, matchCount: files.length, files: files.slice(0, 100), truncated: files.length > 100 };
  } catch (error) {
    if (error.status === 1) return { available: true, matchCount: 0, files: [], truncated: false };
    throw new Error('Source search failed; check that rg is installed and the repository paths are readable.');
  }
}

function qaseEnvironment() {
  const values = {};
  const file = path.join(vault, '.env');
  if (existsSync(file)) {
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*(QASE_TESTOPS_API_TOKEN|QASE_API_TOKEN|QASE_PROJECT_CODE)\s*=\s*(.*?)\s*$/);
      if (match) values[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
  const token = process.env.QASE_TESTOPS_API_TOKEN || process.env.QASE_API_TOKEN || values.QASE_TESTOPS_API_TOKEN || values.QASE_API_TOKEN;
  const project = process.env.QASE_PROJECT_CODE || values.QASE_PROJECT_CODE;
  if (!token || !project || !/^[A-Z0-9_-]+$/i.test(project)) throw new Error('Qase token/project is unavailable; use the existing vault .env or process environment.');
  return { token, project };
}

async function readQase() {
  const { token, project } = qaseEnvironment();
  const cases = [], ids = new Set();
  let total;
  do {
    const url = new URL(`https://api.qase.io/v1/case/${project}`);
    url.searchParams.set('limit', '100');
    url.searchParams.set('offset', String(cases.length));
    let response;
    try { response = await fetch(url, { headers: { Token: token }, signal: AbortSignal.timeout(20000) }); }
    catch { throw new Error('Qase read could not connect or timed out; no complete snapshot was produced.'); }
    if (!response.ok) throw new Error(`Qase read failed with HTTP ${response.status}; no complete snapshot was produced.`);
    const body = await response.json();
    const result = body.result;
    if (body.status !== true || !result || !Number.isSafeInteger(result.total) || result.total < 0 || !Array.isArray(result.entities)) throw new Error('Qase returned an invalid case page.');
    if (total !== undefined && total !== result.total) throw new Error('Qase case count changed during the read; retry a fresh complete scan.');
    total = result.total;
    if (!result.entities.length && cases.length < total) throw new Error('Qase returned an incomplete case page.');
    for (const item of result.entities) {
      if (!Number.isSafeInteger(item.id) || item.id < 1 || ids.has(item.id)) throw new Error('Qase returned a missing/duplicate case identity.');
      ids.add(item.id);
      cases.push(item);
    }
    if (cases.length > total) throw new Error('Qase returned more cases than its declared total.');
  } while (cases.length < total);
  return { project, retrievedAt: new Date().toISOString(), complete: true, total, cases };
}

function loadSnapshot(file) {
  const input = JSON.parse(readFileSync(file, 'utf8'));
  const raw = input.qaseSnapshot ?? input;
  const cases = Array.isArray(raw) ? raw : raw.cases;
  if (!Array.isArray(cases) || cases.some(item => !Number.isSafeInteger(item?.id) || item.id < 1) || new Set(cases.map(item => item.id)).size !== cases.length) throw new Error('Snapshot must contain unique, valid Qase case records.');
  return { project: raw.project ?? null, retrievedAt: raw.retrievedAt ?? null, total: cases.length, complete: raw.complete === true && raw.total === cases.length && Boolean(raw.project && raw.retrievedAt), cases };
}

function readResults(file) {
  const report = JSON.parse(readFileSync(file, 'utf8'));
  if (!Array.isArray(report.suites) || !report.config || !report.stats) throw new Error('Results input must be a Playwright JSON report, not a discovery list or a suite-level success summary.');
  const checks = [];
  let attemptCount = 0;
  function walk(suites) {
    for (const suite of suites) {
      for (const spec of suite.specs ?? []) {
        for (const test of spec.tests ?? []) {
          attemptCount += test.results?.length ?? 0;
          if (!matches(`${spec.title} ${spec.file}`)) continue;
          const attempts = (test.results ?? []).map(result => ({ retry: result.retry, status: result.status, duration: result.duration, startedAt: result.startTime }));
          const annotations = [...(test.annotations ?? []), ...(test.results ?? []).flatMap(result => result.annotations ?? [])];
          checks.push({ title: spec.title, file: spec.file, line: spec.line, project: test.projectName, expectedStatus: test.expectedStatus, outcome: test.status, firstAttemptPassed: test.expectedStatus === 'passed' && attempts[0]?.status === 'passed' && attempts[0]?.retry === 0, attempts, qaseIds: [...new Set(annotations.filter(item => item.type === 'QaseID' && /^[1-9]\d*$/.test(item.description)).map(item => Number(item.description)))] });
        }
      }
      walk(suite.suites ?? []);
    }
  }
  walk(report.suites);
  if (!attemptCount) throw new Error('The results file contains no test attempts; discovery is not execution evidence.');
  return { file: path.resolve(file), metadata: report.config.metadata ?? {}, stats: report.stats, reportErrors: report.errors?.length ?? 0, recordedAttemptCount: attemptCount, matchingChecks: checks, applicability: 'Requires comparison with the current release build, configuration and exact assertions.' };
}

try {
  const sources = {};
  for (const [name, folders, globs] of [
    ['web-app', ['apps'], ['*.py']],
    ['showpass-frontend', ['packages/core/src'], ['*.ts', '*.tsx']],
    ['showpass-playwright', ['tests', 'pages', 'flows', 'fixtures', 'shared', 'utils'], ['*.ts']],
  ]) {
    const root = path.join(repositories, name);
    sources[name] = { root, revision: git(root, 'rev-parse', 'HEAD'), branch: git(root, 'branch', '--show-current'), trackedChangesPresent: git(root, 'status', '--porcelain', '--untracked-files=no')?.length > 0, ...findCandidates(root, folders, globs) };
  }
  const snapshot = args.readQase ? await readQase() : args.snapshot ? loadSnapshot(args.snapshot) : null;
  const candidates = snapshot?.cases.filter(item => matches(JSON.stringify(item))) ?? [];
  const output = {
    collectedAt: new Date().toISOString(), query: args.query,
    meaning: 'Candidate evidence only. An agent must review full case contents, current source, assertions and result applicability before assigning Full/Partial/None. No tests ran during collection.',
    sources,
    qase: snapshot ? { project: snapshot.project, retrievedAt: snapshot.retrievedAt, snapshotComplete: snapshot.complete, matchingCases: candidates, matchedCount: candidates.length, snapshotCaseCount: snapshot.cases.length, candidateReview: 'Not reviewed', absenceConclusion: 'Unknown until scope and full candidate contents are reviewed' } : { snapshotComplete: false, candidateReview: 'Unknown; Qase was not read' },
    playwrightResults: args.results.map(readResults),
    browserNotes: findCandidates(vault, ['03 Test Cases'], ['*.md']),
  };
  // Preserve a reusable complete snapshot alongside candidates only for live reads.
  if (args.readQase) output.qaseSnapshot = snapshot;
  console.log(JSON.stringify(output, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
