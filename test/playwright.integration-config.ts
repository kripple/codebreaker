import { defineConfig } from '@playwright/test';

const name = 'api' as const;

export default defineConfig({
  fullyParallel: true,
  outputDir: name,
  reporter: 'line',
  testDir: `../src/${name}`,
  testMatch: '**/*.integration-test.ts',
});
