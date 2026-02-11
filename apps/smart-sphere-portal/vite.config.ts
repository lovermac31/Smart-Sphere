import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@smart-sphere/core': path.resolve(__dirname, '../../packages/nbsf-core'),
      '@smart-sphere/portal': path.resolve(__dirname, './src')
    }
  }
});
