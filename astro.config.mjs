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
      projectId: "8ukg7bxy", 
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