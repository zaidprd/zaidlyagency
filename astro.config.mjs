// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // 1. Tambahkan Sanity ke dalam Integrations
  integrations: [sanity({
    projectId: '0ukg7bxy', // Ganti dengan Project ID dari dashboard Sanity/file .env
    dataset: 'production',
    apiVersion: '2026-03-28', // Gunakan tanggal hari ini
    useCdn: false, // Set false agar data selalu fresh (bagus untuk development)
    studioUrl: '/admin', // Agar kamu bisa akses CMS di localhost:4321/admin
  }), react()],
  vite: {
    plugins: [tailwindcss()]
  }
});