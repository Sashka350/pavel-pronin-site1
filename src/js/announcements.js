/**
 * announcements.js — блок «Анонсы» на главной.
 * Если массив анонсов пуст — блок скрывается (display: none).
 */
(function () {
  const section = document.querySelector('[data-announcements]');
  if (!section) return;

  const grid = section.querySelector('[data-announcements-grid]');
  if (!grid) return;

  // ЗАГЛУШКА: реальные анонсы появятся после согласования с заказчиком.
  // Чтобы скрыть блок полностью — сделайте массив пустым: []
  const announcements = [
    {
      title: 'Премьера «Принцессы Турандот»',
      date: 'Ноябрь 2026',
      place: 'Элиста'
    },
    {
      title: 'Семинар по Диалогам Платона',
      date: 'Октябрь 2026',
      place: 'Москва'
    }
  ];

  if (!announcements.length) {
    section.classList.add('is-hidden');
    return;
  }

  const cards = announcements
    .map(function (a) {
      return (
        '<article class="event-card animate-on-scroll">' +
        '<div class="event-card__date">' + a.date + '</div>' +
        '<h3 class="event-card__title">' + a.title + '</h3>' +
        '<div class="event-card__place">' + a.place + '</div>' +
        '</article>'
      );
    })
    .join('');

  grid.innerHTML = cards;

  // Анимации для только что отрендеренных карточек.
  if (window.initScrollAnimations) {
    window.initScrollAnimations(grid);
  }
})();