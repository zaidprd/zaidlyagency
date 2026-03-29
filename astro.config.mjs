// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zaidly.com',
  output: 'static', 

  // INI OBATNYA: Paksa Astro buat GAK PAKAI Sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/passthrough',
    },
  },

  integrations: [
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.PUBLIC_SANITY_DATASET,
      apiVersion: '2023-10-01',
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
