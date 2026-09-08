/**
 * catalog-en.js — English catalog of performances.
 * Mirrors src/js/catalog.js but renders English titles and labels for the
 * EN page (en/performances).
 */
import { performances } from '../data/performances-data.js';
import { performancesEn } from '../data/performances-en.js';

const BASE = import.meta.env.BASE_URL;

(function () {
  const grid = document.querySelector('[data-catalog-grid]');
  if (!grid) return;

  const emptyNotice = document.querySelector('[data-catalog-empty]');

  const statusButtons = Array.from(
    document.querySelectorAll('[data-filter-status]')
  );

  const years = [...new Set(performances.map(function (p) { return p.year; }))].sort(function (a, b) { return b - a; });
  const yearsWrap = document.querySelector('[data-filter-years]');

  const params = new URLSearchParams(window.location.search);
  let activeStatus = params.get('status') || 'all';
  let activeYear = params.get('year') || 'all';

  function normalizeYear(value) {
    return value === 'all' || value === null ? 'all' : String(value);
  }
  activeYear = normalizeYear(activeYear);

  function renderCard(p) {
    const live = p.status === 'live';
    const en = performancesEn[p.slug] || {};
    const title = en.title || p.title;
    const theater = en.theater || p.theater;
    return (
      '<a href="' + BASE + 'en/performances/' + p.slug + '/" class="perf-card animate-on-scroll">' +
      '<div class="perf-card__media">' +
      '<img src="' + p.image + '" alt="' + title + ' — poster" loading="lazy" />' +
      '</div>' +
      '<div class="perf-card__body">' +
      '<h3 class="perf-card__title">' + title + '</h3>' +
      '<div class="perf-card__theater">' + theater + '</div>' +
      '<div class="perf-card__meta">' +
      (live ? '<span class="badge badge--live">On stage</span>' : '<span class="badge">Archive</span>') +
      '<span>' + p.year + '</span>' +
      '</div>' +
      '</div>' +
      '</a>'
    );
  }

  function applyFilters() {
    let list = performances;

    if (activeStatus !== 'all') {
      list = list.filter(function (p) { return p.status === activeStatus; });
    }
    if (activeYear !== 'all') {
      list = list.filter(function (p) { return p.year === Number(activeYear); });
    }

    list = list.sort(function (a, b) {
      if (a.year !== b.year) return b.year - a.year;
      if (a.status !== b.status) return a.status === 'live' ? -1 : 1;
      return 0;
    });

    grid.innerHTML = list.map(renderCard).join('');

    emptyNotice.classList.toggle('is-hidden', list.length > 0);

    statusButtons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.filterStatus === activeStatus);
    });
    yearsWrap.querySelectorAll('[data-filter-year]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.filterYear === activeYear);
    });

    if (window.initScrollAnimations) {
      window.initScrollAnimations(grid);
    }

    const next = new URLSearchParams();
    if (activeStatus !== 'all') next.set('status', activeStatus);
    if (activeYear !== 'all') next.set('year', activeYear);
    const qs = next.toString();
    history.replaceState({}, '', (BASE + 'en/performances/') + (qs ? '?' + qs : ''));
  }

  if (yearsWrap) {
    const chips = ['<button class="chip' +
      (activeYear === 'all' ? ' is-active' : '') +
      '" type="button" data-filter-year="all">All years</button>'];
    years.forEach(function (y) {
      chips.push(
        '<button class="chip' +
        (String(activeYear) === String(y) ? ' is-active' : '') +
        '" type="button" data-filter-year="' + y + '">' + y + '</button>'
      );
    });
    yearsWrap.innerHTML = chips.join('');

    yearsWrap.querySelectorAll('[data-filter-year]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeYear = normalizeYear(btn.dataset.filterYear);
        applyFilters();
      });
    });
  }

  statusButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeStatus = btn.dataset.filterStatus;
      applyFilters();
    });
  });

  applyFilters();
})();
