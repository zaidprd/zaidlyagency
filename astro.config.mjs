// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://zaidly.com',
  output: 'static',
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },
});
