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
  adapter: cloudflare(), 
  image: { 
    service: { 
      entrypoint: 'astro/assets/services/noop', 
    }, 
  }, 
  integrations: [ 
    sanity({ 
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID, 
      dataset: process.env.PUBLIC_SANITY_DATASET, 
      apiVersion: '2023-10-01', // Ini baru bener, gak sok tau masa depan
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
