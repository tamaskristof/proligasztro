// Where the poll and the comment form send their data: the Cloudflare Worker in worker/ (README.md → "Backend").
// Both values are public. Fill them in once the Worker is deployed; while API_URL is empty the poll and the
// form only pretend, as in the design system.
const API = 'https://proligasztro-api.proligasztro-api.workers.dev';
const TURNSTILE = '0x4AAAAAAGVhyrLQ5IQzW8H_';   // Turnstile site key (the public one; the secret is in the Worker)

// For local work against `npm run dev` in worker/, override them in .env:
//   PUBLIC_API_URL=http://localhost:8787
//   PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA   (Cloudflare's always-pass test key)
export const API_URL = (import.meta.env.PUBLIC_API_URL ?? API).replace(/\/$/, '');
export const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? TURNSTILE;
export const backend = API_URL ? { api: API_URL, turnstileKey: TURNSTILE_SITE_KEY } : {};
