// Blog dates ("2026.11.22. 23:47") are Budapest wall-clock time (CET in winter, CEST in summer).

const BLOG_DATE = /^(\d{4})\.(\d{2})\.(\d{2})\. (\d{2}):(\d{2})$/;

const budapest = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Budapest', hourCycle: 'h23',
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
});

/** Minutes Budapest is ahead of UTC at instant `ms` (60 or 120). */
function offsetAt(ms) {
  const p = Object.fromEntries(budapest.formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - ms) / 60000;
}

/** "2026.11.22. 23:47" -> { ms, iso } where iso carries the right offset ("+01:00" or "+02:00"). */
export function parseBlogDate(s) {
  const [, y, m, d, hh, mm] = s.match(BLOG_DATE);
  const wall = Date.UTC(+y, +m - 1, +d, +hh, +mm);
  let ms = wall - 60 * 60000;
  ms = wall - offsetAt(ms) * 60000;
  const off = offsetAt(ms);
  const iso = `${y}-${m}-${d}T${hh}:${mm}:00+${String(off / 60).padStart(2, '0')}:00`;
  return { ms, iso };
}
