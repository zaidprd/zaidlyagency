<<<<<<< HEAD
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
=======
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zaidly.com',
  output: 'static', 

  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },

  integrations: [
    sanity({
      // Masukin ID lo langsung di sini. Anti-Gagal.
      projectId: "0ukg7bxy", 
      dataset: "production",
      apiVersion: '2024-03-28',
      useCdn: true,
    }),
    react(),
    sitemap()
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:events']
    }
  }
});
>>>>>>> f4bee64676614fd8603ba343448a5b05eea2fc86
