import { defineConfig } from 'vite';
import { globSync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig({
  // Відносні шляхи до ресурсів у готовій збірці
  base: './',

  // Налаштування обробки CSS
  css: {
    postcss: {
      plugins: [
        SortCss({
          sort: 'mobile-first',
        }),
      ],
    },
  },

  // Плагіни Vite
  plugins: [injectHTML(), FullReload(['./**/*.html'])],

  // Налаштування production-збірки
  build: {
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      // Автоматичний пошук усіх HTML-сторінок у корені проєкту
      input: globSync('./*.html'),

      output: {
        // Сторонні бібліотеки збираються в окремий файл
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },

        // Назви JavaScript-файлів
        entryFileNames: '[name].js',

        // Назви інших ресурсів
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
