import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./check-public-content.mjs', import.meta.url));
function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'dune-docs-content-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  execFileSync('git', ['init', '-q', root]);
  writeFileSync(join(root, '.gitignore'), readFileSync(new URL('../.gitignore', import.meta.url)));
  mkdirSync(join(root, '.gitbook', 'assets'), { recursive: true });
  writeFileSync(join(root, 'README.md'), '# Public guide\n');
  writeFileSync(join(root, '.gitbook', 'assets', 'logo.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  writeFileSync(join(root, '.env.example'), 'EXAMPLE=replace-me\n');
  execFileSync('git', ['add', '.'], { cwd: root });
  return { root, run: () => spawnSync(process.execPath, [script, root], { encoding: 'utf8' }) };
}

test('public docs, GitBook assets, and placeholder environment examples are accepted', t => {
  assert.equal(fixture(t).run().status, 0);
});

test('ignored local environment files are rejected even when force-added', t => {
  const { root, run } = fixture(t);
  const sentinel = 'synthetic-local-content-must-not-appear-in-errors';
  writeFileSync(join(root, '.env'), sentinel);
  execFileSync('git', ['check-ignore', '--quiet', '.env'], { cwd: root });
  execFileSync('git', ['add', '-f', '.env'], { cwd: root });
  const result = run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /private runtime or credential files/);
  assert.ok(!(result.stdout + result.stderr).includes(sentinel));
});

test('a tracked symlink is rejected without reading its target', t => {
  const { root, run } = fixture(t);
  symlinkSync('/does-not-exist/public-content-fixture', join(root, 'linked.md'));
  execFileSync('git', ['add', 'linked.md'], { cwd: root });
  const result = run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /only regular files/);
});

test('an example filename does not allow publishing a private directory', t => {
  const { root, run } = fixture(t);
  mkdirSync(join(root, 'secrets'));
  writeFileSync(join(root, 'secrets', '.env.example'), 'EXAMPLE=replace-me\n');
  execFileSync('git', ['add', '-f', 'secrets/.env.example'], { cwd: root });
  assert.equal(run().status, 1);
});

test('private key markers are rejected even inside a Markdown attachment', t => {
  const { root, run } = fixture(t);
  writeFileSync(join(root, 'attachment.md'), '# Fixture\n' + '-----BEGIN ' + 'PRIVATE KEY-----\nsynthetic-only\n');
  execFileSync('git', ['add', 'attachment.md'], { cwd: root });
  const result = run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /private key material/);
  assert.doesNotMatch(result.stderr, /synthetic-only/);
});
