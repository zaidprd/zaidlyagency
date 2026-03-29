// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 1. Masukkan domain kamu di sini buat SEO & Sitemap
  site: 'https://zaidly.com', 

  // 2. Integrations
  integrations: [
    sanity({
      projectId: '0ukg7bxy', 
      dataset: 'production',
      apiVersion: '2026-03-28', 
      useCdn: true, // Pakai true di lokal biar enteng (nggak berat)
    }), 
    react(), 
    sitemap()
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  // 3. Output 'server' wajib untuk Cloudflare Pages SSR
  output: 'server',
  adapter: cloudflare()
});