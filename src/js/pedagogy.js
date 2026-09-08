/**
 * pedagogy.js — рендер списка педагогических проектов.
 * Карточки ведут на отдельные страницы /pedagogy/<slug>/,
 * которые генерируются scripts/generate-pedagogy.mjs при сборке.
 */
import { pedagogyProjects } from '../data/pedagogy-data.js';

const BASE = import.meta.env.BASE_URL;

(function () {
  const grid = document.querySelector('[data-pedagogy-grid]');
  if (!grid) return;

  const emptyNotice = document.querySelector('[data-pedagogy-empty]');
  emptyNotice.classList.toggle('is-hidden', pedagogyProjects.length > 0);

  grid.innerHTML = pedagogyProjects
    .map(function (p) {
      const href = p.slug ? BASE + 'pedagogy/' + p.slug + '/' : BASE;
      return (
        '<a class="perf-card animate-on-scroll" href="' + href + '">' +
        '<div class="perf-card__media">' +
        '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy" />' +
        '</div>' +
        '<div class="perf-card__body">' +
        '<h3 class="perf-card__title">' + p.title + '</h3>' +
        '<div class="perf-card__theater">' + [p.place, p.period].filter(Boolean).join(', ') + '</div>' +
        (p.note ? '<div class="perf-card__meta"><span>' + p.note + '</span></div>' : '') +
        '</div>' +
        '</a>'
      );
    })
    .join('');

  if (window.initScrollAnimations) {
    window.initScrollAnimations(grid);
  }
})();