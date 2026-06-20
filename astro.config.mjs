import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Integrasi Tailwind v4 melalui sistem Vite
  vite: {
    plugins: [tailwindcss()],
  },

  // Ubah ke 'static' dulu buat development lokal yang kencang
  output: 'static',

  // Prefetching tetep nyalain biar transisi antar halaman cakep
  prefetch: true
});