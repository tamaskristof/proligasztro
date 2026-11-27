/*
 * Proligasztró components, ported from the design system bundle (components/bundle.js,
 * namespace window.Proligasztro) to an ES module so Astro can render them at build time.
 * Class names (pg-*) and markup stay identical to the design system; styles are in
 * src/styles/blog.css. Differences from the bundle are marked "site:".
 *
 * Everything renders to static HTML. Only RandomPoll (Poll) and CommentForm are hydrated
 * (client:visible) because they react to clicks. With an API URL (src/lib/backend.js) they talk to
 * the Worker in worker/; without one they pretend, as in the design system.
 */
import React from 'react';
import { withBase } from '../lib/url.js';

var h = React.createElement;

function cx() {
  var out = [];
  for (var i = 0; i < arguments.length; i++) { if (arguments[i]) out.push(arguments[i]); }
  return out.join(' ');
}
function omit(obj, keys) {
  var out = {};
  for (var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) === -1) out[k] = obj[k]; }
  return out;
}
function Link(props) {
  return h('a', Object.assign({ className: cx('pg-a', props.className), href: props.href || '#' }, omit(props, ['className', 'href'])));
}

/* ---------- Button: Windows 98 ---------- */
export function Button(props) {
  var rest = omit(props, ['className', 'children', 'type']);
  return h('button', Object.assign({ type: props.type || 'button', className: cx('pg-btn', props.className) }, rest), props.children);
}

/* ---------- NewBadge ---------- */
export function NewBadge(props) {
  return h('span', { className: cx('pg-new', props.blink === false && 'pg-new--still') }, props.children || 'ÚJ!');
}

/* ---------- WebBadge: 88x31 ---------- */
export function WebBadge(props) {
  var tone = props.tone || 'red';
  var inner = [
    props.left ? h('span', { key: 'l', className: 'pg-88__left' }, props.left) : null,
    h('span', { key: 'r', className: 'pg-88__right' }, props.right || props.children)
  ];
  var cls = cx('pg-88', 'pg-88--' + tone);
  return props.href ? h('a', { className: cls, href: props.href, title: props.title }, inner) : h('span', { className: cls, title: props.title }, inner);
}

/* ---------- Marquee ---------- */
export function Marquee(props) {
  var dur = (props.seconds || 18) + 's';
  return h('div', { className: 'pg-marquee', role: 'marquee', 'aria-label': typeof props.children === 'string' ? props.children : undefined },
    h('span', { className: 'pg-marquee__text', style: { animationDuration: dur } }, props.children));
}

/* ---------- BlogHeader ---------- */
export function BlogHeader(props) {
  var nav = props.nav || [];
  return h('header', { className: 'pg-header' },
    h('div', { className: 'pg-banner' },
      h('a', { className: 'pg-banner__title', href: props.href || withBase('/') }, props.title || 'Proligasztró'),
      h('p', { className: 'pg-banner__sub' }, props.subtitle || 'Egy ínyenc naplója. Mert valakinek ki kell mondania.')
    ),
    nav.length ? h('nav', { className: 'pg-nav', 'aria-label': 'Menü' }, nav.map(function (n, i) {
      return h(React.Fragment, { key: i },
        i ? h('span', { className: 'pg-nav__sep', 'aria-hidden': 'true' }, '|') : null,
        h('a', { href: n.href || '#', className: cx('pg-nav__link', n.active && 'is-active'), 'aria-current': n.active ? 'page' : undefined }, n.label));
    })) : null,
    props.marquee === false ? null : h(Marquee, null, props.marquee || '*** Üdvözöllek a blogomon!!! *** Szavazz a jobb oldalon! ***')
  );
}

/* ---------- BlogFooter ---------- */
// site: real readers can comment now (moderated), so only Ödön is called fictional.
var DEFAULT_NOTICE = 'A Proligasztró szatirikus oldal. Zsírosdeszka Ödön kitalált szereplő; a receptek, fotók, díjak és tápértékek szintén. A hozzászólások egy részét valódi olvasók írják, és csak moderálás után jelennek meg. A bemutatott ételek elkészítése saját felelősségre történik, de inkább ne.';
export function BlogFooter(props) {
  var badges = props.badges || [];
  return h('footer', { className: 'pg-footer' },
    badges.length ? h('div', { className: 'pg-footer__badges' }, badges.map(function (b, i) { return h(WebBadge, Object.assign({ key: i }, b)); })) : null,
    h('p', { className: 'pg-footer__line' }, props.copyright || '© 2008–' + new Date().getFullYear() + ' Zsírosdeszka Ödön. Minden jog fenntartva. A receptek másolása tilos (és értelmetlen).'),
    h('p', { className: 'pg-footer__line' }, props.updated || 'A dizájn utoljára frissítve: 2009. március 3. · 1024×768 felbontásra optimalizálva'),
    h('p', { className: 'pg-footer__notice' }, props.notice || DEFAULT_NOTICE)
  );
}

/* ---------- BlogShell ---------- */
export function BlogShell(props) {
  return h('div', { className: 'pg-tablecloth' },
    h('div', { className: 'pg-wrapper' },
      props.header,
      h('div', { className: 'pg-columns' },
        h('main', { className: 'pg-main' }, props.children),
        props.sidebar ? h('aside', { className: 'pg-sidebar' }, props.sidebar) : null
      ),
      props.footer
    )
  );
}

/* ---------- KetchupRating: pixel drops ---------- */
var DROP = [[0,5,'e'],[0,6,'e'],[0,7,'e'],[1,3,'e'],[1,4,'e'],[1,5,'f'],[1,6,'f'],[1,7,'f'],[1,8,'e'],[2,2,'e'],[2,3,'f'],[2,4,'f'],[2,5,'h'],[2,6,'h'],[2,7,'f'],[2,8,'f'],[2,9,'e'],[3,0,'e'],[3,1,'e'],[3,2,'f'],[3,3,'f'],[3,4,'h'],[3,5,'f'],[3,6,'f'],[3,7,'f'],[3,8,'f'],[3,9,'e'],[4,0,'e'],[4,1,'e'],[4,2,'f'],[4,3,'f'],[4,4,'f'],[4,5,'f'],[4,6,'f'],[4,7,'f'],[4,8,'f'],[4,9,'e'],[5,2,'e'],[5,3,'f'],[5,4,'f'],[5,5,'f'],[5,6,'f'],[5,7,'f'],[5,8,'f'],[5,9,'e'],[6,3,'e'],[6,4,'e'],[6,5,'f'],[6,6,'f'],[6,7,'f'],[6,8,'e'],[7,5,'e'],[7,6,'e'],[7,7,'e']];
var DROP_ON = { e: '#6a0a05', f: '#e0281c', h: '#ffffff' };
var DROP_OFF = { e: '#999999', f: '#e6e6e6', h: '#e6e6e6' };
export function PixelDrop(props) {
  var pal = props.on ? DROP_ON : DROP_OFF;
  return h('svg', { className: 'pg-drop', width: 16, height: 20, viewBox: '0 0 8 10', shapeRendering: 'crispEdges', 'aria-hidden': 'true', focusable: 'false' },
    DROP.map(function (p, i) { return h('rect', { key: i, x: p[0], y: p[1], width: 1, height: 1, fill: pal[p[2]] }); }));
}
var KETCHUP_LABELS = ['Meglepően ehető', 'Gyanús', 'Aggályos', 'Botrányos', 'Elfogadhatatlan', 'Gasztronómiai vészhelyzet'];
export function KetchupRating(props) {
  var max = props.max || 5;
  var value = Math.max(0, Math.min(max, props.value || 0));
  var label = props.label || KETCHUP_LABELS[Math.round(value / max * 5)];
  var drops = [];
  for (var i = 0; i < max; i++) drops.push(h(PixelDrop, { key: i, on: i < value }));
  return h('span', { className: cx('pg-rating', props.className), role: 'img', 'aria-label': 'Ketchup-index: ' + value + '/' + max + ', ' + label },
    props.hideTitle ? null : h('b', { className: 'pg-rating__title' }, 'Ketchup-index:'),
    h('span', { className: 'pg-rating__drops' }, drops),
    props.hideLabel ? null : h('span', { className: 'pg-rating__label' }, value + '/' + max + ' – ' + label)
  );
}

/* ---------- BlogPost ----------
 * site: tags may be { label, href } objects; commentsHref / shareHref replace the '#' links. */
export function BlogPost(props) {
  var tags = props.tags || [];
  var Title = props.href ? 'a' : 'span';
  var shareHref = props.shareHref || 'mailto:?subject=' + encodeURIComponent('Ezt nézd meg: ' + props.title);
  return h('article', { className: 'pg-post' },
    h('h2', { className: 'pg-post__title' }, h(Title, { href: props.href }, props.title), props.isNew ? h(NewBadge, null) : null),
    h('p', { className: 'pg-post__meta' },
      'Beküldte: ', h('b', null, props.author || 'Ödön'), ' | ', props.date || '2008.11.22. 23:47',
      tags.length ? h(React.Fragment, null, ' | Címkék: ', tags.map(function (t, i) {
        var tag = typeof t === 'string' ? { label: t } : t;
        return h(React.Fragment, { key: i }, i ? ', ' : null, h(Link, { href: tag.href }, tag.label));
      })) : null
    ),
    h('div', { className: 'pg-post__body' }, props.children),
    props.rating != null ? h('p', { className: 'pg-post__rating' }, h(KetchupRating, { value: props.rating })) : null,
    h('p', { className: 'pg-post__foot' },
      props.more ? h(React.Fragment, null, h(Link, { href: props.href }, 'Tovább »'), ' | ') : null,
      h(Link, { href: props.commentsHref }, 'Hozzászólások (' + (props.comments == null ? 0 : props.comments) + ')'), ' | ',
      h(Link, { href: props.href }, 'Közvetlen link'), ' | ',
      h(Link, { href: shareHref }, 'Elküldöm egy barátomnak')
    )
  );
}

/* ---------- DigicamPhoto ----------
 * site: a src starting with "/" gets the site base path (e.g. "/kepek/teszta.jpg").
 * href: the photo links there (listing thumbnails link to the post).
 * zoom: the photo and a „Nagyítás” link open the 640×480 file in <Lightbox>
 *       (without JavaScript they simply open the JPEG). */
export function DigicamPhoto(props) {
  var w = props.width || 320;
  var src = props.src && props.src.charAt(0) === '/' ? withBase(props.src) : props.src;
  var zoom = !!(props.zoom && src && !props.href);
  var zoomAttrs = { href: src, 'data-pg-zoom': '', 'data-caption': props.caption || '', 'data-alt': props.alt || '' };
  var img = src ? h('img', { src: src, alt: props.alt || '', width: w }) : h('div', { className: 'pg-photo__flash', role: 'img', 'aria-label': props.alt || 'Fotó helye' });
  if (src && props.href) img = h('a', { className: 'pg-photo__link', href: props.href }, img);
  else if (zoom) img = h('a', Object.assign({ className: 'pg-photo__link', title: 'Kattints a nagyításhoz!' }, zoomAttrs), img);
  return h('figure', { className: cx('pg-photo', props.align === 'right' && 'pg-photo--right', props.align === 'left' && 'pg-photo--left', props.thumb && 'pg-photo--thumb'), style: { width: w + 'px', maxWidth: '100%' } },
    h('div', { className: 'pg-photo__frame', style: { width: w + 'px', maxWidth: '100%', aspectRatio: '4 / 3' } },
      img,
      props.date === false ? null : h('span', { className: 'pg-photo__date', 'aria-hidden': 'true' }, props.date || "'08 11 22")
    ),
    props.caption ? h('figcaption', { className: 'pg-photo__caption' }, props.caption) : null,
    zoom ? h('a', Object.assign({ className: 'pg-a pg-photo__zoom' }, zoomAttrs), '[+] Nagyítás') : null
  );
}

/* ---------- Lightbox ----------
 * One per page, after the content. Opened by any [data-pg-zoom] link once initLightbox() runs.
 * No animation: it just appears, like a slow 2008 laptop showed it. */
export function Lightbox() {
  return h('dialog', { className: 'pg-lightbox', id: 'pg-lightbox', 'aria-label': 'Nagyított kép' },
    h('div', { className: 'pg-lightbox__box' },
      h('img', { className: 'pg-lightbox__img', alt: '' }),
      h('div', { className: 'pg-lightbox__bar' },
        h('div', { className: 'pg-lightbox__text' },
          h('span', { className: 'pg-lightbox__caption' }),
          h('span', { className: 'pg-lightbox__count' })),
        h('button', { type: 'button', className: 'pg-btn pg-lightbox__close' }, 'Bezárás [X]'))));
}

/* ---------- EditorNote ---------- */
export function EditorNote(props) {
  return h('div', { className: 'pg-note' },
    h('b', { className: 'pg-note__label' }, props.label || 'Szerk. megj.:'), ' ', props.children);
}

/* ---------- RecipeBox ---------- */
export function RecipeBox(props) {
  var ingredients = props.ingredients || [];
  var rows = [
    ['Elkészítési idő', props.time], ['Adag', props.servings], ['Nehézség', props.difficulty], ['Ajánlott ital', props.drink]
  ].filter(function (r) { return r[1]; });
  return h('div', { className: 'pg-recipe' },
    h('div', { className: 'pg-recipe__head' }, props.title || 'Receptkártya'),
    h('table', { className: 'pg-recipe__facts' }, h('tbody', null, rows.map(function (r, i) {
      return h('tr', { key: i }, h('th', { scope: 'row' }, r[0] + ':'), h('td', null, r[1]));
    }))),
    ingredients.length ? h('div', { className: 'pg-recipe__ing' },
      h('b', null, 'Hozzávalók:'),
      h('ul', null, ingredients.map(function (it, i) {
        return h('li', { key: i }, it.qty ? h('b', null, it.qty + ' ') : null, it.name,
          it.note ? h('span', { className: 'pg-recipe__note' }, ' (' + it.note + ')') : null);
      }))) : null
  );
}

/* ---------- StepList ---------- */
export function StepList(props) {
  var steps = props.steps || [];
  return h('div', { className: 'pg-steps' },
    h('h3', { className: 'pg-subhead' }, props.title || 'Elkészítés:'),
    h('ol', { className: 'pg-steps__list' }, steps.map(function (s, i) {
      var st = typeof s === 'string' ? { text: s } : s;
      return h('li', { key: i }, st.text, st.note ? h('span', { className: 'pg-steps__note' }, ' ' + st.note) : null);
    })));
}

/* ---------- NutritionTable ---------- */
export function NutritionTable(props) {
  var rows = props.rows || [];
  return h('div', { className: 'pg-nutri' },
    h('table', { className: 'pg-table' },
      h('caption', null, props.title || 'Tápérték (1 adag, az adag fogalma itt rugalmas)'),
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Összetevő'), h('th', { scope: 'col' }, 'Mennyiség'), h('th', { scope: 'col' }, 'NRV*'))),
      h('tbody', null, rows.map(function (r, i) {
        return h('tr', { key: i, className: cx(i % 2 && 'is-odd', r.joke && 'is-joke') },
          h('td', null, r.label), h('td', { className: 'is-num' }, r.value), h('td', { className: 'is-num' }, r.dv || '–'));
      }))),
    h('p', { className: 'pg-nutri__foot' }, props.footnote || '*Napi referencia-beviteli érték egy átlagos felnőtt számára, aki ezt utána megbánja.'));
}

/* ---------- SidebarBox ---------- */
export function SidebarBox(props) {
  var links = props.links;
  return h('section', { className: 'pg-box' },
    h('h3', { className: 'pg-box__title' }, props.title),
    h('div', { className: 'pg-box__body' },
      links ? h('ul', { className: 'pg-box__links' }, links.map(function (l, i) {
        return h('li', { key: i }, '» ', h(Link, { href: l.href }, l.label), l.count != null ? ' (' + l.count + ')' : null, l.isNew ? h(NewBadge, null) : null);
      })) : null,
      props.children)
  );
}

/* ---------- VisitorCounter ---------- */
export function VisitorCounter(props) {
  var digits = String(props.value == null ? 137482 : props.value);
  while (digits.length < (props.digits || 7)) digits = '0' + digits;
  return h('div', { className: 'pg-counter' },
    h('span', { className: 'pg-counter__label' }, props.label || 'Látogatók:'),
    h('span', { className: 'pg-counter__led', role: 'img', 'aria-label': (props.label || 'Látogatók') + ' ' + Number(digits) },
      digits.split('').map(function (d, i) { return h('span', { key: i, className: 'pg-counter__digit', 'aria-hidden': 'true' }, d); })),
    h('span', { className: 'pg-counter__since' }, props.since || '2008. május 14. óta')
  );
}

/* ---------- TagCloud ---------- */
export function TagCloud(props) {
  var tags = props.tags || [];
  return h('p', { className: 'pg-tags' }, tags.map(function (t, i) {
    var w = Math.max(1, Math.min(5, t.weight || 1));
    return h(React.Fragment, { key: i }, h(Link, { href: t.href, className: 'pg-tags__t' + w }, t.label), ' ');
  }));
}

/* ---------- Poll (hydrated) ----------
 * site: with `api` (the Worker URL) votes are real: the counts shown are the made-up starting votes
 * plus the real ones, one vote per poll per browser (localStorage) and per IP (server). */
function storageGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function storageSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
export function Poll(props) {
  var opts = props.options || [];
  var api = props.api;
  var name = props.name || 'pg-poll';
  var votedKey = 'pg-voted-' + name;
  var st = React.useState(!!props.showResults);
  var shown = st[0], setShown = st[1];
  var pick = React.useState(null);
  var rc = React.useState(null);
  var real = rc[0], setReal = rc[1];
  var bz = React.useState(false);
  var busy = bz[0], setBusy = bz[1];
  React.useEffect(function () {
    if (!api) return;
    if (storageGet(votedKey) !== null) setShown(true);
    fetch(api + '/results?poll=' + encodeURIComponent(props.pollId || ''))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && d.counts) setReal(d.counts); })
      .catch(function () {});
  }, [api, votedKey]);
  function onSubmit(e) {
    e.preventDefault();
    if (!api || pick[0] === null || busy) { setShown(true); return; }
    setBusy(true);
    fetch(api + '/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ poll: props.pollId, option: pick[0] }) })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && d.counts) { setReal(d.counts); storageSet(votedKey, String(pick[0])); } })
      .catch(function () {})
      .then(function () { setBusy(false); setShown(true); });
  }
  var votes = opts.map(function (o, i) { return (o.votes || 0) + ((real && real[i]) || 0); });
  var total = votes.reduce(function (s, v) { return s + v; }, 0) || 1;
  return h('div', { className: 'pg-poll' },
    h('p', { className: 'pg-poll__q' }, props.question),
    shown ? h('ul', { className: 'pg-poll__results' }, opts.map(function (o, i) {
      var pct = Math.round(votes[i] / total * 100);
      return h('li', { key: i },
        h('span', { className: 'pg-poll__label' }, o.label + ' – ' + pct + '%'),
        h('span', { className: 'pg-poll__track' }, h('span', { className: 'pg-poll__bar', style: { width: pct + '%' } })));
    })) : h('form', { onSubmit: onSubmit },
      opts.map(function (o, i) {
        return h('label', { key: i, className: 'pg-poll__opt' },
          h('input', { type: 'radio', name: name, checked: pick[0] === i, onChange: function () { pick[1](i); } }), ' ', o.label);
      }),
      h('div', { className: 'pg-poll__actions' }, h(Button, { type: 'submit', disabled: busy }, 'Szavazok!'), ' ',
        h('a', { className: 'pg-a', href: '#', onClick: function (e) { e.preventDefault(); setShown(true); } }, 'Eredmények'))),
    shown ? h('p', { className: 'pg-poll__total' }, 'Eddig ' + (props.totalLabel || total) + ' szavazat') : null
  );
}

/* ---------- RandomPoll (hydrated, site only) ----------
 * Shows one of `polls` at random per page view, avoiding the one shown last time (sessionStorage).
 * The server can't know the pick, so the box stays hidden until the browser has chosen. */
export function RandomPoll(props) {
  var polls = props.polls || [];
  var st = React.useState(null);
  var idx = st[0], setIdx = st[1];
  React.useEffect(function () {
    var last = -1;
    try { last = Number(sessionStorage.getItem('pg-poll')); } catch (e) {}
    var choices = polls.map(function (_, i) { return i; }).filter(function (i) { return polls.length < 2 || i !== last; });
    var next = choices[Math.floor(Math.random() * choices.length)];
    try { sessionStorage.setItem('pg-poll', String(next)); } catch (e) {}
    setIdx(next);
  }, []);
  var poll = polls[idx === null ? 0 : idx];
  if (!poll) return null;
  return h('div', { style: idx === null ? { visibility: 'hidden' } : undefined },
    h(Poll, { key: poll.name, name: 'pg-poll-' + poll.name, pollId: poll.name, api: idx === null ? null : props.api, question: poll.question, options: poll.options, totalLabel: poll.totalLabel }));
}

/* ---------- CommentList ----------
 * site: the form is split out as CommentForm so only it gets hydrated. */
export function CommentList(props) {
  var comments = props.comments || [];
  return h('section', { className: 'pg-comments', id: props.id },
    h('h3', { className: 'pg-subhead' }, (props.title || 'Hozzászólások') + ' (' + comments.length + ')'),
    comments.map(function (c, i) {
      return h('div', { key: i, className: cx('pg-comment', c.isAuthor && 'pg-comment--author') },
        h('p', { className: 'pg-comment__head' },
          c.url ? h(Link, { href: c.url }, h('b', null, c.name || 'Névtelen')) : h('b', null, c.name || 'Névtelen'),
          c.isAuthor ? ' [a blog szerzője]' : null, ' írta, ', c.date, ':'),
        h('p', { className: 'pg-comment__text' }, c.text));
    }),
    props.children
  );
}

/* ---------- CommentForm (hydrated) ----------
 * site: without `api` the form only pretends, in character. With `api` (the Worker URL) and `slug` the
 * comment goes to the moderation queue; Turnstile (`turnstileKey`), a honeypot field and a minimum fill
 * time keep the bots out. Approved comments are added to the post by hand (/moderate).
 * The sender's own comments are kept in their browser (localStorage, 30 days) and shown above the form,
 * only to them, with a badge from GET /status: „moderálásra vár”, „jóváhagyva, hamarosan megjelenik”, or
 * once „nem jelent meg”. Once approved and on the page, the local copy goes. */
var SENT_KEY = 'pg-sent';
var SENT_MS = 30 * 24 * 3600 * 1000;
var MAX_RECEIPTS = 20;
function loadSent() {
  try { var a = JSON.parse(storageGet(SENT_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; }
}
function saveSent(list) { storageSet(SENT_KEY, JSON.stringify(list)); }
function squash(t) { return String(t || '').replace(/\s+/g, ' ').trim(); }
// Is this text already among the published comments on the page?
function publishedOnPage(text) {
  var els = document.querySelectorAll('.pg-comment:not(.pg-comment--own) .pg-comment__text');
  for (var i = 0; i < els.length; i++) { if (squash(els[i].textContent) === squash(text)) return true; }
  return false;
}
// "2026.11.27. 22:41", Budapest time, like every date on the blog
function blogDateNow() {
  try {
    var p = {};
    new Intl.DateTimeFormat('hu-HU', { timeZone: 'Europe/Budapest', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return p.year + '.' + p.month + '.' + p.day + '. ' + p.hour + ':' + p.minute;
  } catch (e) { return ''; }
}
var OWN_BADGE = { pending: 'moderálásra vár', approved: 'jóváhagyva, hamarosan megjelenik', rejected: 'nem jelent meg' };
var OWN_NOTE = {
  pending: 'Ezt csak te látod, ebben a böngészőben, amíg Ödön jóvá nem hagyja.',
  approved: 'Ödön jóváhagyta; a következő frissítéskor mindenki látni fogja.',
  rejected: 'Ezt a hozzászólást Ödön nem engedte át. Ez az üzenet csak egyszer jelenik meg.',
};
function OwnComment(props) {
  var c = props.comment;
  return h('div', { className: cx('pg-comment', 'pg-comment--own', c.status === 'rejected' && 'pg-comment--rejected') },
    h('p', { className: 'pg-comment__head' },
      h('b', null, c.name || 'Névtelen'), ' írta, ', c.date, ':',
      h('span', { className: cx('pg-comment__badge', 'pg-comment__badge--' + c.status) }, OWN_BADGE[c.status])),
    h('p', { className: 'pg-comment__text' }, c.text),
    h('p', { className: 'pg-comment__note' }, OWN_NOTE[c.status]));
}
var COMMENT_ERRORS = {
  too_short: 'Ennél azért többet is írhatsz. Ödön is többet ír.',
  too_long: 'Ez már nem hozzászólás, hanem szakácskönyv. Legfeljebb 2000 karakter!',
  bad_url: 'A weboldal címe nem tűnik weboldalcímnek. Ha nincs, hagyd üresen.',
  captcha: 'A robotszűrő szerint robot vagy. Ha mégsem, próbáld újra!',
  rate_limited: 'Lassabban! Óránként legfeljebb három hozzászólás fér bele.',
};
var TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!loadTurnstile.p) {
    loadTurnstile.p = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = TURNSTILE_SRC; s.async = true;
      s.onload = function () { resolve(window.turnstile); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return loadTurnstile.p;
}
export function CommentForm(props) {
  var api = props.api;
  var st = React.useState(null);
  var msg = st[0], setMsg = st[1];
  var bz = React.useState(false);
  var busy = bz[0], setBusy = bz[1];
  var startedAt = React.useRef(0);
  var widgetBox = React.useRef(null);
  var ch = React.useState(false);
  var challenged = ch[0], setChallenged = ch[1];
  var widgetId = React.useRef(null);
  var token = React.useRef('');
  var sc = React.useState([]);
  var sent = sc[0], setSent = sc[1];
  React.useEffect(function () {
    if (!api || !props.slug) return;
    var now = Date.now();
    var all = loadSent().filter(function (c) { return c && c.receipt && c.at && now - c.at < SENT_MS; });
    saveSent(all);
    var mine = all.filter(function (c) { return c.slug === props.slug; }).slice(-MAX_RECEIPTS);
    if (!mine.length) return;
    setSent(mine.map(function (c) { return Object.assign({}, c, { status: 'pending' }); }));
    fetch(api + '/status?r=' + mine.map(function (c) { return c.receipt; }).join(','))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.statuses) return;
        var forget = {};
        var shown = [];
        mine.forEach(function (c) {
          var s = d.statuses[c.receipt] || 'pending';
          if (s === 'unknown') s = 'rejected';
          if (s === 'approved' && publishedOnPage(c.text)) { forget[c.receipt] = true; return; }
          if (s === 'rejected') forget[c.receipt] = true; // shown this once, then forgotten
          shown.push(Object.assign({}, c, { status: s }));
        });
        saveSent(loadSent().filter(function (c) { return !forget[c.receipt]; }));
        setSent(shown);
      })
      .catch(function () {});
  }, [api, props.slug]);
  React.useEffect(function () {
    startedAt.current = Date.now();
    if (!api || !props.turnstileKey) return;
    var cancelled = false;
    loadTurnstile().then(function (ts) {
      if (cancelled || !widgetBox.current) return;
      widgetId.current = ts.render(widgetBox.current, {
        sitekey: props.turnstileKey,
        appearance: 'interaction-only',
        theme: 'light',
        // The widget only shows itself when Cloudflare wants a click; the frame and label follow it.
        'before-interactive-callback': function () { setChallenged(true); },
        language: 'hu',
        callback: function (t) { token.current = t; },
        'expired-callback': function () { token.current = ''; },
        'error-callback': function () { token.current = ''; },
      });
    }).catch(function () {});
    return function () {
      cancelled = true;
      if (widgetId.current !== null && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [api, props.turnstileKey]);
  function resetTurnstile() {
    token.current = '';
    setChallenged(false);
    if (widgetId.current !== null && window.turnstile) window.turnstile.reset(widgetId.current);
  }
  function onSubmit(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var data = new FormData(form);
    var answer = String(data.get('captcha') || '').trim();
    if (answer !== '4') { setMsg({ ok: false, text: 'Hibás ellenőrző kód. Számmal, és ketchup nélkül!' }); return; }
    var done = { ok: true, text: 'Köszönjük! A hozzászólásod moderálásra vár. Ödön általában éjjel moderál, vacsora után.' };
    if (!api) { form.reset(); setMsg(done); return; }
    if (busy) return;
    if (props.turnstileKey && !token.current) { setMsg({ ok: false, text: 'A robotszűrő még gondolkodik. Várj egy pillanatot, és küldd el újra!' }); return; }
    setBusy(true);
    fetch(api + '/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: props.slug, nev: data.get('nev'), email: data.get('email'), web: data.get('web'), szoveg: data.get('szoveg'),
        hp: data.get('honlap2'), elapsed: Date.now() - startedAt.current, token: token.current,
      }),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok) {
          if (res.d.receipt) {
            var own = { slug: props.slug, receipt: res.d.receipt, name: String(data.get('nev') || '').trim(), text: String(data.get('szoveg') || '').trim(), date: blogDateNow(), at: Date.now() };
            saveSent(loadSent().concat([own]));
            setSent(function (prev) { return prev.concat([Object.assign({}, own, { status: 'pending' })]); });
            done = { ok: true, text: 'Köszönjük! A hozzászólásod moderálásra vár; addig csak te látod, fent. Ödön általában éjjel moderál, vacsora után.' };
          }
          form.reset(); setMsg(done);
        }
        else setMsg({ ok: false, text: COMMENT_ERRORS[res.d.error] || 'Valami elromlott. Ödön szerint a szerver hibája.' });
      })
      .catch(function () { setMsg({ ok: false, text: 'A szerver éppen ebédel. Próbáld újra később!' }); })
      .then(function () { setBusy(false); resetTurnstile(); });
  }
  return h(React.Fragment, null,
    sent.map(function (c) { return h(OwnComment, { key: c.receipt, comment: c }); }),
    h('form', { className: 'pg-form', onSubmit: onSubmit, action: '#', noValidate: true },
    h('p', { className: 'pg-form__title' }, h('b', null, 'Szólj hozzá!')),
    h('label', null, 'Név: ', h('input', { type: 'text', name: 'nev', size: 25, maxLength: 40 })),
    h('label', null, 'E-mail (nem jelenik meg): ', h('input', { type: 'email', name: 'email', size: 25, maxLength: 100 })),
    h('label', null, 'Weboldal: ', h('input', { type: 'url', name: 'web', size: 25, maxLength: 200, defaultValue: 'http://' })),
    api ? h('label', { className: 'pg-form__hp', 'aria-hidden': 'true' }, 'Ezt hagyd üresen: ',
      h('input', { type: 'text', name: 'honlap2', tabIndex: -1, autoComplete: 'off' })) : null,
    h('label', null, 'Hozzászólás:', h('textarea', { name: 'szoveg', rows: 4, cols: 40, maxLength: 2000 })),
    h('label', null, 'Mennyi kettő meg kettő? (számmal, ketchup nélkül): ', h('input', { type: 'text', name: 'captcha', size: 3 })),
    api && props.turnstileKey ? h('div', { className: cx('pg-form__turnstile', challenged && 'is-shown') },
      h('span', { className: 'pg-form__turnstile-label' }, 'Robotszűrő:'),
      h('div', { ref: widgetBox, className: 'pg-form__turnstile-box' })) : null,
    msg ? h('p', { className: cx('pg-form__msg', msg.ok ? 'is-ok' : 'is-err'), role: 'status' }, msg.text) : null,
    h('div', null, h(Button, { type: 'submit', disabled: busy }, 'Elküld'), ' ', h(Button, { type: 'reset', onClick: function () { setMsg(null); } }, 'Törlés')),
    api ? h('p', { className: 'pg-form__note' }, 'A hozzászólás csak Ödön jóváhagyása után jelenik meg. Az e-mail-címet senkinek nem adjuk ki, és moderálás után töröljük. Az IP-címből csak egy visszafejthetetlen kivonatot tárolunk, a spamszűrés és a szavazás miatt. Az elküldött hozzászólásod másolatát 30 napig a saját böngésződ őrzi, hogy lásd, hol tart.') : null
  ));
}

/* ---------- Ads ----------
 * Invented advertisers only, always labelled „Hirdetés”. At most one blinking AdBanner per page. */
function AdFrame(props) {
  return h('aside', { className: cx('pg-ad', props.className), 'aria-label': 'Hirdetés' },
    h('span', { className: 'pg-ad__label', 'aria-hidden': 'true' }, props.label || 'Hirdetés'),
    props.children);
}

/* 468×60 full banner */
export function AdBanner(props) {
  return h(AdFrame, null,
    h('a', { className: cx('pg-banner468', 'pg-banner468--' + (props.tone || 'prize')), href: props.href || '#' },
      h('span', { className: 'pg-banner468__text' },
        h('span', { className: cx('pg-banner468__head', props.blink && 'pg-blink') }, props.head),
        props.sub ? h('span', { className: 'pg-banner468__sub' }, props.sub) : null),
      props.cta ? h('span', { className: 'pg-banner468__cta' }, props.cta) : null));
}

/* "Szponzorált linkek": blue title, green URL, one line of copy */
export function TextAds(props) {
  var ads = props.ads || [];
  return h(AdFrame, null,
    h('div', { className: 'pg-textads' },
      h('span', { className: 'pg-textads__title' }, props.title || 'Szponzorált linkek'),
      h('ul', null, ads.map(function (ad, i) {
        return h('li', { key: i },
          h('a', { className: 'pg-textads__head', href: ad.href || '#' }, ad.title),
          h('span', { className: 'pg-textads__text' }, ad.text),
          h('span', { className: 'pg-textads__url' }, ad.url));
      }))));
}

/* 120×600 skyscraper */
export function Skyscraper(props) {
  return h(AdFrame, null,
    h('a', { className: 'pg-sky', href: props.href || '#' },
      h('span', { className: 'pg-sky__head' }, props.head),
      props.body ? h('span', { className: 'pg-sky__body' }, props.body) : null,
      props.big ? h('span', { className: 'pg-sky__big' }, props.big) : null,
      props.cta ? h('span', { className: 'pg-sky__cta' }, props.cta) : null,
      props.small ? h('span', { className: 'pg-sky__small' }, props.small) : null));
}
