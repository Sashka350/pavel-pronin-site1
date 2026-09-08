/**
 * generate-performances.mjs — генератор страниц спектаклей.
 * Запускается ПОСЛЕ `vite build` (npm run postbuild), читает собранные
 * CSS/JS хэши из dist/index.html и создаёт dist/performances/<slug>/index.html
 * для каждого спектакля из src/data/performances-data.js.
 */
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performances } from '../src/data/performances-data.js';
import { esc, getAssets, wrapHtml, SITE } from './page-template.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');

const { cssHref, jsSrc } = getAssets(outDir);

function page(p) {
  const url = '/performances/' + p.slug + '/';
  const badge = p.status === 'live' ? '<span class="badge badge--live">Идёт</span>' : '<span class="badge">Архив</span>';
  const imgSrc = p.image || 'https://placehold.co/800x1067/141414/ffffff?text=' + encodeURIComponent(p.title);

  const galleryItems = Array.isArray(p.gallery) && p.gallery.length
    ? p.gallery.map(function (g) {
        return (
          '<figure class="gallery__item">' +
          '<a class="gallery__link" href="' + g.src + '" data-lightbox="' + p.slug + '" data-caption="' + esc(g.caption || '') + '">' +
          '<img src="' + g.src + '" alt="' + esc(g.caption || p.title) + '" loading="lazy" />' +
          '</a>' +
          '</figure>'
        );
      }).join('')
    : (
        '<figure class="gallery__item">' +
        '<a class="gallery__link" href="' + imgSrc + '" data-lightbox="' + p.slug + '" data-caption="' + esc(p.title) + '">' +
        '<img src="' + imgSrc + '" alt="' + esc(p.title) + ' — афиша" loading="lazy" />' +
        '</a>' +
        '</figure>'
      );

  const team = Array.isArray(p.team) && p.team.length
    ? '<ul>' + p.team.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'
    : '<p class="perf-page__desc">Состав команды будет добавлен.</p>';

  const press = Array.isArray(p.press) && p.press.length
    ? '<ul>' + p.press.map(function (pr) { return '<li><a href="' + pr.url + '" target="_blank" rel="noopener">' + esc(pr.label || pr.url) + '</a></li>'; }).join('') + '</ul>'
    : '<p class="perf-page__desc">Материалы прессы будут добавлены.</p>';

  const videos = Array.isArray(p.videos) && p.videos.length
    ? '<ul>' + p.videos.map(function (v) { return '<li><a href="' + v.url + '" target="_blank" rel="noopener">' + esc(v.label || 'Видео') + '</a></li>'; }).join('') + '</ul>'
    : '<p class="perf-page__desc">Видеозаписи будут добавлены.</p>';

  const premiere = p.premiere ? p.premiere : 'Информация уточняется.';
  const description = p.description || 'Описание появится после получения текстов от режиссёра.';

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': p.title,
    'author': { '@type': 'Person', 'name': 'Павел Пронин' },
    'url': SITE + url,
    'image': imgSrc,
    'dateCreated': p.year ? String(p.year) : undefined
  };

  const body =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<a class="perf-page__back animate-on-scroll" href="/performances/"><span class="arrow">→</span>Все спектакли</a>' +
    '<div class="perf-page__meta animate-on-scroll">' +
    badge +
    '<span>' + p.year + '</span>' +
    '</div>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(p.title) + '</h1>' +
    (p.author ? '<p class="perf-page__author animate-on-scroll">' + esc(p.author) + '</p>' : '') +
    '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
    '<div class="container">' +
    '<div class="perf-page__cover animate-on-scroll">' +
    '<img src="' + imgSrc + '" alt="' + esc(p.title) + ' — афиша" />' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Театр</h2>' +
    '<p class="perf-page__desc">' + esc(p.theater) + '</p>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">О спектакле</h2>' +
    '<div class="perf-page__desc"><p>' + esc(description) + '</p></div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Сведения о постановке</h2>' +
    '<div class="perf-page__specs">' +
    '<div class="perf-spec"><span class="perf-spec__label">Премьера</span><span class="perf-spec__value">' + esc(premiere) + '</span></div>' +
    '<div class="perf-spec"><span class="perf-spec__label">Творческая команда</span><div class="perf-spec__value">' + team + '</div></div>' +
    '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Пресса</h2>' +
    '<div class="perf-spec__value">' + press + '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Видео</h2>' +
    '<div class="perf-spec__value">' + videos + '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Фотографии</h2>' +
    '<div class="gallery">' + galleryItems + '</div>' +
    '</div>' +
    '</div>' +
    '</section>';

  return wrapHtml({
    active: 'performances',
    enPath: '/en/performances/',
    title: p.title + ' — Павел Пронин',
    description: p.title + '. ' + p.theater + '. Режиссёр Павел Пронин.',
    ogDescription: p.theater,
    ogImage: imgSrc,
    ogType: 'article',
    canonical: url,
    jsonld,
    body,
    cssHref,
    jsSrc
  });
}

let count = 0;
for (const p of performances) {
  const dir = join(outDir, 'performances', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(p), 'utf8');
  count++;
}
console.log('Сгенерировано страниц спектаклей: ' + count + ' → dist/performances/<slug>/');

// --- robots.txt ---
writeFileSync(join(outDir, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n', 'utf8');

// --- sitemap (спектакли + педагогические проекты) ---
const pedagogyPaths = new Set();
try {
  const { pedagogyProjects } = await import('../src/data/pedagogy-data.js');
  pedagogyProjects.forEach(function (pr) {
    if (pr.slug) pedagogyPaths.add(SITE + '/pedagogy/' + pr.slug + '/');
  });
} catch (e) {
  console.error('Не удалось прочитать педагогические проекты для sitemap:', e.message);
}

const staticPages = [
  '',
  'performances/',
  'pedagogy/',
  'inscenizations/'
];

const urls = [];
const today = new Date().toISOString().slice(0, 10);
staticPages.forEach(function (p) {
  urls.push({ loc: SITE + '/' + p, lastmod: today, priority: p === '' ? '1.0' : '0.8' });
});
performances.forEach(function (p) {
  urls.push({
    loc: SITE + '/performances/' + p.slug + '/',
    lastmod: today,
    priority: p.status === 'live' ? '0.9' : '0.6'
  });
});
pedagogyPaths.forEach(function (loc) {
  urls.push({ loc: loc, lastmod: today, priority: '0.6' });
});

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(function (u) {
    return (
      '  <url>\n' +
      '    <loc>' + u.loc + '</loc>\n' +
      '    <lastmod>' + u.lastmod + '</lastmod>\n' +
      '    <priority>' + u.priority + '</priority>\n' +
      '  </url>'
    );
  }).join('\n') +
  '\n</urlset>\n';

writeFileSync(join(outDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Сгенерированы robots.txt и sitemap.xml (' + urls.length + ' URL).');
