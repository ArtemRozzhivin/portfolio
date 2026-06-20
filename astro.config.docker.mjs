import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // TODO: set your site URL before deploying (required by sitemap)
  // site: 'https://your-site.com',

  integrations: [react(), sitemap()],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // Standalone Node.js server — used for Docker deployments.
  // The production image runs: node ./dist/server/entry.mjs
  adapter: node({ mode: 'standalone' }),
})
