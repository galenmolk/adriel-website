// Runs after `react-scripts build`. GitHub Pages has no server-side auth, so
// the built index.html is replaced with an AES-encrypted copy that asks for a
// password and decrypts in the browser. The password comes from SITE_PASSWORD
// in .env (git-ignored) and must not carry a REACT_APP_ prefix, or CRA would
// bundle it into the public JS.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
} catch {
  // No .env file; SITE_PASSWORD may still be set in the environment (CI).
}

const password = process.env.SITE_PASSWORD;
if (!password) {
  console.error('SITE_PASSWORD is not set. Add it to .env (see .env.example).');
  process.exit(1);
}

const build = path.join(__dirname, '..', 'build');
const index = path.join(build, 'index.html');

execFileSync(
  'npx',
  [
    'staticrypt',
    index,
    '-p',
    password,
    '--short',
    '-d',
    build,
    '--remember',
    '30',
    '--template-title',
    'Adriel Molk',
    '--template-instructions',
    'This site is private for now. Enter the password to view it.',
    '--template-button',
    'View site',
  ],
  { stdio: 'inherit' }
);

if (!fs.readFileSync(index, 'utf8').includes('staticrypt')) {
  console.error('Encryption did not replace build/index.html; refusing to continue.');
  process.exit(1);
}
console.log('build/index.html is now password protected.');
