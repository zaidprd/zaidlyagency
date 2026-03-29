// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 1. Domain agensi lo
  site: 'https://zaidly.com',

  // 2. PINDAH KE STATIC (Biar Cloudflare tinggal baca HTML)
  output: 'static',

  // 3. HAPUS ADAPTER CLOUDFLARE (Gak perlu import/panggil cloudflare lagi)

  integrations: [
    sanity({
      // Tarik dari environment variables Cloudflare lo
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
      // Jaga-jaga buat library node yang dipake Sanity
      external: ['node:events']
    }
  }
});
