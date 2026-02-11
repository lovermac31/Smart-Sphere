import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@smart-sphere/core': path.resolve(__dirname, '../../packages/nbsf-core'),
      '@smart-sphere/portal': path.resolve(__dirname, './src')
    }
  }
});
