/**
 * type-cycle.js — периодическая смена типографики на [data-type-cycle].
 * Каждые ~500 мс переключается стиль (индекс 0..4) у всех таких элементов.
 */
(function () {
  const els = document.querySelectorAll('[data-type-cycle]');
  if (!els.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const total = 5;
  let i = 0;
  window.setInterval(function () {
    i = (i + 1) % total;
    els.forEach(function (el) {
      el.setAttribute('data-type', String(i));
    });
  }, 500);
})();