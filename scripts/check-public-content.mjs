import { execFileSync } from 'node:child_process';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const privateDirectory = /(?:^|\/)(?:\.(?:ssh|aws|codex|claude)|node_modules|runtime|scratch|secrets)(?:\/|$)/i;
const privateFilename = /(?:^|\/)\.env(?:\.[^/]+)?$|\.(?:pem|key|p12|pfx|sqlite3?|db|dump|sql|log|bak)$/i;
const exampleEnv = /(?:^|\/)\.env\.(?:example|sample|template)$/i;
const privateKey = /-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/;

export function checkPublicContent(directory) {
  const root = realpathSync(directory);
  const entries = execFileSync('git', ['ls-files', '--stage', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean);
  const errors = [];
  for (const entry of entries) {
    const [, mode, name] = entry.match(/^(\d+) [a-f0-9]+ \d\t([\s\S]+)$/) || [];
    if (!name) { errors.push('Cannot inspect a tracked file entry.'); continue; }
    if (!['100644', '100755'].includes(mode)) {
      errors.push(`${name}: only regular files may be published.`);
      continue;
    }
    if (privateDirectory.test(name) || (privateFilename.test(name) && !exampleEnv.test(name))) {
      errors.push(`${name}: private runtime or credential files do not belong in public docs.`);
      continue;
    }
    const file = resolve(root, name);
    if (lstatSync(file).isSymbolicLink() || !realpathSync(file).startsWith(root + sep)) {
      errors.push(`${name}: linked or external files cannot be published.`);
      continue;
    }
    if (privateKey.test(readFileSync(file, 'utf8'))) errors.push(`${name}: private key material cannot be published.`);
  }
  return errors;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const errors = checkPublicContent(process.argv[2] || resolve(dirname(fileURLToPath(import.meta.url)), '..'));
  if (errors.length) {
    // Report filenames and reasons only, never matching file contents.
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else console.log('Public content checks passed: no private file paths, links, or private keys in tracked content.');
}
