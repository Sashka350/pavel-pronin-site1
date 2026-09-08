/**
 * page-template-en.js — English helpers for generating static EN pages.
 * Mirrors scripts/page-template.js but with English navigation, head and footer.
 * English pages live under <base>/en/...
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.BASE_PATH || '/pavel-pronin-site1/';
const SITE = process.env.SITE_URL || 'https://sashka350.github.io/pavel-pronin-site1';
const EN = BASE + 'en/';

function withBase(path) {
  return BASE + String(path).replace(/^\//, '');
}

function withEn(path) {
  return EN + String(path).replace(/^\//, '');
}

export { BASE, SITE, EN };

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getAssets(outDir) {
  const distIndex = readFileSync(join(outDir, 'index.html'), 'utf8');
  const cssMatch = distIndex.match(/<link rel="stylesheet"[^>]*href="([^"]+)"/);
  const jsMatch = distIndex.match(/<script type="module"[^>]*src="([^"]+)"/);
  if (!cssMatch || !jsMatch) {
    console.error('Не найдены собранные ассеты в dist/index.html. Сначала выполните npm run build.');
    process.exit(1);
  }
  return { cssHref: cssMatch[1], jsSrc: jsMatch[1] };
}

function navLinks(active) {
  const links = [
    ['en/#about', 'About', 'about'],
    ['en/performances/', 'Performances', 'performances'],
    ['en/pedagogy/', 'Pedagogy', 'pedagogy'],
    ['en/inscenizations/', 'Stagings', 'inscenizations']
  ];
  return links
    .map(function (l) {
      const activeCls = l[2] === active ? ' is-active' : '';
      return '<li><a class="nav-link' + activeCls + '" href="' + withEn(l[0]) + '">' + l[1] + '</a></li>';
    })
    .join('');
}

function mobileNavLinks(active) {
  const links = [
    ['en/#about', 'About', 'about'],
    ['en/performances/', 'Performances', 'performances'],
    ['en/pedagogy/', 'Pedagogy', 'pedagogy'],
    ['en/inscenizations/', 'Stagings', 'inscenizations']
  ];
  return links
    .map(function (l) {
      const activeCls = l[2] === active ? ' is-active' : '';
      return '<li><a class="nav-link' + activeCls + '" href="' + withEn(l[0]) + '">' + l[1] + '</a></li>';
    })
    .join('');
}

function telegramLink() {
  return (
    '<a class="lang-link telegram-link" href="https://t.me/pavelpronintheatre" target="_blank" rel="noopener" aria-label="Telegram channel">' +
    '<svg class="icon-telegram" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' +
    '</a>'
  );
}

function themeToggle() {
  return (
    '<button class="theme-toggle" data-theme-toggle type="button" aria-label="Toggle theme">' +
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' +
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>' +
    '</button>'
  );
}

export function header(active) {
  return (
    '<header class="header">' +
    '<div class="container header__inner">' +
    '<a href="' + withEn('/') + '" class="header__logo" data-type-cycle data-type-motion data-type="0">Pavel Pronin</a>' +
    '<nav class="header__nav" aria-label="Main navigation"><ul>' + navLinks(active) + '</ul></nav>' +
    '<div class="header__actions">' +
    telegramLink() +
    '<a class="lang-link is-active" href="' + withEn('/') + '" aria-label="Russian version">EN</a>' +
    '<a class="lang-link" href="' + withBase('/') + '" aria-label="Russian version">RU</a>' +
    themeToggle() +
    '<button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>' +
    '</div>' +
    '</div>' +
    '</header>' +
    '<div class="mobile-menu" id="mobile-menu"><nav aria-label="Mobile navigation"><ul>' +
    mobileNavLinks(active) +
    '</ul></nav></div>'
  );
}

export function footer() {
  return (
    '<footer class="footer">' +
    '<div class="container">' +
    '<div class="footer__grid">' +
    '<div class="footer__col"><div class="footer__col-title">Pavel Pronin</div><div class="footer__links">' +
    '<a href="' + withEn('/#about') + '">About</a><a href="' + withEn('/performances/') + '">Performances</a><a href="' + withEn('/pedagogy/') + '">Pedagogy</a><a href="' + withEn('/inscenizations/') + '">Stagings</a>' +
    '</div></div>' +
    '<div class="footer__col"><div class="footer__col-title">Contacts</div><div class="footer__links">' +
    '<a href="mailto:pavel.pronin1986@gmail.com">pavel.pronin1986@gmail.com</a>' +
    '<a href="tel:+79165671554">+7 916 567 15 54</a>' +
    '<a href="https://vk.com/pashapronin" target="_blank" rel="noopener">VK</a>' +
    '<a href="https://t.me/pashapronin" target="_blank" rel="noopener">Telegram</a>' +
    '</div></div>' +
    '<div class="footer__col"><div class="footer__col-title">Language</div><div class="footer__links">' +
    '<a href="' + withBase('/') + '">Русская версия</a>' +
    '</div></div>' +
    '</div>' +
    '<div class="footer__bottom"><span>© 2026 Pavel Pronin</span><span>Director · Teacher · Researcher</span></div>' +
    '</div>' +
    '</footer>'
  );
}

export function head(opts) {
  return (
    '<meta charset="UTF-8" />' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
    '<title>' + esc(opts.title) + '</title>' +
    '<meta name="description" content="' + esc(opts.description) + '" />' +
    '<meta name="theme-color" content="#0C0C0C" />' +
    '<link rel="canonical" href="' + SITE + opts.canonical + '" />' +
    '<meta property="og:type" content="' + (opts.ogType || 'website') + '" />' +
    '<meta property="og:title" content="' + esc(opts.title) + '" />' +
    '<meta property="og:description" content="' + esc(opts.ogDescription || opts.description) + '" />' +
    '<meta property="og:url" content="' + SITE + opts.canonical + '" />' +
    (opts.ogImage ? '<meta property="og:image" content="' + opts.ogImage + '" />' : '') +
    '<meta property="og:locale" content="en_US" />' +
    '<meta property="og:site_name" content="Pavel Pronin" />' +
    '<link rel="preconnect" href="https://fonts.googleapis.com" />' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' +
    '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet" />' +
    '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' rx=\'12\' fill=\'%230C0C0C\'/%3E%3Ctext x=\'50\' y=\'68\' font-size=\'56\' font-family=\'Arial\' font-weight=\'bold\' fill=\'%23D4A843\' text-anchor=\'middle\'%3EP%3C/text%3E%3C/svg%3E" />' +
    (opts.jsonld ? '<script type="application/ld+json">' + JSON.stringify(opts.jsonld) + '</script>' : '')
  );
}

export function wrapHtml({ active, canonical, title, description, ogImage, ogDescription, ogType, jsonld, body, jsSrc, cssHref }) {
  return (
    '<!DOCTYPE html>\n' +
    '<html lang="en" data-theme="dark">\n' +
    '<head>' +
    head({ title, description, canonical, ogImage, ogDescription, ogType, jsonld }) +
    '<link rel="stylesheet" href="' + cssHref + '" />' +
    '</head>' +
    '<body>' +
    header(active) +
    '<main>' + body + '</main>' +
    footer() +
    '<script type="module" src="' + jsSrc + '"></script>' +
    '</body>' +
    '</html>'
  );
}
