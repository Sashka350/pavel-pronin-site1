/**
 * gallery.js — лайтбокс для галерей фотографий.
 * Разметка:
 *   <figure class="gallery__item">
 *     <a class="gallery__link" href="{full}" data-lightbox="{group}" data-caption="Подпись">
 *       <img src="{thumb}" alt="Подпись" loading="lazy" />
 *     </a>
 *   </figure>
 * Открытие по клику, навигация ←/→, закрытие по Esc и клику вне.
 */
(function () {
  const root = document.documentElement;
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Закрыть">&times;</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Назад">&#8249;</button>' +
    '<figure class="lightbox__stage">' +
    '<img class="lightbox__img" alt="" />' +
    '<figcaption class="lightbox__caption"></figcaption>' +
    '</figure>' +
    '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Вперёд">&#8250;</button>';

  let activeItems = [];
  let activeIndex = 0;

  function open(index) {
    const item = activeItems[index];
    if (!item) return;
    activeIndex = index;

    document.body.appendChild(overlay);
    document.body.classList.add('lightbox-open');
    root.classList.add('has-lightbox');

    const img = overlay.querySelector('.lightbox__img');
    img.src = item.href;
    img.alt = item.caption;
    overlay.querySelector('.lightbox__caption').textContent = item.caption;

    requestAnimationFrame(function () {
      overlay.classList.add('is-visible');
    });
  }

  function close() {
    overlay.classList.remove('is-visible');
    setTimeout(function () {
      if (overlay.parentNode === document.body) document.body.removeChild(overlay);
      document.body.classList.remove('lightbox-open');
      root.classList.remove('has-lightbox');
      overlay.querySelector('.lightbox__img').src = '';
    }, 200);
  }

  function show(offset) {
    activeIndex = (activeIndex + offset + activeItems.length) % activeItems.length;
    const item = activeItems[activeIndex];
    const img = overlay.querySelector('.lightbox__img');
    img.classList.remove('is-loading');
    img.src = item.href;
    img.alt = item.caption;
    overlay.querySelector('.lightbox__caption').textContent = item.caption;
  }

  // --- Сбор ссылок по группе ---
  function collect(group) {
    return Array.from(document.querySelectorAll('[data-lightbox="' + group + '"]')).map(function (link) {
      return {
        href: link.getAttribute('href'),
        caption: link.getAttribute('data-caption') || ''
      };
    });
  }

  // --- Делегирование по клику ---
  document.addEventListener('click', function (e) {
    const link = e.target.closest('[data-lightbox]');
    if (!link) return;

    e.preventDefault();
    const group = link.getAttribute('data-lightbox');
    activeItems = collect(group);
    const index = activeItems.findIndex(function (item) {
      return item.href === link.getAttribute('href');
    });
    open(index);
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  overlay.querySelector('.lightbox__close').addEventListener('click', close);
  overlay.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(-1); });
  overlay.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(1); });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-visible')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(-1);
    if (e.key === 'ArrowRight') show(1);
  });
})();