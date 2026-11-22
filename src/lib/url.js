// Prefix a site-absolute path ("/recept/x/") with the configured base path,
// so links work both on <user>.github.io/proligasztro/ and on a custom domain.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '/') {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  if (BASE && (path === BASE || path.startsWith(BASE + '/'))) return path;
  return BASE + (path.startsWith('/') ? path : '/' + path);
}
