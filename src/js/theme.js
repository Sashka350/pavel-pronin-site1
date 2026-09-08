/**
 * theme.js — переключатель тёмной/светлой темы.
 * 1. Проверяем localStorage('theme').
 * 2. Если нет — используем системную через prefers-color-scheme.
 * 3. По клику переключаем data-theme на <html>.
 * 4. Сохраняем выбор в localStorage.
 * 5. Обновляем атрибут color-scheme для нативных контролов.
 */
(function () {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  }

  function setTheme(theme, persist) {
    applyTheme(theme);
    if (persist !== false) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  const buttons = document.querySelectorAll('[data-theme-toggle]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const current =
        root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  });

  // Инициализация ДО рендера, чтобы не было "вспышки" неверной темы.
  setTheme(getInitialTheme(), false);

  // Реагируем на смену системной темы, если пользователь не выбирал свою.
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
})();
