import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outDir = 'netlify/edge-functions' as const;
const edgeFunctions = ['game-new', 'game-id', 'game-attempt'] as const;

for (const name of edgeFunctions) {
  await build({
    build: {
      // Aim for 100 KB to 500 KB (or less) for optimal cold start performance.
      chunkSizeWarningLimit: 500,
      copyPublicDir: false,
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, `src/api/edge-functions/${name}.ts`),
        fileName: '[name]',
        formats: ['es'],
        name: 'handler',
      },
      modulePreload: { polyfill: false },
      outDir,
      ssr: false,
      target: 'node22',
    },
    clearScreen: false,
    esbuild: {
      loader: 'ts',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
}
