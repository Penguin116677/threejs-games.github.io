import { defineConfig } from 'vite'

// base './' agar hasil build bisa dibuka dari sub-folder mana pun
// (GitHub Pages, raw.githack, atau server statis lokal).
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
})
