#!/usr/bin/env node
// The comment moderation queue in D1 (worker/), for the /moderate skill.
//
//   npm run comments -- pending              pending comments as JSON, dates in the blog format (Budapest time)
//   npm run comments -- approve 3 4 7        mark as approved (do this after adding them to the post)
//   npm run comments -- reject 5             mark as rejected
//   ... --local                              use the local dev database instead of the real one
//
// Approving or rejecting also wipes the comment's email and IP hash: they are only needed until then.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const WORKER_DIR = fileURLToPath(new URL('../worker/', import.meta.url));
const DB = 'proligasztro';

const args = process.argv.slice(2);
const local = args.includes('--local');
const [cmd, ...rest] = args.filter((a) => a !== '--local');

function d1(sql) {
  const out = execFileSync('npx', ['wrangler', 'd1', 'execute', DB, local ? '--local' : '--remote', '--json', '--command', sql], {
    cwd: WORKER_DIR,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  const parsed = JSON.parse(out);
  return (Array.isArray(parsed) ? parsed : [parsed]).flatMap((r) => r.results || []);
}

const blogDate = new Intl.DateTimeFormat('hu-HU', {
  timeZone: 'Europe/Budapest', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});
// "2026.11.22. 23:47"
function toBlogDate(iso) {
  const p = Object.fromEntries(blogDate.formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
  return `${p.year}.${p.month}.${p.day}. ${p.hour}:${p.minute}`;
}

if (cmd === 'pending') {
  const rows = d1("SELECT id, slug, name, url, text, created_at FROM comments WHERE status = 'pending' ORDER BY slug, created_at");
  console.log(JSON.stringify(rows.map((r) => ({ ...r, date: toBlogDate(r.created_at) })), null, 2));
} else if (cmd === 'approve' || cmd === 'reject') {
  const ids = rest.map(Number);
  if (!ids.length || ids.some((n) => !Number.isInteger(n) || n <= 0)) {
    console.error('Give the comment ids as positive integers.');
    process.exit(1);
  }
  const status = cmd === 'approve' ? 'approved' : 'rejected';
  d1(`UPDATE comments SET status = '${status}', email = NULL, ip_hash = NULL WHERE status = 'pending' AND id IN (${ids.join(',')})`);
  console.log(`${status}: ${ids.join(', ')}`);
} else {
  console.error('Usage: npm run comments -- pending | approve <id…> | reject <id…> [--local]');
  process.exit(1);
}
