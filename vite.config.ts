import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['@emotion/react', '@emotion/styled']
  },
  resolve: {
    dedupe: ['@emotion/react', '@emotion/styled']
  }
});