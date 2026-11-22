// Wires every [data-pg-zoom] link to the page's <Lightbox> (#pg-lightbox).
// A click anywhere in the open lightbox, the „Bezárás [X]” button or Esc closes it.
// Modified clicks (new tab etc.) and browsers without <dialog> just follow the link to the JPEG.
export function initLightbox(doc = document) {
  const dlg = doc.getElementById('pg-lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  const img = dlg.querySelector('.pg-lightbox__img');
  const cap = dlg.querySelector('.pg-lightbox__caption');
  const count = dlg.querySelector('.pg-lightbox__count');

  doc.addEventListener('click', (e) => {
    const a = e.target instanceof Element && e.target.closest('[data-pg-zoom]');
    if (!a || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const href = a.getAttribute('href');
    const all = [...new Set([...doc.querySelectorAll('[data-pg-zoom]')].map((x) => x.getAttribute('href')))];
    img.src = href;
    img.alt = a.dataset.alt || '';
    cap.textContent = a.dataset.caption || '';
    count.textContent = `${all.indexOf(href) + 1}. kép / ${all.length}`;
    dlg.showModal();
  });
  dlg.addEventListener('click', () => dlg.close());
}
