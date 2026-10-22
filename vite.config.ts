import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' para que funcione en GitHub Pages (en cualquier subcarpeta)
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
