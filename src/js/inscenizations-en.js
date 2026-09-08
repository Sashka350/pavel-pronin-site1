/**
 * inscenizations-en.js — renders the English list of inscenizations.
 * Mirrors src/js/inscenizations.js for the EN page (en/inscenizations).
 */
import { inscenizationsEn } from '../data/inscenizations-en.js';

(function () {
  const list = document.querySelector('[data-inscenizations-list]');
  if (!list) return;

  const base = import.meta.env.BASE_URL || '/';

  list.innerHTML = inscenizationsEn
    .map(function (item) {
      const slug = String(item.oldUrl || '').replace(/^\//, '');
      const href = base + 'en/inscenizations/' + slug + '/';
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
