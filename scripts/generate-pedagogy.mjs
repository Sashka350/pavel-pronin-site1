/**
 * generate-pedagogy.mjs — генератор страниц педагогических проектов.
 * Запускается ПОСЛЕ `vite build` (npm run postbuild), читает собранные
 * CSS/JS хэши из dist/index.html и создаёт dist/pedagogy/<slug>/index.html
 * для каждого проекта из src/data/pedagogy-data.js.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pedagogyProjects } from '../src/data/pedagogy-data.js';
import { esc, getAssets, wrapHtml } from './page-template.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');

const { cssHref, jsSrc } = getAssets(outDir);

function page(p) {
  if (!p.slug) return null;
  const url = '/pedagogy/' + p.slug + '/';
  const imgSrc = p.image || 'https://placehold.co/800x1067/141414/ffffff?text=' + encodeURIComponent(p.title);
  const description = p.description || 'Описание проекта появится после получения материалов от режиссёра.';

  const meta = [];
  if (p.period) meta.push('<div class="perf-spec"><span class="perf-spec__label">Период</span><span class="perf-spec__value">' + esc(p.period) + '</span></div>');
  if (p.place) meta.push('<div class="perf-spec"><span class="perf-spec__label">Город</span><span class="perf-spec__value">' + esc(p.place) + '</span></div>');

  const body =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<a class="perf-page__back animate-on-scroll" href="/pedagogy/"><span class="arrow">→</span>Все проекты</a>' +
    '<p class="perf-page__meta animate-on-scroll">Педагогика</p>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(p.title) + '</h1>' +
    '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
    '<div class="container">' +
    '<div class="perf-page__cover animate-on-scroll">' +
    '<img src="' + imgSrc + '" alt="' + esc(p.title) + '" />' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">О проекте</h2>' +
    '<div class="perf-page__desc"><p>' + esc(description) + '</p></div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Сведения</h2>' +
    '<div class="perf-page__specs">' + meta.join('') + '</div>' +
    '</div>' +
    '</div>' +
    '</section>';

  return wrapHtml({
    active: 'pedagogy',
    enPath: '/en/pedagogy/',
    title: p.title + ' — Педагогика · Павел Пронин',
    description: p.title + '. Педагогический проект Павла Пронина.' + (p.place ? ' ' + p.place + '.' : ''),
    ogImage: imgSrc,
    canonical: url,
    body,
    cssHref,
    jsSrc
  });
}

let count = 0;
for (const p of pedagogyProjects) {
  const html = page(p);
  if (!html) continue;
  const dir = join(outDir, 'pedagogy', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');
  count++;
}
console.log('Сгенерировано страниц педагогических проектов: ' + count + ' → dist/pedagogy/<slug>/');
