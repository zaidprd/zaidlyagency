// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zaidly.com',
  output: 'static',
  prefetch: true,

  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },

  integrations: [
    sanity({
      projectId: "0ukg7bxy",
      dataset: "production",
      apiVersion: '2024-03-28',
      useCdn: true,
    }),
    react(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:events']
    }
  },
});
