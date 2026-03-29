// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zaidly.com',
  output: 'server', 
  
  // Di Astro 6, cukup panggil cloudflare() tanpa isi opsi mode lagi
  adapter: cloudflare(), 

  integrations: [
    sanity({
      projectId: '0ukg7bxy',
      dataset: 'production',
      apiVersion: '2026-03-28',
      useCdn: true,
    }),
    react(),
    sitemap()
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});