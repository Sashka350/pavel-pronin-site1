/**
 * scroll-anim.js — анимации появления при скролле.
 * Через Intersection Observer добавляем класс .animated элементам
 * с классом .animate-on-scroll.
 */
(function () {
  let observer = null;

  function observe(el) {
    observer.observe(el);
  }

  function init(rootEl) {
    const scope = rootEl || document;
    const items = scope.querySelectorAll('.animate-on-scroll:not(.animated)');
    items.forEach(observe);
  }

  // Проверяем поддержку IntersectionObserver.
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
  } else {
    // Без поддержки — просто показываем всё.
    observer = {
      observe: function (el) {
        el.classList.add('animated');
      },
      unobserve: function () {}
    };
  }

  // Запускаем для статического контента при загрузке.
  window.addEventListener('DOMContentLoaded', function () {
    init(document);
  });

  // Экспортируем для модулей, добавляющих контент динамически.
  window.initScrollAnimations = init;
})();