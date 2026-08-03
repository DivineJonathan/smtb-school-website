import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Multi-page vanilla HTML/CSS/JS site (no React).
// Each entry is a top-level HTML page; shared assets live in /assets.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        academics: resolve(__dirname, 'academics.html'),
        admissions: resolve(__dirname, 'admissions.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        news: resolve(__dirname, 'news.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
