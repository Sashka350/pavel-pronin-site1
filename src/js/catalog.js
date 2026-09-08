/**
 * catalog.js — каталог спектаклей.
 * 1. Рендерит карточки из src/data/performances-data.js.
 * 2. Фильтрация по статусу («все / идут / архив») и по году.
 * 3. Хранение выбранного фильтра в URL (?status=&year=) для шаринга и SEO.
 */
import { performances } from '../data/performances-data.js';

const BASE = import.meta.env.BASE_URL;

(function () {
  const grid = document.querySelector('[data-catalog-grid]');
  if (!grid) return;

  const emptyNotice = document.querySelector('[data-catalog-empty]');

  const statusButtons = Array.from(
    document.querySelectorAll('[data-filter-status]')
  );

  // --- Годы из данных (по убыванию) ---
  const years = [...new Set(performances.map(function (p) { return p.year; }))].sort(function (a, b) { return b - a; });
  const yearsWrap = document.querySelector('[data-filter-years]');

  // --- Состояние фильтров (из URL, чтобы работал шаринг) ---
  const params = new URLSearchParams(window.location.search);
  let activeStatus = params.get('status') || 'all';
  let activeYear = params.get('year') || 'all';

  function normalizeYear(value) {
    return value === 'all' || value === null ? 'all' : String(value);
  }
  activeYear = normalizeYear(activeYear);

  // --- Рендер одной карточки ---
  function renderCard(p) {
    const live = p.status === 'live';
    return (
      '<a href="' + BASE + 'performances/' + p.slug + '/" class="perf-card animate-on-scroll">' +
      '<div class="perf-card__media">' +
      '<img src="' + p.image + '" alt="' + p.title + ' — афиша" loading="lazy" />' +
      '</div>' +
      '<div class="perf-card__body">' +
      '<h3 class="perf-card__title">' + p.title + '</h3>' +
      '<div class="perf-card__theater">' + p.theater + '</div>' +
      '<div class="perf-card__meta">' +
      (live ? '<span class="badge badge--live">Идёт</span>' : '<span class="badge">Архив</span>') +
      '<span>' + p.year + '</span>' +
      '</div>' +
      '</div>' +
      '</a>'
    );
  }

  // --- Применение фильтров ---
  function applyFilters() {
    let list = performances;

    if (activeStatus !== 'all') {
      list = list.filter(function (p) { return p.status === activeStatus; });
    }
    if (activeYear !== 'all') {
      list = list.filter(function (p) { return p.year === Number(activeYear); });
    }

    // Сортировка: новые выше; внутри года — live первыми.
    list = list.sort(function (a, b) {
      if (a.year !== b.year) return b.year - a.year;
      if (a.status !== b.status) return a.status === 'live' ? -1 : 1;
      return 0;
    });

    grid.innerHTML = list.map(renderCard).join('');

    emptyNotice.classList.toggle('is-hidden', list.length > 0);

    // Обновляем активные классы кнопок.
    statusButtons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.filterStatus === activeStatus);
    });
    yearsWrap.querySelectorAll('[data-filter-year]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.filterYear === activeYear);
    });

    // Анимации для новых карточек.
    if (window.initScrollAnimations) {
      window.initScrollAnimations(grid);
    }

    // Синхронизация URL (без перезагрузки).
    const next = new URLSearchParams();
    if (activeStatus !== 'all') next.set('status', activeStatus);
    if (activeYear !== 'all') next.set('year', activeYear);
    const qs = next.toString();
    history.replaceState({}, '', (BASE + 'performances/') + (qs ? '?' + qs : ''));
  }

  // --- Инициализация фильтров ---
  if (yearsWrap) {
    const chips = ['<button class="chip' +
      (activeYear === 'all' ? ' is-active' : '') +
      '" type="button" data-filter-year="all">Все годы</button>'];
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