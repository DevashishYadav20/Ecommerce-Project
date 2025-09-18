import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use different base paths per deploy target.
// - Netlify / local dev: '/' (root)
// - GitHub Pages: '/Ecommerce-Project/' (your repo name)
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'gh-pages' ? '/Ecommerce-Project/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}));
