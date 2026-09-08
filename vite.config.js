import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Базовый путь для GitHub Pages суб-пути (https://<user>.github.io/pavel-pronin-site/).
// Когда появится кастомный домен (pavelpronin.me) — задайте BASE_PATH=/ .
const basePath = process.env.BASE_PATH || '/pavel-pronin-site/';

export default defineConfig({
  root: '.',
  base: basePath,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
        performances: fileURLToPath(new URL('./performances/index.html', import.meta.url)),
        pedagogy: fileURLToPath(new URL('./pedagogy/index.html', import.meta.url)),
        inscenizations: fileURLToPath(new URL('./inscenizations/index.html', import.meta.url))
      }
    }
  },
  server: {
    port: 5173,
    open: false
  }
});
