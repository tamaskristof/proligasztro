import { withBase } from './url.js';
export const PER_PAGE = 5;
export const pageHref = (n) => (n <= 1 ? withBase('/') : withBase(`/oldal/${n}/`));
