/**
 * pedagogy-en.js — renders the English list of pedagogical projects.
 * Mirrors src/js/pedagogy.js for the EN page (en/pedagogy).
 */
import { pedagogyProjects } from '../data/pedagogy-data.js';
import { pedagogyProjectsEn } from '../data/pedagogy-en.js';

const BASE = import.meta.env.BASE_URL;

(function () {
  const grid = document.querySelector('[data-pedagogy-grid]');
  if (!grid) return;

  const emptyNotice = document.querySelector('[data-pedagogy-empty]');
  emptyNotice.classList.toggle('is-hidden', pedagogyProjects.length > 0);

  grid.innerHTML = pedagogyProjects
    .map(function (p) {
      const en = pedagogyProjectsEn[p.slug] || {};
      const title = en.title || p.title;
      const place = en.place != null ? en.place : p.place;
      const period = en.period != null ? en.period : p.period;
      const href = p.slug ? BASE + 'en/pedagogy/' + p.slug + '/' : BASE;
      return (
        '<a class="perf-card animate-on-scroll" href="' + href + '">' +
        '<div class="perf-card__media">' +
        '<img src="' + p.image + '" alt="' + title + '" loading="lazy" />' +
        '</div>' +
        '<div class="perf-card__body">' +
        '<h3 class="perf-card__title">' + title + '</h3>' +
        '<div class="perf-card__theater">' + [place, period].filter(Boolean).join(', ') + '</div>' +
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
