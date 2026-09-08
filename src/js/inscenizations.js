/**
 * inscenizations.js — рендер списка инсценировок.
 * Каждая работа временно ведёт на собственную страницу-заглушку,
 * которая пока не создана и потому отдаёт 404. Внешних редиректов
 * на старый сайт нет.
 */
import { inscenizations } from '../data/inscenizations-data.js';

(function () {
  const list = document.querySelector('[data-inscenizations-list]');
  if (!list) return;

  const base = import.meta.env.BASE_URL || '/';

  list.innerHTML = inscenizations
    .map(function (item) {
      const slug = String(item.oldUrl || '').replace(/^\//, '');
      const href = base + 'inscenizations/' + slug + '/';
      return (
        '<li class="insc-item animate-on-scroll">' +
        '<a class="insc-item__link" href="' + href + '">' +
        '<span class="insc-item__title">' + item.title + '</span>' +
        '<span class="insc-item__author">' + item.author + '</span>' +
        '<span class="link-arrow"><span class="arrow">→</span></span>' +
        '</a>' +
        '</li>'
      );
    })
    .join('');

  if (window.initScrollAnimations) {
    window.initScrollAnimations(list);
  }
})();
