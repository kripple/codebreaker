import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  outputDir: 'temp',
  reporter: 'line',
  testDir: '../src',
  testMatch: '**/*.e2e.ts',
});
