/**
 * nav.js — мобильная навигация (бургер-меню).
 * По клику на бургер переключаем класс .nav-open на body.
 */
(function () {
  const burger = document.querySelector('.burger');
  if (!burger) return;

  const close = function () {
    document.body.classList.remove('nav-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', function () {
    const isOpen = document.body.classList.toggle('nav-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Закрыть меню по клику на любую ссылку внутри мобильного меню.
  document.querySelectorAll('.mobile-menu a').forEach(function (link) {
    link.addEventListener('click', close);
  });

  // Закрыть по Esc.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  // Подсветка шапки при скролле.
  const header = document.querySelector('.header');
  let ticking = false;
  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          header.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
})();