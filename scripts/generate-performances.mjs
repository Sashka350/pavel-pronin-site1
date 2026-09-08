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
import { performancesEn } from '../src/data/performances-en.js';
import { esc, getAssets, wrapHtml, SITE } from './page-template.js';
import { wrapHtml as wrapHtmlEn, SITE as SITE_EN } from './page-template-en.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');

const { cssHref, jsSrc } = getAssets(outDir);

const PLACEHOLDER_RU = {
  description: 'Описание появится после получения текстов от режиссёра.',
  team: 'Состав команды будет добавлен.',
  press: 'Материалы прессы будут добавлены.',
  videos: 'Видеозаписи будут добавлены.',
  premiere: 'Информация уточняется.',
  gallery: '— афиша'
};

const PLACEHOLDER_EN = {
  description: 'A description will appear once the director provides the texts.',
  team: 'The creative team will be added.',
  press: 'Press materials will be added.',
  videos: 'Video recordings will be added.',
  premiere: 'To be confirmed.',
  gallery: '— poster'
};

function page(p, lang) {
  const isEn = lang === 'en';
  const pl = isEn ? PLACEHOLDER_EN : PLACEHOLDER_RU;
  const en = performancesEn[p.slug] || {};
  const title = isEn ? (en.title || p.title) : p.title;
  const author = isEn ? (en.author != null && en.author !== '' ? en.author : (p.author || '')) : (p.author || '');
  const theater = isEn ? en.theater || p.theater : p.theater;
  const url = (isEn ? '/en' : '') + '/performances/' + p.slug + '/';
  const badgeLive = isEn ? 'On stage' : 'Идёт';
  const badgeArchive = isEn ? 'Archive' : 'Архив';
  const badge = p.status === 'live'
    ? '<span class="badge badge--live">' + badgeLive + '</span>'
    : '<span class="badge">' + badgeArchive + '</span>';
  const backLabel = isEn ? 'All performances' : 'Все спектакли';
  const imgAlt = title + ' ' + pl.gallery;
  const imgSrc = p.image || 'https://placehold.co/800x1067/141414/ffffff?text=' + encodeURIComponent(title);

  const galleryItems = Array.isArray(p.gallery) && p.gallery.length
    ? p.gallery.map(function (g) {
        return (
          '<figure class="gallery__item">' +
          '<a class="gallery__link" href="' + g.src + '" data-lightbox="' + p.slug + '" data-caption="' + esc(g.caption || '') + '">' +
          '<img src="' + g.src + '" alt="' + esc(g.caption || title) + '" loading="lazy" />' +
          '</a>' +
          '</figure>'
        );
      }).join('')
    : (
        '<figure class="gallery__item">' +
        '<a class="gallery__link" href="' + imgSrc + '" data-lightbox="' + p.slug + '" data-caption="' + esc(title) + '">' +
        '<img src="' + imgSrc + '" alt="' + esc(imgAlt) + '" loading="lazy" />' +
        '</a>' +
        '</figure>'
      );

  const team = Array.isArray(p.team) && p.team.length
    ? '<ul>' + p.team.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'
    : '<p class="perf-page__desc">' + pl.team + '</p>';
  const press = Array.isArray(p.press) && p.press.length
    ? '<ul>' + p.press.map(function (pr) { return '<li><a href="' + pr.url + '" target="_blank" rel="noopener">' + esc(pr.label || pr.url) + '</a></li>'; }).join('') + '</ul>'
    : '<p class="perf-page__desc">' + pl.press + '</p>';
  const videos = Array.isArray(p.videos) && p.videos.length
    ? '<ul>' + p.videos.map(function (v) { return '<li><a href="' + v.url + '" target="_blank" rel="noopener">' + esc(v.label || (isEn ? 'Video' : 'Видео')) + '</a></li>'; }).join('') + '</ul>'
    : '<p class="perf-page__desc">' + pl.videos + '</p>';

  const premiere = p.premiere ? p.premiere : pl.premiere;
  const description = p.description ? p.description : pl.description;

  const site = isEn ? SITE_EN : SITE;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': title,
    'author': { '@type': 'Person', 'name': isEn ? 'Pavel Pronin' : 'Павел Пронин' },
    'url': site + url,
    'image': imgSrc,
    'dateCreated': p.year ? String(p.year) : undefined
  };

  let t = 'Театр', o = 'О спектакле', info = 'Сведения о постановке', pr = 'Премьера', cr = 'Творческая команда', prs = 'Пресса', vid = 'Видео', ph = 'Фотографии';
  if (isEn) { t = 'Theatre'; o = 'About the play'; info = 'Production details'; pr = 'Premiere'; cr = 'Creative team'; prs = 'Press'; vid = 'Video'; ph = 'Photos'; }

  const body =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<a class="perf-page__back animate-on-scroll" href="' + (isEn ? '/en/performances/' : '/performances/') + '"><span class="arrow">→</span>' + backLabel + '</a>' +
    '<div class="perf-page__meta animate-on-scroll">' +
    badge +
    '<span>' + p.year + '</span>' +
    '</div>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(title) + '</h1>' +
    (author ? '<p class="perf-page__author animate-on-scroll">' + esc(author) + '</p>' : '') +
    '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
    '<div class="container">' +
    '<div class="perf-page__cover animate-on-scroll">' +
    '<img src="' + imgSrc + '" alt="' + esc(imgAlt) + '" />' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + t + '</h2>' +
    '<p class="perf-page__desc">' + esc(theater) + '</p>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + o + '</h2>' +
    '<div class="perf-page__desc"><p>' + esc(description) + '</p></div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + info + '</h2>' +
    '<div class="perf-page__specs">' +
    '<div class="perf-spec"><span class="perf-spec__label">' + pr + '</span><span class="perf-spec__value">' + esc(premiere) + '</span></div>' +
    '<div class="perf-spec"><span class="perf-spec__label">' + cr + '</span><div class="perf-spec__value">' + team + '</div></div>' +
    '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + prs + '</h2>' +
    '<div class="perf-spec__value">' + press + '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + vid + '</h2>' +
    '<div class="perf-spec__value">' + videos + '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + ph + '</h2>' +
    '<div class="gallery">' + galleryItems + '</div>' +
    '</div>' +
    '</div>' +
    '</section>';

  const opts = {
    active: 'performances',
    enPath: '/en/performances/' + p.slug + '/',
    title: title + (isEn ? ' — Pavel Pronin' : ' — Павел Пронин'),
    description: title + '. ' + theater + (isEn ? '. Director Pavel Pronin.' : '. Режиссёр Павел Пронин.'),
    ogDescription: theater,
    ogImage: imgSrc,
    ogType: 'article',
    canonical: url,
    jsonld,
    body,
    cssHref,
    jsSrc
  };

  return isEn ? wrapHtmlEn(opts) : wrapHtml(opts);
}

let count = 0;
for (const p of performances) {
  const dir = join(outDir, 'performances', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(p, 'ru'), 'utf8');

  const dirEn = join(outDir, 'en', 'performances', p.slug);
  mkdirSync(dirEn, { recursive: true });
  writeFileSync(join(dirEn, 'index.html'), page(p, 'en'), 'utf8');
  count++;
}
console.log('Сгенерировано страниц спектаклей: ' + count + ' → dist/performances/<slug>/ и dist/en/performances/<slug>/');

// --- robots.txt ---
writeFileSync(join(outDir, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n', 'utf8');

// --- sitemap (спектакли + педагогические проекты, RU + EN) ---
const pedagogyPaths = new Set();
const pedagogyPathsEn = new Set();
try {
  const { pedagogyProjects } = await import('../src/data/pedagogy-data.js');
  pedagogyProjects.forEach(function (pr) {
    if (pr.slug) pedagogyPaths.add(SITE + '/pedagogy/' + pr.slug + '/');
    if (pr.slug) pedagogyPathsEn.add(SITE_EN + '/pedagogy/' + pr.slug + '/');
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

const staticPagesEn = [
  'en/',
  'en/performances/',
  'en/pedagogy/',
  'en/inscenizations/'
];

const urls = [];
const today = new Date().toISOString().slice(0, 10);
staticPages.forEach(function (p) {
  urls.push({ loc: SITE + '/' + p, lastmod: today, priority: p === '' ? '1.0' : '0.8' });
});
staticPagesEn.forEach(function (p) {
  urls.push({ loc: SITE + '/' + p, lastmod: today, priority: '0.7' });
});
performances.forEach(function (p) {
  urls.push({
    loc: SITE + '/performances/' + p.slug + '/',
    lastmod: today,
    priority: p.status === 'live' ? '0.9' : '0.6'
  });
  urls.push({
    loc: SITE_EN + '/performances/' + p.slug + '/',
    lastmod: today,
    priority: p.status === 'live' ? '0.8' : '0.5'
  });
});
pedagogyPaths.forEach(function (loc) {
  urls.push({ loc: loc, lastmod: today, priority: '0.6' });
});
pedagogyPathsEn.forEach(function (loc) {
  urls.push({ loc: loc, lastmod: today, priority: '0.5' });
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
