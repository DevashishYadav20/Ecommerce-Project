import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: case-sensitive repo name for GitHub Pages
  base: '/Ecommerce-Project/',
  build: {
    outDir: 'dist', // must be 'dist' for gh-pages
  },
});

