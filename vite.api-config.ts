import { resolve } from 'path';

import { build } from 'vite';

const outDir = 'netlify/edge-functions' as const;
const edgeFunctions = ['game-new', 'game-id', 'game-attempt'] as const;

for (const name of edgeFunctions) {
  await build({
    build: {
      copyPublicDir: false,
      emptyOutDir: false,
      modulePreload: { polyfill: false },
      outDir,
      rollupOptions: {
        input: resolve(__dirname, `src/api/edge-functions/${name}.ts`),
        output: {
          entryFileNames: '[name].js',
          format: 'es',
          inlineDynamicImports: true,
        },
      },
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
}
