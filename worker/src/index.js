/*
 * Proligasztró API (Cloudflare Worker + D1).
 *
 *   GET  /results?poll=<name>  real vote counts for one poll: { counts: [n, n, n, n] }
 *   POST /vote                 { poll, option } -> { counts, duplicate }
 *   POST /comment              { slug, nev, email, web, szoveg, token, hp, elapsed } -> { ok }
 *
 * The site adds the made-up starting votes from src/lib/polls.js on top of the real counts.
 * Comments are only queued here; /moderate approves them into the post's MDX.
 */
import { polls } from '../../src/lib/polls.js';

const POLL_OPTIONS = Object.fromEntries(polls.map((p) => [p.name, p.options.length]));

const LIMITS = { name: 40, email: 100, url: 200, text: 2000, minText: 3 };
const COMMENTS_PER_HOUR = 3;
const MIN_FILL_MS = 3000; // a human needs longer than this to write anything

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    try {
      let res;
      if (request.method === 'GET' && url.pathname === '/results') res = await results(url, env);
      else if (request.method === 'POST' && url.pathname === '/vote') res = await vote(request, env);
      else if (request.method === 'POST' && url.pathname === '/comment') res = await comment(request, env);
      else res = json({ error: 'not_found' }, 404);
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
      return res;
    } catch (err) {
      console.error(err);
      return json({ error: 'server' }, 500, cors);
    }
  },
};

/* ---------- polls ---------- */

async function counts(env, poll) {
  const n = POLL_OPTIONS[poll];
  const { results: rows } = await env.DB.prepare('SELECT option, COUNT(*) AS c FROM votes WHERE poll = ? GROUP BY option')
    .bind(poll).all();
  const out = new Array(n).fill(0);
  for (const r of rows) if (r.option >= 0 && r.option < n) out[r.option] = r.c;
  return out;
}

async function results(url, env) {
  const poll = url.searchParams.get('poll');
  if (!poll || !Object.hasOwn(POLL_OPTIONS, poll)) return json({ error: 'unknown_poll' }, 400);
  return json({ counts: await counts(env, poll) }, 200, { 'Cache-Control': 'public, max-age=30' });
}

async function vote(request, env) {
  const body = await readJson(request);
  const poll = body && body.poll;
  const option = body && body.option;
  if (typeof poll !== 'string' || !Object.hasOwn(POLL_OPTIONS, poll) || !Number.isInteger(option) || option < 0 || option >= POLL_OPTIONS[poll]) {
    return json({ error: 'bad_vote' }, 400);
  }
  const voter = await ipHash(request, env);
  const r = await env.DB.prepare('INSERT OR IGNORE INTO votes (poll, option, voter) VALUES (?, ?, ?)')
    .bind(poll, option, voter).run();
  return json({ counts: await counts(env, poll), duplicate: r.meta.changes === 0 });
}

/* ---------- comments ---------- */

async function comment(request, env) {
  const b = await readJson(request);
  if (!b) return json({ error: 'bad_request' }, 400);

  // Bots: the honeypot is filled, or the form came back faster than anyone can type.
  // Answer "ok" so they don't learn anything, and store nothing.
  if (b.hp || !(Number(b.elapsed) >= MIN_FILL_MS)) return json({ ok: true });

  const slug = str(b.slug);
  const name = str(b.nev).slice(0, LIMITS.name);
  const email = str(b.email).slice(0, LIMITS.email);
  let web = str(b.web);
  if (web === 'http://' || web === 'https://') web = '';
  const text = str(b.szoveg);

  if (!/^[a-z0-9-]{1,100}$/.test(slug)) return json({ error: 'bad_slug' }, 400);
  if (text.length < LIMITS.minText) return json({ error: 'too_short' }, 400);
  if (text.length > LIMITS.text) return json({ error: 'too_long' }, 400);
  if (web && (web.length > LIMITS.url || !/^https?:\/\/[^\s]+$/i.test(web))) return json({ error: 'bad_url' }, 400);

  if (!(await turnstileOk(b.token, request, env))) return json({ error: 'captcha' }, 403);

  const ip = await ipHash(request, env);
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS c FROM comments WHERE ip_hash = ? AND created_at > strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-1 hour')",
  ).bind(ip).first();
  if (recent.c >= COMMENTS_PER_HOUR) return json({ error: 'rate_limited' }, 429);

  await env.DB.prepare('INSERT INTO comments (slug, name, email, url, text, ip_hash) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(slug, name || null, email || null, web || null, text, ip).run();
  return json({ ok: true });
}

async function turnstileOk(token, request, env) {
  if (!token || typeof token !== 'string') return false;
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const data = await r.json();
  return data.success === true;
}

/* ---------- helpers ---------- */

async function ipHash(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const bytes = new TextEncoder().encode(env.IP_SALT + '|' + ip);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim());
  if (!origin || !allowed.includes(origin)) return { Vary: 'Origin' };
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function str(v) {
  return typeof v === 'string' ? v.trim() : '';
}

async function readJson(request) {
  try {
    const raw = await request.text();
    if (raw.length > 16384) return null;
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : null;
  } catch { return null; }
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}
