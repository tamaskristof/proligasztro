/*
 * Proligasztró components, ported from the design system bundle (components/bundle.js,
 * namespace window.Proligasztro) to an ES module so Astro can render them at build time.
 * Class names (pg-*) and markup stay identical to the design system; styles are in
 * src/styles/blog.css. Differences from the bundle are marked "site:".
 *
 * Everything renders to static HTML. Only Poll and CommentForm are hydrated
 * (client:visible) because they react to clicks.
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
var DEFAULT_NOTICE = 'A Proligasztró szatirikus oldal. Zsírosdeszka Ödön és olvasói kitalált szereplők; a receptek, díjak és tápértékek szintén. A bemutatott ételek elkészítése saját felelősségre történik, de inkább ne.';
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
 * site: a src starting with "/" gets the site base path (e.g. "/kepek/teszta.jpg"). */
export function DigicamPhoto(props) {
  var w = props.width || 320;
  var src = props.src && props.src.charAt(0) === '/' ? withBase(props.src) : props.src;
  return h('figure', { className: cx('pg-photo', props.align === 'right' && 'pg-photo--right', props.align === 'left' && 'pg-photo--left'), style: { width: w + 'px', maxWidth: '100%' } },
    h('div', { className: 'pg-photo__frame', style: { width: w + 'px', maxWidth: '100%', aspectRatio: '4 / 3' } },
      src ? h('img', { src: src, alt: props.alt || '', width: w }) : h('div', { className: 'pg-photo__flash', role: 'img', 'aria-label': props.alt || 'Fotó helye' }),
      props.date === false ? null : h('span', { className: 'pg-photo__date', 'aria-hidden': 'true' }, props.date || "'08 11 22")
    ),
    props.caption ? h('figcaption', { className: 'pg-photo__caption' }, props.caption) : null
  );
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

/* ---------- Poll (hydrated) ---------- */
export function Poll(props) {
  var opts = props.options || [];
  var st = React.useState(!!props.showResults);
  var shown = st[0], setShown = st[1];
  var pick = React.useState(null);
  var name = props.name || 'pg-poll';
  var total = opts.reduce(function (s, o) { return s + (o.votes || 0); }, 0) || 1;
  return h('div', { className: 'pg-poll' },
    h('p', { className: 'pg-poll__q' }, props.question),
    shown ? h('ul', { className: 'pg-poll__results' }, opts.map(function (o, i) {
      var pct = Math.round((o.votes || 0) / total * 100);
      return h('li', { key: i },
        h('span', { className: 'pg-poll__label' }, o.label + ' – ' + pct + '%'),
        h('span', { className: 'pg-poll__track' }, h('span', { className: 'pg-poll__bar', style: { width: pct + '%' } })));
    })) : h('form', { onSubmit: function (e) { e.preventDefault(); setShown(true); } },
      opts.map(function (o, i) {
        return h('label', { key: i, className: 'pg-poll__opt' },
          h('input', { type: 'radio', name: name, checked: pick[0] === i, onChange: function () { pick[1](i); } }), ' ', o.label);
      }),
      h('div', { className: 'pg-poll__actions' }, h(Button, { type: 'submit' }, 'Szavazok!'), ' ',
        h('a', { className: 'pg-a', href: '#', onClick: function (e) { e.preventDefault(); setShown(true); } }, 'Eredmények'))),
    shown ? h('p', { className: 'pg-poll__total' }, 'Eddig ' + (props.totalLabel || total) + ' szavazat') : null
  );
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
 * site: a static host can't store comments, so the form only pretends, in character. */
export function CommentForm() {
  var st = React.useState(null);
  var msg = st[0], setMsg = st[1];
  function onSubmit(e) {
    e.preventDefault();
    var answer = String(new FormData(e.currentTarget).get('captcha') || '').trim();
    if (answer !== '4') { setMsg({ ok: false, text: 'Hibás ellenőrző kód. Számmal, és ketchup nélkül!' }); return; }
    e.currentTarget.reset();
    setMsg({ ok: true, text: 'Köszönjük! A hozzászólásod moderálásra vár. Ödön általában éjjel moderál, vacsora után.' });
  }
  return h('form', { className: 'pg-form', onSubmit: onSubmit, action: '#' },
    h('p', { className: 'pg-form__title' }, h('b', null, 'Szólj hozzá!')),
    h('label', null, 'Név: ', h('input', { type: 'text', name: 'nev', size: 25 })),
    h('label', null, 'E-mail (nem jelenik meg): ', h('input', { type: 'email', name: 'email', size: 25 })),
    h('label', null, 'Weboldal: ', h('input', { type: 'url', name: 'web', size: 25, defaultValue: 'http://' })),
    h('label', null, 'Hozzászólás:', h('textarea', { name: 'szoveg', rows: 4, cols: 40 })),
    h('label', null, 'Mennyi kettő meg kettő? (számmal, ketchup nélkül): ', h('input', { type: 'text', name: 'captcha', size: 3 })),
    msg ? h('p', { className: cx('pg-form__msg', msg.ok ? 'is-ok' : 'is-err'), role: 'status' }, msg.text) : null,
    h('div', null, h(Button, { type: 'submit' }, 'Elküld'), ' ', h(Button, { type: 'reset', onClick: function () { setMsg(null); } }, 'Törlés'))
  );
}
