import dns from 'dns';
import { resolve } from 'path';

import { defineConfig } from 'vite';

dns.setDefaultResultOrder('verbatim');
const outDir = 'dist' as const;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: 'src/api/start.ts',
      name: 'codebreaker-api',
      formats: ['es'],
    },
    modulePreload: { polyfill: false },
    outDir,
    ssr: true, // stops vite from externalizing modules for browser compatibility
    target: 'node22',
  },
  clearScreen: false,
  esbuild: {
    exclude: ['src/app/**'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
